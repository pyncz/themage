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
      black: co('--c-black'),
      white: co('--c-white'),
      state: {
        error: co('--c-state-error'),
        warning: co('--c-state-warning'),
      },
      accent: fill(3, i => ({
        DEFAULT: co(`--c-accent-${i}`),
        vivid: co(`--c-accent-${i}-vivid`),
        muted: co(`--c-accent-${i}-muted`),
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
      ...fill(4, i => co(`--c-color-${i}`)),
    }),
    backgroundColor: theme => ({
      ...theme('colors'),
      ...fill(4, i => co(`--c-bg-${i}`)),
    }),
    borderColor: theme => ({
      ...theme('colors'),
      transparent: 'transparent',
    }),
    borderRadius: {
      0: '0',
      sm: '0.125rem',
      DEFAULT: '0.5rem',
      lg: '1rem',
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
      card: '0 0 1rem -0.5rem rgb(var(--c-color-1))',
    },

    extend: {
      screens: {
        '2xs': '320px',
        'xs': '400px',
      },
    },
  },
  plugins: [
    plugin(addHeaders),
    plugin(addLayouts),
    plugin(addUtils),
  ],
}
