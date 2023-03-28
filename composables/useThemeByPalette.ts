import type { MaybeRef } from '@vueuse/core'
import { toRefs } from '@vueuse/core'
import type { RGB } from '../models'
import { getColorTheme } from '../services/getTheme'
import type { GetThemeOptions, Theme, ThemeMetadata } from '../services/getTheme'

interface ThemeResults {
  theme: Theme | null
  metadata: ThemeMetadata | null
}

export const useThemeByPalette = (
  palette: MaybeRef<RGB[] | null>,
  options?: MaybeRef<GetThemeOptions>,
) => {
  const theme = computed<ThemeResults>(() => {
    const colorList = unref(palette)
    const opts = options ? unref(options) : undefined
    return colorList
      ? getColorTheme(colorList, opts)
      : { theme: null, metadata: null }
  })

  return toRefs(theme)
}
