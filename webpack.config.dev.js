var path = require("path")
var webpack = require("webpack")

var PurescriptWebpackPlugin = require("purescript-webpack-plugin")

module.exports = {
  // or devtool: "eval" to debug issues with compiled output:
  devtool: "cheap-module-eval-source-map",
  entry: [
    // necessary for hot reloading with IE:
    "eventsource-polyfill",
    // listen to code updates emitted by hot middleware:
    "webpack-hot-middleware/client",
    // your code:
    "./src/js/index"
  ],
  output: {
    path: path.join(__dirname, "dist"),
    filename: "bundle.js",
    publicPath: "/dist/"
  },
  plugins: [
    {
      apply: function (compiler) {
        compiler.plugin("should-emit", function(compilation) {
          if (compilation.errors.length > 1)
            compilation.errors = compilation.errors.filter(function (error) {
              var message = error.message || error
              return !~message.indexOf('PureScript compilation has failed.');
            });
        });
      }
    },
    new PurescriptWebpackPlugin({
      src: ["bower_components/purescript-*/src/**/*.purs", "src/purs/**/*.purs"],
      ffi: ["bower_components/purescript-*/src/**/*.js", "src/purs/**/*.js"],
      bundle: false,
      psc: "psa",
      pscArgs: {
        sourceMaps: true
      }
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
  ],
  resolve: {
    alias: {
      "redux-devtools-log-monitor": "@osener/redux-devtools-log-monitor"
    },
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
