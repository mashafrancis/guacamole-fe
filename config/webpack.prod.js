const cssNano = require('cssnano');
const merge = require('webpack-merge');
const optimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const uglifyJsPlugin = require('uglifyjs-webpack-plugin');
const config = require('./webpack.common.js');

module.exports = merge(config, {
  output: {
    filename: '[name].min.js'
  },
  devtool: 'source-map',
  optimization: {
    minimizer: [
      new uglifyJsPlugin({
        cache: true,
        parallel: true,
        sourceMap: true
      }),
      new optimizeCSSAssetsPlugin({
        cssProcessor: cssNano,
        cssProcessorOptions: {
          reduceIdents: false,
        },
      })
    ]
  }
});
