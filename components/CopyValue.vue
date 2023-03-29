<template>
  <a
    role="button"
    class="tw-link tw-link-muted tw-decoration-dashed tw-text-dim-3 hover:tw-text-dim-2"
    @click="copy()"
  >
    <span class="tw-text-dim-2"><slot>{{ value }}</slot></span>
    <Transition name="fade" :duration="100" mode="out-in">
      <icon v-if="isJustCopied" name="check" class="tw-ms-0.5" />
      <icon v-else name="copy" class="tw-ms-0.5" />
    </Transition>
  </a>
</template>

<script setup lang="ts">
const props = defineProps<{
  value: string
}>()
const value = toRef(props, 'value')

const { copy, isJustCopied } = useCopy(value)
</script>
