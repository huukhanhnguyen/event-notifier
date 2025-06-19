import { defineConfig } from 'rollup';
import terser from '@rollup/plugin-terser';

export default defineConfig([
  // ESM
  {
    input: 'src/index.js',
    output: {
      file: 'dist/index.esm.js',
      format: 'esm',
      sourcemap: true,
    },
    plugins: [terser()],
  },

  // CommonJS
  {
    input: 'src/index.js',
    output: {
      file: 'dist/index.cjs.js',
      format: 'cjs',
      sourcemap: true,
      exports: 'default',
    },
    plugins: [terser()],
  },

  // UMD
  {
    input: 'src/index.js',
    output: {
      file: 'dist/index.umd.js',
      format: 'umd',
      name: 'EventNotifier', // global name for window.EventNotifier
      sourcemap: true,
    },
    plugins: [terser()],
  },
]);
