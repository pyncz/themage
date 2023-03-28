const plugin = require('tailwindcss/plugin')
const addHeaders = require('./tailwind/headers')
const addLayouts = require('./tailwind/layouts')
const addUtils = require('./tailwind/utils')

function c(color, opacityValue) {
  return opacityValue === undefined
    ? `rgb(var(${color}))`
    : `rgba(var(${color}), ${opacityValue})`
}

// return color with concomitant opacity
function co(color) {
  return ({ opacityValue }) => c(color, opacityValue)
}

// fill values for enumerable props
function fill(
  size,
  valueFormer,
  start = 1,
  keyFormer = i => i,
) {
  const config = {}
  for (let i = start; i <= start + size - 1; i++) {
    config[keyFormer(i)] = valueFormer(i)
  }
  return config
}

const sansSerif = [
  'ui-sans-serif',
  'system-ui',
  '-apple-system',
  'sans-serif',
]

// Read more about tailwindcss configuration: https://tailwindcss.com/docs/configuration
module.exports = {
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
      state: {
        error: co('--state-error'),
        warning: co('--state-warning'),
      },
      accent: fill(3, i => ({
        DEFAULT: co(`--accent-${i}`),
        vivid: co(`--accent-${i}-vivid`),
        muted: co(`--accent-${i}-muted`),
      })),
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
      ...fill(4, i => co(`--color-${i}`)),
    }),
    backgroundColor: theme => ({
      ...theme('colors'),
      ...fill(4, i => co(`--bg-${i}`)),
    }),
    borderColor: theme => ({
      ...theme('colors'),
      text: fill(4, i => co(`--border-${i}`)),
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
    },
  },
  plugins: [
    plugin(addHeaders),
    plugin(addLayouts),
    plugin(addUtils),
    require('@pyncz/tailwind-mask-image'),

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
          'color': theme('textColor.1'),
          'backgroundColor': theme('backgroundColor.accent.1.DEFAULT'),
          'border': `1px solid ${theme('backgroundColor.accent.1.DEFAULT')}`,
          'transitionDuration': theme('transitionDuration.fast'),
          '&:hover': {
            transitionDuration: theme('transitionDuration.normal'),
            backgroundColor: theme('backgroundColor.accent.1.vivid'),
          },
          '&:active': {
            transform: theme('scale.click'),
          },
          '&:disabled': {
            backgroundColor: theme('backgroundColor.accent.1.muted'),
            color: theme('textColor.2'),
          },
        },
      })
    },
  ],
}
