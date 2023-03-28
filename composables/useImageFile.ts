import { Buffer } from 'buffer'
import type { MaybeRef } from '@vueuse/core'
import { toRefs } from '@vueuse/core'

interface FileData {
  arrayBuffer: ArrayBuffer | null
  type: string | null
  name: string | null
}

export const useImageFile = (file: MaybeRef<File | null>) => {
  const isProcessing = ref(false)

  const fileData = computedAsync<FileData>(
    async () => {
      const data = unref(file)
      if (data) {
        return {
          arrayBuffer: await data.arrayBuffer(),
          type: data.type,
          name: data.name,
        }
      }
      return {
        arrayBuffer: null,
        type: null,
        name: null,
      }
    },
    {
      arrayBuffer: null,
      type: null,
      name: null,
    },
    isProcessing,
  )

  const { type, name, arrayBuffer } = toRefs(fileData)

  const base64Data = computed(() => arrayBuffer?.value
    ? Buffer.from(arrayBuffer.value).toString('base64')
    : null,
  )

  const imageDataString = computed(() => type?.value && base64Data.value
    ? `data:${type.value};base64,${base64Data.value}`
    : null,
  )

  return { isProcessing, name, imageDataString, type, arrayBuffer }
}
