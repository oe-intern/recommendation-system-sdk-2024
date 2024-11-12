<template lang="pug">
  li.product
    img.product__image(:src="product.image" alt="product image")
    .information
      Text(as="h2", variant="headingMd") {{ product.name }}
      <input type="text" v-model="product.price" @input="updatePayment" />
      TextBox(as="p", variant="body") {{ product.numBuy }}
    .product-payment
      Text(as="h2", variant="headingMd") {{ productPayment }}
</template>

<script setup lang="ts">
import { defineProps, ref} from 'vue'
const productPayment = ref(0)
interface Product {
  name: string
  price: number
  image: string
  numBuy: number
}

const props = defineProps<{ product: Product }>()
function updatePayment() {
  productPayment.value = props.product.price * props.product.numBuy;
}
</script>
<style scoped>
.product {
  width: 100%;
  /* border-radius: 24px; */
  /* background-color: #FAFAF5; */
  background-color: #3d3d15;
  display: flex;
  gap: 20px;
  overflow: hidden;
  flex-wrap: wrap;
  justify-content: space-between;
  font:
    600 20px/1.3 Inter,
    sans-serif;
  /* border: 2px solid #e6e6e6; */
  margin-bottom: 331px;
  &__image {
    height: 29px;
  }
}

.information {

  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.product-view {
  display: flex;
  /* gap: 24px; */
}
.product-payment {
  width: 40px;
  /* gap: 24px; */
}
</style>

