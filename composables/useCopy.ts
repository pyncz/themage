import type { MaybeRef } from '@vueuse/core'

export const useCopy = (value: MaybeRef<string>) => {
  const isJustCopied = refAutoReset(false, 1000)

  const copy = async () => {
    await navigator.clipboard.writeText(unref(value))
    isJustCopied.value = true
  }

  return {
    isJustCopied,
    copy,
  }
}
