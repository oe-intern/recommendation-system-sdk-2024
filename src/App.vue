<template lang="pug">
//- HelloWorld
ComboProduct
RelatedItems
</template>

<script setup lang="ts">
import ComboProduct from './components/ComboProduct/ComboProduct.vue';
import RelatedItems from './components/RelatedItems/RelatedItems.vue';
// import HelloWorld from './HelloWorld.vue';
</script>

<style lang="scss">
@use './scss/app.scss';

body {
  background-color: #f0f0f0; /* light background color */
}
</style>
