import ColorThief from 'colorthief/dist/color-thief.mjs'
import type { RGB } from '../models'

export const usePaletteByImageRef = (imageRef: Ref<HTMLImageElement | null>) => {
  const colorThief = new ColorThief()

  const processing = ref(false)

  const palette = computedAsync(
    async () => {
      const imageRefElement = unref(imageRef)
      if (imageRefElement) {
        if (imageRefElement.complete) {
          return await colorThief.getPalette(imageRefElement)
        } else {
          return await new Promise<RGB[] | null>((resolve) => {
            imageRefElement.addEventListener('load', async function readPalette() {
              // listen once
              imageRefElement.removeEventListener('load', readPalette)

              const res = await colorThief.getPalette(imageRefElement)
              resolve(res)
            })
          })
        }
      }
      return null
    },
    null,
    processing,
  )

  return { palette, processing }
}
