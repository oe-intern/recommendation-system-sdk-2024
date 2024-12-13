<template lang="pug">
.product(:style="backgroundColorConfig")
  .attribute
    img.image(:src="product.images[selectedVariant-1].src",:alt="product.image.alt")
    .information
      .name(:style="colorConfig") {{ product.variants[selectedVariant-1].title }}
      .price {{ product.variants[selectedVariant-1].price }}{{ product.variants[selectedVariant-1].price_currency }}
      select.variant(v-if="product.variants" v-model="selectedVariant")
        option.choose(v-for="variant in product.variants", :key="variant.id", :value="variant.position") {{ variant.title }}
  button.add-to-cart() Add
</template>

<script setup lang="ts">
import { computed, defineProps } from 'vue'
import type { IProduct, IConfig } from '@/types';
import { ref } from 'vue';


const props = defineProps<{ product: IProduct; configs: IConfig }>();
const selectedVariant = ref(1); 

const colorConfig = computed(() => ({
  color: props.configs?.text_color || '#000',
}));

const backgroundColorConfig = computed(() => ({
  backgroundColor: props.configs?.background_color || '#000',
}));


</script>

<style lang="scss" scoped>
@use '../../../scss/components/comboProduct/product-layout1';
</style>
