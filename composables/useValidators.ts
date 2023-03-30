import { createI18nMessage, helpers } from '@vuelidate/validators'

export function useValidators() {
  const { t } = useI18n()

  /**
   * Unsigned normal.
   * Checks if the value is in the [0..1] interval
   */
  const unormal = {
    $validator: (v: number | string) => !helpers.req(v) || ((+v >= 0) && (+v <= 1)),
    $message: 'The value should be from 0 to 1 inclusive',
  }

  /**
   * Normal.
   * Checks if the value is in the [-1..1] interval
   */
  const normal = {
    $validator: (v: number | string) => !helpers.req(v) || ((+v >= -1) && (+v <= 1)),
    $message: 'The value should be from -1 to 1 inclusive',
  }

  const withI18nMessage = createI18nMessage({ t })

  return {
    unormal: withI18nMessage(unormal),
    normal: withI18nMessage(normal),
  }
}
