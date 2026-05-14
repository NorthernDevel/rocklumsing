<template>
  <UModal
    v-model="isOpen"
    :overlay="true"
    :ui="{
      container: 'items-center',
      width: 'w-[300px]',
    }"
    prevent-close
  >
    <UCard class="u-card-bg">
      <UButton
        color="red"
        variant="ghost"
        class="-my-1 justify-center absolute top-1 right-0 w-14 h-14 text-amber-200 focus-visible:ring-0"
        @click="isOpen = false"
        ><UIcon name="i-heroicons-x-mark-20-solid" class="w-14 h-14"
      /></UButton>
      <div class="flex flex-col justify-center">
        <div class="flex justify-center my-4">
          <NuxtImg
            src="/assets/images/logo.webp"
            alt="logo"
            class="w-32 drop-shadow-[0_0_18px_rgba(220,38,38,0.3)]"
          />
        </div>

        <div class="flex flex-col items-center justify-center gap-4">
          <div
            v-for="contact in resourceStore.contacts"
            class="theme-panel w-full cursor-pointer"
          >
            <NuxtLink :to="contact.options.link" target="_blank">
              <div class="w-full flex gap-4 p-3">
                <NuxtImg
                  :src="`/assets/images/socials/${contact.provider.toLowerCase()}.webp`"
                  :alt="contact.provider"
                  class="w-14 object-contain drop-shadow-[0_0_10px_rgba(220,38,38,0.2)]"
                  loading="lazy"
                />
                <div class="flex flex-col justify-center">
                  <p class="font-medium text-amber-100">
                    {{ $t(contact.display.th) }}
                  </p>
                  <p
                    v-if="contact.provider === 'LINE'"
                    class="font-light text-amber-100/70"
                  >
                    {{ contact.options.lineId }}
                  </p>
                </div>
              </div>
            </NuxtLink>
          </div>
        </div>
      </div>
    </UCard>
  </UModal>
</template>

<script setup lang="ts">
const resourceStore = useResourceStore()

const props = defineProps({
  modelValue: Boolean,
})
const emit = defineEmits(['update:modelValue'])

const isOpen = computed({
  get: () => props.modelValue,
  set: (value) => {
    emit('update:modelValue', value)
  },
})
</script>
