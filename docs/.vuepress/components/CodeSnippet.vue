<script setup lang="ts">
import { defineProps } from 'vue'

const props = defineProps({
  code: {
    type: String,
    required: true
  }
})
</script>

<template>
  {{code}}
</template>


<style scoped>

</style>
