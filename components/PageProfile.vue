<template>
  <div class="flex flex-col items-center justify-center">
    <h3 class="theme-title mb-4 text-2xl font-semibold">
      {{ $t('profile_full') }}
    </h3>

    <div
      v-if="user"
      class="theme-panel w-full flex justify-between rounded-full px-3 mb-4"
    >
      <div class="h-10 flex items-center">
        <NuxtImg src="/assets/images/coin.webp" alt="logo" class="w-10" />
        <span class="theme-title text-2xl font-semibold">
          {{ profileStore.balance }}
        </span>
        <UButton
          :ui="{
            color: {
              white: {
                ghost: 'text-amber-200 dark:text-amber-200 bg-transparent',
              },
            },
          }"
          icon="i-heroicons-arrow-path-16-solid"
          size="sm"
          color="white"
          variant="ghost"
          class="p-0 pl-1"
          @click="profileStore.getProfile()"
          :loading="profileStore.isLoading"
        />
      </div>
      <div class="flex h-10 items-center rounded-full pl-6">
        <NuxtImg src="/assets/images/diamond.svg" alt="logo" class="w-10" />
        <span class="text-amber-200 text-2xl font-semibold">{{
          profileStore.diamond
        }}</span>
      </div>
    </div>

    <div v-if="user" class="theme-panel w-full grid grid-cols-2 p-3 py-4">
      <div class="list-item-profile">
        <div class="profile-label">
          {{ $t('rank') }}
        </div>
        <div class="profile-value flex items-center">
          <NuxtImg
            :src="user.rank.imageRank"
            :alt="user.rank.rank"
            class="w-10"
          />
          {{ user.rank.rank }}
        </div>
      </div>
      <div class="list-item-profile">
        <div class="profile-label">
          {{ $t('username') }}
        </div>
        <div class="profile-value">
          {{ user.username }}
        </div>
      </div>
      <div class="list-item-profile">
        <div class="profile-label">
          {{ $t('profile_id') }}
        </div>
        <div class="profile-value">
          {{ user.usernameGameProfile }}
        </div>
      </div>
      <div class="list-item-profile">
        <div class="profile-label">
          {{ $t('phone') }}
        </div>
        <div class="profile-value">
          {{ user.phoneNo }}
        </div>
      </div>
      <div class="list-item-profile">
        <div class="profile-label">
          {{ $t('wallet_cash') }}
        </div>
        <div class="profile-value">
          {{ walletCash.currency }}
        </div>
      </div>
    </div>

    <section
      v-if="bankStore.isCustomerAccount && user"
      class="w-full text-center"
    >
      <h3 class="mt-6 mb-3">
        <UDivider
          :label="$t('bank_information')"
          :ui="{
            label: 'text-lg text-amber-300',
            border: { base: 'border-red-900/50' },
          }"
        />
      </h3>

      <div class="theme-panel w-full grid grid-cols-2 p-3 py-4">
        <div class="list-item-profile">
          <div class="profile-label">
            {{ $t('bank_name') }}
          </div>
          <div
            v-if="bankStore.userBank && bankStore.userBank.label"
            class="profile-value flex items-center"
          >
            <NuxtImg
              :src="bankStore.userBank.avatar"
              :alt="bankStore.userBank.label"
              class="w-6 mr-1"
            />
            {{ bankStore.userBank.label }}
          </div>
        </div>
        <div class="list-item-profile">
          <div class="profile-label">
            {{ $t('bank_account') }}
          </div>
          <div class="profile-value">
            {{ user.customerBankAccount }}
          </div>
        </div>
        <div class="list-item-profile">
          <div class="profile-label">
            {{ $t('bank_account_first_name') }}
          </div>
          <div class="profile-value">
            {{ user.firstName }}
          </div>
        </div>
        <div v-if="user.lastName" class="list-item-profile">
          <div class="profile-label">
            {{ $t('bank_account_last_name') }}
          </div>
          <div class="profile-value">
            {{ user.lastName }}
          </div>
        </div>
      </div>
    </section>

    <section
      v-if="bankStore.isCustomerAccount && user"
      class="w-full text-center"
    >
      <h3 class="mt-6 mb-3">
        <UDivider
          :label="$t('en_full_name_information')"
          :ui="{
            label: 'text-lg text-amber-300',
            border: { base: 'border-red-900/50' },
          }"
        />
      </h3>

      <div class="theme-panel w-full grid grid-cols-2 p-3 py-4">
        <div class="list-item-profile">
          <div class="profile-label">
            {{ $t('bank_account_name_en') }}
          </div>
          <div v-if="user.firstNameEn" class="profile-value">
            {{ user.firstNameEn }}
          </div>
          <div v-else>
            <UButton
              class="theme-primary-btn inline-block w-24 h-10 justify-center text-sm"
              @click="navStore.selectedMenu('update-information')"
              >{{ $t('btn_add') }}</UButton
            >
          </div>
        </div>
        <div class="list-item-profile">
          <div class="profile-label">
            {{ $t('bank_account_last_name-en') }}
          </div>
          <div v-if="user.lastName" class="profile-value">
            {{ user.lastNameEn }}
          </div>
        </div>
      </div>
    </section>

    <section
      v-if="bankStore.isCustomerAccount && user"
      class="w-full text-center"
    >
      <h3 class="mt-6 mb-3">
        <UDivider
          :label="$t('prompt_pay_information')"
          :ui="{
            label: 'text-lg text-amber-300',
            border: { base: 'border-red-900/50' },
          }"
        />
      </h3>

      <div class="theme-panel w-full grid grid-cols-2 p-3 py-4">
        <div class="list-item-profile">
          <div class="profile-label">
            {{ $t('prompt_pay') }}
          </div>
          <div v-if="user.promptpayNo" class="profile-value">
            {{ user.promptpayNo }}
          </div>
          <div v-else>
            <UButton
              class="theme-primary-btn inline-block w-24 h-10 justify-center text-sm"
              @click="navStore.selectedMenu('update-prompt-pay')"
              >{{ $t('btn_add') }}</UButton
            >
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script lang="ts" setup>
const { useCurrency } = useFormatter()
const profileStore = useProfileStore()
const bankStore = useBankStore()
const navStore = useNavStore()
const popupStore = usePopupStore()

const isLoading = ref(false)
const user = ref(profileStore.userData)

const getProfile = async () => {
  try {
    isLoading.value = true
    const { status, data, message } = await useProfile()
    if (!status) return
    if (data) {
      user.value = data
    }
  } catch (e) {
    popupStore.toastError({ message: (e as Error).message })
    console.error((e as Error).message)
  } finally {
    isLoading.value = false
  }
}

const walletCash = computed(() =>
  useCurrency(user.value ? user.value.walletCash : 0),
)

onMounted(() => getProfile())
</script>

<style scoped>
.list-item-profile {
  @apply col-span-2 flex items-center justify-between gap-3 border-b border-dashed border-red-900/40 py-2;
}

.profile-label {
  @apply flex items-center text-sm text-amber-200/80;
}

.profile-value {
  @apply text-right font-medium text-gray-50;
}
</style>
