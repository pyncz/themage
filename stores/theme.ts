import { defineStore } from 'pinia'
import type { ThemeMap } from '../models'

export const useThemeStore = defineStore('theme', () => {
  const styles = ref<ThemeMap>({})

  const setStyles = (newStyles: ThemeMap) => {
    styles.value = newStyles
  }

  return { styles: readonly(styles), setStyles }
})
