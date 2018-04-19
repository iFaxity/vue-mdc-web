import vue from "rollup-plugin-vue";
import nodeResolve from "rollup-plugin-node-resolve";
import commonjs from "rollup-plugin-commonjs";
import globals from "rollup-plugin-node-globals";
//import buble from "rollup-plugin-buble";
//import uglify from "rollup-plugin-uglify";
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
  //json(),
  globals(),
  vue(),
  sass({
    output: "dist/styles.css",
    include: [ "**/*.scss", "**/*.css" ],
    exclude: [],
    options: {
      sourceMap: true,
      outputStyle: "compressed",
      includePaths: ["node_modules"]
    },
    processor: css => postcss([autoprefixer]).process(css, { from: null }).then(result => result.css)
  }),
  //buble({ exclude: "node_modules/**" }),
];

if (process.env.NODE_ENV === "production") {
  plugins.push(uglify());
}

export default {
  input: "index.js",
  sourcemap: true,
  plugins,
  output: [
    {
      format: "es",
      file: "dist/vue-mdc-web.esm.js"
    },
    {
      format: "cjs",
      file: "dist/vue-mdc-web.common.js"
    },
    {
      format: "umd",
      name: "VueMDC",
      file: "dist/vue-mdc-web.js"
    }
  ]
};

