<template>
  <div class="w-full px-2">
    <div class="md:max-h-[55vh] overflow-y-auto">
      <section v-if="!transactionStore.isLoading">
        <MultipleTransactionItem
          v-if="transactionStore.records.length"
          v-for="(item, key) in transactionStore.records"
          :key="key"
          :item="item"
        />
        <div
          v-else
          class="theme-panel py-4 text-amber-100"
        >
          <div class="flex justify-center gap-1">
            <UIcon
              name="i-heroicons-circle-stack-solid"
              class="w-4 h-4 text-amber-300"
            />
            <p class="text-sm">{{ $t('data_not_found') }}</p>
          </div>
        </div>
      </section>
      <section v-else>
        <USkeleton
          class="h-10 w-full mb-2 rounded-lg bg-neutral-800"
          v-for="i in 5"
          :key="i"
        />
      </section>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { TransactionChannel } from '~/models/transactions.model'

const transactionStore = useTransactionStore()

const props = defineProps({
  channel: {
    type: Object as PropType<TransactionChannel>,
    required: true,
  },
})

onMounted(() => {
  transactionStore.getDepositSpecialTransactions({
    transactionChannel: props.channel,
  })
})
</script>
