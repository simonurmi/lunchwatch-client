/* eslint-disable import/no-extraneous-dependencies */
const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const Dotenv = require('dotenv-webpack');

require('dotenv').config({ path: './.env' });

module.exports = {
  context: path.join(__dirname, './src'),
  entry: {
    jsx: './index.jsx',
    vendor: ['react'],
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  module: {
    loaders: [
      {
        test: /\.(js|jsx)$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /static\/images\/\.(png)$/,
        loader: 'url-loader?name=/static/images/$1',
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  plugins: [
    new Dotenv({
      path: './.env',
      safe: true,
    }),
    new webpack.optimize.CommonsChunkPlugin({ name: 'vendor', filename: 'vendor.bundle.js' }),
    new ExtractTextPlugin('styles.css', {
      allChunks: true,
    }),
    new HtmlWebpackPlugin({
      title: 'LunchWatch',
      template: 'index.html',
      filename: 'index.html',
      googleAnalyticsTrackingId: process.env.GOOGLE_ANALYTICS_TRACKING_ID,
      googleMapsJsApiKey: process.env.GOOGLE_MAPS_JS_API_KEY,
      minify: {
        minifyCSS: true,
      },
    }),
  ],
};
