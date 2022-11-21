import fontkit from 'fontkit'

import { calculateFallbackFontValues } from './util'

const TYPE_TO_FORMAT = {
  ttf: 'truetype',
  otf: 'opentype',
  woff: 'woff',
  woff2: 'woff2',
  eot: 'embedded-opentype'
}

const getFileName = (path) => path

export default function (fontFile, { fallback, style, weight, name }) {
  let font

  try {
    font = fontkit.openSync(fontFile)
  } catch (err) {
    console.error(err.message)
    return null
  }

  const values = calculateFallbackFontValues(font, fallback)

  const fontFilename = name || getFileName(fontFile)
  const fontFormat = TYPE_TO_FORMAT[font.type.toLowerCase()]
  const fontFamily = font.familyName
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
