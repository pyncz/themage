<template>
  <nav class="tw-flex tw-justify-center sm:tw-justify-start">
    <nuxt-link
      class="tw-mr-5"
      :to="localePath({ name: 'index' })"
    ><app-logo class="tw-h-8" /></nuxt-link>
  </nav>
</template>

<script setup lang="ts">
const localePath = useLocalePath()
</script>
