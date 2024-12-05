<template lang="pug">
  .product-item(:style="itemStyle")
    img.product-image(
      :src="product.featuredMedia?.preview.image.url"
      :alt="product.title || 'Product Image'"
      :style="imageStyle"
    )
    .product-details
      h3.product-title(
        :style="{ color: config.text_color || '#000' }"
      ) {{ product.title }}
      p.product-price {{ product.priceRangeV2.maxVariantPrice.amount }} {{ product.priceRangeV2.maxVariantPrice.currencyCode }}
      p.product-description {{ product.description }}

</template>

<script setup lang="ts">
import { computed, defineProps } from 'vue';

import type { IConfig, IProduct } from '@/types';

const props = defineProps<{ 
  product: IProduct;
  config: IConfig;
  number_of_items: number;
}>();

const { config, number_of_items } = props;

const itemFlex = computed(() => {
  const min_number_of_items = number_of_items > config.number_of_items ? config.number_of_items : number_of_items;
  if (config.layout === '' || config.layout === 'Layout1') {
    return `1 1 calc(${100 / min_number_of_items}% - 2%)`;
  }
  return '1 1 100%';
});

const itemWidth = computed(() => {
  const min_number_of_items = number_of_items > config.number_of_items ? config.number_of_items : number_of_items;
  if (config.layout === '' || config.layout === 'Layout1' || config.layout === 'Layout3' || config.layout === null) {
    return `calc(${100 / min_number_of_items}% - 2%)`;
  }
  return '100%';
});

const imageHeight = computed(() => {
  if (config.layout !== 'layout2') {
    return 'auto';
  }
  return '100%';
});

const imageWidth = computed(() => {
  if (config.layout === 'layout2') {
    return 'auto';
  }
  return '100%';
});

const itemStyle = computed(() => ({
  flex: itemFlex.value,
  maxWidth: itemWidth.value,
  display: 'flex',
  flexDirection: config.layout === 'layout2' ? 'row' : 'column',
}));

const imageStyle = computed(() => ({
  height: imageHeight.value,
  width: imageWidth.value,
  maxHeight: config.layout === 'layout2' ? '10rem' : '20rem',
  maxWidth: config.layout === 'layout2' ? '20rem' : 'auto'
}));

</script>

<style lang="scss" scoped>
  @use '../../../scss/components/_product-item.scss';
</style>