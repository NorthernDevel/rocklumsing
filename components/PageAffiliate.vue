<template>
  <div>
    <div class="flex flex-col items-center justify-center mb-5">
      <h3 class="theme-title mb-4 text-2xl font-semibold">
        {{ $t('menu_affiliate') }}
      </h3>
      <div
        class="theme-panel w-full p-4 mb-8"
      >
        <AppFormGroup :label="$t('share_affiliate')" name="linkAffiliate">
          <UInput
            icon="i-heroicons-link"
            :type="'text'"
            class="grow leading-6"
            :ui="{
              base: 'text-gray-100 placeholder:text-gray-500',
              color: {
                white: {
                  outline:
                    'bg-black/50 border-red-900/60 text-gray-100 ring-red-900/60 focus:ring-red-500 focus:border-amber-300',
                },
              },
            }"
            v-model="affiliateLink"
            readonly
          />
        </AppFormGroup>
        <div class="text-amber-300 text-center my-4 text-xs">
          <span class="text-amber-100/80"
            >{{ $t('signup_referral') }} &nbsp; : &nbsp; </span
          >{{ affiliate_total }}
        </div>
        <UButton
          icon="i-heroicons-document-duplicate"
          @click="copyToClipboard(affiliateLink)"
          class="theme-primary-btn w-full h-12 justify-center text-lg mt-1"
          >{{ $t('copy') }}
        </UButton>
      </div>

      <div class="border-t border-red-900/50 w-full py-5 pt-8">
        <UTabs v-model="activeTab" :items="tabList" class="w-full">
          <template #icon="{ item, selected }">
            <UIcon
              :name="item.icon"
              class="w-4 h-4 flex-shrink-0 mr-2 hidden sm:inline-block"
              :class="[selected && 'text-amber-500 dark:text-amber-300']"
            />
          </template>
        </UTabs>
        <AffiliateCredit v-if="activeTab === 0" v-on:active-tab="onActiveTab" />
        <MultipleTransaction
          :channel="TransactionChannel.AFFILIATE"
          v-if="activeTab === 1"
        />
      </div>

      <div class="mt-4 border-t border-red-900/50 w-full py-5">
        <AffiliateTransaction />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { TransactionChannel } from '~/models/transactions.model'
import type {
  RequestLinkAffiliate,
  RequestAffiliateChildById,
  AffiliateChildByIdData,
} from '~/models/affiliate.model'

const { t } = useI18n()
const popupStore = usePopupStore()
const profileStore = useProfileStore()
const { copyToClipboard } = useClipboard()

const isLoading = ref(false)
const affiliateLink = ref()
const users = ref<AffiliateChildByIdData[]>([])
const affiliate_total = ref<number>(0)
const activeTab = ref<number>(0)
const baseURL = ref(window.location.origin)
const tabList = [
  {
    name: 'receive',
    label: t('affiliate_menus_income'),
    icon: 'i-heroicons-banknotes',
  },
  {
    name: 'history',
    label: t('history_short'),
    icon: 'i-heroicons-clock',
  },
]

const getLinkAffiliate = async (body: RequestLinkAffiliate) => {
  try {
    isLoading.value = true
    const { status, message, data } = await useLinkAffiliate(body)
    if (!status) {
      popupStore.alertError({ message: message })
    } else {
      if (data) {
        const splitURL = data.link.split('?')
        affiliateLink.value = `${baseURL.value}?${splitURL[1]}`
      }
    }
  } catch (e) {
    popupStore.toastError({ message: (e as Error).message })
    console.error((e as Error).message)
  } finally {
    isLoading.value = false
  }
}

const getAffiliateChildById = async (body: RequestAffiliateChildById) => {
  try {
    isLoading.value = true

    const { status, message, data, total } = await AffiliateChildById(body)
    if (!status) {
      popupStore.alertError({ message: message })
    } else {
      affiliate_total.value = total ?? 0
      users.value = data ?? []
    }
  } catch (e) {
    popupStore.toastError({ message: (e as Error).message })
    console.error((e as Error).message)
  } finally {
    isLoading.value = false
  }
}

const onActiveTab = (tab: number) => (activeTab.value = tab)

onMounted(() => {
  getLinkAffiliate({ url: `${baseURL.value}` })
  if (profileStore.userData)
    getAffiliateChildById({
      username: profileStore.userData.username,
      page: 1,
      size: 50,
    })
})
</script>
