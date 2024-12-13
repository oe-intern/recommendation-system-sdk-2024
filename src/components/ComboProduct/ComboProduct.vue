<template lang="pug">
.combo-product
  .title Frequent bought together
  .list-products(v-if="configs.layout !== 'Layout1'")
    product1(
      v-for="product in products.slice(0, configs.number_of_items)" 
      :key="`view1-${product}`"
      :product="product",
      :configs="configs",
    )
  .list-products2(v-else)
    product2(
      v-for="product in products.slice(0, configs.number_of_items)" 
      :key="`view2-${product}`"
      :product="product"
      :configs="configs",
    )
</template>

<script setup lang="ts">

import type { IProduct, IConfig } from '@/types'
import { reactive, ref, provide } from 'vue'
import Product1 from './Product/Product1.vue'
// import Product2 from './Product/Product2.vue'
console.log('ComboProduct.vue')
const configs = reactive<IConfig>({} as IConfig)
const products = reactive<IProduct[]>([]);
import data from './new.json';
console.log(data)
products.push(...data.products)
configs.background_color = "#fff";
configs.layout = 'Layout2';
configs.number_of_items = 3;
configs.text_color = "#000";
const rendered = ref(0);
provide('rendered', rendered);


</script>

<style lang="scss" scoped>
@use '../../scss/components/comboProduct/combo';
</style>
