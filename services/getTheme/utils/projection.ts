export const projection = (value: number, domain: number | [number, number] = 1): number => {
  const strictDomain = typeof domain === 'number'
    ? [0, domain] as [number, number]
    : domain
  const range = strictDomain[1] - strictDomain[0]
  return strictDomain[0] + range * value
}
