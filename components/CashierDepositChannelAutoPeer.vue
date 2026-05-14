<template>
  <div class="w-full flex flex-col items-center gap-2 sm:gap-4">
    <div v-if="isLoading" class="w-full h-40 flex items-center justify-center">
      <UIcon name="i-heroicons-arrow-path" class="theme-loading-icon" />
    </div>
    <div v-else class="w-full">
      <div
        v-if="!isAutoPeer"
        class="theme-error-box w-full flex flex-col justify-center items-center text-center"
      >
        <p>ขณะนี้ระบบ {{ $t('deposit_auto_peer') }} ปิดให้บริการ</p>
        <p>กรุณาเลือกใช้ช่องทางอื่น</p>
      </div>
      <div
        v-else-if="isDepositError"
        class="theme-error-box w-full flex flex-col justify-center items-center text-center"
      >
        <p class="text-center">{{ isDepositError }}</p>
        <UButton
          type="button"
          class="theme-primary-btn w-full h-12 justify-center text-md my-5"
          @click="cashierStore.idSelect = 'AUTO_SLIP'"
          >ใช้ช่องทางการฝากเงินอื่น</UButton
        >
      </div>
      <div v-else-if="!isCompleted" class="w-full">
        <InformationUpdate v-on:complete="toCompleted" />
      </div>
      <div v-else>
        <div v-if="step === 0">
          <UForm
            :state="state"
            :schema="amountDepositSchema"
            ref="form"
            @submit.prevent="onSubmitDeposit"
            :validateOn="['blur']"
          >
            <AppFormGroup
              :label="$t('please_specify_amount')"
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

            <div class="grid grid-cols-4 gap-2">
              <UButton
                v-for="amount in shortCutAmount"
                type="button"
                class="menu-btn-inactive w-full h-12 justify-center rounded-full text-md font-semibold !text-amber-100 [&_*]:!text-amber-100"
                @click="onSelectshortCutAmount(amount.value)"
                ><span v-if="isFirstSelect">+</span>{{ amount.name }}</UButton
              >
            </div>

            <UButton
              type="submit"
              class="theme-primary-btn w-full h-12 justify-center text-lg my-4"
              :loading="isLoading"
            >
              {{ $t('btn_next') }}
            </UButton>
          </UForm>
        </div>

        <div v-if="step === 1">
          <div
            v-for="bank in p2cDepositList"
            class="theme-panel w-full flex py-2 mb-2"
          >
            <div class="w-1/3 flex flex-col items-center justify-center">
              <NuxtImg
                :src="
                  'https://cdn.tiamutauto.com/master-bank/' +
                  bank.bankShort +
                  '.svg'
                "
                :alt="bank.bankName"
                class="w-20"
              />
            </div>
            <div class="w-2/3 px-4 grid grid-cols-2">
              <div class="theme-list-item">
                <div class="theme-label flex items-center text-sm">
                  {{ $t('bank_name') }}
                </div>
                <div class="theme-value flex items-center">
                  {{ bank.bankName }}
                </div>
              </div>
              <div class="theme-list-item">
                <div class="theme-label flex items-center text-sm">
                  {{ $t('bank_account') }}
                </div>
                <div class="theme-title text-xl sm:text-2xl">
                  {{ bank.accountNumber }}
                  <UIcon
                    name="i-heroicons-clipboard-document"
                    class="w-5 h-5 cursor-pointer"
                    @click="copyToClipboard(bank.accountNumber)"
                  />
                </div>
              </div>
              <div class="theme-list-item">
                <div class="theme-label flex items-center text-sm">
                  {{ $t('bank_account_first_name') }}
                </div>
                <div class="theme-value">{{ bank.firstName }} {{ bank.lastName }}</div>
              </div>
            </div>
          </div>

          <p
            v-if="p2cDepositList.length"
            class="text-[12px] font-light text-center text-amber-200/70 my-2"
          >
            {{ $t('deposit_can_copy_with_button') }}
            <UIcon name="i-heroicons-clipboard-document" class="w-3 h-3" />
          </p>

          <div class="flex flex-col gap-4">
            <div
              class="theme-panel w-full flex flex-col items-center justify-center px-6 py-4"
            >
              <div class="w-full flex flex-col">
                <div class="flex justify-between">
                  <p class="theme-label text-xl sm:text-2xl">
                    {{ $t('deposit_amount') }}
                  </p>
                  <p class="theme-title text-xl sm:text-2xl font-semibold">
                    {{ summary }}฿
                  </p>
                </div>
                <p
                  class="text-xs font-light text-amber-200/70 pt-2"
                >
                  {{
                    $t('deposit_please_use_your_bank', {
                      bank_account: bankStore.userBank.account,
                    })
                  }}
                </p>
              </div>
            </div>

            <div
              class="w-full flex flex-col items-center justify-center rounded-xl border border-amber-300/50 bg-red-950/40 px-6 py-4 text-amber-100 shadow-lg shadow-black/40 ring-1 ring-amber-200/10 ring-inset"
            >
              <div class="w-full flex flex-col items-center">
                <p class="font-light text-md sm:text-lg">
                  กรุณาโอนและอัปโหลดสลิปภายใน
                  <span
                    v-if="countdown"
                    class="theme-title text-xl sm:text-2xl font-medium"
                    >{{ countdown.formattedTime }}</span
                  >
                </p>
                <p
                  class="text-xs sm:text-sm text-amber-200/70"
                >
                  หากทำรายการไม่สำเร็จภายในเวลาที่กำหนด
                  ช่องทางฝากนี้จะถูกระงับชั่วคราว
                </p>
              </div>
            </div>

            <div class="w-full">
              <AppUploadFile v-on:base64-file="getBase64Image" />
            </div>

            <div class="w-full">
              <UButton
                type="button"
                class="theme-primary-btn w-full h-12 justify-center text-lg my-2"
                @click="onSubmit"
                :disabled="isLoading"
                >{{ $t('btn_apply') }}</UButton
              >
              <UButton
                type="button"
                class="theme-danger-btn w-full h-12 justify-center text-lg my-2"
                @click="p2cCancelTransfer"
                :disabled="isLoading"
                >{{ $t('btn_cancel') }}</UButton
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { z } from 'zod'
import { useInformation } from '~/composables/useCustomerService'
import type { P2cDepositList } from '~/models/p2c.model'

