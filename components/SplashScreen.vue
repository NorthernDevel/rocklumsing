<template>
  <div
    v-if="isLoading"
    class="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden bg-black before:absolute before:inset-0 before:bg-[radial-gradient(ellipse_at_center,rgba(185,28,28,0.34)_0%,rgba(15,15,18,1)_42%,rgba(0,0,0,1)_100%)]"
  >
    <div
      class="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-amber-400 to-transparent"
    ></div>
    <div
      class="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-red-800 to-transparent"
    ></div>
    <div
      class="absolute left-1/2 top-1/2 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-red-700/15 blur-3xl"
    ></div>
    <div class="relative flex w-72 flex-col items-center">
      <div
        class="absolute -inset-10 animate-pulse rounded-full border border-red-600/20 shadow-[0_0_48px_rgba(185,28,28,0.35)]"
      ></div>
      <div
        class="absolute -inset-6 animate-spin rounded-full border-t border-amber-300/70"
      ></div>
      <div
        class="absolute -inset-3 rounded-full border-b border-red-500/60"
      ></div>
      <NuxtImg
        src="/assets/images/logo.webp"
        alt="splash screen"
        class="relative w-full drop-shadow-[0_0_28px_rgba(220,38,38,0.5)]"
      />
      <div class="mt-6 w-full rounded-full border border-red-900/50 bg-black/50 p-1">
        <UProgress
          animation="carousel"
          color="red"
          class="h-2"
        />
      </div>
      <p class="mt-3 bg-gradient-to-b from-white via-amber-400 to-amber-600 bg-clip-text text-xs font-semibold tracking-[0.35em] text-transparent">
        LOADING
      </p>
    </div>
  </div>
</template>

<script lang="ts" setup>
const isLoading = ref(true)

onMounted(() => {
  setTimeout(() => {
    isLoading.value = false
  }, 1000) // Adjust the time based on how long you want the splash screen to show
})
</script>
