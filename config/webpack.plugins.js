const dotenv = require('dotenv');
// const DotEnv = require('dotenv-webpack');

// importing webpack dependencies
const webpack = require('webpack');
const cleanWebpackPlugin = require('clean-webpack-plugin');
const htmlWebpackPlugin = require('html-webpack-plugin');
const miniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');

const getFaviconUrl = () => {
  return `https://res.cloudinary.com/mashafrancis/image/upload/v1551124424/kari4me/favicon.png`;
};

// instantiating webpack dependencies
const cleanWebpack = new cleanWebpackPlugin();
const htmlWebpack = new htmlWebpackPlugin({
  template: 'src/index.html',
  title: 'kari4me',
  getFaviconUrl,
});
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
};
