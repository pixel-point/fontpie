import { FontTypeEnum, FontFamilyEnum } from './enums';

export type GetFallbackFontType = {
  name: string,
  azAvgWidth: number,
  unitsPerEm: number
};

export type FallbackFontValueType = {
  fallbackFont: string,
  ascentOverride: string,
  descentOverride: string,
  lineGapOverride: string,
  sizeAdjust: string,
};

export interface FontData {
  name: string,
  azAvgWidth: number,
  unitsPerEm: number
};

type FontTypeToFontData = Record<FontTypeEnum, FontData>;

export type DefaultFontType = Record<FontFamilyEnum, FontTypeToFontData>;

export interface FontDataAll extends FallbackFontValueType{
  fontFilename: string | undefined,
  fontFormat: string,
  fontFamily: string,
  fontStyle: string,
  fontWeight: string
};

export type TypeToFormatType = {
  ttf: string,
  otf: string,
  woff: string,
  woff2: string,
  eot: string
};
