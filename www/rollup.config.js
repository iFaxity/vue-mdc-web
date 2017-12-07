import vue from "rollup-plugin-vue";
import nodeResolve from "rollup-plugin-node-resolve";
import commonjs from "rollup-plugin-commonjs";
import globals from "rollup-plugin-node-globals";
//import buble from "rollup-plugin-buble";
import uglify from "rollup-plugin-uglify";
import json from "rollup-plugin-json";

const plugins = [
  nodeResolve({
    browser: true,
    jsnext: true,
    main: true,
    preferBuiltins: true
  }),
  commonjs(),
  json(),
  globals(),
  vue(),
  //buble({ exclude: "node_modules/**" }),
];

if (process.env.NODE_ENV === "production") {
  plugins.push(uglify());
}

export default {
  input: "www/javascripts/app.js",
  output: {
    file: "www/javascripts/bundle.js",
    format: "iife",
  },
  sourcemap: true,
  plugins
};

