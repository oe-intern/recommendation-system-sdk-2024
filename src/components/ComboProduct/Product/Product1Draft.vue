<template lang="pug">
  div.product(
    :style="backgroundColorConfig",
  )
    div.product__attribute
      img.image(
        :src="image.src",
        :alt="image.alt",
      )
      div.information
        a.name(
          :style="colorConfig", 
        ) 
          | {{ product.title }}
        div.price 
          | {{ money }}
        select.variant(
          v-model="selectedVariant",
        )
          option.choose(
            v-for="variant in product.variants", 
            :key="variant.id", 
            :value="variant.position",
          ) 
            | &nbsp; {{ variant.title }}
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

const image = computed(() => ({
  src: props.product.images[selectedVariant.value-1].src,
  alt: props.product.images[selectedVariant.value-1].alt,
}));

const money = computed(() => {
  const price = props.product.variants.find((variant) => variant.position === selectedVariant.value)?.price;
  return price ? `$${price}` : '';
});
</script>

<style lang="scss" scoped>
@use '../../../scss/components/comboProduct/product-layout1';
@use '../../../scss/components/element/add-cart1.scss';
</style>
