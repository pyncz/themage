<template>
  <div v-if="childColors?.length" class="tw-py-1/2">
    <h6 v-if="label" class="tw-mb-1">
      {{ label }}
    </h6>
    <PalettePreview
      v-for="childColor, index of childColors"
      :key="index"
      :colors="childColor"
      :label="`${label}-${getSemanticName(index, childColors.length, semanticNames)}`"
      class="tw-ml-1 tw-border-l tw-border-dim-2 tw-pl-3"
    />
  </div>
  <ColorPreview v-else-if="color" :color="color" />
</template>

<script setup lang="ts">
import type { RGB } from '../models'

type Color = RGB | Color[]

const props = defineProps<{
  colors?: Color
  label?: string
  semanticNames?: string[]
}>()

const isColor = computed(() =>
  props.colors
  && props.colors.length === 3
  && (props.colors as any[]).every(channel => typeof channel === 'number'),
)
const childColors = computed(() => isColor.value ? null : props.colors as Color[])
const color = computed(() => isColor.value ? props.colors as RGB : null)
</script>
