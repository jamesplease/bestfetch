import typescript from '@rollup/plugin-typescript';
import replace from '@rollup/plugin-replace';
import commonjs from '@rollup/plugin-commonjs';
import resolve from 'rollup-plugin-node-resolve';
// import babel from 'rollup-plugin-babel';
import { uglify } from 'rollup-plugin-uglify';
import pkg from './package.json';

export default [
  // browser-friendly UMD build
  {
    input: 'src/index.ts',
    output: {
      name: 'bestfetch',
      file: pkg.browser,
      format: 'umd',
    },
    plugins: [
      resolve(), // so Rollup can find any npm deps
      commonjs(), // so Rollup can convert npm deps to an ES module
      typescript(),
      replace({ 'process.env.NODE_ENV': '"production"' }),
      uglify(),
    ],
  },

  // CommonJS (for Node) and ES module (for bundlers) build.
  // (We could have three entries in the configuration array
  // instead of two, but it's quicker to generate multiple
  // builds from a single configuration where possible, using
  // an array for the `output` option, where we can specify
  // `file` and `format` for each target)
  {
    input: 'src/index.ts',
    output: [
      { file: pkg.main, format: 'cjs' },
      { file: pkg.module, format: 'es' },
    ],
    plugins: [typescript()],
  },
];
