<template>
  <div
    class="theme-panel flex flex-col gap-3 p-3 my-2"
  >
    <div class="flex items-center justify-between">
      <div class="flex flex-col">
        <p class="theme-label text-xs">{{ $t('date') }}</p>
        <p class="text-sm text-gray-100">{{ item.date }}</p>
      </div>
      <div class="flex flex-col">
        <p class="theme-label text-right text-xs">
          {{ $t('reward_amount') }}
        </p>
        <p class="theme-title text-right text-sm font-semibold">
          {{ currency }}
        </p>
      </div>
    </div>

    <div class="flex items-center justify-between">
      <div class="flex flex-col">
        <p class="theme-label text-xs">{{ $t('history_channel') }}</p>
        <p class="text-sm text-gray-100">{{ item.channel }}</p>
      </div>
      <div class="flex flex-col">
        <p class="theme-label text-right text-xs">{{ $t('status') }}</p>
        <div class="flex gap-2">
          <UButton
            v-if="item.isRejectTrans && !item.isReceive"
            color="red"
            variant="solid"
            class="theme-primary-btn h-6 justify-center px-3 text-xs"
            @click="receiveRejectTransactionId(item)"
            >{{ $t('get_money') }}</UButton
          >
          <UBadge v-if="item.isReceive" color="primary" variant="outline">{{
            $t('is-received')
          }}</UBadge>
          <UBadge :color="statusColor">{{
            $t(`record_${item.status.toLocaleLowerCase()}`)
          }}</UBadge>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
type RecordProps = {
  id: string
  amount: string
  channel: string
  date: string
  status: string
  type: string
  isReceive: boolean
  isRejectTrans?: boolean
}

const { useCurrency } = useFormatter()

const props = defineProps({
  item: {
    type: Object as PropType<RecordProps>,
    required: true,
  },
})

const emit = defineEmits(['receiveReject'])

const statusColor = computed(() => {
  switch (props.item?.status) {
    case 'REJECTED':
      return 'rose'
    case 'PENDING':
      return 'red'
    default:
      return 'primary'
  }
})

const receiveRejectTransactionId = (item: RecordProps) => {
  emit('receiveReject', item.id)
}

const currency = computed(() => {
  const cleanedValue = props.item.amount.replace(/[^0-9.]/g, '') || '0'
  const { currency } = useCurrency(Number(cleanedValue), 'none')
  return currency
})
</script>
