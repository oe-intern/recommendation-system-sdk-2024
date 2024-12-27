<template lang="pug">
//- button.redir(@click="redirect") Redirect
.combo-product
  .title Frequent bought together
  .list-products(v-if="configs.layout !== 'layout2'")
    product1(
      v-for="(product, index) in products" :key="`view1-${product.id}`"
      :id="'p'+index",
      :product="product", 
      :configs="configs",
    )
  .list-products2(v-else)
    product2(
      v-for="product in products" :key="`view2-${product.id}`"
      :product="product", 
      :configs="configs",
    )
</template>

<script setup lang="ts">
import { defineProps } from 'vue';
import Product1 from './Product/Product1Draft.vue'
import Product2 from './Product/Product2Draft.vue';

// Define props for the component
const props = defineProps({
  products: {
    type:  Array<any>,
    required: true,
  },
  configs: {
    type: Object ,
    required: true,
  },
});

</script>

<style lang="scss" scoped>
@use '../../scss/components/comboProduct/combo';
</style>
