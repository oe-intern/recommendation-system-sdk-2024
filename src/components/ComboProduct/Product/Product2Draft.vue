<template lang="pug">
  div.product(
    :style="{ ...backgroundColorConfig}",
  )
    div.img
      img.image(
        :src="image.src",
        :alt="image.alt",
      )
      div.price(
        :style="colorConfig",
      )
        | {{ money }}
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
      ) 
        | {{ product.title }}
    AddCart.add-to-cart(
    )
      | {{ "Add" }}
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
  src: props.product.image.src,
  alt: props.product.image.alt,
}));

const money = computed(() => {
  const price = props.product.variants.find((variant) => variant.position === selectedVariant.value)?.price;
  return price ? `$${price}` : '';
});

const product = props.product;


</script>

<style lang="scss" scoped>
@use '../../../scss/components/comboProduct/product-layout2';
@use '../../../scss/components/element/add-cart1.scss';
</style>
