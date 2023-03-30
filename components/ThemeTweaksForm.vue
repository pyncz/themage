<template>
  <form class="tw-space-y-4" @submit.prevent>
    <theme-tweak
      v-slot="{ id }"
      :label="$t('tweaks.dim.label')"
      :description="$t('tweaks.dim.description')"
    >
      <lib-field :errors="v.dim.$errors">
        <lib-input
          :id="id"
          v-model="form.dim"
          type="number"
          :disabled="disabled"
          placeholder="0..1"
          :min="0"
          :max="1"
        />
      </lib-field>
    </theme-tweak>
    <theme-tweak
      v-slot="{ id }"
      :label="$t('tweaks.contrast.label')"
      :description="$t('tweaks.contrast.description')"
    >
      <lib-field :errors="v.contrast.$errors">
        <lib-input
          :id="id"
          v-model="form.contrast"
          type="number"
          :disabled="disabled"
          placeholder="0..1"
          :min="0"
          :max="1"
        />
      </lib-field>
    </theme-tweak>
    <theme-tweak
      v-slot="{ id }"
      :label="$t('tweaks.shift.label')"
      :description="$t('tweaks.shift.description')"
    >
      <lib-field :errors="v.shift.$errors">
        <lib-input
          :id="id"
          v-model="form.shift"
          type="number"
          :disabled="disabled || v.contrast.$invalid || form.contrast === 1"
          placeholder="-1..1"
        />
      </lib-field>
    </theme-tweak>
    <theme-tweak
      v-slot="{ id }"
      :label="$t('tweaks.balance.label')"
      :description="$t('tweaks.balance.description')"
    >
      <lib-field :errors="v.balance.$errors">
        <lib-input
          :id="id"
          v-model="form.balance"
          type="number"
          :disabled="disabled"
          placeholder="-1..1"
        />
      </lib-field>
    </theme-tweak>
  </form>
</template>

<script setup lang="ts">
import { useVuelidate } from '@vuelidate/core'
import type { ThemeTweaks } from '../services/getTheme'

const props = withDefaults(defineProps<{
  debounce?: number
  disabled?: boolean
}>(), {
  debounce: 500,
})

const { modelValue } = defineModel<{
  modelValue: ThemeTweaks
}>()

// init form from props
// NOTE: Not just spread in order not to break vuelidate' types' interferance
const form = ref({
  dim: modelValue.value.dim,
  contrast: modelValue.value.contrast,
  shift: modelValue.value.shift,
  balance: modelValue.value.balance,
})

// Validation
const { normal, unormal } = useValidators()
const rules = {
  dim: { unormal },
  contrast: { unormal },
  shift: { normal },
  balance: { normal },
}

const v = useVuelidate(rules, form)

// Emit the model update with debounce if the form is valid
watchDebounced(form, async () => {
  const isValid = await v.value.$validate()
  modelValue.value = isValid
    ? { ...form.value }
    : {}
}, { debounce: props.debounce, deep: true })
</script>
