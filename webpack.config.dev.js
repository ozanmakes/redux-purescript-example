var path = require("path")
var webpack = require("webpack")

var PurescriptWebpackPlugin = require("purescript-webpack-plugin")

var src = ["bower_components/purescript-*/src/**/*.purs", "src/**/*.purs"]
var ffi = ["bower_components/purescript-*/src/**/*.js", "src/**/*FFI.js"]

var purescriptWebpackPlugin = new PurescriptWebpackPlugin({
  src: src,
  ffi: ffi,
  bundle: false,
  psc: "psa",
  pscArgs: {
    sourceMaps: true
  }
})

module.exports = {
  // or devtool: "eval" to debug issues with compiled output:
  devtool: "cheap-module-eval-source-map",
  entry: [
    // necessary for hot reloading with IE:
    "eventsource-polyfill",
    // listen to code updates emitted by hot middleware:
    "webpack-hot-middleware/client",
    // your code:
    "./src/index"
  ],
  output: {
    path: path.join(__dirname, "dist"),
    filename: "bundle.js",
    publicPath: "/dist/"
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    purescriptWebpackPlugin
  ],
  resolve: {
    alias: {
      "redux-devtools-log-monitor": "@osener/redux-devtools-log-monitor"
    },
    extensions: ["", ".js", ".jsx", ".purs"],
    modulesDirectories: ["node_modules", "bower_components"]
  },
  module: {
    loaders: [{
      test: /\.jsx?$/,
      loaders: ["babel"],
      include: path.join(__dirname, "src")
    }, {
      test: /\.purs$/,
      loaders: ["purs-loader"]
    }]
  }
}
