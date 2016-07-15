import path from 'path';
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';

const env = process.env.NODE_ENV;

module.exports = {
  context: path.join(__dirname, '../src'),
  entry: {
    app: ['./app.js', 'webpack-hot-middleware/client?path=/__webpack_hmr'],
    verdor: [
      'react',
      'react-dom',
      'react-router',
      'redux',
      'react-redux',
      'react-router-redux',
      'history',
      'classnames',
      'redux-thunk',
      'axios',
      'es6-promise'
    ]
  },
  output: {
    path: path.join(__dirname, '../build'),
    filename: '[name].[hash:16].js',
    sourceMapFilename: '[file].map',
    publicPath: '/'
  },
  devtool: '#source-map',
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  module: {
    loaders: [
      {
        test: /\.js[x]?$/,
        exclude: /node_modules/,
        loaders: ['react-hot', 'babel']
      },
      {
        test: /\.less|css$/,
        exclude: /node_modules/,
        loaders: ['style?sourceMap', 'css?modules&importLoaders=1&localIdentName=[name]__[local]__[hash:base64:5]', 'autoprefixer?browsers=last 2 version!less']
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
      template: './index.html',
      filename: 'index.html',
      minify: {
        collapseWhitespace: true
      }
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(env)
    }),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ]
};
