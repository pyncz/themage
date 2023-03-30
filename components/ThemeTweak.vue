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
    <lib-field :errors="errors">
      <lib-input
        :id="id"
        v-bind="$attrs"
        v-model="modelValue"
        type="number"
        :placeholder="placeholder"
      />
    </lib-field>
  </div>
</template>

<script setup lang="ts">
import type { ErrorObject } from '@vuelidate/core'
import { v4 as uuid } from 'uuid'

const props = defineProps<{
  label: string
  errors?: ErrorObject[]
  description?: string
  range?: { min?: number; max?: number }
}>()

const { modelValue } = defineModel<{
  modelValue?: number
}>()

const id = uuid()

const placeholder = computed(() => props.range?.max || props.range?.max
  ? `${props.range.min ?? ''}..${props.range.max ?? ''}`
  : undefined,
)
</script>
