<template lang="pug">
.product
  img.image(:src="product.images[selectedVariant-1].src",:alt="product.image.alt",@click="productClick")
  .information
    .name(:style="colorConfig", @click="productClick") {{ product.variants[selectedVariant-1].title }}
    .price {{ product.variants[selectedVariant-1].price }}{{ product.variants[selectedVariant-1].price_currency }}
    select.variant(v-if="product.variants" v-model="selectedVariant")
      option.choose(v-for="variant in product.variants", :key="variant.id", :value="variant.position") {{ variant.title }}
  button.add-to-cart(@click="clickAddToCart") Add
.connect(style="align-content: center;") +
</template>

<script setup lang="ts">
import { defineProps, ref, computed } from 'vue'
import axios from 'axios'
import type { IConfig, IProduct } from '@/types';
import { addToCart } from '@/services';
console.log('jiefjls')
const selectedVariant = ref(1);
const ngrok = 'https://localhost:443';
const props = defineProps<{ handle: string, configs: IConfig }>()
const pid = props.product.id

const colorConfig = computed(() => ({
  color: props.configs?.text_color || '#000',
}));
async function clickAddToCart() {
  const prod = product.variants[selectedVariant.value-1].id
  console.log('Add to cart:', prod);
  addToCart(Number(prod));
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
@use '../../../scss/components/comboProduct/product-layout2';
</style>
