<template lang="pug">
  aside.order-summary
    h3.summary-title Order summary
    .summary-details
      .summary-labels
        p subtotal
        p shipping
        p tax
        p.total-label total
      div
        p {{ subtotal }}
        .additional-costs
          p {{ shipping.toFixed(2) }}
          p {{ tax.toFixed(2) }}
        p.total-value {{ total }}
</template>

//LINK -
<script setup lang="ts">
import { inject } from 'vue'
const subtotal = inject<number>('subtotal') ?? 0
const tax = inject<number>('tax') ?? 0
const total = inject<number>('total') ?? 0
const shipping = inject<number>('shipping') ?? 0
</script>

<style scoped>
.order-summary {
  width: 100%;
  background-color: #fdad00;
  padding: 20px;
  border-radius: 4px;
}
.summary-details {
  display: flex;
  /* font-size: 1.5rem; */
  /* font-weight: 600; */
  margin-bottom: 10px;
}

</style>
