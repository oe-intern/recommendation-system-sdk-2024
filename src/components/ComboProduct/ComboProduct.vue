<template lang="pug">
.combo-product
  //- Text.text-need-to-buy() Need to buy
  Text.text-need-to-buy() frequent bought together
  <br />
  //- .product-container
  ul.list-products
    li.list-product(v-for="product in products" :key="product.image")
      product(:product="product")
  //- div.order
  //- .order
  //-   Order
  //- <p>hello {{ productId }}</p>
</template>

<script setup lang="ts">
import { reactive, provide, ref } from 'vue'
import Product from './Product/Product.vue'
import Order from './Product/Order.vue'
const products = reactive([
  {
    name: 'Heirloom tomato',
    price: 6.99,
    image: 'https://cdn.builder.io/api/v1/image/assets/TEMP/a771c70f5cbef8baa4a6355e23147a14b252ed3fefbd754de62a9e87b208ba43?placeholderIfAbsent=true&apiKey=3786680e13174bd88bc8c99173311cdc',
    numBuy: 1,
  },
  {
    name: 'Organic ginger',
    price: 12.99,
    image: 'https://cdn.builder.io/api/v1/image/assets/TEMP/a6e1f446bd7f66159e8aaf33b0d3172227190a9aea7973ae07aa08075f8d2205?placeholderIfAbsent=true&apiKey=3786680e13174bd88bc8c99173311cdc',
    numBuy: 3,
  },
  {
    name: 'Sweet onion',
    price: 2.99,
    image: 'https://cdn.builder.io/api/v1/image/assets/TEMP/9ca8cad4b0273da6a4de79957d1b7811eb84ef1aba72b9f89e0c295a80c1b6d0?placeholderIfAbsent=true&apiKey=3786680e13174bd88bc8c99173311cdc',
    numBuy: 2,
  },
])
let subTotal = ref<number>(0)
let shipping = ref<number>(0)
let tax = ref<number>(0)
let total = ref<number>(0)

provide('shipping', shipping);
provide('subtotal', subTotal);
provide('tax', tax);
provide('total', total);


</script>

<style scoped>
.text-need-to-buy {
  font: 900 70px/1.3 Inter, sans-serif;
  color: black;
  font-family: 'Times';
  font-style: normal;
  font-weight: 400;
  line-height: 120%;
  display: flex;
  align-items: flex-end;
}

.combo-product {
  padding: 0%;
  background-color: rgb(255, 255, 255);
}

.product-container {
  display: flex;
  position: relative;
  gap: 5%;
}

.list-products {
  list-style-type: none;
  padding: 0;
  margin: 0;
  display: grid;
  padding: 0%;
  flex-wrap: wrap;
}

</style>
