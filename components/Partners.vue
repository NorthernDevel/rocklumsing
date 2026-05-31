<template>
  <div class="flex flex-col items-center border-y border-blue-700/70 bg-[radial-gradient(ellipse_at_18%_50%,rgba(240,20,24,0.42)_0%,transparent_42%),radial-gradient(ellipse_at_82%_50%,rgba(0,108,255,0.46)_0%,transparent_44%),linear-gradient(180deg,rgba(5,5,7,1),rgba(0,0,0,1))] py-6 shadow-[inset_0_1px_0_rgba(240,240,240,0.18),inset_0_-1px_0_rgba(56,199,255,0.16)]">
    <div class="container flex max-w-7xl flex-wrap items-center justify-center gap-x-7 gap-y-6 px-4">
      <div v-for="partner in partners" :key="partner" class="flex min-w-32 justify-center">
        <div>
          <NuxtImg
            :src="'/assets/images/partners/' + partner + '.png'"
            :alt="partner"
            class="w-32 sm:w-36 lg:w-40"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const partners = [
  'slot-logo-evo-play',
  'slot-logo-sp',
  'slot-logo-ps',
  'slot-logo-kingmaker',
  'slot-logo-joker',
  'slot-logo-habanero',
  'slot-logo-ameba',
  'slot-logo-cq9',
  'slot-logo-pg',
  'slot-logo-rich88',
  'slot-logo-goldy',
]
</script>
