<template lang="pug">
//- .Handle(v-if="haveData") Something special in there
.combo-product
  .title Frequent bought together
  .list-products(v-if="configs.layout !== 'layout2'")
    product1(
      v-for="id in pid" :key="`view1-${id}`"
      :id="id",
      :configs="configs",
    )
  .list-products2(v-else)
    product2(
      v-for="id in pid" :key="`view2-${id}`"
      :id="id"
      :configs="configs",
    )
</template>

<script setup lang="ts">
import { reactive, onMounted, ref, computed } from 'vue'
import type { IConfig } from '@/types'
import Product1 from './Product/Product1.vue'
import Product2 from './Product/Product2.vue'

console.log('ComboProduct.vue')
console.log('version4')
const configs = reactive<IConfig>({} as IConfig)

console.log('ComboProduct.vue')
import { request } from '@/services'

const props = defineProps({id: String});

const endpointRecommend = `https://localhost/api/sdk/products/${props.id}/recommendations`
const endpointSettings = `https://localhost/api/sdk/shop/settings`
const rendered = ref(0);
const haveData = computed(() => {
  if(rendered.value == 0) return true
  else return false;
})

const options = {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
  },
}

const pid = ref<number[]>([])

console.log("v2");
const shopName = "vtzy11";
const apiKey = "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";
const apiVersion = "2024-10"; 
const productId = "8739113500894";
const url1 = `https://${shopName}.myshopify.com/admin/api/${apiVersion}/products/${productId}.json`;
fetch(url1, {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
    "X-Shopify-Access-Token": apiKey, // Authorization header for private API
  },
})
  .then((response) => {
    if (!response.ok) {
      throw new Error(`HTTP ratus: ${response.status}`);
    }
    return response.json();
  })
  .then((data) => {
    console.log("Producata:", data.products); // `data.products` contains the product list
  })
  .catch((error) => {
    console.error("Errtching products:", error);
  });

onMounted(() => {
  request(endpointRecommend, options)
    .then((response: { data: number[] }) => {
      console.log('Products fetched:', response.data)
      pid.value.push(...response.data)
      console.log('pid:', pid);
    })
    .catch((error: any) => {
      console.error('Error fetching recommendations:', error)
    })

  request(endpointSettings, options)
    .then((response: { data: IConfig }) => {
      console.log('Config fetched:', response.data)
      Object.assign(configs, response.data)
    })
    .catch((error: any) => {
      console.error('Error fetching settings:', error)
    })
})
</script>

<style lang="scss" scoped>
@use '../../scss/components/comboProduct/combo';
</style>
