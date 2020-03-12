const path = require('path');
module.exports = [{
  name: 'app',
  entry: './src/script/default.js',
  output: {
    filename: 'js/bundle.js'
  },
  resolve: {
    alias: {
      'config'  : path.resolve('boilerplate/config.js'),
      'scripts' : path.resolve('boilerplate/scripts/'),
      'style'   : path.resolve('src/sass/style.scss'),
    },
    extensions: ['*', '.js', '.json']
  },
  module: {
    rules: [{
      test: /\.js$/,
      loader: 'babel-loader'
    }, {
      test: /\.scss$/,
      use: ["style-loader", "css-loader", "sass-loader"]
    }]
  }
}]