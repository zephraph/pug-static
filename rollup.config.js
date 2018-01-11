import commonjs from 'rollup-plugin-commonjs';
import nodeResolve from 'rollup-plugin-node-resolve';
import json from 'rollup-plugin-json';
import uglify from 'rollup-plugin-uglify';
import path from 'path';
import { minify } from 'uglify-es';

const getModulePath = moduleName => {
  let path = require.resolve(moduleName);
  return path.slice(0, path.lastIndexOf(moduleName) + moduleName.length);
}

const getModuleVersion = moduleName => {
  let pkgPath = path.join(getModulePath(moduleName), 'package.json');
  let pkg = require(pkgPath);
  return pkg.version;
}

const pugVersion = getModuleVersion('pug');

export default {
  input: 'index.js',
  output: {
    file: `pug-${pugVersion}.js`,
    format: 'iife',
    name: 'pug'
  },
  plugins: [
    nodeResolve({
      jsnext: true,
      main: true
    }),
    json({}),
    commonjs({
      include: 'node_modules/**'
    }),
    uglify({}, minify)
  ]
}
