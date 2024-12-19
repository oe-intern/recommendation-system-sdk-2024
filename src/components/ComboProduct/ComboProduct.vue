<template lang="pug">
div.combo-product
  div.combo-product__title
    | {{ title }}
  div(
    :class="layout"
  )
    component(
      v-for="handle in handles",
      :is="product",
      :handle="handle",
      :configs="configs",
      @rendered="rende",
    )
</template>

<script setup lang="ts">
import type { IConfig, IEntry } from '@/types'
import { onMounted, ref, computed, watch } from 'vue'
import { request } from '@/services'
import Product1 from './Product/Product1.vue'
import Product2 from './Product/Product2.vue'
console.log('ComboProduct.vue')

const configs = ref<IConfig>({} as IConfig)
const props = defineProps({ id: String });
const haveData = ref<boolean>(false);
const title = computed(() =>{
  return haveData.value ? 'Frequently bought together' : 'Something special in there';
})
const product = ref(Product1);
const layout = ref('list-products');
watch(() => configs.value.layout, (newVal) => {
  if(newVal === 'Layout1') {
    product.value = Product1;
    layout.value = 'list-products';
    
  } else {
    product.value = Product2;
    layout.value = 'list-products2';
  }

  console.log('layout changed:', newVal)
})
const handles = ref<string[]>([])
handles.value.push("pendant-earrings");
handles.value.push("18k-bloom-earrings");

const options = {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
  },
}
const rende = () => {
  haveData.value = true;
  console.log("emitted")
}
configs.value.layout = 'Layout1';
const endpointRecommend = `https://localhost/api/sdk/products/${props.id}/recommendations`
const endpointSettings = `https://localhost/api/sdk/shop/settings`
onMounted(() => {
  request(endpointRecommend, options)
    .then((response: { data: IEntry[] }) => {
      console.log('Products fetched:', response.data)
      response.data.forEach(element => {
        handles.value.push(element.handle);
      });
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
  handles.value = handles.value.slice(0, configs.value.number_of_items);
})
</script>

<style lang="scss" scoped>
@use '../../scss/components/comboProduct/combo';
</style>
