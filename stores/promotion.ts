import { defineStore } from 'pinia'

export const usePromotionStore = defineStore('promotionStore', () => {
  const { t } = useI18n()
  const { getItem } = useCustomLocalStorage()
  const popupStore = usePopupStore()
  const authStore = useAuthStore()
  const profileStore = useProfileStore()
  const resourceStore = useResourceStore()

  // const promotions = ref<PromotionData[]>([])

  const isDisabledAutoPromotions = () => {
    // NOTE: Disabled receive promotions.
    setTimeout(() => {
      if (authStore.isAuthenticated && profileStore.userId) {
        const userKey = getItem(`user-key-${profileStore.userId}`)
        if (!userKey && !profileStore.isAutoPromotion) {
          popupStore.alertConfirm({
            title: t('have_disabled_bouns'),
            message: t('do_you_you_want_config_bonus'),
            preventClose: true,
            doNotShow: true,
            onConfirm: () => popupStore.openModalProfile('config-promotion'),
            onCancel: () => resourceStore.showPopupLoggedIn(),
          })
        } else {
          resourceStore.showPopupLoggedIn()
        }
      }
    }, 1000)
  }

  return { isDisabledAutoPromotions }
})
