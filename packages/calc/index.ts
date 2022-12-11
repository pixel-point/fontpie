const fontkit = require('fontkit')
const { calculateFallbackFontValues } = require('./util')

import { FallbackFontValueType, FontDataAll, TypeToFormatType } from './types'

const TYPE_TO_FORMAT:TypeToFormatType = {
  ttf: 'truetype',
  otf: 'opentype',
  woff: 'woff',
  woff2: 'woff2',
  eot: 'embedded-opentype'
}

const getFileName = (path:string):string | undefined => path.split('/').pop()

module.exports = function (fontFile:string, { fallback = 'sans-serif', style = 'normal', weight = '400', name = '' } = {}):FontDataAll | null {
  let font

  try {
    font = fontkit.openSync(fontFile)
  } catch (err:any) {
    console.error(err.message)
    return null
  }

  const values: FallbackFontValueType = calculateFallbackFontValues(font, fallback, style, weight)

  const fontFilename = getFileName(fontFile)
  const fontFormat = TYPE_TO_FORMAT[font.type.toLowerCase() as keyof TypeToFormatType]
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
