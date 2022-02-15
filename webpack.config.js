const DotenvWebpackPlugin = require('dotenv-webpack');
const path = require('path');

const config = {
  entry: './src/index.js',
  output: {
    publicPath: '/dist/',
    path: path.resolve(__dirname, 'dist'),
    filename: 'main.js',
  },

  devtool: 'inline-source-map',

  devServer: {
    inline: true,
    host: '0.0.0.0',
    port: 3000,
    historyApiFallback: true,
    disableHostCheck: true,
    contentBase: 'public',
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: [/node_modules/],
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.jpg$/,
        exclude: [/node_modules/],
        use: {
          loader: 'url-loader',
        },
      },
    ],
  },
  plugins: [new DotenvWebpackPlugin()],

  mode: 'development',
};

module.exports = config;
