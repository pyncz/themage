<template>
  <form class="tw-space-y-4" @submit.prevent>
    <theme-tweak
      v-model="form.dim"
      :label="$t('tweaks.dim.label')"
      :description="$t('tweaks.dim.description', dimRange)"
      :range="dimRange"
      :errors="v.dim.$errors"
      :disabled="disabled"
    />
    <theme-tweak
      v-model="form.contrast"
      :label="$t('tweaks.contrast.label')"
      :description="$t('tweaks.contrast.description', contrastRange)"
      :range="contrastRange"
      :errors="v.contrast.$errors"
      :disabled="disabled"
    />
    <theme-tweak
      v-model="form.shift"
      :label="$t('tweaks.shift.label')"
      :description="$t('tweaks.shift.description', shiftRange)"
      :range="shiftRange"
      :errors="v.shift.$errors"
      :disabled="disabled || v.contrast.$invalid || form.contrast === 1"
    />
    <theme-tweak
      v-model="form.balance"
      :label="$t('tweaks.balance.label')"
      :description="$t('tweaks.balance.description', balanceRange)"
      :range="balanceRange"
      :errors="v.balance.$errors"
      :disabled="disabled"
    />
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
const normal = { min: -1, max: 1 } // A normal
const unormal = { min: 0, max: 1 } // An unsigned normal

const dimRange = unormal
const contrastRange = unormal
const shiftRange = normal
const balanceRange = normal

const { range } = useValidators()
const rules = {
  dim: { normal: range(dimRange) },
  contrast: { normal: range(contrastRange) },
  shift: { unormal: range(shiftRange) },
  balance: { unormal: range(balanceRange) },
}

const v = useVuelidate(rules, form)

// Emit the model update with debounce if the form is valid
watchDebounced(form, async (data) => {
  const isValid = await v.value.$validate()
  modelValue.value = isValid
    ? { ...data }
    : {
        dim: clipRange(data.dim, dimRange),
        contrast: clipRange(data.contrast, contrastRange),
        shift: clipRange(data.shift, shiftRange),
        balance: clipRange(data.balance, balanceRange),
      }
}, { debounce: props.debounce, deep: true })
</script>
