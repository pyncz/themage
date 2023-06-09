import chroma from 'chroma-js'
import { BASE_LIGHTNESS_TO, BASE_VALUE_FROM, DEFAULT_VOLUME, MAX_CONTRAST_CUT, MAX_GAMMA_SHIFT } from '../consts'
import type { RGB, ScaleInternalOptions } from '../models'

export const scale = (
  base: RGB,
  volume = DEFAULT_VOLUME,
  options?: ScaleInternalOptions,
): RGB[] => {
  const {
    contrast = 1,
    balance = 0,
    shift = 0,
    valueFrom = BASE_VALUE_FROM,
    valueTo = BASE_LIGHTNESS_TO,
  } = options ?? {}

  const colorChroma = chroma(base).set('hsl.l', valueFrom)
  const middle = chroma(base).set('hsl.l', 0.5) // .set('hsv.v', 0.5)
  const opposite = chroma(base).set('hsl.l', valueTo)

  const padding = (1 - contrast) * MAX_CONTRAST_CUT

  return chroma.scale([colorChroma, middle, opposite])
    .gamma(1 - MAX_GAMMA_SHIFT * balance)
    .padding([
      padding + shift * padding,
      padding - shift * padding,
    ])
    .colors(volume, 'rgb')
}
