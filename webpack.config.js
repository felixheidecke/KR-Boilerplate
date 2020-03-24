const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = [{
  name: 'app',
  entry: './src/script/default.js',
  output: {
    filename: 'js/default.js'
  },
  resolve: {
    alias: {
      'config'  : path.resolve('boilerplate/config.js'),
      'scripts' : path.resolve('boilerplate/scripts/'),
      'style'   : path.resolve('src/sass/style.scss'),
    },
    extensions: ['scss', '.js', '.json']
  },
  module: {
    rules: [{
      test: /\.js$/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env']
        }
      }
    }, {
      test: /\.scss$/,
      use: ["style-loader", {
        loader: MiniCssExtractPlugin.loader,
        options: {
          publicPath: 'css/style.css',
        }
      }, {
        loader: 'css-loader',
        options: {
          url: false
        }
      }, "sass-loader"]
    }]
  },
  plugins: [
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: 'css/style.css',
      chunkFilename: 'css/[id].css',
    }),
  ],
}]