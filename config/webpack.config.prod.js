const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

const project = require('./project.config')

module.exports = {
  entry: {
    app: project.paths.client('main.js'),
    vendor: [
      'react',
      'react-dom',
      'redux',
      'react-redux',
      'react-router-redux',
      'prop-types',
      'react-helmet',
      'react-router-dom'
    ]
  },
  output: {
    path: project.paths.dist(),
    filename: 'js/[name].[chunkhash:8].js',
    publicPath: '/'
  },
  resolve: {
    extensions: ['.js', '.json', '.jsx', '.css']
  },
  devtool: 'source-map',
  name: 'client',
  target: 'web',
  module: {
    rules: [
      {
        test: /\.js[x]?$/,
        loader: 'babel-loader',
        include: project.paths.client()
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                importLoaders: 1,
                minimize: true,
                localIdentName: '[name]__[local]--[hash:base64:5]'
              }
            },
            {
              loader: 'postcss-loader',
              options: {
                plugins: require('./postcss.config')
              }
            }
          ]
        })
      }
    ]
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      filename: 'js/vendor.[chunkhash:8].js',
      minChunks: Infinity
    }),
    new webpack.EnvironmentPlugin(['NODE_ENV']),
    new HtmlWebpackPlugin({
      template: project.paths.client('index.html'),
      hash: false,
      filename: 'index.html',
      inject: 'body',
      minify: {
        collapseWhitespace: true
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      output: {
        comments: false
      },
      sourceMap: true
    }),
    new ExtractTextPlugin('css/[name].[contenthash:8].css')
  ]
}
