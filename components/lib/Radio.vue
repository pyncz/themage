<template>
  <radio-group
    v-model="modelValue"
    class="tw-flex tw-text-sm tw-border tw-border-dim-2 tw-p-1.5 tw-duration-fast tw-rounded tw-flex-col sm:tw-flex-row sm:tw-inline-flex"
    :disabled="disabled"
  >
    <radio-group-option
      v-for="option, index of options"
      :key="getKey(option, index)"
      v-slot="optionScope"
      :value="getValue(option)"
    >
      <radio-group-label
        class="tw-group/option tw-h-8 tw-min-w-[2rem] tw-cursor-pointer tw-duration-fast tw-flex-center ui-checked:tw-bg-dim-2 ui-checked:tw-text-base tw-p-2 tw-rounded-sm tw-text-dim-2 ui-disabled:tw-text-dim-2 ui-disabled:tw-opacity-soft ui-disabled:tw-cursor-not-allowed ui-active:tw-text-base ui-not-checked:hover:tw-text-dim-1 ui-not-checked:hover:tw-bg-dim-1 active:tw-scale-click"
      >
        <slot name="option" v-bind="{ option, ...optionScope }">
          {{ option }}
        </slot>
      </radio-group-label>
    </radio-group-option>
  </radio-group>
</template>

<script setup lang="ts">
import {
  RadioGroup,
  RadioGroupLabel,
  RadioGroupOption,
} from '@headlessui/vue'

type Value = any
type Option = any

interface Props {
  options?: Option[]
  disabled?: boolean

  // How to render list of the options
  getKey?: (_option: Option, _index: number) => string | number

  // Getter to a value to use as a model
  getValue?: (_option: Option) => Value
}

withDefaults(defineProps<Props>(), {
  options: () => [],
  getKey: (_option: Option, index: number) => index,
  getValue: (option: Option) => option,
})

const { modelValue } = defineModel<{
  modelValue: Value
}>()
</script>
