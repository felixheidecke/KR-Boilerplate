const path = require('path')

module.exports = [
  {
    name: 'app',
    entry: './src/script/default.js',
    output: {
      filename: 'js/default.js',
    },
    resolve: {
      alias: {
        config: path.resolve('boilerplate/config.js'),
        scripts: path.resolve('boilerplate/scripts/'),
        style: path.resolve('src/sass/style.scss'),
      },
      extensions: ['scss', '.js', '.json'],
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
            },
          },
        },
        {
          test: /\.(scss|css)$/,
          use: [
            'style-loader',
            {
              loader: 'css-loader',
              options: {
                url: false,
              },
            },
            'sass-loader',
          ],
        },
      ],
    },
  },
]
