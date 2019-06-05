'use strict';

module.exports = {
  mode: 'production',
  output: {
    library: 'Visualizer',
    libraryTarget: 'commonjs2',
  },
  entry: './src/index.js',
  module: {
    rules: [{ test: /\.jsx$/, loader: 'babel-loader' }],
  },
};
