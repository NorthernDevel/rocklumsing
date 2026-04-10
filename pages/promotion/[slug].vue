<template>
  <UContainer>
    <NuxtLink to="/promotion">
      <UButton
        icon="i-heroicons-chevron-left-20-solid"
        size="sm"
        color="black"
        variant="ghost"
        label="Button"
        class="text-gray-100 text-lg sm:text-xl font-light h-12 mt-2 pl-0"
        :trailing="false"
      >
        {{ $t('all_promotions') }}
      </UButton>
    </NuxtLink>

    <UCard class="bg-opacity-90 dark:bg-opacity-90 rounded-lg my-4">
      <div
        v-if="promotion"
        class="w-full flex flex-col items-center my-4 sm:my-8"
      >
        <h3 class="text-2xl sm:text-3xl">{{ promotion.title }}</h3>
        <NuxtImg
          class="rounded-md w-full object-cover my-4"
          :src="promotion.image"
        />
        <UDivider class="border-gray-100" />
        <div class="w-full text-left pt-4">
          <h2 class="text-2xl mb-6">{{ promotion.shortContent }}</h2>
          <div v-html="promotion.content" class="text-sm sm:text-base"></div>
        </div>
      </div>
    </UCard>
  </UContainer>
</template>

<script lang="ts" setup>
const route = useRoute()
const resourceStore = useResourceStore()

const slug = computed(() => route.params.slug)

const promotion = computed(() => {
  const promotionFinded = resourceStore.promotions.find(
    (item) => item.slug === slug.value,
  )
  if (!promotionFinded) return null

  useHead({
    title: promotionFinded.title,
  })
  return promotionFinded
})
</script>
