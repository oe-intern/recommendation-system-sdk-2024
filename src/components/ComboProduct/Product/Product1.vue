<template lang="pug">
.product
  .attribute
    img.image(:src="product.featuredMedia.preview.image.url",alt="Description of SVG",@click="productClick")
    .information
      .name {{ product.title }}
      select(v-if="product.typeprod")
        option(v-for="variant in product.typeprod", :key="variant.name") {{ variant.name }}
      .price {{ product.priceRangeV2.maxVariantPrice.amount }}{{ product.priceRangeV2.maxVariantPrice.currencyCode }}
  button.add-to-cart(@click="clickAddToCart") Add
</template>

<script setup lang="ts">
import { defineProps, inject, onMounted } from 'vue'
import axios from 'axios'
const props = defineProps<{ product: Object; }>();
const pid = props.product.id.split('/').pop();
const configs = inject<object>("configs");
onMounted(() => {
  const productClass = document.getElementsByClassName('product');
  console.log(productClass[0]);
  Array.from(productClass).forEach(element => {
    // element.style.font-size = '1px';
  });
});
async function clickAddToCart() {
  const body = {
    product_id: pid,
    interaction_type: 'add_to_cart',
  }
  const response = await axios.post('https://localhost:443/api/sdk/interaction', body)
  console.log('Success cart:', response)
}

async function productClick() {
  const body = {
    product_id: pid,
    interaction_type: 'click',
  }
  const response = await axios.post('https://localhost:443/api/sdk/interaction', body)
  console.log('Success click:', response)
}
</script>

<style lang="scss" scoped>
.product {
  display: flex;
  justify-content: space-between;
  align-items: center;
  // font: 100 1.6vh 'Arial';
  font-size: 9px;

  .attribute {
    width: 80%;
    display: flex;
    gap: 8%;
    
    .image {
      height: 100px;
      min-width: 100px;
      align-items: center;
      object-fit: fill;
      width: 100px;
    }

    .information {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      font-size: 1.8vh;

      .name {
        width: 15em;
        font-size: 1em;
        white-space: nowrap;       /* Prevent text from wrapping to the next line */
        overflow: hidden;          /* Hide overflowing text */
        text-overflow: ellipsis;   /* Add ellipsis (...) for overflowing text */
      }

      .price {
        font-size: 1em;
      }
    }
  }

  .add-to-cart {
    background-color: black;
    color: white;
    border: 0;
    font-size: 2.3em;
    width: 3em;
    height: 2em;
  }
}
</style>
