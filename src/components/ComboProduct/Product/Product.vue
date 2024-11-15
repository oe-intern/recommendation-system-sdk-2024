<template lang="pug">
  li.product
    img.product__image(:src="product.image" alt="product image" :style="{ width: '200px', height: '200px', borderRadius: '20px' }")
    .information
      Text(as="h2", variant="headingMd", :style="{ color: 'black', fontSize: '25px' }") {{ product.name }}
      Text(as="p", variant="body", :style="{ color: 'orange', fontSize: '25px' }") {{ product.price }}$
      input.text(v-model="product.numBuy", @input="updatePayment", :style="{ width: '125px', fontSize: '25px', border: '1px solid #ccc', borderRadius: '20px', textAlign: 'center' }")
      //- img(src="./icon/pencil-solid.svg" alt="Edit icon", :style="{ width: '20px', marginLeft: '8px', cursor: 'pointer' }")

    Text(as="product-payment", variant="headingMd", :style="{ fontWeight: 'bold', color: 'black', fontSize: '30px' }") ${{ productPayment.toFixed(2) }}
</template>

<script setup lang="ts">
import { defineProps, inject, ref } from 'vue'
const productPayment = ref(0)
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
  if (!isNaN(TEMP)){
    subtotal.value -= TEMP
    tax.value = subtotal.value * 0.1
    total.value = subtotal.value + shipping.value + tax.value
  }
  if (!isNaN(productPayment.value)) {
    subtotal.value += productPayment.value
    tax.value = subtotal.value * 0.1
    total.value = subtotal.value + shipping.value + tax.value
  }
}

updatePayment()
</script>

<style scoped>

.input-container {
  -sizing: border-box;

  position: absolute;
  width: 128px;
  height: 40px;
  left: 184px;
  top: 95px;

  background: #FFFFFF;
  border: 2px solid rgba(0, 0, 0, 0.06);
  border-radius: 20px;


  /* display: flex;
  align-items: center;
  padding: 5px 10px;
  border: 1px solid #ccc;
  border-radius: 20px;
  width: fit-content; */
}
input.text {
  font-size: 25px;
  border: none;
  outline: none;
  text-align: center;
  width: 125px;
}
.product {

  border-radius: 20px;
  width: 100%;
  background-color: #f9f9f5;
  border: 2px solid #e6e6e6;
  display: flex;
  gap: 20px;
  overflow: hidden;
  flex-wrap: wrap;
  justify-content: space-between;
  font:
    600 20px/1.3 Inter,
    sans-serif;
  margin-bottom: 331px;
  &__image {
    height: 29px;
  }
}
/* .text {
  width: 100px;
} */
.information {
  display: flex;
  flex-direction: column;
  margin-left: 20px; /* Space between image and info */
  flex: 1; /* Allow this section to take up remaining space */
  gap: 7%; /* Add space between the product list and the order summary */
  /* flex-direction: column;
  margin-left: auto; */
}

</style>
