<template lang="pug">
  aside.order-summary
    Text
    h3.summary-title Order summary
    .summary-details
      .summary-labels
        p.price-item Subtotal
        p.price-item Shipping
        p.price-item Tax
        p.total-label Total
      .summary-labels
        p.price-subtotal {{ subtotal.toFixed(2) }}
        p.price-item {{ shipping.toFixed(2) }}
        p.price-item {{ tax.toFixed(2) }}
        p.total-value ${{ total.toFixed(2) }}
    button.add-to-cart-button
      span(style="font-size: 33px; margin-left: 15px;") Add to cart
      //- <img src="./icon/arrow-right-solid.svg" alt="Description of SVG" style="width: 25px;" />
      img(src="./icon/arrow.svg" alt="Description of SVG", :style="{ width: '35px', marginRight: '10px', cursor: 'pointer' }")
      //- <img src="./icon/arrow.svg" alt="Description of SVG" style="width: 25px; margin-right: 10px;" />
    Text
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
  gap: 36px;
  border-radius: 20px;
  border: 2px solid #e6e6e6;
  /* background-color: #fafaf5; */
  display: flex;
  height: auto;
  width: auto;
  /* max-width: 500px; */
  flex-direction: column;
  align-content: center;
  padding: 24px;
  font: 16px/1.3 Inter, sans-serif;
}
.summary-labels {
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 20px;
  font-size: 17px;
  font-weight: 600;
}
.summary-details {
  align-content: center;
  align-items: center;
  display: flex;
  gap: 30%;
}

.total-value {
  font-weight: 800;
  font-size: 23px;
  margin-top: 13px;
}
.summary-title {
  font-size: 30px;
  font-weight: 600;
  align-self: stretch;
  margin: 0 0 32px;
}


.price-subtotal {
  color: #ff0000;
  font-size: 20px;
}


.price-item {
  font: 20px/1.2 Newsreader, sans-serif;
  margin-left: 20%;
  color: black;
  margin-top: 0;
}

.add-to-cart-button {
  margin: 20px 20px 20px 20px;
  align-self: center;
  width: 80%;
  border-radius: 13px;
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
