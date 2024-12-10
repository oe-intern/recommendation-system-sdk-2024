<template lang="pug">
.combo-product
  .Handle(v-if="haveData") Something special in there
  .title(v-else) Frequent bought together
  .list-products(v-if="configs.layout !== 'layout2'")
    product1(
      v-for="handle in handles" :key="`view1-${handle}`"
      :handle="handle",
      :configs="configs",
    )
  .list-products2(v-else)
    product2(
      v-for="handle in handles" :key="`view2-${handle}`"
      :handle="handle"
      :configs="configs",
    )
</template>

<script setup lang="ts">

import type { IConfig } from '@/types'
import { reactive, onMounted, ref, computed, provide } from 'vue'
import { request } from '@/services'
import Product1 from './Product/Product1.vue'
import Product2 from './Product/Product2.vue'

console.log('ComboProduct.vue')
const configs = reactive<IConfig>({} as IConfig)
const props = defineProps({id: String});

const endpointRecommend = `https://localhost/api/sdk/products/${props.id}/recommendations`
const endpointSettings = `https://localhost/api/sdk/shop/settings`

const rendered = ref(0);
const haveData = computed(() => {
  if(rendered.value <= 0) return true
  else return false;
})
provide('rendered', rendered);

const handles = ref<string[]>([])
handles.value.push("selling-plans-ski-wax");
handles.value.push("pendant-earrings");
handles.value.push("18k-bloom-earrings");
handles.value.push("no=problem");






const options = {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
  },
}


onMounted(() => {
  request(endpointRecommend, options)
    .then((response: { data: string[] }) => {
      console.log('Products fetched:', response.data)
      handles.value.push(...response.data)
      console.log('handles:', handles);
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
