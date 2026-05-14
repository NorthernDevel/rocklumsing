<template>
  <div @click="onSelectedChannel(item.to)">
      <CashierDepositButtonItem
        :item="item"
        :size="size"
      />
    </div>
</template>

<script lang="ts" setup>
const cashierStore = useCashierStore()

type Item = {
  name: string
  label: string
  image: string
  to: string
  recommend: boolean
  recommend_label: string
}
defineProps({
  item: {
    type: Object as PropType<Item>,
    required: true,
  },
  size: {
    type: String,
    default: 'w-28 sm:w-40 h-20',
  },
})

const onSelectedChannel = (id: string) => {
  cashierStore.idSelect = id
  cashierStore.isSelectedChannel = true
}


</script>
