import { DEFAULT_VOLUME } from '../consts'
import type { GetThemeOptions } from '../models'

export const parseOptions = (options: GetThemeOptions = {}): NonNullable<GetThemeOptions> => {
  // Validate (and replace) options
  options.volume ??= DEFAULT_VOLUME
  if (options.volume < 1) {
    options.volume = 1
    console.warn('Volume is less than 1! 1 color will be used by default')
  }

  options.accentsVolume ??= options.volume
  if (options.accentsVolume < 1) {
    options.accentsVolume = 1
    console.warn('Accents\' volume is less than 1! 1 color will be used by default')
  }

  options.maxAccents ??= 3
  if (options.maxAccents < 1) {
    options.maxAccents = 0
    console.warn('Max number of accent colors is less than 1! Provide positive number to add any accents into the theme')
  }

  return options
}