interface InitialState {
  amount: number
}

interface ShortCutAmount {
  name: string
  value: number
}

const { t } = useI18n()
const cashierStore = useCashierStore()
const bankStore = useBankStore()
const popupStore = usePopupStore()
const profileStore = useProfileStore()
const { useParseAmount } = useFormatter()
const { copyToClipboard } = useClipboard()

const initialState: InitialState = {
  amount: 100,
}

const state = ref({
  ...initialState,
})

const shortCutAmount: ShortCutAmount[] = [
  { name: '50', value: 50 },
  { name: '100', value: 100 },
  { name: '500', value: 500 },
  { name: '1,000', value: 1000 },
]

const amountDepositSchema = z.object({
  amount: z
    .number({ required_error: t('please_specify_amount') })
    .min(1, t('amount_must_be_more_than_0'))
    .max(1000, t('amount_must_not_exceed_1000')),
})

const isLoading = ref(false)
const isCompleted = ref(false)
const step = ref(0)
const form = ref()
const amount = ref('0')
const isFirstSelect = ref(false)
const isDepositError = ref('')
const p2cDepositList = ref<P2cDepositList[]>([])
const summary = ref<string>('')
const countdown = ref()
const base64Image = ref<string | undefined>(undefined)

const isAutoPeer = computed(() => {
  if (!profileStore.userData) return false
  return profileStore.userData.isDeposit.isAutoPeer
})

const onSelectshortCutAmount = (value: number) => {
  if (!isFirstSelect.value) {
    isFirstSelect.value = true
    state.value.amount = value
  } else {
    state.value.amount = state.value.amount + value
  }
}

// ต้องเช็คยิงซ้ำ
const onSubmitDeposit = async () => {
  if (form.value.errors.length) return
  try {
    const { status, code, data, message } = await useP2cDeposit(
      state.value.amount,
    )
    if (!status) {
      if (code === '60001') {
        popupStore.alertLoading({
          message,
          preventClose: true,
          onLooping: () => onSubmitDeposit(),
        })
      } else if (code === '60002') {
        if (data) {
          popupStore.closeAlertPopup()
          isFirstSelect.value = false
          step.value = 1
          const { list, summary: amount, expiredDate } = data
          p2cDepositList.value = list
          cashierStore.p2cRef = list[0].ref
          summary.value = amount
          countdown.value = useCountdownWithTimestamp(expiredDate)
          countdown.value.startCountdown()
        }
      } else {
        popupStore.alertError({ message })
      }
    } else {
      if (data) {
        popupStore.closeAlertPopup()
        isFirstSelect.value = false
        step.value = 1
        const { list, summary: amount, expiredDate } = data
        p2cDepositList.value = list
        cashierStore.p2cRef = list[0].ref
        summary.value = amount
        countdown.value = useCountdownWithTimestamp(expiredDate)
        countdown.value.startCountdown()
      }
    }
  } catch (e) {
    popupStore.toastError({ message: (e as Error).message })
    console.error((e as Error).message)
  }
}

