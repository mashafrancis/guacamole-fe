const dotenv = require('dotenv');
// const DotEnv = require('dotenv-webpack');

// importing webpack dependencies
const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const htmlWebpackPlugin = require('html-webpack-plugin');
const miniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');

// instantiating webpack dependencies
const cleanWebpack = new CleanWebpackPlugin();
const htmlWebpack = new htmlWebpackPlugin({
  template: 'src/index.html',
  title: 'kari4me',
  minify: {
    removeComments: true,
    collapseWhitespace: true
  },
});
const noEmitOnErrorsPlugin = new webpack.NoEmitOnErrorsPlugin();
const namedModulesPlugin = new webpack.NamedModulesPlugin();
const hotModuleReplacementPlugin = new webpack.HotModuleReplacementPlugin();
const miniCssExtract = new miniCssExtractPlugin();
const progressPlugin = new webpack.ProgressPlugin();
const hashedPlugin = new webpack.HashedModuleIdsPlugin();
const terserPlugin = new TerserPlugin({
  parallel: true,
  terserOptions: {
    ecma: 6,
  },
});

// const dotEnv = new DotEnv();
const environmentPlugin = new webpack.EnvironmentPlugin();

// call dotenv and it will return an Object with a parsed key
const env = dotenv.config().parsed;

// reduce it to a nice object, the same as before
// const envKeys = Object.keys(env).reduce((prev, next) => {
//   prev[`process.env.${next}`] = JSON.stringify(env[next]);
//   return prev;
// }, {});
//
// const definePlugin = new webpack.DefinePlugin(envKeys);

module.exports = {
  progressPlugin,
  cleanWebpack,
  environmentPlugin,
  htmlWebpack,
  namedModulesPlugin,
  hotModuleReplacementPlugin,
  miniCssExtract,
  miniCssExtractPlugin,
  hashedPlugin,
  terserPlugin,
  noEmitOnErrorsPlugin,
};
