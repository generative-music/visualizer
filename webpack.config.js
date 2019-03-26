'use strict';

const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  plugins: [new HtmlWebpackPlugin({ template: './index.template.html' })],
};
