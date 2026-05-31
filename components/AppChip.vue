<template>
  <UChip
    :ui="{
      base: 'ring-0 text-white',
      background: 'bg-gradient-to-r from-red-600 to-blue-600 dark:from-red-600 dark:to-blue-600 shadow-[0_0_10px_rgba(0,108,255,0.45)]',
      default: { color: 'blue' },
    }"
    :size="size"
    class="absolute top-3 right-3 !text-amber-100 [&_*]:!text-amber-100"
  >
    <slot />
  </UChip>
</template>

<script lang="ts" setup>
type ChipSize = 'xs' | 'sm' | '2xs' | 'md' | 'lg' | 'xl' | '2xl' | '3xs' | '3xl'

defineProps({
  size: {
    type: String as PropType<ChipSize>,
    default: 'xs',
  },
})
</script>
