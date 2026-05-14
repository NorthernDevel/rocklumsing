<template>
  <footer class="bottom-0 w-full flex flex-col">
    <Partners />

    <section class="flex flex-col items-center bg-gradient-to-b from-neutral-950 via-black to-neutral-950 py-8">
      <div class="container flex flex-col items-center">
        <NuxtImg
          src="/assets/images/logo.webp"
          alt="logo"
          class="w-48 mb-4 drop-shadow-[0_0_18px_rgba(220,38,38,0.25)]"
        />
        <h2 class="theme-title text-2xl font-bold mb-2">
          {{ footerTitle }}
        </h2>
        <p class="text-center text-gray-200">{{ footerDescription }}</p>

        <div class="flex items-center justify-center flex-wrap space-x-2 pt-5">
          <div v-for="tag in resourceStore.tags" class="pt-2">
            <UButton
              color="red"
              variant="outline"
              class="border-red-600/50 text-amber-100"
              >{{ tag }}</UButton
            >
          </div>
        </div>
      </div>
    </section>

    <section class="flex justify-center border-t border-red-900/50 bg-black py-2">
      <p class="font-extralight text-amber-100/70">
        {{ $t('copyright', { version: resourceStore.version }) }}
      </p>
    </section>
  </footer>
</template>

<script setup lang="ts">
const langStore = useLanguageStore()
const resourceStore = useResourceStore()

const footerTitle = computed(() => {
  if (resourceStore.footerDescription) {
    const { en, th } = resourceStore.footerDescription.title
    if (langStore.currentLang === 'en') return en
    return th
  }
})

const footerDescription = computed(() => {
  if (resourceStore.footerDescription) {
    const { en, th } = resourceStore.footerDescription.description!
    if (langStore.currentLang === 'en') return en
    return th
  }
})
</script>
