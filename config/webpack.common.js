const path = require('path');
const {
  cleanWebpack,
  definePlugin,
  htmlWebpack,
  miniCssExtract,
  miniCssExtractPlugin
} = require('./webpack.plugins');

const isDevMode = process.env.NODE_ENV !== 'production';

module.exports = {
  entry: {
    bundle: path.join(__dirname, '..', 'src', 'index.tsx'),
    styleGlobals: path.join(__dirname, '..', 'src/assets/scss/globals.scss')
  },
  output: {
    path: path.join(__dirname, '..', 'dist'),
    filename: '[name].js',
    publicPath: '/'
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
    alias: {
      pages: path.resolve(__dirname, '..', 'src/pages/'),
      components: path.resolve(__dirname, '..', 'src/components/'),
      modules: path.resolve(__dirname, '../src/store/modules'),
      utils: path.resolve(__dirname, '../src/utils')
    },
    modules: [path.resolve(__dirname, 'src'), 'node_modules']
  },
  module: {
    rules: [
      {
        test: /\.(woff(2)?|ttf|eot|svg|png|jpg|jpeg|gif)$/,
        use: {
          loader: 'file-loader'
        }
      },
      {
        test: /\.(scss|css)$/,
        use: [
          isDevMode ? 'style-loader' : miniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              sourceMap: true
            }
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true
            }
          }
        ]
      },
      {
        test: /\.tsx?$/,
        use: {
          loader: 'awesome-typescript-loader'
        }
      }
    ]
  },
  plugins: [htmlWebpack, cleanWebpack, definePlugin, miniCssExtract]
};
