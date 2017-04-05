const path = require('path');
const webpack = require('webpack');
const { version } = require('./package.json');

const isDev = process.env.NODE_ENV !== 'production';
const plugins = [
  new webpack.DefinePlugin({
    __VERSION__: JSON.stringify(`v${version}`)
  })
];

if (!isDev) {
  plugins.push(
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
        screw_ie8: true,
        conditionals: true,
        unused: true,
        comparisons: true,
        sequences: true,
        dead_code: true,
        evaluate: true,
        join_vars: true,
        if_return: true
      },
      output: {
        comments: false
      }
    })
  );
}

module.exports = {
  context: path.resolve(__dirname, 'lib'),
  entry: './main.js',
  output: {
    filename: 'videojs-hls-source-handler.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [{
      exclude: /node_modules/,
      loader: 'babel-loader',
      test: /\.js$/
    }]
  },

  plugins
};