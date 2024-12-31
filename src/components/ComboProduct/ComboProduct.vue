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
      @rendered="rendered",
    )
</template>


<script setup lang="ts">
import Product1 from './Product/Product1.vue'
import Product2 from './Product/Product2.vue'
import { optionGet, endpointSettings, getHandlesApi } from '@/config';
import type { IConfig, IEntry } from '@/types'
import { onMounted, ref } from 'vue'
import { request } from '@/services'

const props = defineProps({ id: String });
const configs = ref<IConfig>({
  background_color: '#fff',
  text_color: '#000',
  layout: 'Layout1',
  number_of_items: 3,
} as IConfig);

const title =  ref('Something special in there');
const rendered = () => {
  title.value = 'Frequently bought together';
}

const layout = ref('list-products');
const product = ref(Product1);

function configLayout() {
  let newVal = configs.value.layout;
  if(newVal === 'Layout1') {
    product.value = Product1;
    layout.value = 'list-products1';
  } else if(newVal === 'layout2') {
    product.value = Product2;
    layout.value = 'list-products2';
  }
  console.log('layout changed:', newVal);
}
const handles = ref<string[]>([]);

onMounted(() => {
  request(getHandlesApi(props.id), optionGet)
    .then((response: { data: IEntry[] }) => {
      console.log('Products fetched:', response.data)
      console.log(optionGet);
      response.data.forEach(element => {
        handles.value.push(element.handle);
      });
      console.log('handles:', handles);
    })
    .catch((error: any) => {
      console.log(optionGet);
      console.error('Error fetching recommendations:', error)
    })

  request(endpointSettings, optionGet)
    .then((response: { data: IConfig }) => {
      console.log('Config fetched:', response.data)
      Object.assign(configs.value, response.data)
      configLayout();
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
