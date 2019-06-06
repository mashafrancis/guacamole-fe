const path = require('path');
const autoprefixer = require('autoprefixer');
const {readMaterialPackages} = require('../scripts/package-json-reader');
const {convertToImportMDCWebPaths} = require('../scripts/package-name-converter');
const {getDirectories} = require('../scripts/directory-reader');
const {importer} = require('./webpack.util');
const {
  cleanWebpack,
  environmentPlugin,
  htmlWebpack,
  miniCssExtract,
  miniCssExtractPlugin,
  hashedPlugin,
  // definePlugin,
  terserPlugin,
  noEmitOnErrorsPlugin,
} = require('./webpack.plugins');

const isDevMode = process.env.NODE_ENV !== 'production';

function getReactMaterialExternals() {
  return getDirectories('./node_modules/@material').map((directory) => (
    `react-${path.parse(directory).name}`
  ));
}

function getMaterialExternals() {
  const externals = {};
  const importPaths = convertToImportMDCWebPaths(readMaterialPackages());
  importPaths.forEach((importPath) => {
    externals[importPath] = `${importPath}.js`;
  });

  getReactMaterialExternals().forEach((path) => {
    externals[`@material/${path}`] = `@material/${path}/dist/index.js`;
  });

  return externals;
}

const materialExternals = getMaterialExternals();

module.exports = {
  entry: {
    main: path.join(__dirname, '..', 'src', 'index.tsx'),
    styleGlobals: path.join(__dirname, '..', 'src/assets/scss/globals.scss')
  },
  output: {
    path: path.join(__dirname, '..', 'dist'),
    filename: '[name].[hash:8].js',
    publicPath: '/'
  },
  stats: {
   entrypoints: false,
   children: false
  },
  externals: {
    materialExternals,
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
    alias: {
      pages: path.resolve(__dirname, '..', 'src/pages/'),
      components: path.resolve(__dirname, '..', 'src/components/'),
      modules: path.resolve(__dirname, '../src/store/modules'),
      utils: path.resolve(__dirname, '../src/utils'),
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
            loader: 'postcss-loader',
            options: {
              plugins: () => [require('autoprefixer')({
                'browsers': ['> 1%', 'last 2 versions']
              })],
            }
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
              importer
            }
          },
        ]
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            sourceMap: true,
          }
        }
      },
      {
        test: /\.tsx?$/,
        use: {
          loader: 'awesome-typescript-loader'
        }
      },
      {
        enforce: 'pre',
        test: /\.js$/,
        loader: 'source-map-loader',
      },
    ]
  },
  plugins: [
    environmentPlugin,
    htmlWebpack,
    hashedPlugin,
    // definePlugin,
    cleanWebpack,
    miniCssExtract,
    terserPlugin,
    noEmitOnErrorsPlugin
  ]
};
