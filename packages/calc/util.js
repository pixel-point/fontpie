const DefaultFont = {
  SERIF: {
    REGULAR: {
      name: 'Times New Roman',
      azAvgWidth: 854.3953488372093,
      unitsPerEm: 2048
    },
    BOLD: {
      name: 'Times New Roman Bold',
      azAvgWidth: 907.5581395348837,
      unitsPerEm: 2048
    },
    REGULAR_ITALIC: {
      name: 'Times New Roman Italic',
      azAvgWidth: 846.5581395348837,
      unitsPerEm: 2048
    },
    BOLD_ITALIC: {
      name: 'Times New Roman Bold Italic',
      azAvgWidth: 867.8837209302326,
      unitsPerEm: 2048
    }
  },
  SANS_SERIF: {
    REGULAR: {
      name: 'Arial',
      azAvgWidth: 934.5116279069767,
      unitsPerEm: 2048
    },
    BOLD: {
      name: 'Arial Bold',
      azAvgWidth: 1011.046511627907,
      unitsPerEm: 2048
    },
    REGULAR_ITALIC: {
      name: 'Arial Italic',
      azAvgWidth: 934.5116279069767,
      unitsPerEm: 2048
    },
    BOLD_ITALIC: {
      name: 'Arial Bold Italic',
      azAvgWidth: 1011.046511627907,
      unitsPerEm: 2048
    }
  },
  MONO: {
    REGULAR: {
      name: 'Courier New',
      azAvgWidth: 1229,
      unitsPerEm: 2048
    },
    BOLD: {
      name: 'Courier New Bold',
      azAvgWidth: 1229,
      unitsPerEm: 2048
    },
    REGULAR_ITALIC: {
      name: 'Courier New Italic',
      azAvgWidth: 1229,
      unitsPerEm: 2048
    },
    BOLD_ITALIC: {
      name: 'Courier New Bold Italic',
      azAvgWidth: 1229,
      unitsPerEm: 2048
    }
  }
}

const getFallbackFont = (family, weight, style) => {
  const _family = family === 'serif' ? 'SERIF' : family === 'mono' ? 'MONO' : 'SANS_SERIF'
  const _weight = weight === 'bold' || weight > 500 ? 'BOLD' : 'REGULAR'
  const _style = style === 'italic' ? '_ITALIC' : ''

  return DefaultFont[_family][_weight + _style]
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

function calculateFallbackFontValues (font, family, style, weight) {
  const fallbackFont = getFallbackFont(family, weight, style)

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
  calcAverageWidth,
  calculateFallbackFontValues
}
