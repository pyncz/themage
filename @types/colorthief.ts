declare module 'colorthief/dist/color-thief.mjs' {
  class ColorThief {
    getPalette(
      image: string | HTMLImageElement,
      colorCount?: number,
      quality?: number,
    ): Promise<[number, number, number][]>

    getColor(
      image: string | HTMLImageElement,
      quality?: number,
    ): Promise<[number, number, number]>
  }

  export = ColorThief
}
