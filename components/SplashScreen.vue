<template>
  <div
    v-if="isLoading"
    class="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden bg-black before:absolute before:inset-0 before:bg-[radial-gradient(ellipse_at_18%_40%,rgba(240,20,24,0.32)_0%,transparent_38%),radial-gradient(ellipse_at_82%_40%,rgba(0,108,255,0.34)_0%,transparent_40%),linear-gradient(180deg,rgba(5,5,7,1),rgba(0,0,0,1))]"
  >
    <div
      class="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-sky-300 to-transparent"
    ></div>
    <div
      class="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-red-950 via-blue-600 to-red-950"
    ></div>
    <div
      class="absolute left-1/2 top-1/2 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-700/15 blur-3xl"
    ></div>
    <div class="relative flex w-72 flex-col items-center">
      <div
        class="absolute -inset-10 animate-pulse rounded-full border border-blue-500/20 shadow-[0_0_48px_rgba(0,108,255,0.35)]"
      ></div>
      <div
        class="absolute -inset-6 animate-spin rounded-full border-t border-sky-300/70"
      ></div>
      <div
        class="absolute -inset-3 rounded-full border-b border-red-500/60"
      ></div>
      <NuxtImg
        src="/assets/images/logo.webp"
        alt="splash screen"
        class="relative w-full drop-shadow-[0_0_28px_rgba(0,108,255,0.5)]"
      />
      <div class="mt-6 w-full rounded-full border border-blue-900/50 bg-black/50 p-1">
        <UProgress
          animation="carousel"
          color="blue"
          class="h-2"
        />
      </div>
      <p class="mt-3 bg-gradient-to-r from-white via-sky-300 to-red-500 bg-clip-text text-xs font-semibold tracking-[0.35em] text-transparent">
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
