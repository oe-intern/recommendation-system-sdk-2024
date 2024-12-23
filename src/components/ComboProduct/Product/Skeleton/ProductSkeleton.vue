<template lang="pug">
PlaceHolder.product-skeleton(
    :isBackground="true",
)
    PlaceHolder.image-skeleton(
        borderRadius="50%",
    )
    div.attribute-skeleton
        PlaceHolder.text-skeleton(
            :style="{ width: '30%' }",
        )
            | &nbsp;
        PlaceHolder.text-skeleton(
            :style="{ width: '80%' }",
        )
            | &nbsp;
        PlaceHolder.text-skeleton(
            :style="{ width: '50%' }",
        )
            | &nbsp;
</template>


<script setup lang="ts">
import PlaceHolder from '@/components/Element/PlaceHolder.vue';
</script>


<style lang="scss" scoped>
@use '../../../../scss/components/comboProduct/skeleton';
</style>