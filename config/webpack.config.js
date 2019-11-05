const path = require('path');
const {importer} = require('./webpack.util');
const {
  cleanWebpack,
  htmlWebpack,
  miniCssExtract,
  miniCssExtractPlugin,
  hashedPlugin,
  manifestPlugin,
  swPlugin,
  copyPlugin,
  definePlugin,
} = require('./webpack.plugins');

const isDevMode = process.env.APP_ENV !== 'production';
const PUBLIC_PATH = process.env.PUBLIC_URL;

module.exports = {
  entry: {
    main: path.join(__dirname, '..', 'src', 'index.tsx'),
  },
  output: {
    path: path.join(__dirname, '..', 'dist'),
    filename: '[name].[hash:8].js',
    publicPath: PUBLIC_PATH
  },
  optimization: {
    noEmitOnErrors: true,
    namedChunks: true,
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
    alias: {
      '@pages': path.resolve(__dirname, '..', 'src/pages/'),
      '@components': path.resolve(__dirname, '..', 'src/components/'),
      '@placeholders': path.resolve(__dirname, '..', 'src/placeholders/'),
      '@modules': path.resolve(__dirname, '..', 'src/store/modules'),
      '@utils': path.resolve(__dirname, '..', 'src/utils')
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
                'overrideBrowserslist': ['> 1%', 'last 2 versions']
              })],
            }
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
              importer,
              includePaths: ['../node_modules'],
            }
          },
        ]
      },
      {
        test: /\.(js|jsx)$/,
        exclude: [
          /node_modules/,
          /node_modules\/@material/
        ],
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
        exclude: [
          /node_modules\/@material/
        ],
      },
    ]
  },
  plugins: [
    htmlWebpack,
    hashedPlugin,
    cleanWebpack,
    miniCssExtract,
    manifestPlugin,
    swPlugin,
    copyPlugin,
    definePlugin,
  ]
};
