/*
  Copyright (c) 2018 uupaa and 2019 Google LLC

  Use of this source code is governed by an MIT-style
  license that can be found in the LICENSE file or at
  https://opensource.org/licenses/MIT.
*/

import {terser} from 'rollup-plugin-terser';


export default [
  {
    input: 'default.mjs',
    plugins: [terser()],
    output: {
      dir: 'dist',
      format: 'esm',
      entryFileNames: 'dynamic-import-polyfill.mjs',
    },
  },
  {
    input: 'index.mjs',
    plugins: [terser()],
    output: {
      dir: 'dist',
      format: 'umd',
      name: 'dynamicImportPolyfill',
      entryFileNames: 'dynamic-import-polyfill.umd.js',
    },
  },
];