const getInformation = async () => {
  try {
    isLoading.value = true
    const { status, code, data, message } = await useInformation()
    if (!status) {
      popupStore.alertError({ message: message })
    } else {
      if (data) {
        const { firstNameEN, lastNameEN } = data
        isCompleted.value = !!firstNameEN && !!lastNameEN
      }
    }
  } catch (e) {
    popupStore.toastError({ message: (e as Error).message })
    console.error((e as Error).message)
  } finally {
    isLoading.value = false
  }
}

const toCompleted = async (isComplete: boolean) => {
  if (!isComplete) return
  await getP2cDepositStatus()
}

const getP2cDepositStatus = async () => {
  try {
    isLoading.value = true
    const { status, code, data, message } = await useP2cDepositStatus()
    if (!status) {
      if (code === '60005' || code === '88004' || code === '60004') {
        // 88004 ขออภัย ไม่สามารถทำรายการ AutoPeer ในช่วงเวลา 23:00 - 01:00 ได้ เนื่องจากเลี่ยงข้อผิดพลาดจากธนาคาร
        isDepositError.value = message
      } else {
        popupStore.alertError({ message: message })
      }
    } else {
      await getInformation()
      if (!isCompleted.value) return
      if (data) {
        step.value = 1
        const { list, summary: amount, expiredDate } = data
        p2cDepositList.value = list
        cashierStore.p2cRef = list[0].ref
        summary.value = amount
        countdown.value = useCountdownWithTimestamp(expiredDate)
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

const getBase64Image = (file: string | undefined) => {
  base64Image.value = file
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

const onSubmit = async () => {
  const imgSlip = base64Image.value
  if (imgSlip) {
    const ref = cashierStore.p2cRef
    const body = { imgSlip, ref }
    try {
      isLoading.value = true
      const { status, message } = await useP2cUploadSlip(body)
      if (!status) {
        popupStore.alertError({ message: message })
      } else {
        resetState()
        popupStore.alertSuccess({
          title: message,
          preventClose: true,
          onConfirm: () => cashierStore.goDepositHistory(),
        })
      }
    } catch (e) {
      popupStore.toastError({ message: (e as Error).message })
      console.error((e as Error).message)
    } finally {
      isLoading.value = false
    }
  }
}

const p2cCancelTransfer = async () => {
  try {
    const ref = [cashierStore.p2cRef]
    const { status, message } = await useP2cCancelTransfer(ref)
    if (!status) {
      popupStore.alertError({ message: message })
    } else {
      popupStore.alertSuccess({
        title: message,
        message: 'ยกเลิกรายการสำเร็จ',
        preventClose: true,
        onConfirm: () => {
          resetState()
          cashierStore.getP2cDepositPending()
          getP2cDepositStatus()
        },
      })
    }
  } catch (e) {
    popupStore.toastError({ message: (e as Error).message })
    console.error((e as Error).message)
  }
}

const resetState = () => {
  step.value = 0
  base64Image.value = undefined
  state.value = { ...initialState }
  isFirstSelect.value = false
  isDepositError.value = ''
  p2cDepositList.value = []
  countdown.value = null
}

watchEffect(() => {
  if (countdown.value) {
    if (countdown.value.isTimeUp) {
      resetState()
      popupStore.openModalProfile()
      popupStore.alertWarning({
        message: t('deposit_is_time_up'),
      })
    }
  }
})

onMounted(() => {
  getP2cDepositStatus()

  // step.value = 1
  // const { list, summary: amount, expiredDate } = mockup.data
  // p2cDepositList.value = list
  // cashierStore.p2cRef = list[0].ref
  // summary.value = amount
  // countdown.value = useCountdownWithTemstamp(expiredDate)
  // countdown.value.startCountdown()
})

onUnmounted(() => {
  resetState()
})
</script>
