import { isClientSide } from './isClientSide'

export const getBaseUrl = () => {
  // browser should use relative url
  if (isClientSide()) {
    return ''
  }

  // SSR should use vercel url
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`
  }

  // dev SSR should use localhost
  return `http://localhost:${process.env.PORT ?? 3000}`
}

export const getAbsoluteBaseUrl = () => {
  return isClientSide()
    ? window.location.origin
    : getBaseUrl()
}
