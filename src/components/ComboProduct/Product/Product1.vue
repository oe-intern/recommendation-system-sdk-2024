<template lang="pug">
button(@click="sele") Redirect
.product
  .attribute
    img.image(:src="product.featuredMedia.preview.image.url",alt="Description of SVG",@click="productClick")
    .information
      .name(:style="colorConfig", @click="productClick") {{ product.title }}
      .price {{ product.priceRangeV2.maxVariantPrice.amount }}{{ product.priceRangeV2.maxVariantPrice.currencyCode }}
      select.variant(v-if="product.variants" v-model="selectedVariant")
        option.choose(v-for="variant in product.variants", :key="variant.id", :value="variant.id") {{ variant.title }}
  button.add-to-cart(@click="clickAddToCart") Add
</template>

<script setup lang="ts">
import { computed, defineProps } from 'vue'
import axios from 'axios'
import type { IProduct, IConfig } from '@/types';
import { addToCart, redirect } from '@/services';
import { ref } from 'vue';


const props = defineProps<{ product: IProduct; configs: IConfig }>();
const selectedVariant = ref(props.product.variants ? props.product.variants[0].id : null);
const pid = props.product.id.split('/').pop();
const prod = props.product.variants[0].id.split('/').pop();
// const ngrok = 'https://9d28-183-80-115-217.ngrok-free.app'
const ngrok = 'https://localhost:443'
function sele(){
  console.log("selectedVariant", selectedVariant.value);
}
const colorConfig = computed(() => ({
  color: props.configs?.text_color || '#000',
}));

console.log(props.configs?.text_color);
console.log("variant", props.product.variants[0].id)

async function clickAddToCart() {
  console.log('Add to cart:', prod);
  addToCart(Number(prod));
  const body = {
    number_of_items: 1,
  }
  const response = await axios.post(`${ngrok}/api/sdk/products/${pid}/add-to-cart`, body)
  console.log('Success cart:', response)
}

async function productClick() {
  console.log('Product clicked:', props.product.title);
  redirect(props.product.title);
  const response = await axios.post(`${ngrok}/api/sdk/products/${pid}/click`)
  console.log('Success click:', response)
}
</script>

<style lang="scss" scoped>
@use '../../../scss/components/comboProduct/product-layout1';
</style>
