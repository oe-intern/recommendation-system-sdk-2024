<template lang="pug">
  li.product
    img.product__image(:src="product.featuredMedia.preview.image.url" alt="product image" @click="productClick")
    .information
      Text.title(as="h2", variant="headingMd", :style="{ color: color }") {{ product.title }}
      Text.price(as="p", variant="body",) {{ product.priceRangeV2.maxVariantPrice.amount }} {{ product.priceRangeV2.maxVariantPrice.currencyCode }}
      input(v-model="numBuy", type=number, @input="updatePayment", :style="{ width: '125px', fontSize: '25px', border: '1px solid #ccc', borderRadius: '20px', textAlign: 'center' }")

    #cart
      //- Text.payment(as="product-payment", variant="headingMd") {{ isNaN(productPayment) ? 'invalid quantity' : '$' + productPayment.toFixed(2) }}
      Text.payment(as="product-payment", variant="headingMd") {{ productPayment }}
      button.add-to-cart-button(@click="clickAddToCart")
        span.cart-text() Add to cart
        img.arrow(src="./icon/arrow.svg" alt="Description of SVG",)
</template>

<script setup lang="ts">
import { defineProps, inject, ref } from 'vue'
let productPayment = ref(0)

interface Product {
  id: string
  title: string
  featuredMedia: object
  priceRangeV2: {
    maxVariantPrice: {
      amount: string
      currencyCode: string
    }
  }
}

const numBuy = ref<number>(1)
const subtotal = inject('subtotal', ref(0))
const tax = inject('tax', ref(0))
const total = inject('total', ref(0))
const shipping = inject('shipping', ref(0))

const props = defineProps<{ product: Product, color: string }>()
console.log("---------------------------------V2")
console.log('props', props.product)
// const color = inject('color');
// const numberOfItem = inject('numberOfItem');
// const layoutType = inject('layoutType');
// const backgroundColor = inject('backgroundColor');
// const priceColor = inject('priceColor');
// color = 'rgba(80, 67, 51, 1)';

// console.log("color: " + props.color);
// console.log("numberOfItem: " + (numberOfItem ? numberOfItem.toString() : 'undefined'));
// console.log("layoutType: " + (layoutType ? layoutType.toString() : 'undefined'));
// const textElement = document.getElementsByClassName('title');
// textElement.style.color = color;
function updatePayment() {
  const TEMP = productPayment.value
  productPayment.value = parseFloat(props.product.priceRangeV2.maxVariantPrice.amount) * numBuy.value
  console.log('productPayment', parseFloat(props.product.priceRangeV2.maxVariantPrice.amount))
  console.log('productPayment', parseFloat(numBuy.value))
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
const pid = props.product.id.split("/").pop();

import axios from 'axios';
async function clickAddToCart() {
  const body = {
    product_id: pid,
    interaction_type: 'add_to_cart'
  }
  const response = await axios.post('https://localhost:443/api/sdk/interaction', body)
  console.log('Success cart:', response);
  }
async function productClick() {
  const body = {
    product_id: pid,
    interaction_type: 'click'
  }
  const response = await axios.post('https://localhost:443/api/sdk/interaction', body)
  console.log('Success click:', response);
  }
</script>

<style scoped>
.product__image {
  width: 200px;
  height: 200px;
}

.title {
  /* color: black; */
  font-size: 50px;
}

.price {
  color: orange;
  font-size: 55px;
}

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
