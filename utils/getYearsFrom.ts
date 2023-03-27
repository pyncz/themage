/**
 * Makes string like `2022-2023`, from provided year till the current one
 * or just year if they are the same.
 *
 * @param start Year to start from (current year as default)
 *
 * @returns Years string
 */
export const getYearsFrom = (startYear?: number): string => {
  const currentYear = new Date().getFullYear()
  return startYear
    ? `${startYear}${currentYear > startYear ? `-${currentYear}` : ''}`
    : currentYear.toString()
}
