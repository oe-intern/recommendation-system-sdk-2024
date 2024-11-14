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
  {
    name: 'feature',
    price: 7.99,
    image: 'data:image/webp;base64,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',
    numBuy: 1,
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
