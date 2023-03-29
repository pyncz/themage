<template>
  <div class="tw-space-y-1.5">
    <div class="tw-space-y-0.5">
      <div>
        <label :for="id">
          {{ label }}
        </label>
      </div>
      <p v-if="description" class="tw-text-7/8 tw-text-dim-2 tw-max-w-sm">
        {{ description }}
      </p>
    </div>
    <div>
      <slot v-bind="{ id }" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { v4 as uuid } from 'uuid'

defineProps<{
  label: string
  description?: string
}>()

const id = uuid()
</script>
