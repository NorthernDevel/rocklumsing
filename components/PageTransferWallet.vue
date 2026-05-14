<template>
  <div class="flex flex-col items-center justify-center">
    <h3 class="theme-title mb-4 text-2xl font-semibold">
      {{ $t('menu_transfer_wallet') }}
    </h3>

    <div class="w-full flex flex-col items-center gap-2 sm:gap-4">
      <div
        class="theme-panel w-full min-h-40 flex flex-col items-center justify-center p-4"
      >
        <UIcon
          v-if="isLoading"
          name="i-heroicons-arrow-path"
          class="theme-loading-icon"
        />

        <div v-else class="flex flex-col items-center justify-center">
          <p class="theme-label">
            {{ $t('txt_amount') }} ({{ $t('transfer_wallet_cash') }})
          </p>
          <p class="theme-amount">
            {{ walletCash.currency }}
          </p>
        </div>

        <UButton
          v-if="user?.walletCash"
          type="button"
          class="theme-primary-btn w-full h-12 justify-center text-lg mt-2"
          :loading="isLoading"
          :disabled="isLoading"
          @click="onConfirm()"
          >{{ $t('transfer_to_credit') }}</UButton
        >
      </div>
      <div
        v-if="!user?.walletCash"
        class="w-full text-center flex flex-col items-center justify-center"
      >
        <div class="theme-error-box w-full">
          {{ $t('can_not_transfer_now') }}
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type {
  RequestAutoWithdraw,
  RequestSumTurn,
} from '~/models/transfer.model'

const { t } = useI18n()
const { useCurrency } = useFormatter()
const profileStore = useProfileStore()
const popupStore = usePopupStore()

const isLoading = ref(false)

const user = profileStore.userData

const emit = defineEmits(['activeTab'])

const walletCash = computed(() => useCurrency(user ? user.walletCash : 0))

const onConfirm = () => {
  popupStore.alertConfirm({
    message: t('do_you_want_to_transfer'),
    preventClose: true,
    onConfirm: () => onSubmit(),
  })
}

const onSubmit = async () => {
  try {
    isLoading.value = true
    const { status, data, message } = await useTransferWallet()
    if (!status) {
      popupStore.alertError({ message })
    } else {
      if (data && data.isTurn) {
        if (data.isTurn) {
          const { isTurn, sumTurn, credit } = data
          if (isTurn && sumTurn) {
            transferSumTurn({ amount: credit, outstanding: 0 })
          } else if (isTurn) {
            transferAutoWithdraw({ amount: credit })
          }
        } else {
          popupStore.alertSuccess({ message })
        }
      }
    }
  } catch (e) {
    popupStore.toastError({ message: (e as Error).message })
    console.error((e as Error).message)
  } finally {
    isLoading.value = false
  }
}

const transferAutoWithdraw = async (body: RequestAutoWithdraw) => {
  try {
    isLoading.value = true
    const { status, message } = await useAutoWithdraw(body)
    if (!status) {
      popupStore.alertError({ message })
    } else {
      popupStore.alertSuccess({ message })
    }
  } catch (e) {
    popupStore.toastError({ message: (e as Error).message })
    console.error((e as Error).message)
  } finally {
    isLoading.value = false
  }
}

const transferSumTurn = async (body: RequestSumTurn) => {
  try {
    isLoading.value = true
    const { status, message } = await useSumTurn(body)
    if (!status) {
      popupStore.alertError({ message })
    } else {
      popupStore.alertSuccess({ message })
    }
  } catch (e) {
    popupStore.toastError({ message: (e as Error).message })
    console.error((e as Error).message)
  } finally {
    isLoading.value = false
  }
}
</script>
