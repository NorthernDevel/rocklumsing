<template>
  <div
    v-if="isLoading"
    :class="[isProvider && '!grid-cols-2 sm:!grid-cols-4 lg:!grid-cols-7 xl:!grid-cols-9']"
    class="grid grid-cols-2 sm:grid-cols-5 lg:grid-cols-7 gap-3 md:gap-4"
  >
    <USkeleton class="w-full h-20 sm:h-28 md:h-32 lg:36" v-for="item in 14" />
  </div>

  <transition
    v-if="!isLoading && visibleGames.length"
    enter-active-class="transition-opacity duration-300"
    enter-from-class="opacity-0"
    enter-to-class="opacity-100"
    leave-active-class="transition-opacity duration-300"
    leave-from-class="opacity-100"
    leave-to-class="opacity-0"
  >
    <div
      :class="[[isProvider && '!grid-cols-2 sm:!grid-cols-4 lg:!grid-cols-7 xl:!grid-cols-9']]"
      class="grid grid-cols-2 sm:grid-cols-5 lg:grid-cols-7 xl:grid-cols-9 gap-3 md:gap-4"
    >
      <AppGameListItem
        v-for="item in visibleGames"
        :key="item.loginCode || item.productCode"
        :item="item"
        :is-provider="isProvider"
      />
    </div>
  </transition>

  <div
    v-if="!isLoading && !visibleGames.length"
    class="theme-panel flex min-h-32 w-full items-center justify-center text-amber-100"
  >
    <div class="flex items-center gap-2">
      <UIcon
        name="i-heroicons-circle-stack-solid"
        class="h-5 w-5 text-amber-300"
      />
      <p class="text-sm sm:text-base">ไม่พบข้อมูล</p>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { GamesList } from '~/models/games.model'

const props = defineProps({
  isLoading: Boolean,
  gamesList: Array as PropType<GamesList[]>,
  isProvider: { type: Boolean, default: false },
  isCollapse: { type: Boolean, default: false },
})

const visibleGames = computed(() => {
  if (!props.isCollapse) return (props.gamesList || []).filter(Boolean)
  return []
})
</script>
