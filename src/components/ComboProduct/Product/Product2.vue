<template lang="pug">
  Skeleton(
    v-if="dataLoaded=='notYet'", 
  )
  div.product(
    v-else-if="dataLoaded=='true'", 
    :style="{ ...bgColor, ...opacity }",
  )
    div.img
      img.image(
        :src="image.src",
        :alt="image.alt",
        @click="productClick",
      )
      div.price(
        :style="colorConfig",
      )
        | {{ money }}
      div.sold-out(
        v-if="disable",
      )
        | sold out
    div.information
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
      a.name(
        :style="colorConfig", 
        @click="productClick"
      ) 
        | {{ product.title }}
    AddCart.add-to-cart(
      :disabled="disable",
      @addToCart="clickAddToCart",
    )
      | {{ !disable ? "Add" : "Empty" }}
  div(
    v-else-if="dataLoaded=='false'",
  )
  </template>
  
  
  <script setup lang="ts">
  import AddCart from '@/components/Element/AddCart1.vue';
  import Skeleton from './Skeleton/ProductSkeleton2.vue';
  import type { IVariantJson, IImageJson, IProductJson, IProductJs, IConfig } from '@/types'
  import { addToCart, redirect, refresh, getStoreProductsUrl, Currency, request, getProductJsonUrl, getProductJsUrl } from '@/services'
  import { computed, defineProps, ref, reactive } from 'vue'
  import { endPointEvents, optionGet } from '@/config'
  import axios from 'axios'
  
  const { handle, configs } = defineProps<{ handle: string; configs: IConfig }>();
  const product = reactive<IProductJson>({} as IProductJson);
  const productJs = reactive<IProductJs>({} as IProductJs);
  function isAvailable() {
    return productJs.variants[selectedVariant.value-1].available;
  }
  function setAvailable(available: boolean) {
    productJs.variants[selectedVariant.value-1].available = available;
  }
  const emit = defineEmits();
  const selectedVariant = ref(1);
  
  const variant = computed<IVariantJson>(() => {
    console.log('selectedVariant', selectedVariant.value);
    return product.variants[selectedVariant.value-1];
  })
  
  const image = computed<IImageJson>(() => 
    product.images[selectedVariant.value-1],
  )
  
  const money = computed(() => {
    if(variant == undefined) {
      return '0';
    }
    else {
      let price = variant.value.price; 
      let currency = variant.value.price_currency;
      return currency == '$'
             ? Currency.formatMoney(price, currency + ' {{amount}}')
             : price + " " + currency
    }
  })
  
  const colorConfig = computed(() => {
    if(configs == undefined) {
      return {
        color: '#000',
      }
    }
    return {
      color: configs?.text_color,
    }
  });
  
  const bgColor = computed(() => {
    if(configs == undefined) {
      return {
        backgroundColor: '#fff',
      }
    }
    return {
      backgroundColor : configs?.background_color,
    }
  });
  
  const disable = computed(() => {
    if(productJs == undefined) {
      return true;
    }
    return (!isAvailable()) ? true : false;
  });
  
  const opacity = computed(() => {
    if(productJs == undefined) {
      return {
        opacity: 1,
      }
    }
    return {
      opacity: (!isAvailable()) ? 0.75 : 1,
    }
  });
  
  const dataLoaded = ref('notYet');
  
  request(getProductJsonUrl(handle), optionGet)
    .then((response: { product: IProductJson }) => {
      console.log('get json', response);
      Object.assign(product, response.product);
      if (response.product) {
        dataLoaded.value = 'true';
        emit('rendered');
      }
    })
    .catch((error: any) => {
      dataLoaded.value = 'false';
      console.error('get json', error);
    })
  
  request(getProductJsUrl(handle), optionGet)
    .then((response: { product: IProductJs }) => {
      console.log('get js', response);
      Object.assign(productJs, response);
    })
    .catch((error: any) => {
      console.error('get js', error);
    })
  
  async function clickAddToCart() {
    const prod = variant.value?.id;
    console.log('Add ', prod, 'to cart');
    const body = {
      number_of_items: 1,
      product_id: product.id,
    };
    try {
      if(await addToCart(prod, 1) == false) {
        setAvailable(false);
        return;
      }
      const response = await axios.post(`${endPointEvents}/add-to-cart`, body);
      refresh();
      console.log('cart:', response);
    } catch (error) {
      console.error('Error adding to cart, please try again', error);
      alert('Error adding to cart, please try again');
    }
  }
  
  async function productClick() {
    const body = {
      product_id: product.id,
    }
    try {
      const response = await axios.post(`${endPointEvents}/click`, body);
      console.log(response);
      console.log('click:', getStoreProductsUrl() + handle);
      redirect(getStoreProductsUrl() + handle);
    } catch (error) {
      console.error('Cannot redirect', error);
    }
  }
  </script>
  
  
  <style lang="scss" scoped>
  @use '../../../scss/components/comboProduct/product-layout2';
  </style>