<template lang="pug">
Skeleton(
  v-if="dataLoaded=='notYet'", 
)
div.product(
  v-else-if="dataLoaded=='true'", 
  :style="{ ...bgColor, ...opacity }",
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
    div.price(
      :style="colorConfig",
    )
      | {{ money }}
    select.variant(
      v-model="selectedVariant",
    )
      option.choose(
        v-for="variant in product.variants", 
        :key="variant.id", 
        :value="variant.position",
        :style="colorConfig",
      ) 
        | &nbsp; {{ variant.title }}
  AddCart(
    :style="{ ...display }",
    @addToCart="clickAddToCart",
  )
div(
  v-else-if="dataLoaded=='false'",
)
div.connect(
  style="align-content: center;"
) 
  | +
</template>

<script setup lang="ts">
import type { IVariantJson, IImageJson, IProductJson, IProductJs, IConfig } from '@/types'
import { addToCart, redirect, getProductJsonUrl, getProductJsUrl, refresh, request, getStoreProductsUrl } from '@/services'
import { computed, reactive, defineProps, ref } from 'vue'
import axios from 'axios'
import { Currency } from '@/services'
import { optionGet } from '@/config'

const { handle, configs } = defineProps<{ handle: string; configs: IConfig }>()
const product = reactive<IProductJson>({} as IProductJson)
const productJs = reactive<IProductJs>({} as IProductJs)
const emit = defineEmits()
const selectedVariant = ref(1)

const variant = computed<IVariantJson>(() => {
  console.log('selectedVariant', selectedVariant.value)
  return product.variants[selectedVariant.value-1]
})
const image = computed<IImageJson>(() => 
  product.images[selectedVariant.value-1],
)
const money = computed(() => {
  return variant != undefined
    ? (
        variant.value.price_currency == '$'
        ? Currency.formatMoney(variant.value.price, variant.value.price_currency + ' {{amount}}')
        : variant.value.price + " " + variant.value.price_currency
      )
    : '0';
})

const colorConfig = computed(() => {
  if(configs == undefined) {
    return {
      color: '#000'
    }
  }
  return {
    color: configs?.text_color
  }
})

const bgColor = computed(() => {
  if(configs == undefined) {
    return {
      backgroundColor: '#fff'
    }
  }
  return {
    backgroundColor : configs?.background_color
  }
})

const display = computed(() => {
  if(productJs == undefined) {
    return {
    }
  }
  return {
    display: (productJs.variants[selectedVariant.value-1].available == false) ? 'none' : 'block'
  }
})

const opacity = computed(() => {
  if(productJs == undefined) {
    return {
      opacity: 1
    }
  }
  console.log("opacity", productJs.variants[selectedVariant.value-1].available);
  return {
    opacity: (productJs.variants[selectedVariant.value-1].available == false) ? 0.4 : 1
  }
})

console.log("oppa", opacity)
const dataLoaded = ref('notYet')

console.log('product')
import AddCart from '@/components/Element/AddCart.vue';
import Skeleton from './Skeleton/ProductSkeleton2.vue';
<<<<<<< HEAD

=======
import data from '../new.json'
import dataa from '../nn.json'
>>>>>>> main
if(0) {
  Object.assign(product, data.products[0]);
  Object.assign(productJs, dataa.product);
  dataLoaded.value = 'true';
  emit('rendered');
}

console.log(window.location.href)

request(getProductJsonUrl(handle), optionGet)
  .then((response: { product: IProductJson }) => {
    console.log('jsonjson', response)
    Object.assign(product, response.product)
    if (response.product) {
      console.log('succ')
      dataLoaded.value = 'true';
      emit('rendered')
    }
  })
  .catch((error: any) => {
    dataLoaded.value = 'false';
    console.error('json', error)
  })
request(getProductJsUrl(handle), optionGet)
  .then((response: { product: IProductJs }) => {
    console.log('jsjs', response);
    // console.log(response);
    Object.assign(productJs, response)
    // if (response.product) {
    //   console.log('succ')
    //   dataLoaded.value = 'true';
    //   emit('rendered')
    // }
  })
  .catch((error: any) => {
    // dataLoaded.value = 'false';
    console.error('js', error)
  })

const startPoint = 'https://localhost:443'
async function clickAddToCart() {
  const prod = variant.value.id;
  console.log('Add ', prod, 'to cart');

  const body = {
    number_of_items: 1,
    product_id: product.id,
  }
  
  try {
    if(await addToCart(prod, 1) == false) {
      productJs.variants[selectedVariant.value-1].available = false;
      return;
    }
    const response = await axios.post(`${startPoint}/api/sdk/events/add-to-cart`, body)
    // if (response.status === 200) {
      refresh()
    // } else if (response.status !== 200 || response.data.error) {
    //   throw new Error(response.data.error || 'unexpected error occurred')
    // }
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
    // if (response.status !== 200 || response.data.error) {
    //   throw new Error(response.data.error || 'unexpected error occurred')
    // }
    console.log(response)
    console.log('click:', getStoreProductsUrl() + handle)
    redirect(getStoreProductsUrl() + handle)
  } catch (error) {
    console.error('Cannot redirect', error)
    alert('Cannot redirect to this product')
  }
}

</script>

<style lang="scss" scoped>
@use '../../../scss/components/comboProduct/product-layout2';
</style>
