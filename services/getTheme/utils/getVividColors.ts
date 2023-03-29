import chroma from 'chroma-js'
import type { RGB } from '../models'

export const getVividColors = (palette: RGB[]): RGB[] => {
  return palette.reduce((vividColors, color) => {
    let chromaColor = chroma(color)

    // filter accent colors by intencity / saturation
    if (chromaColor.get('hsv.v') > 0.15 && chromaColor.get('hsv.s') > 0.25 && chromaColor.get('hsl.l') > 0.1) {
      // adjust color
      chromaColor = chromaColor.set('hsv.v', 1)

      // check if there are similar colors in the palette already
      if (!vividColors.some(c => chroma.deltaE(c, chromaColor) < 25)) {
        vividColors.push(chromaColor)
      }
    }
    return vividColors
  }, [] as chroma.Color[]).map(c => c.rgb())
}
