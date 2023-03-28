import { DEFAULT_VOLUME } from '../consts'
import type { GetThemeOptions } from '../models'

export const parseOptions = (options: GetThemeOptions = {}): NonNullable<GetThemeOptions> => {
  // Validate (and replace) options
  options.volume ??= DEFAULT_VOLUME
  if (options.volume < 1) {
    options.volume = 1
    console.warn('Volume is less than 1! One color for each scope (base / accent) will be used by default')
  }

  options.maxAccents ??= 3
  if (options.maxAccents < 1) {
    options.maxAccents = 0
    console.warn('Max number of accent colors is less than 1! Provide positive number to add any accents into the theme')
  }

  return options
}
