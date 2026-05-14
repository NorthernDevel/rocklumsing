<template>
  <div
    v-if="props.item.name === 'tournament'"
    @click="checkPlayTournamentAccess()"
  >
    <GameMenuItem :item="item" />
  </div>
  <div v-else-if="isShowAdditionalMenu" class="h-20 sm:h-24 lg:h-32">
    <NuxtLink :to="item.to">
      <GameMenuItem :item="item" />
    </NuxtLink>
  </div>
</template>

<script lang="ts" setup>
type Item = {
  name: string
  label: string
  image: string
  to: string
}

const authStore = useAuthStore()
const popupStore = usePopupStore()

const props = defineProps({
  item: {
    type: Object as PropType<Item>,
    required: true,
  },
})

const isShowAdditionalMenu = computed(() => {
  if (
    !authStore.isAuthenticated &&
    (props.item.name === 'favorites' || props.item.name === 'recently')
  ) {
    return false
  } else {
    return true
  }
})

const checkPlayTournamentAccess = () => {
  if (authStore.isAuthenticated) {
    const baseURL = window.location.origin
    const features =
      'toolbar=no,scrollbars=yes,resizable=yes,width=' +
      screen.width +
      ',height=' +
      screen.height
    window.open(
      `${baseURL}/redirect?type=TOURNAMENT&product=xxx&gameID=xxx&isMobile=true`,
      '_blank',
      features,
    )
  } else {
    popupStore.openModalLogin()
  }
}
</script>
