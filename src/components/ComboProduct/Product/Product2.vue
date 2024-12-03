<template lang="pug">
.product
  img.image(:src="product.featuredMedia.preview.image.url",alt="Description of SVG",@click="productClick")
  .information
    //- .name {{ product.title }}
    .price {{ product.priceRangeV2.maxVariantPrice.amount }}{{ product.priceRangeV2.maxVariantPrice.currencyCode }}
  button.add-to-cart(@click="clickAddToCart") Add
.connect(style="align-content: center;") +
</template>

<script setup lang="ts">
import { defineProps, inject } from 'vue'
import axios from 'axios'
console.log('jiefjls')
const props = defineProps<{ product: Object }>()
const pid = props.product.id.split('/').pop()
const configs = inject<object>('configs')
console.log('helo', configs)

async function clickAddToCart() {
  const body = {
    product_id: pid,
    interaction_type: 'add_to_cart',
  }
  const response = await axios.post('https://localhost:443/api/sdk/interaction', body)
  console.log('Success cart:', response)
}
// informa.style.justify-content = "space-around";
// imform.style.
async function productClick() {
  const body = {
    product_id: pid,
    interaction_type: 'click',
  }
  const response = await axios.post('https://localhost:443/api/sdk/interaction', body)
  console.log('Success click:', response)
}
</script>

<style lang="scss" scoped>
.product {
  display: flex;
  flex-direction: column;
  justify-content: center;
  font-size: 10px;
  gap: 2px;
  .image {
    align-items: center;
    height: 100px;
    width: 100px;
  }

  .information {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    font-size: 1vh;
    width: 100px;

    .name {
      text-align: center;
    }

    .price {
      text-align: center;
      font-size: large;
    }
  }
  .add-to-cart {
    border: 0;
    background-color: black;
    color: white;
  }
}
</style>
