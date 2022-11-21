#! /usr/bin/env node
const fontpie = require('fontpie')
const { program } = require('commander')

program
  .name('fontpie')
  .description(
    'Get your layout shifts optimized with a CLI-generated piece of CSS'
  )
  .argument('<file>', '*.ttf, *.otf, *.woff or *.woff2 font file')
  .option(
    '-f, --fallback <font-family>',
    'fallback font family type: "serif" or "sans-serif"',
    'sans-serif'
  )
  .option('-s, --style <style>', 'font-style value', 'normal')
  .option('-w, --weight <weight>', 'font-weight value', '400')
  .option(
    '-n, --name <name>',
    'font name that will be used as `font-family` property (default: font_filename)'
  )
  .action((file, option) => {
    const {
      ascentOverride,
      descentOverride,
      lineGapOverride,
      fallbackFont,
      sizeAdjust,
      fontFilename,
      fontFormat,
      fontFamily,
      fontStyle,
      fontWeight
    } = fontpie(file, option)

    console.log(`Here is your @font-face:
=========================================

@font-face {
  font-family: '${fontFamily}';
  font-style: ${fontStyle};
  font-weight: ${fontWeight};
  font-display: swap;
  src: url('${fontFilename}') format('${fontFormat}');
}

@font-face {
  font-family: '${fontFamily} Fallback';
  font-style: ${fontStyle};
  font-weight: ${fontWeight};
  src: local('${fallbackFont}');
  ascent-override: ${ascentOverride};
  descent-override: ${descentOverride};
  line-gap-override: ${lineGapOverride};
  size-adjust: ${sizeAdjust};
}

html {
  font-family: '${fontFamily}', '${fontFamily} Fallback';
}

=========================================`)
  })

program.parse()
