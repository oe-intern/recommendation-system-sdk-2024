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
import { defineProps } from 'vue'
import axios from 'axios'
import type { IProduct } from '@/types';
import { addToCart } from '@/services';
console.log('jiefjls')
const ngrok = 'https://9d28-183-80-115-217.ngrok-free.app'
const props = defineProps<{ product: IProduct }>()
const pid = props.product.id.split('/').pop()

async function clickAddToCart() {
  addToCart(Number(props.product.variants[0].id));
  const body = {
    product_id: pid,
    interaction_type: 'add_to_cart',
  }
  const response = await axios.post(`${ngrok}/api/sdk/interaction`, body)
  console.log('Success cart:', response)
}

async function productClick() {
  const body = {
    product_id: pid,
    interaction_type: 'click',
  }
  const response = await axios.post(`${ngrok}/api/sdk/interaction`, body)
  console.log('Success click:', response)
}
</script>

<style lang="scss" scoped>
@use '../../../scss/components/product-layout2';
</style>
