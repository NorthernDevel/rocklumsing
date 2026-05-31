<template>
  <div class="w-full sticky bottom-0 z-10 lg:hidden">
    <div
      class="pointer-events-none absolute inset-x-0 -top-8 h-16 bg-[radial-gradient(ellipse_at_25%_50%,rgba(240,20,24,0.42)_0%,transparent_48%),radial-gradient(ellipse_at_75%_50%,rgba(0,108,255,0.42)_0%,transparent_48%)] blur-sm"
    ></div>
    <div class="flex items-end">
      <div
        class="theme-panel relative w-full h-[60px] flex items-end justify-center p-2 rounded-b-none shadow-[0_-10px_30px_rgba(0,108,255,0.24),0_-8px_24px_rgba(240,20,24,0.2),inset_0_1px_0_rgba(240,240,240,0.16)] before:pointer-events-none before:absolute before:inset-x-0 before:top-0 before:z-0 before:h-full before:bg-[radial-gradient(ellipse_at_25%_0%,rgba(240,20,24,0.25)_0%,transparent_54%),radial-gradient(ellipse_at_75%_0%,rgba(0,108,255,0.28)_0%,transparent_56%)] after:pointer-events-none after:absolute after:inset-x-8 after:top-0 after:z-0 after:h-px after:bg-gradient-to-r after:from-red-500/0 after:via-sky-300/80 after:to-blue-500/0"
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
