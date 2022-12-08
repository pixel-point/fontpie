
const fontkit = require('fontkit')
const { calculateFallbackFontValues } = require('./util')

const TYPE_TO_FORMAT = {
  ttf: 'truetype',
  otf: 'opentype',
  woff: 'woff',
  woff2: 'woff2',
  eot: 'embedded-opentype'
}

const getFileName = (path) => path.split('/').pop()

module.exports = function (fontFile, { fallback = 'sans-serif', style = 'normal', weight = '400', name } = {}) {
  let font

  try {
    font = fontkit.openSync(fontFile)
  } catch (err) {
    console.error(err.message)
    return null
  }

  const values = calculateFallbackFontValues(font, fallback, style, weight)

  const fontFilename = getFileName(fontFile)
  const fontFormat = TYPE_TO_FORMAT[font.type.toLowerCase()]
  const fontFamily = name || font.familyName
  const fontStyle = style
  const fontWeight = weight

  return {
    ...values,
    fontFilename,
    fontFormat,
    fontFamily,
    fontStyle,
    fontWeight
  }
}
