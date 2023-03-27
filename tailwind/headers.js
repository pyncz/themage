module.exports = ({ addBase, theme, addUtilities }) => {
  const commonHeaderStyles = {
    fontFamily: theme('fontFamily.header'),
  }
  const headerSemiBoldStyles = {
    ...commonHeaderStyles,
    fontWeight: theme('fontWeight.semibold'),
    lineHeight: theme('lineHeight.sm'),
  }
  const headerBoldStyles = {
    ...commonHeaderStyles,
    fontWeight: theme('fontWeight.bold'),
    lineHeight: theme('lineHeight.sm'),
  }
  const headerExtraBoldStyles = {
    ...commonHeaderStyles,
    fontWeight: theme('fontWeight.extrabold'),
    lineHeight: theme('lineHeight.1'),
    textShadow: theme('dropShadow.title'),
  }

  const headers = {
    h1: {
      ...headerExtraBoldStyles,
      fontSize: theme('fontSize.3xl'),
      marginBottom: '0.5em',
    },
    h2: {
      ...headerExtraBoldStyles,
      fontSize: theme('fontSize.2xl'),
      marginBottom: '0.375em',
    },
    h3: {
      ...headerBoldStyles,
      fontSize: theme('fontSize.xl'),
      marginBottom: '0.25em',
    },
    h4: {
      ...headerBoldStyles,
      fontSize: theme('fontSize.lg'),
      marginBottom: '0.25em',
    },
    h5: {
      ...headerSemiBoldStyles,
      fontSize: theme('fontSize.normal'),
      marginBottom: '0.125em',
    },
    h6: {
      ...headerSemiBoldStyles,
      fontSize: theme('fontSize.sm'),
      marginBottom: '0.125em',
    },
  }

  // bind styles to tags
  addBase(headers)

  // create .h# utils (e.g. `tw-h6` etc)
  addUtilities(Object.entries(headers).reduce((utils, [tag, styles]) => ({
    ...utils,
    [`.${tag}`]: styles,
  }), {}))
}
