const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');
const path = require('path');

module.exports = {
  entry: './server/server.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'server.js',
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
  }
};