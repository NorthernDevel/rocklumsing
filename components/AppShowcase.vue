<template>
  <div class="border-y border-red-950/40 bg-gradient-to-b from-neutral-950 via-black to-neutral-900">
    <div class="container mx-auto">
      <div class="grid grid-cols-2 lg:grid-cols-3 gab-4">
        <div v-for="item in status" class="flex my-3 mx-2">
          <NuxtImg
            :src="'/assets/images/icons/' + item.img + '.webp'"
            alt="aaa"
            class="w-20 object-contain"
          />
          <div class="flex flex-col justify-center">
            <h2 class="theme-title text-[16px] font-semibold">
              {{ $t(item.title) }}
            </h2>
            <p class="hidden md:inline text-amber-100/70">
              {{ $t(item.description) }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const status = [
  {
    img: 'ic-status-wallet',
    title: 'showcase_smartwallet',
    description: 'showcase_smartwallet_detail',
  },
  {
    img: 'ic-status-rank',
    title: 'showcase_number1',
    description: 'showcase_number1_detail',
  },
  {
    img: 'ic-status-change',
    title: 'showcase_fast_dw',
    description: 'showcase_fast_dw_detail',
  },
  {
    img: 'ic-status-eveywhere',
    title: 'showcase_playany',
    description: 'showcase_playany_detail',
  },
  {
    img: 'ic-status-support',
    title: 'showcase_service',
    description: 'showcase_service_detail',
  },
  {
    img: 'ic-status-promotion',
    title: 'showcase_offer',
    description: 'showcase_offer_detail',
  },
]
</script>
