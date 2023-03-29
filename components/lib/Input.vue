<template>
  <input
    v-model="model"
    class="!tw-outline-none tw-w-24 tw-duration-fast tw-border tw-border-dim-2 hover:tw-border-dim-1 focus:tw-border-accent-primary tw-h-8 tw-px-1 tw-py-0.5 tw-rounded-sm tw-bg-dim-1 tw-text-dim-1 focus:tw-text-base placeholder:tw-text-dim-3 disabled:tw-text-dim-2 disabled:placeholder:tw-text-dim-3 disabled:tw-cursor-not-allowed tw-ring tw-ring-accent-primary tw-ring-opacity-0 focus:tw-ring-opacity-[0.25]"
  >
</template>

<script setup lang="ts">
const props = defineProps<{
  modelValue?: string | number
}>()

const model = useVModel(props, 'modelValue')
</script>
