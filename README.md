# node-sass-simple-css-importer

A simple custom importer to get around the deprecation of importing .css files in LibSass.

In early 2018, LibSass deprecated importing files ending in .css, suggesting to instead use a custom importer (see [sass/node-sass#2362](https://github.com/sass/node-sass/issues/2362#issuecomment-396239814)). This is problematic because we have no control over what file types third-party packages provide. This module functions as a simple custom importer for .css files for use with node-sass.

## Usage

```js
const SASS         = require("node-sass");
const CSS_IMPORTER = require("node-sass-simple-css-importer");

sass.render({
  ...
  importer: CSS_IMPORTER(),
  ...
});
```
