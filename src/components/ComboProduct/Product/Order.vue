<template lang="pug">
  aside.order-summary
    h3.summary-title Order summary
    .summary-details
      .summary-labels
        p.price-item subtotal
        p.price-item shipping
        p.price-item tax
        p.total-label total
      .summary-labels
        p.price-subtotal {{ subtotal.toFixed(2) }}
        p.price-item {{ shipping.toFixed(2) }}
        p.price-item {{ tax.toFixed(2) }}
        p.total-value {{ total.toFixed(2) }}
    button.add-to-cart-button
      span(style="font-size: 25px;") Add to cart
      <img src="./icon/arrow-right-solid.svg" alt="Description of SVG" style="width: 25px;" />
      //- <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/436b738744905f60c6a542e2cd314f5694db20045d36b8991f8dab9a31b316a0?placeholderIfAbsent=true&apiKey=3786680e13174bd88bc8c99173311cdc" alt="" class="cart-icon" />
</template>

<script setup lang="ts">
import { inject } from 'vue'
const subtotal = inject<number>('subtotal') ?? 0
const tax = inject<number>('tax') ?? 0
const total = inject<number>('total') ?? 0
const shipping = inject<number>('shipping') ?? 0
</script>

<style scoped>
.order-summary {
  gap: 16px;
  border-radius: 20px;
  border: 2px solid #e6e6e6;
  /* width: 150%; */
  background-color: #fafaf5;
  display: flex;
  /* height: 250%; */
  max-width: 395px;
  flex-direction: column;
  /* padding: 24px; */
  font: 16px/1.3 Inter, sans-serif;
  /* border: 2px solid #e6e6e6; */
}
.summary-labels {
  display: flex;
  flex-direction: column;
  gap: 16px;
  font-size: 17px;
  font-weight: 600;
  color: black;
}
.summary-details {
  display: flex;
  gap: 40px;
  margin-bottom: 10px;
}

.total-value {
  color: black;
  font-weight: 800;
  font-size: 25px;
  margin-top: 13px;
}
.summary-title {
  font-size: 30px;
  color: black;
  font-weight: 600;
  align-self: stretch;
  margin: 0 0 32px;
}


.price-subtotal {
  color: #ff0000;
  font-size: 20px;
}


.price-item {
  margin: 20px 0 0;
  color: black;
  margin-top: 0;
}

.add-to-cart-button {
  border-radius: 8px;
  background-color: #426b1f;
  display: flex;
  margin-top: 32px;
  gap: 20px;
  color: #fff;
  font-weight: 600;
  justify-content: space-between;
  padding: 8px 20px;
  border: none;
  cursor: pointer;
}

.total-label {
  font-size: 25px;
  color: black;
  width: 15px;
}

</style>
