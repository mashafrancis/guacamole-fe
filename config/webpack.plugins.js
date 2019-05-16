const dotEnv = require('dotenv');

// importing webpack dependencies
const webpack = require('webpack');
const cleanWebpackPlugin = require('clean-webpack-plugin');
const htmlWebpackPlugin = require('html-webpack-plugin');
const miniCssExtractPlugin = require('mini-css-extract-plugin');


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

module.exports = {
  progressPlugin,
  cleanWebpack,
  htmlWebpack,
  namedModulesPlugin,
  hotModuleReplacementPlugin,
  miniCssExtract,
  miniCssExtractPlugin,
};
