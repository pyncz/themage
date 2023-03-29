export const getSemanticName = (index: number, colorsNumber: number, aliases: string[] = []) => {
  return aliases.length >= colorsNumber
    ? aliases[index]
    : `${index + 1}`
}
