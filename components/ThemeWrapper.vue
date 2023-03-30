<template>
  <main :style="styles" class="tw-bg-main tw-text-base tw-min-h-screen tw-flex tw-flex-col">
    <slot />
  </main>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useThemeStore } from '../stores'

// Sync stored styles
const themeStore = useThemeStore()
const { styles } = storeToRefs(themeStore)
</script>
