<template>
  <div
    v-if="resourceStore.announcement.isActive"
    class="relative h-10 overflow-hidden border-y border-red-950/50 bg-gradient-to-r from-black via-neutral-900 to-black"
  >
    <div
      class="absolute inset-y-0 left-0 z-10 flex items-center bg-gradient-to-r from-black via-black/90 to-transparent pl-3 pr-8"
    >
      <UIcon
        name="i-heroicons-megaphone-20-solid"
        class="w-5 h-5 text-red-400"
      />
    </div>
    <div class="inline-block whitespace-nowrap overflow-hidden py-2 pl-12">
      <div
        class="inline-block animate-scroll-left font-light text-white"
      >
        {{ annoucement }}
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const resourceStore = useResourceStore()
const langStore = useLanguageStore()

const annoucement = computed(() => {
  if (resourceStore.announcement) {
    const { en, th } = resourceStore.announcement.display
    if (langStore.currentLang === 'en') return en
    return th
  }
})
</script>
