<template lang="pug">
.wrapper(:style="{ backgroundColor: configs?.background_color || '#fff' }")
  .container
    .title(:style="{ color: configs?.text_color || '#000' }") Frequent Bought Together
    .product-list
      ProductItem(
        v-for="product in products.slice(0, configs?.number_of_items || products.length)"
        :key="product.id"
        :product="product"
        :config="configs"
        :number_of_items="products.length"
      )

</template>

<script setup lang="ts">
import { defineProps, provide, reactive } from 'vue'
import { onMounted } from 'vue';

import { request } from '@/services';
import type { IProduct, IConfig } from '@/types';
import ProductItem from './Item/ProductItem.vue';



const props = defineProps({
  id: {
    type: String,
    required: true,
  },
});

console.log('RelatedItems.vue');
console.log('props.id:', props);


const products = reactive<IProduct[]>([]);
const configs = reactive<IConfig>({} as IConfig);

provide("configs", configs);

const endpointRecommend = `https://localhost/api/sdk/products/${props.id}/recommendations`;
const endpointSettings = `https://localhost/api/sdk/shop/settings`;

const options = {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json'
  },
};

onMounted(() => {
  request(endpointRecommend, options)
    .then((response: { data: IProduct[] }) => {
      console.log('Products fetched:', response.data);
      products.push(...response.data);
    })
    .catch((error: any) => {
      console.error('Error fetching recommendations:', error);
    });

  request(endpointSettings, options)
    .then((response: { data: IConfig }) => {
      console.log('Config fetched:', response.data);
      Object.assign(configs, response.data);
    })
    .catch((error: any) => {
      console.error('Error fetching settings:', error);
    });
});

</script>

<style lang="scss" scoped>
  @use '../../scss/components/_related.scss';
</style>