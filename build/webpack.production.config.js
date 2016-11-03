import webpack from 'webpack'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import autoprefixer from 'autoprefixer'
import path from 'path'
import ExtractTextPlugin from 'extract-text-webpack-plugin'

const ENV = process.env.NODE_ENV

module.exports = {
  context: path.join(__dirname, '../src'),
  entry: {
    app: [
      './main.jsx'
    ],
    vendor: [
      'react',
      'react-dom',
      'react-redux',
      'react-router',
      'react-router-redux',
      'redux',
      'redux-thunk',
      'axios',
      'classnames'
    ]
  },
  output: {
    path: path.join(__dirname, '../dist'),
    filename: 'js/[name].[hash:16].js'
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  module: {
    loaders: [
      {
        test: /\.js[x]?$/,
        include: path.resolve(__dirname, '../src'),
        loaders: ['babel']
      },
      {
        test: /\.scss$/,
        include: path.resolve(__dirname, '../src/styles'),
        loader: 'style!css!postcss!sass'
      },
      {
        test: /\.scss$/,
        exclude: path.resolve(__dirname, '../src/styles'),
        loader: 'style!css?modules&importLoaders=1&localIdentName=[local]_[hash:base64:8]!postcss!sass'
      }
    ]
  },
  postcss: [
    autoprefixer({browsers: ['last 2 versions']})
  ],
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html',
      filename: 'index.html',
      minify: {
        collapseWhitespace: false
      }
    }),
    new ExtractTextPlugin('css/all.[hash:16].css'),
    new webpack.optimize.CommonsChunkPlugin('vendor', 'js/vendor.js'),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(ENV)
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    })
  ]
}
