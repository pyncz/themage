export enum ColorScheme {
  light = 'light',
  dark = 'dark',
}

export const colorModes = [
  'system',
  'image',
  ...Object.values(ColorScheme),
]
