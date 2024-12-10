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
import { defineProps, ref, computed, reactive } from 'vue'
import axios from 'axios'
import type { IConfig, IProduct } from '@/types';
import { addToCart } from '@/services';
console.log('jiefjls')
const selectedVariant = ref(1);
// const ngrok = 'https://9d28-183-80-115-217.ngrok-free.app'
const ngrok = 'https://localhost:443';
const props = defineProps<{ id: number, configs: IConfig }>()
const product = reactive<IProduct>({} as IProduct);
const colorConfig = computed(() => ({
  color: props.configs?.text_color || '#000',
}));
async function clickAddToCart() {
  addToCart(Number(product.variants[0].id));
  const body = {
    number_of_items: 1,
  }
  const response = await axios.post(`${ngrok}/api/sdk/products/${props.id}/add-to-cart`, body)
  console.log('Success cart:', response)
}

async function productClick() {
  // const body = {
  //   product_id: id,
  //   interaction_type: 'click',
  // }
  const response = await axios.post(`${ngrok}/api/sdk/products/${props.id}/click`)
  console.log('Success click:', response)
}
</script>

<style lang="scss" scoped>
@use '../../../scss/components/comboProduct/product-layout2';
</style>
