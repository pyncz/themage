import type { ColorMode } from './color'
import type { Theme, ThemeMetadata } from './theme'

export interface AdjustOptions {
  /**
   * Desaturate the colors (0..1)
   * @default 0
   */
  dim?: number
}

export interface ScaleOptions {
  /**
   * Cuts the contrast edges of the color scale (0..1)
   * @default 1
   */
  contrast?: number

  /**
   * Shifts the color scale into light / dark area (-1..1)
   * Applied only if any non-default `contrast` is provided
   * @default 0
   */
  shift?: number

  /**
   * Shifts the light / dark balance (-1..1)
   * @default 0
   */
  balance?: number
}

export type ThemeTweaks = AdjustOptions & ScaleOptions

export interface ScaleInternalOptions extends ScaleOptions {
  valueFrom?: number
  valueTo?: number
}

export interface GetThemeOptions extends ThemeTweaks {
  /**
   * Forced color mode
   * @default null (determined from the palette's first color)
   */
  colorMode?: null | ColorMode

  /**
   * Number of varants in each color's scale (1..)
   * @default 12
   */
  volume?: number

  /**
   * Number of varants in the accent colors' scales  (1..)
   * @default {@link volume}
   */
  accentsVolume?: number

  /**
   * Max number of accent colors (0..)
   * @default 3
   */
  maxAccents?: number
}

export interface GetThemeReturn {
  theme: Theme
  metadata: ThemeMetadata
}
