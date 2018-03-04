import vue from "rollup-plugin-vue";
import nodeResolve from "rollup-plugin-node-resolve";
import commonjs from "rollup-plugin-commonjs";
import globals from "rollup-plugin-node-globals";
import uglify from "rollup-plugin-uglify";
import sass from "rollup-plugin-sass";
import autoprefixer from "autoprefixer";
import postcss from "postcss";

import path from "path";
const SASS_OUTPUT = path.join(__dirname, "bundle.css");
const SASS_INCLUDE_PATHS = [ path.join(__dirname, "../node_modules") ];
const APP_INPUT = path.join(__dirname, "app.js");
const APP_OUTPUT = path.join(__dirname, "bundle.js");

const plugins = [
  nodeResolve({
    browser: true,
    jsnext: true,
    main: true,
    preferBuiltins: true
  }),
  commonjs(),
  globals(),
  vue(),
  sass({
    output: SASS_OUTPUT,
    include: [ "**/*.scss", "**/*.css" ],
    exclude: [],
    options: {
      sourceMap: true,
      outputStyle: "compressed",
      includePaths: SASS_INCLUDE_PATHS
    },
    processor: css => postcss([ autoprefixer ]).process(css).then(result => result.css)
  }),
];

if (process.env.NODE_ENV === "production") {
  plugins.push(uglify());
}

export default {
  input: APP_INPUT,
  sourcemap: true,
  plugins,
  output: {
    format: "iife",
    file: APP_OUTPUT
  }
};

