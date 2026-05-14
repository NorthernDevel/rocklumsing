<template>
  <div class="min-h-screen bg-gray-950 px-4 py-10 flex items-center justify-center">
    <div class="theme-panel w-full max-w-md p-6 text-center">
      <p class="theme-label text-sm uppercase tracking-widest">
        {{ $t('something_went_wrong') }}
      </p>
      <h1 class="theme-title mt-2 text-6xl font-bold">
        {{ statusCode }}
      </h1>
      <h2 class="mt-4 text-xl font-semibold text-gray-50">
        {{ statusMessage }}
      </h2>
      <p v-if="errorMessage" class="mt-2 text-sm text-amber-100/70">
        {{ errorMessage }}
      </p>

      <UButton
        type="button"
        class="theme-primary-btn mt-6 w-full h-12 justify-center text-lg"
        @click="handleError"
      >
        {{ $t('go_to_home') }}
      </UButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { NuxtError } from '#app'

const props = defineProps({
  error: Object as () => NuxtError,
})

const statusCode = computed(() => props.error?.statusCode || 500)
const statusMessage = computed(
  () => props.error?.statusMessage || 'Something went wrong',
)
const errorMessage = computed(() => props.error?.message)
const title = computed(() => `${statusCode.value} ${statusMessage.value}`)

useHead({
  title: title.value,
})

const handleError = () => clearError({ redirect: '/' })
</script>
