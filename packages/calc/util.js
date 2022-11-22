const DEFAULT_SERIF_FONT = {
  name: 'Times New Roman',
  azAvgWidth: 854.3953488372093,
  unitsPerEm: 2048
}

const DEFAULT_SANS_SERIF_FONT = {
  name: 'Arial',
  azAvgWidth: 934.5116279069767,
  unitsPerEm: 2048
}

function calcAverageWidth (font) {
  const avgCharacters = 'aaabcdeeeefghiijklmnnoopqrrssttuvwxyz      '
  const hasAllChars = font
    .glyphsForString(avgCharacters)
    .flatMap((glyph) => glyph.codePoints)
    .every((codePoint) => font.hasGlyphForCodePoint(codePoint))

  if (!hasAllChars) {
    return undefined
  }

  const widths = font
    .glyphsForString(avgCharacters)
    .map((glyph) => glyph.advanceWidth)
  const totalWidth = widths.reduce((sum, width) => sum + width, 0)

  return totalWidth / widths.length
}

function formatOverrideValue (val) {
  return Math.abs(val * 100).toFixed(2) + '%'
}

function calculateFallbackFontValues (font, category = 'serif') {
  const fallbackFont =
      category === 'serif' ? DEFAULT_SERIF_FONT : DEFAULT_SANS_SERIF_FONT

  const azAvgWidth = calcAverageWidth(font)
  const { ascent, descent, lineGap, unitsPerEm } = font

  const fallbackFontAvgWidth =
      fallbackFont.azAvgWidth / fallbackFont.unitsPerEm
  const sizeAdjust = azAvgWidth
    ? azAvgWidth / unitsPerEm / fallbackFontAvgWidth
    : 1

  return {
    fallbackFont: fallbackFont.name,
    ascentOverride: formatOverrideValue(ascent / (unitsPerEm * sizeAdjust)),
    descentOverride: formatOverrideValue(descent / (unitsPerEm * sizeAdjust)),
    lineGapOverride: formatOverrideValue(lineGap / (unitsPerEm * sizeAdjust)),
    sizeAdjust: formatOverrideValue(sizeAdjust)
  }
}

module.exports = {
  calculateFallbackFontValues
}
