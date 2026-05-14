<template>
  <div v-if="resourceStrore.extraApplication.andriod.active"
    id="app-download"
    class="w-full flex justify-center sm:gap-2 md:gap-4 mb-6 mt-4 sm:mt-6"
  >
    <NuxtLink
      :to="resourceStrore.extraApplication.andriod.source"
      target="_blank"
    >
      <NuxtImg
        src="/assets/images/download-apk.png"
        alt="Get it on google play"
        class="object-contain cursor-pointer sm:w-56 h-16 sm:h-20 transition duration-300 drop-shadow-[0_0_8px_rgba(220,38,38,0.45)] hover:drop-shadow-[0_0_20px_rgba(255,247,214,0.35)]"
        loading="lazy"
      />
    </NuxtLink>
  </div>
</template>

<script lang="ts" setup>
const resourceStrore = useResourceStore()
</script>
