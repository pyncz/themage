export const clipRange = (
  value: number | string | undefined,
  range?: { min?: number; max?: number },
): number | undefined => {
  if (value) {
    const v = +value
    if (range?.min !== undefined && v < range.min) {
      return range.min
    }
    if (range?.max !== undefined && v > range.max) {
      return range.max
    }
    return v
  }
}
