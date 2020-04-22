const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = [
  {
    mode: 'development',
    plugins: [new CleanWebpackPlugin()],
    module: {
      rules: [
        {
          enforce: 'pre',
          test: /\.js$/,
          exclude: /node_modules/,
          loader: 'eslint-loader',
          options: {
            failOnError: true,
            failOnWarning: true
          }
        },
        {
          test: /\.js$/,
          exclude: /node_modules/,
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            cacheDirectory: true,
            cacheCompression: false
          }
        }
      ]
    }
  }
];
