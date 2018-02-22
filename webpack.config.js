var webpack = require('webpack');
var path = require('path');

// Build directory is where the bundle file will be placed
var BUILD_DIR = path.resolve(__dirname, 'client/dist');
// App directory is where all of your raw JSX files will be placed
var APP_DIR = path.resolve(__dirname, 'client/src');

// The files in the app directory will get transpiled and packaged into one
// file, bundle.js, which will get saved in the BUILD_DIR.
// If you use the `npm run dev-react`, webpack will generate source maps and
// watch your files for changes.

// While developing your app in react, you'll want to have two terminal tabs open -
// one that is running `npm run dev-react` and one that is running `npm start`
var config = {
  entry: APP_DIR + '/index.jsx',
  module: {
    loaders: [
      {
        test: /\.jsx?/,
        include: APP_DIR,
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'react']
        }
      }
    ]
  },
  output: {
    path: BUILD_DIR,
    filename: 'bundle.js'
  }
};

module.exports = config;
