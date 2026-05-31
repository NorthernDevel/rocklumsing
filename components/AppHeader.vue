<template>
  <header
    class="w-full py-2 lg:px-0 transition-all duration-500 ease-in-out z-20"
    :class="{
      'fixed top-0 left-0 right-0': isChangeClass,
      relative: !isChangeClass,
    }"
  >
    <div
      class="absolute bottom-0 left-0 h-[1px] w-full bg-gradient-to-r from-transparent via-sky-200/70 to-transparent"
    ></div>
    <div
      class="absolute bottom-0 left-0 h-[1px] w-full bg-gradient-to-r from-red-950 via-blue-500/70 to-red-950"
    ></div>
    <div
      v-if="isChangeClass"
      class="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_18%_0%,rgba(240,20,24,0.22)_0%,transparent_42%),radial-gradient(ellipse_at_84%_0%,rgba(0,108,255,0.24)_0%,transparent_46%),linear-gradient(180deg,rgba(11,11,18,0.96),rgba(5,5,7,0.96))] shadow-[inset_0_1px_0_rgba(240,240,240,0.14),inset_0_-10px_26px_rgba(0,108,255,0.14)] backdrop-blur-sm"
    ></div>
    <div class="container mx-auto flex justify-between items-center">
      <div class="flex gap-2">
        <div>
          <AppSlideMenu v-model="popupStore.isOpenSlideMenu" />
          <UIcon
            name="i-heroicons-bars-3-bottom-left-20-solid"
            class="h-10 w-10 cursor-pointer text-sky-100 drop-shadow-[0_0_10px_rgba(0,108,255,0.45)]"
            @click="popupStore.openSlideMenu"
          />
        </div>

        <div class="flex flex-col">
          <NuxtLink to="/">
            <NuxtImg
              src="/assets/images/logo.webp"
              alt="logo"
              class="w-28 sm:w-32"
            />
          </NuxtLink>
        </div>
      </div>
      <div class="w-2/4 ml-4 hidden lg:inline">
        <AppHorizontalNav />
      </div>

      <div class="grow flex items-center justify-end">
        <div v-if="authStore.isAuthenticated">
          <div
            v-if="profileStore.userData"
            class="flex items-center justify-end"
          >
            <div class="flex flex-col items-end gap-1 sm:gap-0">
              <div class="flex items-center">
                <UIcon
                  name="i-heroicons-user-16-solid"
                  class="w-4 h-4 mr-1 text-sky-300"
                />
                <UDropdown
                  :items="navStore.menuHeaderDropdown"
                  :ui="{ item: { disabled: 'cursor-text select-text' } }"
                  :popper="{ placement: 'bottom-end' }"
                >
                  <span class="text-sky-100 text-sm">{{
                    profileStore.userData.username
                  }}</span>
                  <UIcon
                    name="i-heroicons-chevron-down-16-solid"
                    class="w-4 h-4 ml-1 text-sky-300"
                  />

                  <template #item="{ item }">
                    <span class="truncate text-base">{{ $t(item.label) }}</span>
                    <UIcon
                      :name="item.icon"
                      class="flex-shrink-0 h-6 w-6 text-red-400 ms-auto"
                    />
                  </template>
                </UDropdown>
              </div>
              <div class="flex gap-2">
                <div
                  v-if="profileStore.diamond.value !== '0'"
                  class="theme-panel hidden sm:flex h-7 items-center relative rounded-full pl-1 pr-3"
                >
                  <NuxtImg
                    src="/assets/images/diamond.svg"
                    alt="logo"
                    class="w-7"
                  />
                  <span class="text-sky-200 sm:text-lg font-semibold">{{
                    profileStore.diamond
                  }}</span>
                </div>
                <div
                  class="theme-panel h-7 flex items-center relative rounded-full pl-6 pr-3"
                >
                  <NuxtImg
                    src="/assets/images/coin.webp"
                    alt="logo"
                    class="w-7 absolute -left-2"
                  />
                  <span
                    class="theme-title sm:text-lg font-semibold"
                    >{{ profileStore.balance }}</span
                  >
                  <UButton
                    :ui="{
                      color: {
                        white: {
                          ghost: 'text-sky-200 dark:text-sky-200 bg-transparent',
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
                <UButton
                  class="theme-primary-btn hidden sm:inline-block w-18 h-7 justify-center text-sm"
                  @click="popupStore.openModalProfile('cashier')"
                  >{{ $t('menu_cashier') }}</UButton
                >
              </div>
            </div>
          </div>
          <div v-else>
            <div class="flex flex-col items-end space-y-1">
              <USkeleton
                class="h-4 w-32 rounded-full bg-neutral-800"
              />
              <USkeleton
                class="h-6 w-28 rounded-full bg-neutral-800"
              />
            </div>
          </div>
        </div>

        <div v-else class="flex items-center justify-end space-x-2">
          <UButton
            icon="i-heroicons-arrow-right-end-on-rectangle"
            class="theme-primary-btn w-36 h-10 justify-center text-lg"
            @click="popupStore.openModalLogin"
            >{{ $t('sign_in') }}</UButton
          >
        </div>
        <UDropdown
          v-if="resourceStore.isShowToggleLanguage"
          :items="langStore.langItems"
          :ui="{ item: { disabled: 'cursor-text select-text' } }"
          :popper="{ placement: 'bottom-end' }"
          class="inline-flex"
        >
          <NuxtImg :src="langFlagIcon" alt="flag" class="w-8 md:w-10 mx-2" />

          <template #item="{ item }">
            <NuxtImg
              :src="item.avatar.src"
              alt="flag"
              class="w-8 md:w-10 mx-2"
            />
            <span class="truncate text-base">{{ item.label }}</span>
          </template>
        </UDropdown>
      </div>
    </div>
  </header>
  <div v-if="!authStore.isAuthenticated">
    <AppModalLogin v-model="popupStore.isOpenModalLogin" />
    <AppModalRegister v-model="popupStore.isOpenModalRegister" />
    <AppModalForgotPassword v-model="popupStore.isOpenModalForgotPassword" />
    <AppPopupNotLogin v-model="popupStore.isOpenPopupNotLogin" />
  </div>
  <div v-else>
    <AppModalProfile v-model="popupStore.isOpenModalProfile" />
    <AppModalPrediction v-model="popupStore.isOpenModalPrediction" />
    <AppPopupLoggedIn v-model="popupStore.isOpenPopupLoggedIn" />
  </div>
  <AppModalContact v-model="popupStore.isOpenModalContact" />
</template>

<script setup lang="ts">
const resourceStore = useResourceStore()
const langStore = useLanguageStore()
const authStore = useAuthStore()
const profileStore = useProfileStore()
const popupStore = usePopupStore()
const navStore = useNavStore()

const scrollPosition = ref(0)
const isChangeClass = ref(false)
const handleScroll = () => {
  scrollPosition.value = window.scrollY
  isChangeClass.value = scrollPosition.value > 50
}

const langFlagIcon = computed(() => {
  if (!langStore.currentLang) return '/assets/images/flag/th.png'
  return '/assets/images/flag/' + langStore.currentLang + '.png'
})

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>
