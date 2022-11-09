# Fontpie - get your layout shifts optimized with a CLI-generated piece of CSS.

## Features

- 🏃‍♂️ Runs from command line
- 💪 Generates fallback font metrics to match any custom web font
- 🚀 Framework, language, and bundler-agnostic solution

![Example](https://user-images.githubusercontent.com/2697570/200630610-d226dee1-df27-49e9-9d1f-bff0f5beb3e5.gif)

## The problem

Custom web font usage is one of the most common causes of cumulative layout shifts on a page. It happens because your custom font metrics differ from the fallback font metrics available in the operating system, and it is the fallback font that is used by the browser to calculate block sizes while the custom font is loading. Thus, the same text with the same `font-size` and `line-height` properties may occupy different amounts of space.

## The solution

Adjust metrics of the fallback font using [ascent-override](https://developer.mozilla.org/en-US/docs/Web/CSS/@font-face/ascent-override), [descent-override](https://developer.mozilla.org/en-US/docs/Web/CSS/@font-face/descent-override), [line-gap-override](https://developer.mozilla.org/en-US/docs/Web/CSS/@font-face/line-gap-override), [size-adjust](https://developer.mozilla.org/en-US/docs/Web/CSS/@font-face/size-adjust) properties based on the custom font metrics.

## Usage

```
npx fontpie ./Roboto.woff2 
```

**Output**
```css
@font-face {
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 400;
  font-display: swap;
  src: url('roboto-regular.woff2') format('woff2');
}

@font-face {
  font-family: 'Roboto Fallback';
  font-style: normal;
  font-weight: 400;
  src: local('Times New Roman');
  ascent-override: 84.57%;
  descent-override: 22.25%;
  line-gap-override: 0.00%;
  size-adjust: 109.71%;
}

html {
  font-family: 'roboto-regular', 'roboto-regular Fallback';
}
```

## Options

```
Usage: fontpie [options] <file>

Arguments:
  file                               Font file

Options:
  -f, --fallback <serif|sans-serif>  fallback font family: serif or sans-serif (default: "serif")
  -s, --style <normal|italic>        font-style property (default: "normal")
  -w, --weight <number>              font-weight property (default: "400")
  -n, --name <string>                font name that will be used as `font-family` property (default -- font filename)
  -h, --help                         display help for command
```

## ❤️ Credits

Big thanks to

- [Katie Hempenius](https://katiehempenius.com/) & [Kara Erickson](https://github.com/kara) on the Google Aurora team for an algorithm and suggestion - see [notes on calculating font metric overrides](https://docs.google.com/document/d/e/2PACX-1vRsazeNirATC7lIj2aErSHpK26hZ6dA9GsQ069GEbq5fyzXEhXbvByoftSfhG82aJXmrQ_sJCPBqcx_/pub)
- [Next.js](https://nextjs.org/) for an amazing implementation of it inside [next/font](https://nextjs.org/docs/basic-features/font-optimization)
- [Fontaine](https://github.com/unjs/fontaine) for the initial idea
