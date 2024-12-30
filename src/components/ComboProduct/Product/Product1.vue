<template lang="pug">
Skeleton(
  v-if="dataLoaded=='notYet'", 
)
div.product(
  v-else-if="dataLoaded=='true'", 
  :style="{ ...bgColor, ...opacity }",
)
  div.sold-out(
    v-if="!available",
  )
    | sold out
  div.product__attribute
    img.image(
      :src="image.src",
      :alt="image.alt",
      @click="productClick",
    )
    div.information
      a.name(
        :style="colorConfig", 
        @click="productClick",
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
    :disabled="disable",
    @addToCart="clickAddToCart",
  )
div(
  v-else-if="dataLoaded=='false'",
)
</template>


<script setup lang="ts">
import type { IVariantJson, IImageJson, IProductJson, IProductJs, IConfig } from '@/types'
import { addToCart, redirect, getProductJsonUrl, getProductJsUrl, refresh, request, getStoreProductsUrl } from '@/services'
import { computed, reactive, defineProps, ref, watch, onMounted } from 'vue'
import axios from 'axios'
import { Currency } from '@/services'
import { optionGet, endPointEvents } from '@/config'

const { handle, configs } = defineProps<{ handle: string; configs: IConfig }>()
const product = reactive<IProductJson>({} as IProductJson)
const productJs = reactive<IProductJs>({} as IProductJs)
const emit = defineEmits()
const selectedVariant = ref(1)
const image = computed<IImageJson>(() => 
  product.images[selectedVariant.value-1],
)
const money = ref();
const available = ref(false);
const colorConfig = ref({ 
  color: configs.text_color,
});
const bgColor = ref({
  backgroundColor: configs.background_color,
});
const opacity = ref({
  opacity: 1
})
const variant = ref<IVariantJson>();
const disable = ref(false);
function availableCheck() {
  if (available.value === false) {
    opacity.value = { opacity: 0.7 };
    disable.value = true;
  } else {
    opacity.value = { opacity: 1 };
    disable.value = false;
  }
}
watch(selectedVariant, (newSelect) => {
  variant.value = product.variants[newSelect-1];
  const variantVal = variant.value;
  money.value = variant.value.price_currency == '$'
    ? Currency.formatMoney(variantVal.price, variantVal.price_currency + ' {{amount}}')
    : variantVal.price + " " + variantVal.price_currency;
  if(productJs.variants[selectedVariant.value-1].available == false) {
    available.value = false;
  }
  else {
    available.value = true;
  }
})

watch(available, (newVal) => {
  console.log('available:', newVal)
  availableCheck()
})
const dataLoaded = ref('notYet')
import AddCart from '@/components/Element/AddCart.vue';
import Skeleton from './Skeleton/ProductSkeleton.vue';
import data from '../new.json'
import dataa from '../nn.json'
if(1) {
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
    Object.assign(productJs, response)
  })
  .catch((error: any) => {
    console.error('js', error)
  })

async function clickAddToCart() {
  const prod = variant.value?.id;
  console.log('Add ', prod, 'to cart')
  const body = {
    number_of_items: 1,
    product_id: product.id,
  }
  try {
    if(await addToCart(prod, 1) == false) {
      productJs.variants[selectedVariant.value-1].available = false;
      return;
    }
    const response = await axios.post(`${endPointEvents}/add-to-cart`, body)
    refresh()
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
    const response = await axios.post(`${endPointEvents}/click`, body)
    console.log(response)
    console.log('click:', getStoreProductsUrl() + handle)
    redirect(getStoreProductsUrl() + handle)
  } catch (error) {
    console.error('Cannot redirect', error)
    // alert('Cannot redirect to this product')
  }
}
onMounted(() => {
  console.log('available:', available.value);
  availableCheck();
});

</script>


<style lang="scss" scoped>
@use '../../../scss/components/comboProduct/product-layout1';
</style>
