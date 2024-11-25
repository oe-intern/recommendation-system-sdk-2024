<template lang="pug">
  li.product
    img.product__image(:src="product.image" alt="product image")
    .information
      Text.title(as="h2", variant="headingMd") {{ product.name }}
      Text.price(as="p", variant="body",) {{ product.price }}$
      input.text(v-model="product.numBuy", @input="updatePayment", :style="{ width: '125px', fontSize: '25px', border: '1px solid #ccc', borderRadius: '20px', textAlign: 'center' }")

    #cart
      Text.payment(as="product-payment", variant="headingMd") {{ isNaN(productPayment) ? 'invalid quantity' : '$' + productPayment.toFixed(2) }}
      button.add-to-cart-button
        span.cart-text() Add to cart
        img.arrow(src="./icon/arrow.svg" alt="Description of SVG",)
</template>

//TODO - add number of items
//TODO - layout type
//TODO - background color
//TODO - color
//TODO - price color

<script setup lang="ts">
import { defineProps, inject, ref } from 'vue'
let productPayment = ref(0)
const numberOfItem = 3;
const layoutType = 'horizontal';
const backgroundColor = '#f4f4f4';
const color = '#000';
const priceColor = '#f4f4f4';

interface Product {
  name: string
  price: number
  image: string
  numBuy: number
}

const subtotal = inject('subtotal', ref(0))
const tax = inject('tax', ref(0))
const total = inject('total', ref(0))
const shipping = inject('shipping', ref(0))
const props = defineProps<{ product: Product }>()


function updatePayment() {
  const TEMP = productPayment.value
  productPayment.value = props.product.price * props.product.numBuy
  if (!isNaN(TEMP)) {
    subtotal.value -= TEMP
  }
  if (!isNaN(productPayment.value)) {
    subtotal.value += productPayment.value
  }
  tax.value = subtotal.value * 0.1
  total.value = subtotal.value + shipping.value + tax.value
}

updatePayment()
</script>

<style scoped>
.product__image {
  width: 200px;
  height: 200px;
}

.title {
  color: black;
  font-size: 30px;
}

.price {
  color: orange;
  font-size: 55px;
}

/* .input-container {
  position: absolute;
  width: 128px;
  height: 40px;
  left: 184px;
  top: 95px;
  border: 2px solid rgba(0, 0, 0, 0.06);
  border-radius: 20px;
} */


.product {
  border-radius: 20px;
  width: 100%;
  border: 2px solid #e6e6e6;
  display: flex;
  gap: 20px;
  overflow: hidden;
  flex-wrap: wrap;
  justify-content: space-between;
  font:
    600 20px/1.3 Inter,
    sans-serif;
}

.information {
  display: flex;
  flex-direction: column;
  flex: 1;
  gap: 7%;
}

#cart {
  justify-content: space-between;
  gap: 20px;
  align-items: center;
  justify-content: center;
}

.payment {
  font-weight: bold;
  color: black;
  font: 30px/1.3 sans-serif;
  margin-right: 10px;
}

.add-to-cart-button {
  align-self: center;
  border-radius: 13px;
  display: flex;
  gap: 20px;
  color: #fff;
  font-weight: 600;
  justify-content: space-between;
  border: none;
  cursor: pointer;
}
.arrow {
  width: 35px;
  margin-right: 10px;
  cursor: pointer;
}
.cart-text {
  font-size: 33px;
  margin-left: 15px;
}
</style>
