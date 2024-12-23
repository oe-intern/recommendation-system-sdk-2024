<template lang="pug">
div.placeholder(
  v-if='isBackground',
)
  slot
div.backgroundHolder(
  v-else,
)
  slot
</template>


<script setup lang="ts">
defineProps({
  isBackground: {
    type: Boolean,
    default: false,
  },
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
}

.backgroundHolder {
  height: v-bind(height);
  width: v-bind(width);
  border-radius: v-bind(borderRadius);
  // background: linear-gradient(45deg, #f3ec78, #af4261);
}
</style>