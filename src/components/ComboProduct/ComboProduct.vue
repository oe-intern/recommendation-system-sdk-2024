<template lang="pug">
mixin useLayout(produc) 
  #{produc}(
    v-for="handle in handles",
    :key="handle",
    :handle="handle",
    :configs="configs",
    @rendered="rende",
  )

div.combo-product
  div.combo-product__title
    | {{ title }}
  div.list-products(
    v-if="layout === 'Layout1'",
  )
    +useLayout("Product1")
  div.list-products2(
    v-else-if="configs.layout === 'Layout2'",
  )
    +useLayout("Product2")
  div(
    v-else
  )
    | Wrong Layout
</template>

<script setup lang="ts">
import type { IConfig, IEntry } from '@/types'
import { reactive, onMounted, ref, computed } from 'vue'
import { request } from '@/services'
import Product1 from './Product/Product1.vue'
import Product2 from './Product/Product2.vue'
console.log('ComboProduct.vue')
const configs = reactive<IConfig>({} as IConfig)
const props = defineProps({id: String});
const haveData = ref<boolean>(false);
const rende = () => {
  haveData.value = true;
  console.log("emitted")
}
configs.layout = 'Layout1';
const title = computed(() =>{
  return haveData.value ? 'Frequently bought together' : 'Something special in there';
})
const layout = computed(() =>{
  return configs.layout
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
  handles.value = handles.value.slice(0, configs.number_of_items);
})
</script>

<style lang="scss" scoped>
@use '../../scss/components/comboProduct/combo';
</style>
