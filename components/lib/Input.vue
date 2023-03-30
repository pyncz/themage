<template>
  <input
    v-model="modelValue"
    class="!tw-outline-none tw-w-24 tw-duration-fast tw-border tw-border-dim-2 hover:tw-border-dim-1 focus:tw-border-accent-primary tw-h-8 tw-px-1 tw-py-0.5 tw-rounded-sm tw-bg-dim-1 tw-text-dim-1 focus:tw-text-base placeholder:tw-text-dim-3 disabled:tw-text-dim-3 disabled:placeholder:tw-text-opacity-muted disabled:tw-cursor-not-allowed disabled:tw-border-dim-2 tw-ring tw-ring-accent-primary tw-ring-opacity-0 focus:tw-ring-opacity-[0.25]"
  >
</template>

<script setup lang="ts">
const { modelValue } = defineModel<{
  modelValue?: string | number
}>()
</script>
