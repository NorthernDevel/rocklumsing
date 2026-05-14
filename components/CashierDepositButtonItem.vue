<template>
  <div
    :class="[isActive(item.to) ? tabActiveColor : '', size]"
    class="relative p-1 sm:p-2 flex flex-col flex-nowrap items-center justify-center space-y-1 lg:space-x-1 menu-btn-inactive"
  >
    <div
      v-if="props.item.recommend"
      class="absolute top-1 right-1 sm:right-4 animate-blinkGlowRed border border-red-700 rounded-full px-2"
    >
      <p class="text-xs text-white">{{ props.item.recommend_label }}</p>
    </div>
    <NuxtImg
      :src="item.image"
      :alt="item.name"
      :class="[isActive(item.to) && 'animate-mini-bounce']"
      class="w-8 h-8 object-contain"
      loading="lazy"
    />
    <p
      :class="[isActive(item.to) && '!text-gray-50']"
      class="text-center lg:text-left text-xs md:text-sm text-gray-300"
    >
      {{ $t(item.label) }}
    </p>
  </div>
</template>

<script lang="ts" setup>
const cashierStore = useCashierStore()

type Item = {
  name: string
  label: string
  image: string
  to: string
  recommend: boolean
  recommend_label: string
}

const props = defineProps({
  item: {
    type: Object as PropType<Item>,
    required: true,
  },
  size: {
    type: String,
    default: 'w-44 sm:w-60 h-14 sm:h-16',
  },
})

const tabActiveColor = computed(() => 'menu-btn-active')

const isActive = (to: string) => {
  return cashierStore.idSelect == to
}
</script>
