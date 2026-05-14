<template>
  <div class="w-full mb-8">
    <UContainer>
      <h3 class="theme-title text-3xl font-semibold text-center my-8">
        {{ $t('promotion') }}
      </h3>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-col-3 gap-4">
        <div v-for="promotion in resourceStore.promotions" :key="promotion.id">
          <UCard
            :ui="{
              body: {
                padding: 'px-0 py-0 sm:p-0',
              },
              footer: {
                padding: 'p-0 sm:p-0',
              },
            }"
            class="theme-panel overflow-hidden"
          >
            <NuxtImg
              class="w-full object-cover cursor-pointer"
              :src="promotion.image"
              @click="moreDetail(promotion.slug)"
            />
            <div class="px-4 py-2">
              <h4 class="theme-title text-lg sm:text-2xl font-semibold">
                {{ promotion.title }}
              </h4>
              <p class="py-2 text-amber-100/75 font-light">
                {{ promotion.shortContent }}
              </p>
            </div>

            <template #footer>
              <div
                @click="moreDetail(promotion.slug)"
                class="flex items-center justify-center h-8 border-t border-red-900/50 bg-black/40 cursor-pointer"
              >
                <p class="text-[12px] font-medium text-amber-300">
                  {{ $t('btn_more') }}
                </p>
              </div>
            </template>
          </UCard>
          <!-- <div class="border-2 border-gray-200 rounded-lg bg-gray-200 bg-opacity-50">
         
          </div> -->
        </div>
      </div>
    </UContainer>
  </div>
</template>

<script lang="ts" setup>
const { t } = useI18n()
const router = useRouter()
const resourceStore = useResourceStore()

useHead({
  title: t('promotion'),
})

const moreDetail = (slug: string) => {
  router.push(`/promotion/${slug}`)
}
</script>
