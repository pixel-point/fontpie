# Fontpie - get your layout shifts optimized with a CLI-generated piece of CSS! 

![npm](https://img.shields.io/npm/v/fontpie) ![npm](https://img.shields.io/npm/dm/fontpie)

## Features

🏃‍♂️ Runs from command line

💪 Generates fallback font metrics to match any custom web font

🚀 Framework, language, and bundler-agnostic solution

👀 Multiple fallback font-weight support

## The problem

Custom web font usage is one of the most common causes of cumulative layout shifts on a page. It happens because your custom font metrics differ from the fallback font metrics available in the operating system, and it is the fallback font that is used by the browser to calculate block sizes while the custom font is loading. Thus, the same text with the same `font-size` and `line-height` properties may occupy different amounts of space.

## The solution

Adjust metrics of the fallback font using [ascent-override](https://developer.mozilla.org/en-US/docs/Web/CSS/@font-face/ascent-override), [descent-override](https://developer.mozilla.org/en-US/docs/Web/CSS/@font-face/descent-override), [line-gap-override](https://developer.mozilla.org/en-US/docs/Web/CSS/@font-face/line-gap-override), [size-adjust](https://developer.mozilla.org/en-US/docs/Web/CSS/@font-face/size-adjust) properties based on the custom font metrics.

## The outcome

### Layout shift without metric adjustments
Layout shift is visible. Titles, descriptions takes more space with a fallback(Arial) until a custom font(Roboto) being loaded.
![Layouf shift without metric adjustments](https://user-images.githubusercontent.com/2697570/200821005-f9a0f362-d7ce-4469-bc2d-c201e61d6e94.gif)

### Layout shift with metric adjustments
Layout shift does not exist. Fallback font(Arial) with adjusted metrics takes the same space as a custom font(Roboto). 
![Layout shift with metric adjustments](https://user-images.githubusercontent.com/2697570/200821351-db4081c0-433b-48c1-8507-17b15fe4bd92.gif)

## Usage

1. Run the following command, make sure the relative path leads to your custom web font file:

    ```
    npx fontpie ./roboto-regular.woff2 --name Roboto
    ```

2. Copypaste the output alongside your font-face declarations: 
 
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
      font-family: 'Roboto', 'Roboto Fallback';
    }
    ```

## Options

```txt
Usage: index [options] <file>

Arguments:
  file                          *.ttf, *.otf, *.woff or *.woff2 font file

Options:
  -f, --fallback <font-family>  fallback font family type: "serif", "sans-serif" or "mono" (default: "san-serif")
  -s, --style <style>           font-style value (default: "normal")
  -w, --weight <weight>         font-weight value (default: "400")
  -n, --name <name>             font name what will be used as font-family value, by default font filename
  -h, --help                    display help for command
```

**Serif:** Times New Roman

**Sans-Serif:** Arial

**Monospace:** Courier New 

## Compatibility

The properties used for font metric adjusments:
- [ascent-override](https://developer.mozilla.org/en-US/docs/Web/CSS/@font-face/ascent-override)
- [descent-override](https://developer.mozilla.org/en-US/docs/Web/CSS/@font-face/descent-override)
- [line-gap-override](https://developer.mozilla.org/en-US/docs/Web/CSS/@font-face/line-gap-override)
- [size-adjust](https://developer.mozilla.org/en-US/docs/Web/CSS/@font-face/size-adjust) 

are not supported by some browsers:

| Browser | Support  |
|---|---|
| Chrome  |   ✅ 87 |
| Edge  |  ✅ 87  |
| Firefox |  ✅ 89  |
| Opera |  ✅ 73  |
| Safari | ❌ |

You can keep track on the browser's support for these properties [here](https://caniuse.com/?search=ascent-override).


## ❤️ Credits

Big thanks to

- [Katie Hempenius](https://katiehempenius.com/) & [Kara Erickson](https://github.com/kara) on the Google Aurora team for an algorithm and suggestion - see [notes on calculating font metric overrides](https://docs.google.com/document/d/e/2PACX-1vRsazeNirATC7lIj2aErSHpK26hZ6dA9GsQ069GEbq5fyzXEhXbvByoftSfhG82aJXmrQ_sJCPBqcx_/pub)
- [Next.js](https://nextjs.org/) for an amazing implementation of it inside [next/font](https://nextjs.org/docs/basic-features/font-optimization)
- [Fontaine](https://github.com/unjs/fontaine) for the initial idea
