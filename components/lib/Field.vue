<template>
  <div class="tw-space-y-0.5 tw-group/field">
    <slot />
    <div v-if="error" class="tw-duration-fast tw-opacity-muted group-focus-within/field:tw-opacity-soft tw-text-3/4 tw-text-state-error">
      {{ error }}
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ErrorObject } from '@vuelidate/core'

const props = defineProps<{
  errors?: ErrorObject[]
}>()

const error = computed(() => unref(props.errors?.[0]?.$message) ?? null)
</script>
