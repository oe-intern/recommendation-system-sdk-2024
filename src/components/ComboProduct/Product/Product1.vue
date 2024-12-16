<template lang="pug">
.skeleton(
  v-if="render==0", 
  style="background-color: gray;",
)
  br
  br
  br
  br
.fail(
  v-else-if="render==-1",
)
.product(
  v-else, 
  :style="bgColor",
)
  .attribute
    img.image(
      :src="product.images[selectedVariant-1].src",
      :alt="product.image.alt",@click="productClick",
    )
    .information
      .name(
        :style="colorConfig", 
        @click="productClick",
      ) 
        | {{ product.variants[selectedVariant-1].title }}

      .price 
        | {{ product.variants[selectedVariant-1].price }}{{ product.variants[selectedVariant-1].price_currency }}
      select.variant(
        v-if="product.variants",
        v-model="selectedVariant",
      )
        option.choose(
          v-for="variant in product.variants", 
          :key="variant.id", 
          :value="variant.position",
        ) 
          | {{ variant.title }}
  button.add-to-cart(
    @click="clickAddToCart",
  ) 
    | Add
</template>

<script setup lang="ts">
import type { IProduct, IConfig } from '@/types'
import { addToCart, redirect, jsonUrl, refresh, request, productUrl } from '@/services'
import { computed, reactive, defineProps, ref } from 'vue'
import axios from 'axios'

const emit = defineEmits()
const props = defineProps<{ handle: string; configs: IConfig }>()
const product = reactive<IProduct>({} as IProduct)
const selectedVariant = ref(1)
const colorConfig = computed(() => ({
  color: props.configs?.text_color || '#000',
}))
const bgColor = computed(() => ({
  backgroundColor: props.configs?.background_color || '#eee',
}))
const render = ref(0)
import data from '../new.json'

console.log('prop', data.products[0])
const options = {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
  },
}

console.log(window.location.href)
console.log(jsonUrl(props.handle))

request(jsonUrl(props.handle), options)
  .then((response: { product: IProduct }) => {
    console.log('jsonjson', response)
    Object.assign(product, response.product)
    if (response.product) {
      render.value = 1
      emit('rendered')
    }
  })
  .catch((error: any) => {
    render.value = -1
    console.error('json', error)
  })

const startPoint = 'https://localhost:443'
async function clickAddToCart() {
  const prod = product.variants[selectedVariant.value - 1].id
  console.log('Add ', prod, 'to cart')
  const body = {
    number_of_items: 1,
    product_id: product.id,
  }
  try {
    addToCart(prod, 1)
    const response = await axios.post(`${startPoint}/api/sdk/events/add-to-cart`, body)
    if (response.status === 200) {
      refresh()
    } else if (response.status !== 200 || response.data.error) {
      throw new Error(response.data.error || 'unexpected error occurred')
    }
    console.log('cart:', response)
  } catch (error) {
    console.error('Error adding to cart, please try again', error)
    alert('Error adding to cart, please try again')
  }
}

async function productClick() {
  const body = {
    product_id: product.id,
  }
  try {
    const response = await axios.post(`${startPoint}/api/sdk/events/click`, body)
    if (response.status !== 200 || response.data.error) {
      throw new Error(response.data.error || 'unexpected error occurred')
    }
    console.log(response)
    console.log('click:', productUrl() + props.handle)
    redirect(productUrl() + props.handle)
  } catch (error) {
    console.error('Cannot redirect', error)
    alert('Cannot redirect to this product')
  }
}
</script>

<style lang="scss" scoped>
@use '../../../scss/components/comboProduct/product-layout1';
</style>
