import chroma from 'chroma-js'
import type { AdjustOptions, RGB } from '../models'
import { MIN_SATURATION } from '../consts'
import { projection } from './projection'

export const adjust = (base: RGB, options?: AdjustOptions): RGB => {
  const { dim = 0 } = options ?? {}

  // desaturate on high `dim`
  return chroma(base)
    .set('hsi.s', `*${projection(dim, [1, MIN_SATURATION])}`)
    .rgb()
}
