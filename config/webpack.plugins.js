const dotEnv = require('dotenv');

// importing webpack dependencies
const webpack = require('webpack');
const cleanWebpackPlugin = require('clean-webpack-plugin');
const htmlWebpackPlugin = require('html-webpack-plugin');
const miniCssExtractPlugin = require('mini-css-extract-plugin');


const getFaviconUrl = (size) => {
  return `https://res.cloudinary.com/mashafrancis/image/upload/v1551124424/kari4me/favicon.png`
}

// instantiating webpack dependencies
const cleanWebpack = new cleanWebpackPlugin(['dist']);
const htmlWebpack = new htmlWebpackPlugin({
  template: 'src/index.html',
  title: 'Kari4me',
  getFaviconUrl,
});
const namedModulesPlugin = new webpack.NamedModulesPlugin();
const hotModuleReplacementPlugin = new webpack.HotModuleReplacementPlugin();
const miniCssExtract = new miniCssExtractPlugin();

// stringify env variables
const envs = dotEnv.config().parsed;
const stringifiedEnvs = {};
Object.keys(envs).forEach((envKey) => {
  stringifiedEnvs[envKey] = JSON.stringify(envs[envKey]);
});

const definePlugin = new webpack.DefinePlugin({
  'process.env': stringifiedEnvs
});

module.exports = {
  cleanWebpack,
  htmlWebpack,
  namedModulesPlugin,
  hotModuleReplacementPlugin,
  miniCssExtract,
  miniCssExtractPlugin,
  definePlugin
};
