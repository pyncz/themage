import type { MaybeRef } from '@vueuse/core'
import type { Theme } from '../services/getTheme'
import type { ThemeApplyOptions, ThemeMap } from '../models'
import { useThemeStore } from '../stores'

export const useThemeApply = (
  theme: MaybeRef<Theme | null>,
  options?: MaybeRef<ThemeApplyOptions>,
) => {
  const styles = computed(() => {
    const { base, accent } = unref(theme) ?? {}
    const {
      semanticNames = [],
    } = unref(options) ?? {}

    return {
      ...getColorsMap('base', base),
      ...accent?.reduce((accentsMap, color, index) => {
        const scope = getSemanticName(index, accent.length, semanticNames)
        return {
          ...accentsMap,
          ...getColorsMap(`accent-${scope}`, color),
        }
      }, {} as ThemeMap),
    }
  })

  const { setStyles } = useThemeStore()

  // when new styles are set, update root styles
  whenever(styles, setStyles)
}
