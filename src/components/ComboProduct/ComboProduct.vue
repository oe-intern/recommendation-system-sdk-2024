<template lang="pug">
  Text(as="h1", variant="headingLg") Need to buy
  div.combo-product
    //- ul.combo-list
    li.list-product(v-for="product in products" :key="product.image")
      product(:product="product")
    div.order
      Order

  <Product :product="products[0]" @child-action="handleChildAction" />

</template>

<script setup lang="ts">
import { reactive, provide, ref } from 'vue'
import Product from './Product/Product.vue'
import Order from './Product/Order.vue'
function handleChildAction() {
  console.log('Child component says:', "curr");
  // Handle the action here
}
const products = reactive([
  {
    name: 'Heirloom tomato',
    price: 5.99,
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
let subTotal = ref(0)
let shipping = ref<number>(2)
let tax = ref<number>(0)
let total = ref<number>(0)

provide('shipping', shipping);
provide('subtotal', subTotal);
provide('tax', tax);
provide('total', total);

function calculateOrder(){
  //  for(var i = 0; i < products.length; i++){
  //     subTotal.value += products[i].price * products[i].numBuy;
  //  }

   tax.value = subTotal.value * 0.1;
   total.value = subTotal.value + tax.value + shipping.value;
}

calculateOrder()



</script>

<style scoped>
.combo-product {
  display: flex;
  flex-wrap: wrap;
  /* width: 60%; */
  gap: 20px;
  justify-content: space-between;
  margin-bottom: 31px;
}
.list-product {
  margin-bottom: 200px;
  width: 60%;
}
.order{
  width: auto;
}
/* .combo_list {
} */
</style>
