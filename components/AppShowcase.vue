<template>
  <div class="border-y border-blue-950/50 bg-[radial-gradient(ellipse_at_18%_0%,rgba(240,20,24,0.18)_0%,transparent_36%),radial-gradient(ellipse_at_82%_0%,rgba(0,108,255,0.2)_0%,transparent_38%),linear-gradient(180deg,#050507,#000,#0b0b12)]">
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
            <p class="hidden md:inline text-sky-100/70">
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
