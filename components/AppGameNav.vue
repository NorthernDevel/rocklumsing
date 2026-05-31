<template>
  <div class="md:flex justify-center flex-wrap gap-2 md:gap-4 mt-10 md:mt-0">
    <GameMenu
      v-for="link in links"
      :key="link.name"
      :item="link"
    />
  </div>
</template>

<script lang="ts" setup>
type Link = {
  name: string
  label: string
  image: string
  to: string
}

defineProps({
  links: {
    type: Object as PropType<Link[]>,
    required: true,
  },
})
</script>
