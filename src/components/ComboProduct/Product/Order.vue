<template lang="pug">
  <aside class="order-summary">
    <h3 class="summary-title">Order summary</h3>
    <div class="summary-details">
      <div class="summary-labels">
        <p>subtotal</p>
        <p>shipping</p>
        <p>tax</p>
        <p class="total-label">total</p>
      </div>
      <div class="summary-values">
        <p class="subtotal-value">{{ subtotal }}</p>
        <div class="additional-costs">
          <p>{{ shipping.toFixed(2) }}</p>
          <p>{{ tax.toFixed(2) }}</p>
        </div>
        <p class="total-value">{{ total.toFixed(2) }}</p>
      </div>
    </div>
  </aside>
</template>
//LINK -
<script setup lang="ts">
import { inject, defineProps, ref } from 'vue'
const subtotal = inject( 'subtotal' )
const tax = inject( 'tax' )
const total = inject( 'total' )
const shipping = inject( 'shipping' )
shipping.value += 1;
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
