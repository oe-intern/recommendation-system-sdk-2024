<template lang="pug">
ComboProduct
</template>

<script setup>
import ComboProduct from './components/ComboProduct/ComboProduct.vue';
import RelatedItems from './components/RelatedItems/RelatedItems.vue';
import { onMounted, createApp } from 'vue';
import HelloWorld from './HelloWorld.vue';

console.log("main.vue");
onMounted(() => {
  const embedEls = document.querySelectorAll('.fbt-embed');

  console.log("Number of embed elements:", embedEls.length);
  embedEls.forEach((el) => {
    const productId = el.dataset.productId;
    console.log("create App");
    createApp(HelloWorld).mount(el);
    createApp(ComboProduct, { id: productId }).mount(el);
  });

});

</script>

<style lang="scss">
@use './scss/app.scss';

body {
  background-color: #f0f0f0;
}
</style>
