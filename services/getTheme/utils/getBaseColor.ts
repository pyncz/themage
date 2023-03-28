import chroma from 'chroma-js'
import { BASE_COLOR_SATURATION, BASE_COLOR_VALUE } from '../consts'
import type { RGB } from '../models'

export const getBaseColor = (main: RGB): RGB => {
  return chroma(main)
    .set('hsl.s', BASE_COLOR_SATURATION)
    .set('hsv.v', BASE_COLOR_VALUE)
    .rgb()
}
