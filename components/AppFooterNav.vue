<template>
  <div class="w-full sticky bottom-0 z-10 lg:hidden">
    <div
      class="pointer-events-none absolute inset-x-0 -top-8 h-16 bg-[radial-gradient(ellipse_at_center,rgba(220,38,38,0.45)_0%,rgba(127,29,29,0.2)_45%,transparent_75%)] blur-sm"
    ></div>
    <div class="flex items-end">
      <div
        class="theme-panel relative w-full h-[60px] flex items-end justify-center p-2 rounded-b-none shadow-[0_-10px_30px_rgba(185,28,28,0.28),inset_0_1px_0_rgba(255,235,170,0.16)] before:pointer-events-none before:absolute before:inset-x-0 before:top-0 before:z-0 before:h-full before:bg-[radial-gradient(ellipse_at_center,rgba(220,38,38,0.34)_0%,rgba(127,29,29,0.14)_45%,transparent_78%)] after:pointer-events-none after:absolute after:inset-x-8 after:top-0 after:z-0 after:h-px after:bg-gradient-to-r after:from-transparent after:via-red-400/70 after:to-transparent"
      >
        <div class="relative z-10 flex w-full items-end justify-center">
          <FooterMenuItem
            v-if="authStore.isAuthenticated"
            :item="navStore.menuFooter[0]"
          />
          <FooterMenuItem v-else :item="navStore.menuFooter[5]" />
          <FooterMenuItem
            v-if="authStore.isAuthenticated"
            :item="navStore.menuFooter[1]"
          />
          <FooterMenuItem v-else :item="navStore.menuFooter[6]" />
          <FooterMenuItem :item="navStore.menuFooter[2]" />
          <FooterMenuItem :item="navStore.menuFooter[3]" />
          <FooterMenuItem :item="navStore.menuFooter[4]" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const authStore = useAuthStore()
const navStore = useNavStore()
</script>
