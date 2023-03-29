<template>
  <headless-switcher v-model="enabled" class="tw-switcher" :class="{ enabled }">
    <span class="indicator" />
  </headless-switcher>
</template>

<script setup lang="ts">
import { Switch as HeadlessSwitcher } from '@headlessui/vue'

const props = defineProps<{
  modelValue: boolean
}>()

const enabled = useVModel(props, 'modelValue')
</script>
