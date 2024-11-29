<template lang="pug">
.combo-product
  //- Text.text-need-to-buy() Need to buy
  Text.text-need-to-buy() Frequent bought together
  <br />
  ul.list-products
    li.list-product(v-for="product in products" :key="product.id")
      product(:product="product", :color="color", :numberOfItem="numberOfItem", :layoutType="layoutType", :backgroundColor="backgroundColor", :priceColor="priceColor")
</template>

<script setup lang="ts">
import { reactive, provide, ref, onMounted } from 'vue'
import Product from './Product/Product.vue'
const products = reactive([

])
const subTotal = ref<number>(0);
const shipping = ref<number>(0);
const tax = ref<number>(0);
const total = ref<number>(0);
const color = ref<string>('#fff');
const numberOfItem = ref<number>(0);
const layoutType = ref<number>(0);
const backgroundColor = ref<string>('#000');
const priceColor = ref<string>('#000');

const props = defineProps({
  id: {
    type: String,
    required: true,
  },
});

import { request } from '../../services/http.ts';
// const endpoint = 'https://8d65-58-187-163-127.ngrok-free.app/api/sdk/recommendation?product_id=123';
const endpoint = `https://localhost:443/api/sdk/recommendation?product_id=${props.id}`;
const options = {
  method: 'GET',
  headers: {
    // 'Authorization': 'secret',
    'Content-Type': 'application/json'
  },
};

console.log('color: ');
request(endpoint, options)
  .then(response => {
    console.log('Success:', response);
    products.push(...response.products);
  })
  .catch(error => {
    console.error('Error:', error);
  });

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
