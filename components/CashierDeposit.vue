<template>
  <div class="w-full">
    <UDivider :ui="{ border: { base: 'dark:bg-emerald-700' } }" label="ช่องทางการฝากเงิน" size="sm" class="mt-4" />
    <div class="grid grid-cols-2 place-items-center mt-4">
      <CashierDepositButton
        v-for="item in cashierStore.depositMenu"
        :item="item"
        color="red"
        size="w-32 sm:w-36 h-14 sm:h-16"
      />
    </div>
    <UDivider :label="$t(title)" size="sm" class="mt-4" />
    <div class="py-2 px-2 w-full">
      <CashierDepositChannelThPay v-if="cashierStore.idSelect === 'THPAY'" />
      <CashierDepositChannelAutoPeer
        v-else-if="cashierStore.idSelect === 'AUTO_PEER'"
      />
      <CashierDepositChannelWithDecimal
        v-else-if="cashierStore.idSelect === 'DECIMAL'"
      />
      <CashierDepositChannelTransfer v-else />
    </div>
  </div>
</template>

<script lang="ts" setup>
const cashierStore = useCashierStore()

const title = computed(() => {
  switch (cashierStore.idSelect) {
    case 'AUTO':
      return 'deposit_auto'
    case 'AUTO_SLIP':
      return 'deposit_auto_slip'
    case 'AUTO_PEER':
      return 'deposit_auto_peer'
    case 'THPAY':
      return 'ฝากเงินแบบรวดเร็วผ่าน THPAY'
    case 'TRUEWALLET':
      return 'deposit_truemoney'
    case 'DECIMAL':
      return 'deposit_decimal'
    default:
      return 'deposit_auto_slip'
  }
})

onMounted(() => {
  cashierStore.idSelect = 'AUTO_SLIP'
  cashierStore.isSelectedChannel = true
})
</script>
