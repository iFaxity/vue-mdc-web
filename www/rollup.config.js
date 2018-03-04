import vue from "rollup-plugin-vue";
import nodeResolve from "rollup-plugin-node-resolve";
import commonjs from "rollup-plugin-commonjs";
import globals from "rollup-plugin-node-globals";
//import buble from "rollup-plugin-buble";
import sass from "rollup-plugin-sass";
import autoprefixer from "autoprefixer";
import postcss from "postcss";

const plugins = [
  nodeResolve({
    browser: true,
    jsnext: true,
    main: true,
    preferBuiltins: true
  }),
  commonjs(),
  globals(),
  sass({
    output: "www/dist/bundle.css",
    include: [ "**/*.scss", "**/*.css" ],
    exclude: [],
    options: {
      includePaths: ["node_modules"],
    },
    processor: css => postcss([ autoprefixer ]).process(css, { from: null }).then(result => result.css)
  }),
  vue()
];

export default {
  input: "www/app/app.js",
  output: {
    file: "www/dist/bundle.js",
    format: "iife",
  },
  sourcemap: true,
  plugins
};

