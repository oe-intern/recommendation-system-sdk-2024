<template lang="pug">
.product
  .attribute
    img.image(:src="product.images[selectedVariant-1].src",:alt="product.image.alt",@click="productClick")
    .information
      .name(:style="colorConfig", @click="productClick") {{ product.variants[selectedVariant-1].title }}
      .price {{ product.variants[selectedVariant-1].price }}{{ product.variants[selectedVariant-1].price_currency }}
      select.variant(v-if="product.variants" v-model="selectedVariant")
        option.choose(v-for="variant in product.variants", :key="variant.id", :value="variant.position") {{ variant.title }}
  button.add-to-cart(@click="clickAddToCart") Add
</template>

<script setup lang="ts">
import { computed, reactive, defineProps, ref } from 'vue'
import axios from 'axios'
import type { IProduct, IConfig } from '@/types';
import { addToCart, redirect } from '@/services';


const product = reactive<IProduct>({} as IProduct);
const props = defineProps<{ id: number, configs: IConfig }>();
const url = `https://vtzy11.myshopify.com/products/${props.id}`;
console.log("product:", product);
const selectedVariant = ref(1);
const pid = product.id
const ngrok = 'https://localhost:443'
const colorConfig = computed(() => ({
  color: props.configs?.text_color || '#000',
}));

console.log(props.configs?.text_color);
console.log("variant", product.variants[0].id)

async function clickAddToCart() {
  const prod = product.variants[selectedVariant.value-1].id
  console.log('Add to cart:', prod);
  addToCart(Number(prod));
  const body = {
    number_of_items: 1,
  }
  const response = await axios.post(`${ngrok}/api/sdk/products/${pid}/add-to-cart`, body)
    console.log('Success cart:', response)
    window.location.href = window.location.href;
}

async function productClick() {
  console.log('Product clicked:', product.title);
  redirect(product.title);
  const response = await axios.post(`${ngrok}/api/sdk/products/${pid}/click`)
  console.log('Success click:', response)
}
</script>

<style lang="scss" scoped>
@use '../../../scss/components/comboProduct/product-layout1';
</style>
