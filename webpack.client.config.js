var webpack = require('webpack');
var path = require('path');
// var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

// Build directory is where the bundle file will be placed
var BUILD_DIR = path.resolve(__dirname, 'dist');
// App directory is where all of your raw JSX files will be placed
var APP_DIR = path.resolve(__dirname, 'client/src');

var config = {
  entry: APP_DIR + '/index.jsx',
  module: {
    loaders: [
      {
        test: /\.jsx?/,
        include: APP_DIR,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['env', 'react']
        }
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      }
    ]
  },
  output: {
    path: BUILD_DIR,
    filename: 'bundle.js'
  },
  plugins: [
    // new BundleAnalyzerPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': '"production"'
    }),
    new webpack.optimize.UglifyJsPlugin()
  ]
};

module.exports = config;
