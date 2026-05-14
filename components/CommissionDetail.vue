<template>
  <div class="w-full flex flex-col items-center gap-2 sm:gap-4">
    <div
      class="theme-panel w-full h-40 flex flex-col items-center justify-center"
    >
      <UIcon
        v-if="isLoading"
        name="i-heroicons-arrow-path"
        class="theme-loading-icon"
      />

      <div v-else class="flex flex-col items-center justify-center">
        <p class="theme-label">
          {{ $t('txt_amount') }} ({{ $t('menu_commission') }})
        </p>
        <p class="theme-amount">
          {{ amount }}
        </p>
      </div>
    </div>

    <div
      v-if="!isDisbled"
      class="theme-panel w-full p-4"
    >
      <USelectMenu
        v-model="selected"
        :options="typeOfWithdraw"
        size="xl"
        :ui="{
          color: {
            white: {
              outline:
                'bg-black/50 border-red-900/60 text-gray-100 ring-red-900/60 focus:ring-red-500 focus:border-amber-300',
            },
          },
        }"
      >
        <template #leading>
          <UAvatar v-bind="selected.avatar" size="2xs" />
        </template>
      </USelectMenu>

      <UButton
        type="button"
        class="theme-primary-btn w-full h-12 justify-center text-lg mt-2"
        :loading="isLoading"
        :disabled="isLoading"
        @click="onSubmit"
        >{{ t('btn_apply') }}</UButton
      >
    </div>
    <div
      v-else-if="isDisbled && commission"
      class="w-full text-center flex flex-col items-center justify-center"
    >
      <div class="theme-error-box w-full">
        {{ commission.message }}
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { RequestCashbackType } from '~/models/cashback.model'
import type {
  CommissionData,
  RequestCommissionTurnOverDetail,
} from '~/models/commission.model'

type WithdrawType = {
  label: string
  avatar: { src: string }
  type: number
}

const { t } = useI18n()
const { useCurrency } = useFormatter()
const popupStore = usePopupStore()

const emit = defineEmits(['activeTab'])

const isLoading = ref(false)
const isDisbled = ref(true)
const commission = ref<CommissionData>()

const typeOfWithdraw: WithdrawType[] = [
  {
    label: t('withdraw_credit'),
    avatar: { src: '/assets/images/coin.webp' },
    type: 0,
  },
  {
    label: t('withdraw_diamond'),
    avatar: { src: '/assets/images/diamond.svg' },
    type: 1,
  },
]
const selected = ref(typeOfWithdraw[0])

const amount = computed(() => {
  let rawCredit = 0
  if (commission.value && commission.value.amount) {
    rawCredit = commission.value.amount
  }
  const { currency } = useCurrency(rawCredit)
  return currency
})

const getCommission = async () => {
  try {
    isLoading.value = true
    const { status, message, data } = await useCommission()
    if (!status) {
      popupStore.alertError({ message: message })
    } else {
      if (data) {
        commission.value = data
        isDisbled.value = commission.value.isDisableBtn
      }
    }
  } catch (e) {
    popupStore.toastError({ message: (e as Error).message })
    console.error((e as Error).message)
  } finally {
    isLoading.value = false
  }
}

const getCommissionTurnOverDetail = async (
  body: RequestCommissionTurnOverDetail,
) => {
  try {
    isLoading.value = true
    const { status, message, data } = await useCommissionTurnOverDetail(body)
    if (!status) {
      popupStore.alertError({ message: message })
    } else {
      if (data && !data.isDisableBtn) {
        addCommissionToProduct({ commissionType: body.commissionType })
      }
    }
  } catch (e) {
    popupStore.toastError({ message: (e as Error).message })
    console.error((e as Error).message)
  } finally {
    isLoading.value = false
  }
}

const addCommissionToProduct = async (
  body: RequestCommissionTurnOverDetail,
) => {
  try {
    isLoading.value = true
    const { status, message } = await useCommissionToProduct(body)

    if (!status) {
      popupStore.alertError({ message: message })
    } else {
      popupStore.alertSuccess({
        title: t('successfull'),
        message: message,
        onConfirm: () => emit('activeTab', 1),
      })
    }
  } catch (e) {
    popupStore.toastError({ message: (e as Error).message })
    console.error((e as Error).message)
  } finally {
    isLoading.value = false
  }
}

const onSubmit = () => {
  if (selected)
    popupStore.alertConfirm({
      title: t('confirm_to', {
        label: selected.value.label,
      }),
      preventClose: true,
      onConfirm: () =>
        getCommissionTurnOverDetail({ commissionType: selected.value.type }),
    })
}

onMounted(() => {
  getCommission()
})
</script>
