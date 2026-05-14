import type { ServiceAskmepayData } from '~/models/service-ask.model'

// stores/cashier.ts
export const useCashierStore = defineStore('CashierStore', () => {
  const { t } = useI18n()
  const popupStore = usePopupStore()
  const loaderStore = useLoaderStore()

  const defaultTitle = t('menu_cashier')
  const title = ref(defaultTitle)
  const activeTab = ref<number>(0)
  const tabList = [
    {
      name: 'withdraw',
      label: t('withdraw'),
      icon: 'i-heroicons-arrow-up-on-square',
    },
    {
      name: 'deposit',
      label: t('deposit'),
      icon: 'i-heroicons-arrow-down-on-square',
    },
    {
      name: 'history',
      label: t('history_short'),
      icon: 'i-heroicons-clock',
    },
  ]
  const activeTabHistory = ref<number>(0)
  const tabListHistory = [
    {
      name: 'deposit',
      label: t('history_deposit'),
    },
    {
      name: 'withdraw',
      label: t('history_withdraw'),
    },
  ]
  const depositMenu = [
    {
      name: 'deposit_auto_slip',
      label: 'ธนาคาร (แบนสลิป)',
      image: 'assets/images/icons/ic-3d-upload-slip.webp',
      to: 'AUTO_SLIP',
      recommend: false,
      recommend_label: 'ยอดนิยม',
    },
    {
      name: 'deposit_auto',
      label: 'ฝากธนาคาร',
      image: 'assets/images/icons/ic-3d-bank.webp',
      to: 'AUTO',
      recommend: false,
      recommend_label: 'ยอดนิยม',
    },
    {
      name: 'deposit_auto_peer',
      label: 'deposit_auto_peer',
      image: 'assets/images/icons/ic-3d-peer.webp',
      to: 'AUTO_PEER',
      recommend: false,
      recommend_label: 'ยอดนิยม',
    },
    {
      name: 'deposit_qrcode',
      label: 'ฝากผ่าน THPAY',
      image: 'assets/images/icons/ic-3d-pay.webp',
      to: 'THPAY',
      recommend: false,
      recommend_label: 'แนะนำ',
    },
    {
      name: 'deposit_truemoney',
      label: 'deposit_truemoney',
      image: 'assets/images/icons/ic-true-money.webp',
      to: 'TRUEWALLET',
      recommend: false,
      recommend_label: 'ยอดนิยม',
    },
    {
      name: 'deposit_decimal',
      label: 'deposit_decimal',
      image: 'assets/images/icons/ic-3d-decimal.webp',
      to: 'DECIMAL',
      recommend: false,
      recommend_label: 'ยอดนิยม',
    },
  ]
  const isSelectedChannel = ref(false)
  const idSelect = ref()
  const p2cRef = ref('')
  const askmepayData = ref<ServiceAskmepayData>()

  const askmepaySerivce = computed(() => {
    if (!askmepayData.value) return undefined
    if (!askmepayData.value.record) return undefined
    if (!askmepayData.value.record.length) return undefined
    if (!askmepayData.value.record[0].services.length) return undefined
    return askmepayData.value.record[0].services[0]
  })

  const askmepayIsDepositChannel = computed(() => {
    if (!askmepayData.value) return false
    if (!askmepayData.value.record) return false
    if (!askmepayData.value.record.length) return false
    return askmepayData.value.record[0].isDepositChannel
  })

  const askmepayMinMaxDeposit = computed(() => {
    if (!askmepayData.value) return { minimum: 0, maximum: 0 }
    if (!askmepayData.value.record) return { minimum: 0, maximum: 0 }
    if (!askmepayData.value.record.length) return { minimum: 0, maximum: 0 }
    if (!askmepayData.value.record[0].services.length)
      return { minimum: 0, maximum: 0 }
    const { minimumDeposit, maximumDeposit } =
      askmepayData.value.record[0].services[0]
    return { minimum: minimumDeposit, maximum: maximumDeposit }
  })

  const previousPage = () => {
    title.value = defaultTitle
    isSelectedChannel.value = false
    idSelect.value = undefined
  }

  const goDepositHistory = () => {
    isSelectedChannel.value = false
    idSelect.value = undefined
    activeTab.value = 2
    activeTabHistory.value = 0
  }

  const openWithdrawFromPage = () => {
    popupStore.openModalProfile('cashier')
    activeTab.value = 1
  }

  const clear = () => {
    title.value = defaultTitle
    activeTab.value = 0
    activeTabHistory.value = 0
    isSelectedChannel.value = false
    idSelect.value = undefined
  }

  const getP2cDepositPending = async () => {
    try {
      loaderStore.start()
      const { status, code, message } = await useP2cDepositPending()
      if (!status) {
        if (code === '60002') {
          popupStore.alertP2cWarning({
            message: t('auto_peer_previous_message'),
            preventClose: true,
            onConfirm: () => {
              idSelect.value = 'AUTO_PEER'
            },
            onCancel: () => p2cCancelTransfer(),
          })
        } else if (code === '60005' || code === '60004' || code === '88004') {
        } else {
          popupStore.alertError({ message: message })
        }
      }
    } catch (e) {
      popupStore.toastError({ message: (e as Error).message })
      console.error((e as Error).message)
    } finally {
      loaderStore.stop()
    }
  }

  const p2cCancelTransfer = async (ref?: string) => {
    try {
      const cancelRef = [ref || p2cRef.value]
      const { status, code, message } = await useP2cCancelTransfer(cancelRef)
      if (!status) {
        popupStore.alertError({
          message: message,
          preventClose: true,
          onCancel: () => {
            idSelect.value = 'AUTO_PEER'
          },
        })
      } else {
        popupStore.alertSuccess({
          title: message,
          message: 'ยกเลิกรายการสำเร็จ',
        })
      }
    } catch (e) {
      popupStore.toastError({ message: (e as Error).message })
      console.error((e as Error).message)
    }
  }

  return {
    title,
    activeTab,
    tabList,
    activeTabHistory,
    tabListHistory,
    isSelectedChannel,
    idSelect,
    askmepayData,
    askmepaySerivce,
    askmepayIsDepositChannel,
    askmepayMinMaxDeposit,
    depositMenu,
    p2cRef,
    previousPage,
    goDepositHistory,
    openWithdrawFromPage,
    clear,
    getP2cDepositPending,
    p2cCancelTransfer,
  }
})
