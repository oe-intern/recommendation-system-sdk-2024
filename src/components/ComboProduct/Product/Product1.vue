<template lang="pug">
.product
  .attribute
    img.image(:src="product.featuredMedia.preview.image.url",alt="Description of SVG",@click="productClick")
    .information
      .name {{ product.title }}
      .price {{ product.priceRangeV2.maxVariantPrice.amount }}{{ product.priceRangeV2.maxVariantPrice.currencyCode }}
      select.variant(v-if="product.variants")
        option.choose(v-for="variant in product.variants", :key="variant.id") {{ variant.title }}
  button.add-to-cart(@click="clickAddToCart") Add
</template>

<script setup lang="ts">
import { defineProps } from 'vue'
import axios from 'axios'
import type { IProduct } from '@/types';
import { addToCart } from '@/services';
const props = defineProps<{ product: IProduct; }>();
const pid = props.product.id.split('/').pop();
// const prod = props.product.variants[0].id.split('/').pop();
// const ngrok = 'https://9d28-183-80-115-217.ngrok-free.app'
const ngrok = 'https://localhost:443'

async function clickAddToCart() {
  addToCart(Number(props.product.variants[0].id));
  const body = {
    // product_id: pid,
    number_of_items: 1,
    // interaction_type: 'add_to_cart',
  }
  const response = await axios.post(`${ngrok}/api/sdk/products/${pid}/add-to-cart`, body)
  console.log('Success cart:', response)
}

async function productClick() {
  // const body = {
  //   product_id: pid,
  //   interaction_type: 'click',
  // }
  const response = await axios.post(`${ngrok}/api/sdk/products/${pid}/click`)
  console.log('Success click:', response)
}
</script>

<style lang="scss" scoped>
@use '../../../scss/components/comboProduct/product-layout1';
</style>
