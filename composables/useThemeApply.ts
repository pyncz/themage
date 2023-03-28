import type { MaybeRef } from '@vueuse/core'
import type { Theme } from '../services/getTheme'
import type { RGB } from '../models'

const getColorsMap = (scope: string, colors?: RGB[]) => {
  return colors?.reduce((themeMap, color, index) => {
    themeMap[`--${scope}-${index + 1}`] = color.join(', ')
    return themeMap
  }, {} as Record<string, string>)
}

export const useThemeApply = (theme: MaybeRef<Theme | null>) => {
  const style = computed(() => {
    const { base, accent } = unref(theme) ?? {}
    return {
      ...getColorsMap('base', base),
      ...accent?.reduce((accents, accent, index) => {
        const updatedAccents = {
          ...accents,
          ...getColorsMap(`accent-${index + 1}`, accent),
        }
        return updatedAccents
      }, {}),
    }
  })

  useHead({
    style: [style.value],
  })
}
