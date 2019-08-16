# Dynamic `import()` polyfill

A fast, tiny polyfill for dynamic `import()` that works in all module-supporting browsers. The polyfill feature detects built-in `import()` support and defers to the native version if available. For browsers without module support, you can use the [module/nomodule](https://philipwalton.com/articles/deploying-es2015-code-in-production-today/) technique to generate a fully ES5-compatible bundle.

## Installation

You can install this library from npm by running:

```sh
npm install dynamic-import-polyfill
```

## Usage

To use the polyfill, just initialize it once, in your app's main entry point before dynamically importing any modules. If you have multiple entry points, just add it to the entry point that will be evaluated first.

```js
import dynamicImportPolyfill from 'dynamic-import-polyfill';

// This needs to be done before any dynamic imports are used.
dynamicImportPolyfill.initialize({
  modulePath: '/public', // Defaults to '.'
  importFunctionName = '$$import' // Defaults to '__import__'
});
````

### Configuration options

<table>
  <tr valign="top">
    <th align="left">Name</th>
    <th align="left">Type</th>
    <th align="left">Description</th>
  </tr>
  <tr valign="top">
    <td><code>modulePath</code></td>
    <td><em>string</em></td>
    <td>
      <p>A path for which all relative import URLs will resolve from.</p>
      <p><strong>Default:</strong> <code>'.'</code></p>
      <p>This should be an absolute path to the directory where your production modules are deployed (e.g. <code>/public/</code>). If given a relative path, it is resolve against the current page's URL.</p>
    </td>
  </tr>
  <tr valign="top">
    <td><code>importFunctionName</code></td>
    <td><em>string</em></td>
    <td>
      <p>The name of the dynamic import polyfill function added to the global scope. <em>(Note: a name other than <code>import</code> is required because "import" is a keyword in JavaScript.)</em></p>
      <p><strong>Default:</strong> <code>'__import__'</code></p>
      <p>If you're using a bundler that supports <a href="https://rollupjs.org/guide/en/#outputdynamicimportfunction">renaming <code>import()</code></a> to another name, make sure you choose the same name used here.</p>
    </td>
  </tr>
</table>

### Content Security Policy (CSP)

This polyfill uses `new Function()` to feature detect dynamic `import()` support, and that detect will always fail if your [Content Security Policy (CSP)](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP) does not allow `'unsafe-eval'` (which most do not). This is generally fine, however, because the polyfill fallback will be used instead. Just be aware that such CSP policies will prevent the browser from using its native dynamic `import()`, even when supported.

In addition, this polyfill uses `Blob` URLs to load modules dynamically, and in order for this to work you must configure your Content Security Policy to allow `Blob` in your [`script-src`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy/script-src) settings.

Here's an example Content Security Policy that works (cross-browser) with this polyfill:

```html
<meta http-equiv="Content-Security-Policy" content="script-src 'self' blob:">
```

## Examples

[`rollup-native-modules-boilerplate`](https://github.com/philipwalton/rollup-native-modules-boilerplate/) features a complete example demonstrating how to use this polyfill with full, cross-browser support for legacy browsers. For more details on the techniques used in this demo, see [Using Native JavaScript Modules in Production Today](https://philipwalton.com/articles/using-native-javascript-modules-in-production-today/) by [@philipwalton](https://github.com/philipwalton).

## Limitations

This polyfill does not support [`import.meta`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import.meta), as it is generally not needed when using a bundler that outputs all your modules to the same directory. Bundlers can also [resolve `import.meta`](https://rollupjs.org/guide/en/#resolveimportmeta) at build time, so oftentimes `import.meta` does not appear in the final module output.

If `import.meta` support is a requirement for your use case, [`es-module-shims`](https://github.com/guybedford/es-module-shims) by [@guybedford](https://github.com/guybedford) may be an option.

## Credits

This polyfill was inspired from prior work in this space by these projects:

- [`dynamic-import-polyfill`](https://github.com/uupaa/dynamic-import-polyfill) by [@uupaa](https://github.com/uupaa)
- [`importPolyfill.js`](https://gist.github.com/samthor/3ff82bd5b11314fec2e1826d4a96ce7c) by [@samthor](https://github.com/samthor)
- [`shimport`](https://github.com/rich-harris/shimport) by [@Rich-Harris](https://github.com/Rich-Harris)

## License

[MIT](/LICENSE)

