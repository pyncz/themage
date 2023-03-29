<template>
  <main :style="styles" class="tw-bg-main tw-text-base">
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
