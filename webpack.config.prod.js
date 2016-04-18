var path = require("path")
var webpack = require("webpack")

var PurescriptWebpackPlugin = require("purescript-webpack-plugin")

module.exports = {
  devtool: "source-map",
  entry: [
    "./src/js/index"
  ],
  output: {
    path: path.join(__dirname, "dist"),
    filename: "bundle.js",
    publicPath: "/static/"
  },
  plugins: [
    new PurescriptWebpackPlugin({
      src: ["bower_components/purescript-*/src/**/*.purs", "src/purs/**/*.purs"],
      ffi: ["bower_components/purescript-*/src/**/*.js", "src/purs/**/*.js"]
    }),
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
    extensions: ["", ".js", ".purs"],
    modulesDirectories: ["node_modules", "bower_components", "src/purs"]
  },
  module: {
    loaders: [{
      test: /\.js$/,
      loaders: ["babel"],
      include: path.join(__dirname, "src", "js")
    }, {
      test: /\.purs$/,
      loaders: ["purs-loader"]
    }]
  }
}
