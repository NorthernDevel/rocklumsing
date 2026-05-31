<template>
  <UHorizontalNavigation
    :links="navStore.menuHeader"
    :ui="{
      active:
        'text-white dark:text-white after:bg-gradient-to-r after:from-red-500 after:via-sky-300 after:to-blue-500 after:rounded-full after:shadow-[0_0_12px_rgba(0,108,255,0.65)]',
      before:
        'hover:before:bg-sky-300 hover:before:bg-opacity-10 dark:hover:before:bg-sky-300 dark:hover:before:bg-opacity-10',
      avatar: {
        base: 'flex-shrink-0',
        size: 'sm',
      },
    }"
  >
    <template #default="{ link }">
      <span
        class="text-base text-sky-50 group-hover:text-white active:text-white relative group-hover:drop-shadow-[0_0_8px_rgba(56,199,255,0.5)]"
        >{{ $t(link.label) }}</span
      >
    </template>
  </UHorizontalNavigation>
</template>

<script lang="ts" setup>
const navStore = useNavStore()
</script>
