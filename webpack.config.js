'use strict';

const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  devtool: 'sourcemap',
  entry: './src/index.jsx',
  module: {
    rules: [{ test: /\.jsx$/, loader: 'babel-loader' }],
  },
  plugins: [new HtmlWebpackPlugin({ template: './index.template.html' })],
};
