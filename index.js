#! /usr/bin/env node

// ToDo
// - convert to npm package
// - convert to TS
// - write unit tests
// - write screenshot tests
const path = require('path')
const fontkit = require('fontkit')
const { program } = require('commander')

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

const TYPE_TO_FORMAT = {
  ttf: 'truetype',
  otf: 'opentype',
  woff: 'woff',
  woff2: 'woff2'
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

program
  // ToDo: add descriptions
  .argument('<file>', 'Font file')
  // ToDo: validate options
  .option(
    '-f, --fallback <serif|sans-serif>',
    'fallback font family: serif or sans-serif',
    'sans-serif'
  )
  .option('-s, --style <normal|italic>', 'font-style property', 'normal')
  .option('-w, --weight <number>', 'font-weight property', '400')
  .option(
    '-n, --name <string>',
    'font name what will be used for font-family property. Font filename by default'
  )
  .action((file, option) => {
    // ToDo: try...catch
    const font = fontkit.openSync(file)

    const {
      ascentOverride,
      descentOverride,
      lineGapOverride,
      fallbackFont,
      sizeAdjust
    } = calculateFallbackFontValues(font, option.fallback)

    const fontName = option.name || path.parse(file).name

    console.log(`Here is your @font-face:
=========================================

@font-face {
  font-family: '${fontName}';
  font-style: ${option.style};
  font-weight: ${option.weight};
  font-display: swap;
  src: url('${file}') format('${TYPE_TO_FORMAT[font.type.toLowerCase()]}');
}

@font-face {
  font-family: '${fontName} Fallback';
  font-style: ${option.style};
  font-weight: ${option.weight};
  src: local('${fallbackFont}');
  ascent-override: ${ascentOverride};
  descent-override: ${descentOverride};
  line-gap-override: ${lineGapOverride};
  size-adjust: ${sizeAdjust};
}

html {
  font-family: '${fontName}', '${fontName} Fallback';
}

=========================================`)
  })

program.parse()
