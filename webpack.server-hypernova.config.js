const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');
const path = require('path');
// var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
  entry: './server/hypernova-server.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'hypernova-server.js',
    publicPath: '/'
  },
  target: 'node',
  externals: nodeExternals(),
  // plugins: [
  //   new webpack.DefinePlugin({
  //     'process.env': {
  //       NODE_ENV: `'production'`
  //     }
  //   })
  // ],
  module: {
    loaders: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['env', 'react']
        }
      },
      {
        test: /\.css$/,
        loaders: [
          'css-loader'
        ]
      },
    ]
  },
  plugins: [
    // new BundleAnalyzerPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': '"production"'
    }),
    new webpack.optimize.UglifyJsPlugin()
  ]
};