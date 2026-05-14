<template>
  <div v-if="isVisibleItem" class="flex flex-col">
    <div
      class="group relative bg-gray-900 rounded-lg cursor-pointer transition-all duration-200"
      :class="[[!isProvider && 'hover:scale-105']]"
    >
      <div
        class="relative"
        :class="[isProvider && 'aspect-square overflow-hidden rounded-lg']"
      >
        <!-- <div
          v-if="item.rtp"
          class="absolute right-0 w-full flex justify-end bg-gray-800 bg-opacity-50 rounded-t-md px-2 py-[2px] z-10"
        >
          <UIcon
            name="i-heroicons-fire-16-solid"
            class="w-4 h-4 mr-1"
            :class="winRate.color"
          />
          <p class="text-[8px] sm:text-[10px] text-gray-100 dark:text-gray-100">
            {{ winRate.text }}
            <span class="font-extralight">{{ percentage }}%</span> RTP
          </p>
        </div> -->
        <div
          v-if="!isProvider && item.online && item.online > 5000"
          class="absolute left-1 md:left-2 top-2 z-10"
        >
          <NuxtImg class="w-10" src="/assets/images/game-hot.webp" />
        </div>
        <div
          v-if="!isProvider"
          class="absolute right-1 top-1 z-10 w-7 h-7 md:w-9 md:h-9 bg-black rounded-full flex items-center justify-center bg-opacity-60"
        >
          <UIcon
            :name="favoriteIcon"
            class="w-5 h-5 md:w-7 md:h-7 dark:bg-white cursor-pointer"
            @click="toggleFavorite(item)"
          />
        </div>
        <NuxtImg
          v-if="isProvider"
          src="assets/images/game-border.webp"
          class="pointer-events-none absolute inset-0 z-10 w-full h-full rounded-lg object-fill group-hover:brightness-125"
        />
        <NuxtImg
          :class="[
            isProvider
              ? 'h-full rounded-lg object-cover p-1 md:p-2 lg:p-[0.6rem]'
              : 'min-h-20 rounded-t-md object-cover',
          ]"
          class="w-full group-hover:brightness-75"
          :src="gameImage"
        />
      </div>
      <div
        class="w-full h-full text-gray-300 dark:text-gray-300 absolute top-0 hidden group-hover:flex justify-center items-center"
      >
        <div
          class="w-20 h-20 sm:w-24 sm:h-24 lg:w-20 lg:h-20 bg-gray-900 bg-opacity-60 hover:bg-opacity-90 rounded-full flex items-center justify-center"
          @click="gameSelected()"
        >
          <UIcon
            name="i-heroicons-play-solid"
            class="w-16 h-16 sm:w-16 sm:h-16 lg:w-12 lg:h-12 opacity-50 hover:opacity-90"
          />
        </div>
      </div>
    </div>
    <div
      class="w-full flex items-center justify-between h-6 bg-gray-800 bg-opacity-70 rounded-b-md"
    >
      <p
        class="text-xs sm:text-sm text-gray-100 dark:text-gray-100 truncate px-2"
      >
        {{ gameName }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { GamesList } from '~/models/games.model'

const { t } = useI18n()
const route = useRoute()
const router = useRouter()
const authStore = useAuthStore()
const gameStore = useGameStore()
const popupStore = usePopupStore()
const navStore = useNavStore()

const props = defineProps({
  index: Number,
  item: {
    type: Object as PropType<GamesList>,
    required: true,
  },
  isProvider: { type: Boolean, default: false },
})

const gameName = computed(() => props.item.gameName || props.item.productName)

const isVisibleItem = computed(() => {
  if (!props.item.active) return false

  if (props.isProvider) {
    return !gameStore.providerBlackList.includes(props.item.productCode)
  }

  return !gameStore.gameSlotBlackList.includes(gameName.value)
})

const gameImage = computed(() => {
  if (props.isProvider) {
    if (props.item.productCode === 'T24S' || props.item.productCode === 'NFK')
      return props.item.logo.askmepage
    return (
      props.item.logo.default ||
      props.item.logo.mobile ||
      props.item.logo.transparent
    )
  } else if (props.item.type === 'LOTTERY') {
    return props.item.logo.default || props.item.logo.banner
  } else {
    return props.item.logo.vertical
  }
})

const percentage = computed(() => {
  if (!props.item.rtp) return '00.00'
  return (props.item.rtp + 6).toFixed(2)
})

const winRate = computed(() => {
  if (!props.item.rtp) return { text: 'Megawin', color: 'text-green-500' }
  if (props.item.rtp < 88) return { text: 'Megawin', color: 'text-green-500' }
  if (props.item.rtp >= 88 && props.item.rtp < 96)
    return { text: 'Superwin', color: 'text-blue-500' }
  return { text: 'Bigwin', color: 'text-red-500' }
})

const favoriteIcon = computed(() => {
  if (route.params.id === 'favorites') return 'i-heroicons-heart-solid'
  const icon = props.item.isFavorite
    ? 'i-heroicons-heart-solid'
    : 'i-heroicons-heart'
  return icon
})

const toggleFavorite = (item: GamesList) => {
  if (authStore.isAuthenticated) {
    if (item.isFavorite) {
      popupStore.alertConfirm({
        message: t('remove_from_favorite'),
        preventClose: true,
        onConfirm: () => {
          props.item.isFavorite = false
          gameStore.deleteGameFavorite(item.loginCode!)
        },
      })
    } else {
      props.item.isFavorite = true
      gameStore.addGameFavorite(item.loginCode!)
    }
  } else {
    popupStore.openModalLogin()
  }
}

const gameSelected = () => {
  if (props.isProvider) {
    const { type, productCode } = props.item
    const typeLowerCase = type!.toLowerCase()
    const path = navStore.mutationPath.find((item) =>
      Object.keys(item).some((key) => key === typeLowerCase),
    )
    const navigate = path ? Object.values(path)[0] : typeLowerCase
    router.push(`/${navigate}/${productCode}`)
  } else {
    if (authStore.isAuthenticated) {
      const { type, productCode, loginCode } = props.item
      const baseURL = window.location.origin
      const features =
        'toolbar=no,scrollbars=yes,resizable=yes,width=' +
        screen.width +
        ',height=' +
        screen.height
      window.open(
        `${baseURL}/redirect?type=${type}&product=${productCode}&gameID=${loginCode}&isMobile=true`,
        '_blank',
        features,
      )
    } else {
      popupStore.openModalLogin()
    }
  }
}
</script>
