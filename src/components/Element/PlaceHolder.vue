<template lang="pug">
div.placeholder
  | &nbsp;
</template>

<script setup lang="ts">
defineProps({
  height: {
    type: String,
  },
  width: {
    type: String,
  },
  borderRadius: {
    type: String,
  },
});
</script>

<style lang="scss" scoped>
@use '../../scss/components/element/place-holder';
.placeholder {
  height: v-bind(height);
  width: v-bind(width);
  border-radius: v-bind(borderRadius);
//   background: linear-gradient(45deg, #f3ec78, #af4261);
}
</style>