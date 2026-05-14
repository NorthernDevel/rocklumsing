<template>
  <div class="flex flex-col items-center justify-center w-full">
    <div class="flex flex-col items-center justify-center w-full">
      <div
        class="theme-panel w-full min-h-40 py-4 px-3 flex flex-col items-center justify-center"
      >
        <UIcon
          v-if="isLoading"
          name="i-heroicons-arrow-path"
          class="theme-loading-icon"
        />
        <div v-else class="flex flex-col items-center justify-center">
          <div class="theme-label">{{ $t('txt_income') }}</div>
          <div class="theme-amount">
            {{ credit }}
          </div>
        </div>

        <UButton
          v-if="affiliateData?.credit && affiliateData.minWithdraw"
          icon="i-heroicons-banknotes"
          size="sm"
          class="theme-primary-btn mt-4 mb-2 px-5 py-2 justify-center text-sm"
          :disabled="
            affiliateData.credit != 0 &&
            affiliateData.minWithdraw > affiliateData.credit
          "
          @click="getDepositAffiliate()"
          >{{ $t('withdraw_wallet') }}</UButton
        >
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { PreviewTakeAffiliateCreditData } from '~/models/affiliate.model'

const { t } = useI18n()
const { useCurrency } = useFormatter()
const popupStore = usePopupStore()

const emit = defineEmits(['activeTab'])
const isLoading = ref(false)
const affiliateData = ref<PreviewTakeAffiliateCreditData>()
const totalRecord = ref(0)

const credit = computed(() => {
  let rawCredit = 0
  if (affiliateData.value && affiliateData.value.credit) {
    rawCredit = affiliateData.value.credit
  }
  const { currency } = useCurrency(rawCredit)
  return currency
})

const getCredit = async () => {
  try {
    isLoading.value = true
    totalRecord.value = 0
    const { status, message, data } = await usePreviewTakeAffiliateCredit()
    if (!status) {
      popupStore.alertError({ message: message })
      affiliateData.value = undefined
    } else {
      if (data && data.credit) {
        affiliateData.value = data
        console.log(data)
      } else {
        affiliateData.value = undefined
      }
    }
  } catch (e) {
    popupStore.toastError({ message: (e as Error).message })
    console.error((e as Error).message)
  } finally {
    isLoading.value = false
  }
}

const getDepositAffiliate = async () => {
  try {
    isLoading.value = true
    const { status, message } = await useDepositAffiliate()
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

onMounted(() => {
  getCredit()
})
</script>
