<template lang="pug">
button.add-to-cart(
  @click="clickCart",
) 
  | Add
</template>
<script setup lang="ts">
const emit = defineEmits()
function clickCart() {
  emit('addToCart')
}
</script>
<style lang="scss" scoped>
@use '../../scss/components/element/add-cart1.scss'
</style>
