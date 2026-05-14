<template>
  <div class="flex flex-col items-center border-y border-red-700/70 bg-[radial-gradient(ellipse_at_center,rgba(220,38,38,0.58)_0%,rgba(127,29,29,0.58)_38%,rgba(20,0,0,0.98)_72%,rgba(0,0,0,1)_100%)] py-6 shadow-[inset_0_1px_0_rgba(255,235,170,0.18),inset_0_-1px_0_rgba(255,235,170,0.12)]">
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
