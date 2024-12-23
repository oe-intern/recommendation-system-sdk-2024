<template lang="pug">
Skeleton(
  v-if="dataLoaded==false", 
)
div.product(
  v-else-if="dataLoaded==true", 
  :style="bgColor",
)
  img.image(
    :src="image.src",
    :alt="image.alt",
    @click="productClick",
  )
  div.information
    a.name(
      :style="colorConfig", 
      @click="productClick"
    ) 
      | {{ product.title }}
    div.price 
      | {{ variant.price }}{{ variant.price_currency }}
    select.variant(
      v-model="selectedVariant",
    )
      option.choose(
        v-for="variant in product.variants", 
        :key="variant.id", 
        :value="variant.position",
      ) 
        | &nbsp; {{ variant.title }}
  AddCart(
    @addToCart="clickAddToCart",
  )
div.connect(
  style="align-content: center;"
) 
  | +
</template>

<script setup lang="ts">
import type { IProduct, IConfig, IVariant, IImage } from '@/types'
import { addToCart, redirect, jsonUrl, refresh, request, productUrl } from '@/services'
import { computed, reactive, defineProps, ref } from 'vue'
import axios from 'axios'

const { handle, configs } = defineProps<{ handle: string; configs: IConfig }>()
const product = reactive<IProduct>({} as IProduct)
const emit = defineEmits()
const selectedVariant = ref(1)

const variant = computed<IVariant>(() =>
  product.variants[selectedVariant.value-1],
)
const image = computed<IImage>(() => 
  product.images[selectedVariant.value-1],
)

const colorConfig = {color: configs?.text_color || '#000'}
const bgColor = {backgroundColor : configs?.background_color || '#fff'}

const dataLoaded = ref(false)

console.log('product')
import data from '../new.json'
import AddCart from '@/components/Element/AddCart.vue';
import Skeleton from './Skeleton/ProductSkeleton2.vue';
  emit('rendered');
}

console.log('prop', data.products[0])
const options = {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
  },
}

console.log(window.location.href)
console.log(jsonUrl(handle))

request(jsonUrl(handle), options)
  .then((response: { product: IProduct }) => {
    console.log('jsonjson', response)
    Object.assign(product, response.product)
    if (response.product) {
      dataLoaded.value = true;
      emit('rendered')
    }
  })
  .catch((error: any) => {
    dataLoaded.value = false;
    console.error('json', error)
  })

const startPoint = 'https://localhost:443'
async function clickAddToCart() {
  const prod = variant.value.id
  console.log('Add ', prod, 'to cart')
  const body = {
    number_of_items: 1,
    product_id: product.id,
  }
  try {
    await addToCart(prod, 1)
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
    console.log('click:', productUrl() + handle)
    redirect(productUrl() + handle)
  } catch (error) {
    console.error('Cannot redirect', error)
    alert('Cannot redirect to this product')
  }
}
</script>

<style lang="scss" scoped>
@use '../../../scss/components/comboProduct/product-layout2';
</style>
