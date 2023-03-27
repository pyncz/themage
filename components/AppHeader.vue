<template>
  <nav>
    <nuxt-link :to="localePath({ name: 'index' })"><app-logo class="tw-h-8" /></nuxt-link>
  </nav>
</template>

<script setup lang="ts">
const localePath = useLocalePath()
</script>
