const path = require('path');
const webpack = require('webpack');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const IS_DEV = process.env.NODE_ENV === 'dev';

const config = {
  mode: IS_DEV ? 'development' : 'production',
  devtool: IS_DEV ? 'eval' : 'source-map',
  entry: './src/index.js',
  output: {
    path: IS_DEV
      ? path.resolve(__dirname, 'dist')
      : path.resolve('./public'),
    filename: '[name].js',
  },
  externals: {
    jquery: 'jQuery',
  },
  module: {
    rules: IS_DEV
      ? [
          {
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
          },
          {
            test: /\.scss$/,
            use: [
              'style-loader',
              {
                loader: 'css-loader',
                options: {
                  sourceMap: true,
                },
              },
              {
                loader: 'sass-loader',
                options: {
                  sourceMap: true,
                },
              },
            ],
          },
          {
            test: /\.(gif|png|jpe?g|svg)$/i,
            use: [
              {
                loader: 'url-loader',
                options: {
                  limit: 8192,
                  name: 'public/[name].[ext]?[hash:7]',
                },
              },
              {
                loader: 'image-webpack-loader',
                options: {
                  bypassOnDebug: true,
                  mozjpeg: {
                    progressive: true,
                    quality: 75,
                  },
                },
              },
            ],
          },
          {
            test: /\.html$/,
            use: [
              {
                loader: 'html-loader',
                options: {
                  attrs: [':data-src'],
                  minimize: false,
                },
              },
            ],
          },
        ]
      : [
          {
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
          },
          {
            test: /\.scss$/,
            use: ExtractTextPlugin.extract({
              fallback: 'style-loader',
              use: ['css-loader', 'postcss-loader', 'sass-loader'],
            }),
          },
        ],
  },
  plugins: IS_DEV
    ? [
        new CleanWebpackPlugin(['dist']),
        new CopyWebpackPlugin([
          {
            from: './public',
            to: 'public',
          },
        ]),
        new HtmlWebPackPlugin({
          template: 'index.html',
          filename: 'index.html',
          favicon: './public/icon.ico',
          minify: !IS_DEV && {
            preserveLineBreaks: true,
            removeComments: true,
          },
        }),
        new ExtractTextPlugin('styles.css'),
      ]
    : [
        new webpack.ProvidePlugin({
          $: 'jquery',
          jQuery: 'jquery',
          'windows.jQuery': 'jquery',
        }),
        new ExtractTextPlugin('./styles/styles.css'),
      ],
};

if (!IS_DEV) {
  config.plugins.push(
    new UglifyJsPlugin({
      sourceMap: false,
    })
  );
}

module.exports = config;