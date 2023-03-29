import plugin from 'tailwindcss/plugin'
import maskImagePlugin from '@pyncz/tailwind-mask-image'
import headlessUiPlugin from '@headlessui/tailwindcss'
import addHeaders from './tailwind/headers'
import addLayouts from './tailwind/layouts'
import addUtils from './tailwind/utils'

const c = (color, opacityValue) => {
  return opacityValue === undefined
    ? `rgb(var(${color}))`
    : `rgba(var(${color}), ${opacityValue})`
}

// return color with concomitant opacity
const co = (color) => {
  return ({ opacityValue }) => c(color, opacityValue)
}

// fill values for enumerable props
const fill = (
  volume,
  valueGetter,
  keyGetter = i => `${i + 1}`,
) => {
  const config = {}
  for (let i = 0; i < volume; i++) {
    config[keyGetter(i, volume)] = valueGetter(i, volume)
  }
  return config
}

const colorRange = (scope, volume = 9) => {
  const getSuffix = i => `${i + 1}00`
  return fill(
    volume,
    i => co(`--${scope}-${getSuffix(i)}`),
    getSuffix,
  )
}

const accentColorRange = (scope) => {
  return {
    ...colorRange(scope),
    DEFAULT: co(`--${scope}`),
    vivid: co(`--${scope}-vivid`),
    muted: co(`--${scope}-muted`),
  }
}

const colorDimmed = (scope) => {
  const volume = 4
  const getSuffix = i => `dim-${i + 1}`
  return {
    base: co(`--${scope}-base`),
    ...fill(
      volume - 1,
      i => co(`--${scope}-${getSuffix(i)}`),
      getSuffix,
    ),
  }
}

const sansSerif = [
  'ui-sans-serif',
  'system-ui',
  '-apple-system',
  'sans-serif',
]

// Read more about tailwindcss configuration: https://tailwindcss.com/docs/configuration
export default {
  mode: 'jit',
  prefix: 'tw-',
  safelist: [
    'light-mode',
    'dark-mode',
  ],
  content: [
    './**/*.vue',
    './**/*.scss',
    './plugins/**/*.{js,ts}',
    './nuxt.config.{js,ts}',
  ],
  theme: {
    fontSize: {
      'xs': '0.75rem',
      'sm': '0.875rem',
      'normal': '1rem',
      'lg': '1.5rem',
      'xl': '2rem',
      '2xl': '3rem',
      '3xl': '4rem',

      '3/4': '0.75em',
      '7/8': '0.875em',
      'em': '1em',
    },
    container: {
      center: true,
      padding: {
        DEFAULT: '1.5rem',
        md: '2rem',
        lg: '2.5rem',
      },
    },
    colors: {
      black: co('--black'),
      white: co('--white'),
      base: colorRange('base', 12),
      accent: {
        primary: accentColorRange('accent-primary'),
        secondary: accentColorRange('accent-secondary'),
        tertiary: accentColorRange('accent-tertiary'),
      },
    },
    fontFamily: {
      header: ['Manrope', ...sansSerif],
      sans: ['"Open Sans"', ...sansSerif],
      mono: ['monospace'],
    },
    lineHeight: {
      1: 1,
      xs: 1.1,
      sm: 1.15,
      md: 1.5,
      inherit: 'inherit',
    },
    // skins
    textColor: theme => ({
      ...theme('colors'),
      ...colorDimmed('color'),
    }),
    backgroundColor: theme => ({
      ...theme('colors'),
      ...colorDimmed('bg'),
      card: co('--bg-card'),
      main: co('--bg-main'),
    }),
    borderColor: theme => ({
      ...theme('colors'),
      ...colorDimmed('border'),
      transparent: 'transparent',
    }),
    borderRadius: {
      0: '0',
      sm: '0.25rem',
      DEFAULT: '0.5rem',
      lg: '0.75rem',
      xl: '1rem',
      full: '9999px',
    },
    scale: {
      click: '0.975',
      normal: '1',
    },
    fill: theme => theme('textColor'),
    stroke: theme => theme('borderColor'),
    opacity: {
      0: '0',
      muted: '0.5',
      soft: '0.8',
      full: '1',
    },
    dropShadow: {
      title: 'var(--s-title)',
    },
    transitionDuration: {
      fast: '150ms',
      normal: '300ms',
      slow: '500ms',
    },
    zIndex: {
      muted: '-1',
      1: '1',
    },
    boxShadow: {
      card: '0 0 1rem -0.5rem rgb(var(--color-1))',
    },

    extend: {
      screens: {
        '2xs': '320px',
        'xs': '400px',
      },
      height: {
        image: '12rem',
      },
      spacing: {
        '1/2': '0.5em',
        'em': '1em',
      },
    },
  },
  plugins: [
    plugin(addHeaders),
    plugin(addLayouts),
    plugin(addUtils),
    maskImagePlugin,
    headlessUiPlugin,

    ({ theme, addUtilities, addComponents }) => {
      addUtilities({
        '.app-container': {
          'display': 'flex',
          'flexDirection': 'column',
          'paddingRight': theme('padding[4]'),
          'paddingLeft': theme('padding[4]'),
          '@screen sm': {
            paddingRight: theme('padding[6]'),
            paddingLeft: theme('padding[6]'),
          },
          '@screen md': {
            paddingRight: theme('padding[8]'),
            paddingLeft: theme('padding[8]'),
          },
        },
      })

      // visually hide
      addUtilities({
        '.hide': {
          zIndex: '-1',
          opacity: '0',
          position: 'fixed',
          top: '-20rem',
          left: '-20rem',
        },
      })

      // buttons
      addComponents({
        '.button': {
          'padding': '0.25em 0.5em',
          'minWidth': '4em',
          'fontSize': '0.875em',
          'height': '2em',
          'display': 'inline-flex',
          'justifyContent': 'center',
          'alignItems': 'center',
          'borderRadius': theme('borderRadius.sm'),
          'transitionDuration': theme('transitionDuration.fast'),
          'color': theme('colors.base.100'),
          'backgroundColor': theme('colors.accent.primary.DEFAULT'),
          'border': `1px solid ${theme('colors.accent.primary.vivid')}`,
          '&:hover': {
            transitionDuration: theme('transitionDuration.normal'),
            backgroundColor: theme('colors.accent.primary.vivid'),
          },
          '&:active': {
            transform: theme('scale.click'),
          },
          '&:disabled': {
            backgroundColor: theme('colors.accent.primary.muted'),
            opacity: theme('opacity.muted'),
          },
        },
        '.button-muted': {
          'color': theme('textColor.dim-1'),
          'backgroundColor': theme('backgroundColor.dim-1'),
          'border': `1px solid ${theme('backgroundColor.dim-2')}`,
          '&:hover': {
            backgroundColor: theme('backgroundColor.dim-2'),
          },
          '&:disabled': {
            color: theme('textColor.dim-2'),
            backgroundColor: theme('backgroundColor.dim-3'),
            opacity: theme('opacity.muted'),
          },
        },
      })

      // links
      addComponents({
        '.link': {
          'textDecorationLine': 'underline',
          'textUnderlineOffset': '1px',
          'transitionDuration': theme('transitionDuration.fast'),
          'color': theme('colors.accent.secondary.DEFAULT'),
          '&:hover': {
            transitionDuration: theme('transitionDuration.normal'),
            color: theme('colors.accent.secondary.vivid'),
          },
        },
        '.link-muted': {
          'color': theme('textColor.dim-2'),
          '&:hover': {
            color: theme('textColor.dim-1'),
          },
        },
      })
    },
  ],
}
