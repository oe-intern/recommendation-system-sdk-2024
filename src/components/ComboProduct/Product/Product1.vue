<template lang="pug">
.skeleton(v-if="!render", style="background-color: gray;")
  br
  br
  br
  br
.product(v-else)
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
import { inject, computed, reactive, defineProps, ref } from 'vue'
import axios from 'axios'
import type { IProduct, IConfig } from '@/types';
import { addToCart, redirect } from '@/services';

const rendered = inject<number>('rendered');
const props = defineProps<{ handle: string, configs: IConfig }>();
const product = reactive<IProduct>({} as IProduct);
const url = `https://vtzy11.myshopify.com/products/${props.handle}`;
const selectedVariant = ref(1);
const startPoint = 'https://localhost:443'
const colorConfig = computed(() => ({
  color: props.configs?.text_color || '#000',
}));
const render = computed(() => {
  if(Object.keys(product).length > 1) {
    rendered.value++;
    return true;
  }
  else {
    rendered.value--;
    return false;
  }
});
import data from '../new.json';

console.log("prop", data.products[0])
Object.assign(product, data.products[0]);
console.log("product", product)
console.log(props.configs?.text_color);

async function clickAddToCart() {
  const prod = product.variants[selectedVariant.value-1].id
  console.log('Add to cart:', prod);
  addToCart(Number(prod));
  const body = {
    number_of_items: 1,
  }
  const response = await axios.post(`${startPoint}/api/sdk/products/${props.handle}/add-to-cart`, body)
  console.log('Success cart:', response)
  window.location.href = window.location.href;
}

async function productClick() {
  console.log('Product clicked:', product.title);
  redirect(product.title);
  const response = await axios.post(`${startPoint}/api/sdk/products/${props.handle}/click`)
  console.log('Success click:', response)
}
</script>

<style lang="scss" scoped>
@use '../../../scss/components/comboProduct/product-layout1';
</style>
