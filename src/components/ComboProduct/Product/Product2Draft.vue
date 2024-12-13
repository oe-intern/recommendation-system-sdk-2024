<template lang="pug">
.product(:style="backgroundColorConfig")
  img.image(:src="product.images[selectedVariant-1].src",:alt="product.image.alt")
  .information
    .name(:style="colorConfig") {{ product.variants[selectedVariant-1].title }}
    .price {{ product.variants[selectedVariant-1].price }}{{ product.variants[selectedVariant-1].price_currency }}
    select.variant(v-if="product.variants" v-model="selectedVariant")
      option.choose(v-for="variant in product.variants", :key="variant.id", :value="variant.position") {{ variant.title }}
  button.add-to-cart() Add
.connect(style="align-content: center;") +
</template>

<script setup lang="ts">
import { defineProps, ref, computed } from 'vue';
import type { IConfig, IProduct } from '@/types';

const selectedVariant = ref(1);

const props = defineProps<{ product: IProduct, configs: IConfig }>()

const colorConfig = computed(() => ({
  color: props.configs?.text_color || '#000',
}));

const backgroundColorConfig = computed(() => ({
  backgroundColor: props.configs?.background_color || '#000',
}));


</script>

<style lang="scss" scoped>
@use '../../../scss/components/comboProduct/product-layout2';
</style>
