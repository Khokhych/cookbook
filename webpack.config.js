const path = require('path');
require('babel-polyfill');

module.exports = {
  watch: true,
  externals: {
    paths: path,
  },
  entry: {
    app: ['babel-polyfill', './index.jsx'],
  },
  output: {
    path: path.resolve(__dirname, './public'),
    publicPath: '/public/',
    filename: 'bundle.js',
  },
  module: {
    rules: [{
      test: /\.(sass|css)$/,
      use: [
        'style-loader',
        'css-loader',
        'sass-loader',
      ],
    },
    {
      test: /\.(js|jsx)$/,
      exclude: /(node_modules)/,
      loader: 'babel-loader',
      resolve: {
        extensions: ['.js', '.jsx'],
      },
      options: {
        presets: ['@babel/preset-env', '@babel/preset-react'],
      },
    },
    ],
  },
};