var path = require("path")
var webpack = require("webpack")

var PurescriptWebpackPlugin = require("purescript-webpack-plugin")
var src = ["bower_components/purescript-*/src/**/*.purs", "purs/**/*.purs"]
var ffi = ["bower_components/purescript-*/src/**/*.js", "purs/**/*.js"]

module.exports = {
  devtool: "source-map",
  entry: [
    "./src/index"
  ],
  output: {
    path: path.join(__dirname, "dist"),
    filename: "bundle.js",
    publicPath: "/static/"
  },
  plugins: [
    new PurescriptWebpackPlugin({ src, ffi }),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.DefinePlugin({
      "process.env": {
        "NODE_ENV": JSON.stringify("production")
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false
      }
    })
  ],
  resolve: {
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
