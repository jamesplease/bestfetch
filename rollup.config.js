import commonjs from '@rollup/plugin-commonjs';
import resolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';
import { uglify } from 'rollup-plugin-uglify';
import pkg from './package.json';

const extensions = ['.ts'];

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
      resolve({ extensions }),
      commonjs(),
      babel({
        extensions,
        include: ['src/**/*'],
        exclude: ['node_modules/**'],
      }),
      uglify(),
    ],
  },

  // CommonJS (for Node) and ES module (for bundlers) build.
  {
    input: 'src/index.ts',
    output: [
      { file: pkg.main, format: 'cjs' },
      { file: pkg.module, format: 'es' },
    ],
    plugins: [
      resolve({ extensions }),
      commonjs(),

      babel({
        extensions,
        include: ['src/**/*'],
        exclude: ['node_modules/**'],
      }),
    ],
  },
];
