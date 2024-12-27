<template lang="pug">
PlaceHolder.product-skeleton(
  :isBackground="true",
)
  | &nbsp;
  PlaceHolder.image-skeleton(
    borderRadius="50%",
  )
  | &nbsp;
  PlaceHolder.text-skeleton(
    :style="{ width: '50%' }",
  )
    | &nbsp;
  p(
    :style="{height: '0.5vw'}",
  )
    | &nbsp;
  PlaceHolder.text-skeleton(
    :style="{ width: '70%' }",
  )
    | &nbsp;
  | &nbsp;
</template>


<script setup lang="ts">
import PlaceHolder from '@/components/Element/PlaceHolder.vue';
</script>


<style lang="scss" scoped>
@use '../../../../scss/components/comboProduct/skeleton2';
</style>