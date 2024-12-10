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
<<<<<<< HEAD
import { inject, computed, reactive, defineProps, ref } from 'vue'
=======
import { computed, defineProps } from 'vue'
>>>>>>> parent of d923750 (Update: each product component get data itself)
import axios from 'axios'
import type { IProduct, IConfig } from '@/types';
import { addToCart, redirect } from '@/services';
import { ref } from 'vue';

<<<<<<< HEAD
const rendered = inject<number>('rendered');
const props = defineProps<{ handle: string, configs: IConfig }>();
const product = reactive<IProduct>({} as IProduct);
const url = `https://vtzy11.myshopify.com/products/${props.handle}`;
const selectedVariant = ref(1);
const startPoint = 'https://localhost:443'
=======

const props = defineProps<{ product: IProduct; configs: IConfig }>();
console.log("product:", props.product);
const selectedVariant = ref(1);
const pid = props.product.id
// const ngrok = 'https://9d28-183-80-115-217.ngrok-free.app'
const ngrok = 'https://localhost:443'
>>>>>>> parent of d923750 (Update: each product component get data itself)
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
<<<<<<< HEAD
=======
console.log("variant", props.product.variants[0].id)
>>>>>>> parent of d923750 (Update: each product component get data itself)

async function clickAddToCart() {
  const prod = props.product.variants[selectedVariant.value-1].id
  console.log('Add to cart:', prod);
  addToCart(Number(prod));
  const body = {
    number_of_items: 1,
  }
<<<<<<< HEAD
  const response = await axios.post(`${startPoint}/api/sdk/products/${props.handle}/add-to-cart`, body)
  console.log('Success cart:', response)
  window.location.href = window.location.href;
}

async function productClick() {
  console.log('Product clicked:', product.title);
  redirect(product.title);
  const response = await axios.post(`${startPoint}/api/sdk/products/${props.handle}/click`)
=======
  const response = await axios.post(`${ngrok}/api/sdk/products/${pid}/add-to-cart`, body)
  console.log('Success cart:', response)
}

async function productClick() {
  console.log('Product clicked:', props.product.title);
  redirect(props.product.title);
  const response = await axios.post(`${ngrok}/api/sdk/products/${pid}/click`)
>>>>>>> parent of d923750 (Update: each product component get data itself)
  console.log('Success click:', response)
}
</script>

<style lang="scss" scoped>
@use '../../../scss/components/comboProduct/product-layout1';
</style>
