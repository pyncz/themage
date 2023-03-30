<template>
  <label
    class="tw-group/input tw-flex tw-cursor-pointer tw-relative tw-rounded-lg tw-overflow-hidden tw-min-h-[10rem] tw-duration-normal tw-border tw-border-dashed tw-border-dim-2 hover:tw-border-dim-1 data-[over=true]:tw-border-accent-primary"
    :data-over="isOverDropZone"
  >
    <input
      ref="input"
      type="file"
      class="tw-hide"
      v-bind="$attrs"
      @change="onChange"
    >

    <div ref="dropZoneRef" class="tw-w-full tw-h-full tw-flex-center tw-p-4">
      <slot v-bind="{ selected, clear }" />
    </div>

    <div class="tw-absolute tw-inset-0 tw-pointer-events-none tw-duration-fast tw-opacity-0 group-hover/input:tw-opacity-full">
      <slot name="overlay" v-bind="{ isOverDropZone, selected }" />
    </div>
  </label>
</template>

<script setup lang="ts">
const dropZoneRef = ref<HTMLDivElement>()
const inputRef = ref<HTMLInputElement>()

const { modelValue: files } = defineModel<{
  modelValue: File[]
}>()

const selected = computed(() => !!files.value.length)

const onChange = (e: Event) => {
  const fileList = (e.currentTarget as HTMLInputElement).files
  // New file selected
  if (fileList?.length) {
    files.value = [...fileList]
  }
  // Otherwise, Cancel was pressed, keep the model
}

const clear = () => {
  files.value = []
  if (inputRef.value) {
    inputRef.value.value = ''
  }
}

const onDrop = (droppedFiles: File[] | null) => {
  files.value = droppedFiles?.filter(file => /^image\//.test(file.type)) ?? []
}

const { isOverDropZone } = useDropZone(dropZoneRef, onDrop)
</script>
