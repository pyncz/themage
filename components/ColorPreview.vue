<template>
  <div class="tw-py-1 tw-inline-flex tw-flex-center-y tw-gap-2">
    <div
      :style="{ backgroundColor: rgb }"
      class="tw-size-em tw-rounded-sm tw-border tw-border-dim-2"
    />
    <copy-value :value="rgb" class="tw-text-7/8" />
  </div>
</template>

<script setup lang="ts">
import type { RGB } from '../models'

const props = defineProps<{
  color: RGB
}>()

const rgb = computed(() => `rgb(${props.color.join(', ')})`)
</script>
