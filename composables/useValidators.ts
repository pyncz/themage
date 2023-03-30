import { createI18nMessage, helpers } from '@vuelidate/validators'

export const useValidators = () => {
  const { t } = useI18n()
  const withI18nMessage = createI18nMessage({ t })

  const range = ({ min, max }: { min: number; max: number }) => withI18nMessage({
    $validator: (v: number | string) => !helpers.req(v) || ((+v >= min) && (+v <= max)),
    $message: `The value should be from ${min} to ${max} inclusive`,
  })

  return { range }
}
