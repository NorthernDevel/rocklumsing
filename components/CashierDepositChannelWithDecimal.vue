<template>
  <div class="w-full flex flex-col items-center gap-2 sm:gap-4">
    <div v-if="isLoading" class="w-full h-40 flex items-center justify-center">
      <UIcon name="i-heroicons-arrow-path" class="theme-loading-icon" />
    </div>
    <div v-else class="w-full">
      <div
        v-if="!resourceStore.isDeposit.isDecimal"
        class="theme-error-box w-full flex flex-col justify-center items-center text-center"
      >
        <p>ขณะนี้ระบบ {{ $t(title) }} ปิดให้บริการ</p>
        <p>กรุณาเลือกใช้ช่องทางอื่น</p>
      </div>
      <div v-else>
        <div v-if="step === 0">
          <UForm
            :state="state"
            :schema="amountDepositSchema"
            ref="form"
            @submit.prevent="onSubmitDepositTransCreate"
            :validateOn="['blur']"
          >
            <AppFormGroup
              :label="
                $t('deposit_range', {
                  min: 1,
                  max: maxCurrency,
                  currency: profileStore.currency,
                })
              "
              :required="true"
              name="amount"
            >
              <UInput
                :ui="{
                  base: 'text-right',
                  color: {
                    white: {
                      outline:
                        'bg-black/50 border-red-900/60 text-gray-100 ring-red-900/60 focus:ring-red-500 focus:border-amber-300',
                    },
                  },
                }"
                icon="i-heroicons-banknotes"
                type="text"
                size="lg"
                inputmode="numeric"
                v-model="state.amount"
                v-on:blur="onBlur"
              >
                <template #trailing>
                  <span class="text-amber-200/70 text-xs">{{
                    profileStore.currency
                  }}</span>
                </template>
              </UInput>
            </AppFormGroup>

            <div class="grid grid-cols-3 gap-2 mb-4">
              <UButton
                v-for="amount in decimalShortCut"
                type="button"
                class="menu-btn-inactive w-full h-12 justify-center rounded-full text-md"
                @click="onSelectshortCutAmount(amount)"
                :disabled="Number(amount) > maxDeposit"
                >{{ useCurrency(Number(amount), 'none').currency }}</UButton
              >
            </div>

            <UButton
              type="submit"
              class="theme-primary-btn w-full h-12 justify-center text-lg mt-2"
              :loading="isLoading"
            >
              {{ $t('btn_submit') }}
            </UButton>
          </UForm>
        </div>

        <div v-if="step === 1">
          <div class="theme-panel w-full flex py-2 mb-2">
            <div class="w-1/3 flex flex-col items-center justify-center">
              <NuxtImg
                :src="depositBank.avatar"
                :alt="depositBank.label"
                class="w-20"
              />
            </div>
            <div class="w-2/3 px-4 grid grid-cols-2">
              <div class="theme-list-item">
                <div class="theme-label flex items-center text-sm">
                  {{ $t('bank_name') }}
                </div>
                <div class="theme-value flex items-center">
                  {{ depositBank.label }}
                </div>
              </div>
              <div class="theme-list-item">
                <div class="theme-label flex items-center text-sm">
                  {{ $t('bank_account') }}
                </div>
                <div class="theme-title text-xl sm:text-2xl">
                  {{ depositBank.account }}
                  <UIcon
                    name="i-heroicons-clipboard-document"
                    class="w-5 h-5 cursor-pointer"
                    @click="copyToClipboard(depositBank.account)"
                  />
                </div>
              </div>
              <div class="theme-list-item">
                <div class="theme-label flex items-center text-sm">
                  {{ $t('bank_account_first_name') }}
                </div>
                <div class="theme-value">{{ depositBank.accountName }}</div>
              </div>
            </div>
          </div>
          <p
            v-if="depositBank"
            class="text-[12px] font-light text-center text-amber-200/70 mt-2"
          >
            {{ $t('deposit_can_copy_with_button') }}
            <UIcon name="i-heroicons-clipboard-document" class="w-3 h-3" />
          </p>

          <div
            class="w-full flex flex-col items-center justify-center rounded-xl border border-amber-300/50 bg-red-950/40 px-6 py-4 my-4 text-amber-100 shadow-lg shadow-black/40 ring-1 ring-amber-200/10 ring-inset"
          >
            <div class="w-full flex flex-col items-center">
              <p class="font-light text-md sm:text-xl pb-4">
                จำนวน
                <span class="theme-title text-xl sm:text-3xl font-medium">{{
                  useCurrency(state.amount, 'trailing').currency
                }}</span>
              </p>
              <p class="font-light text-md sm:text-lg">
                กรุณาโอนภายใน
                <span
                  v-if="countdown"
                  class="theme-title text-xl sm:text-2xl font-medium"
                  >{{ countdown.formattedTime }}</span
                >
              </p>
            </div>
          </div>

          <UButton
            type="button"
            class="theme-primary-btn w-full h-12 justify-center text-lg mt-2"
            :loading="isLoading"
            @click="cashierStore.goDepositHistory()"
          >
            {{ $t('history_deposit') }}
          </UButton>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { z } from 'zod'
