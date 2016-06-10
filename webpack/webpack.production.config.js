import path from 'path';
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

module.exports = {
  context: path.join(__dirname, '../src'),
  entry: {
    app: ['./app.js'],
    verdor: [
      'react',
      'react-dom',
      'react-router',
      'redux',
      'react-redux',
      'axios',
      'classnames',
      'js-cookie',
      'react-router-redux',
      'redux-thunk',
      'promise-es6'
    ]
  },
  output: {
    path: path.join(__dirname, '../build'),
    filename: '[name].[hash:16].js',
    sourceMapFilename: '[file].map',
    publicPath: '/'
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  module: {
    loaders: [
      {
        test: /\.js[x]?$/,
        exclude: /node_modules/,
        loader: 'babel'
      },
      {
        test: /\.less|css$/,
        exclude: /node_modules/,
        loader: ExtractTextPlugin.extract(
          'style?sourceMap',
          'css?modules&importLoaders=1&' +
          'localIdentName=[name]__[local]__[hash:base64:5]!autoprefixer?browsers=last 2 version!less'
        )
      },
      {
        test: /\.json$/,
        loader: 'json',
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg|woff|woff2)$/,
        loader: 'url?limit=10000',
      },
      {
        test: /\.(eot|ttf|wav|mp3)$/,
        loader: 'file',
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html'
    }),
    new webpack.DefinePlugin({
      __DEV__: process.env.NODE_ENV === 'development',
      __PRERELEASE__: process.env.NODE_ENV === 'production'
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),
    new ExtractTextPlugin('css/all.[hash:16].css'),
    new webpack.optimize.OccurenceOrderPlugin()
  ]
};