import type { DecimalDepositTransCreateData } from '~/models/bank-deposit.model'

interface InitialState {
  amount: number
}

const { t } = useI18n()
const resourceStore = useResourceStore()
const cashierStore = useCashierStore()
const bankStore = useBankStore()
const popupStore = usePopupStore()
const profileStore = useProfileStore()
const { useCurrency, useParseAmount } = useFormatter()
const { copyToClipboard } = useClipboard()

const title = computed(() => {
  switch (cashierStore.idSelect) {
    case 'AUTO':
      return 'deposit_auto'
    case 'AUTO_SLIP':
      return 'deposit_auto_slip'
    case 'TRUEWALLET':
      return 'deposit_truemoney'
    case 'DECIMAL':
      return 'deposit_decimal'
    default:
      return 'deposit_auto'
  }
})

const initialState: InitialState = {
  amount: 1,
}

const state = ref({
  ...initialState,
})

const decimalShortCut = ref<string[]>()
const maxDeposit = ref(5000)
const decimalDepositTransData = ref<DecimalDepositTransCreateData>()
const { currency: maxCurrency } = useCurrency(maxDeposit, 'none')

const amountDepositSchema = z.object({
  amount: z
    .number({ required_error: t('please_specify_amount') })
    .int(t('amount_must_be_integer'))
    .min(1, t('amount_must_be_more_than_0'))
    .max(
      maxDeposit.value,
      t('amount_must_not_exceed_value', {
        value: maxCurrency.value,
      }),
    ),
})

const isLoading = ref(false)
const step = ref(0)
const form = ref()
const amount = ref('0')
const countdown = ref()

const depositBank = computed(() => {
  if (!decimalDepositTransData.value)
    return {
      account: '',
      label: '',
      avatar: '',
      accountName: '',
    }
  const { accountName, accountNumber, bankName } = decimalDepositTransData.value
  const bankFiltered = bankStore.bankList.filter((bank) => bank.id === bankName)

  return {
    account: accountNumber,
    label: bankFiltered[0].label,
    avatar: bankFiltered[0].avatar.src,
    accountName,
  }
})

const getDecimalDepositInfo = async () => {
  try {
    isLoading.value = true
    const { status, data, message } = await useDecimalDepositInfo()
    if (!status) {
      popupStore.alertError({ message: message })
    } else {
      if (data) {
        const { decimalShortCutAmount, maxDepositDecimal } = data
        decimalShortCut.value = decimalShortCutAmount
        maxDeposit.value = maxDepositDecimal
      }
    }
  } catch (e) {
    popupStore.toastError({ message: (e as Error).message })
    console.error((e as Error).message)
  } finally {
    isLoading.value = false
  }
}

const getDecimalDepositTrans = async () => {
  try {
    isLoading.value = true
    const { status, data, message } = await useDecimalDepositTrans()
    if (!status) {
      popupStore.alertError({ message: message })
    } else {
      if (data) {
        decimalDepositTransData.value = data
        const { expireDate, amount } = decimalDepositTransData.value

        if (Number(expireDate) < 0) return
        state.value.amount = amount
        step.value = 1
        countdown.value = useCountdownWithSec(Number(expireDate))
        countdown.value.startCountdown()
      }
    }
  } catch (e) {
    popupStore.toastError({ message: (e as Error).message })
    console.error((e as Error).message)
  } finally {
    isLoading.value = false
  }
}

const onSelectshortCutAmount = (value: string) => {
  state.value.amount = Number(value)
}

const onBlur = (event: Event) => {
  const input = (event.target as HTMLInputElement).value

  if (!input) {
    amount.value = '0'
    state.value.amount = 0
    return
  }

  const amountNumber = useParseAmount().parseAmount(input)

  amount.value = useParseAmount().formatAmount(amountNumber)

  state.value.amount = amountNumber
}

const onSubmitDepositTransCreate = async () => {
  if (form.value.errors.length) return
  try {
    isLoading.value = true
    const { status, data, message } = await useDecimalDepositTransCreate({
      amount: state.value.amount,
    })
    if (!status) {
      popupStore.alertError({ message })
    } else {
      if (data) {
        decimalDepositTransData.value = data
        const { expireDate, amount } = decimalDepositTransData.value
        step.value = 1
        state.value.amount = amount
        countdown.value = useCountdownWithSec(Number(expireDate))
        countdown.value.startCountdown()
      }
    }
  } catch (e) {
    popupStore.toastError({ message: (e as Error).message })
    console.error((e as Error).message)
  } finally {
    isLoading.value = false
  }
}

const resetState = () => {
  step.value = 0
  state.value = { ...initialState }
  countdown.value = null
}

watchEffect(() => {
  if (countdown.value) {
    if (countdown.value.isTimeUp) {
      resetState()
    }
  }
})

onMounted(() => {
  getDecimalDepositInfo()
  getDecimalDepositTrans()
})

onUnmounted(() => {
  resetState()
})
</script>
