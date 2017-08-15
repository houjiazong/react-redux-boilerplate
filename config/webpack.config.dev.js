const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const project = require('./project.config')

const __DEV__ = project.env === 'development'
const __PROD__ = project.env === 'production'

module.exports = {
  entry: {
    app: [
      'webpack-hot-middleware/client?path=/__webpack_hmr',
      project.paths.client('main.js')
    ],
    vendor: [
      'axios',
      'prop-types',
      'react',
      'react-dom',
      'react-helmet',
      'react-redux',
      'react-router-dom',
      'react-router-redux',
      'redux',
      'redux-thunk'
    ]
  },
  output: {
    path: project.paths.dist(),
    filename: 'js/[name].[hash:8].js',
    publicPath: '/'
  },
  resolve: {
    extensions: ['.js', '.json', '.jsx']
  },
  devtool: 'cheap-module-source-map',
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
        test: /\.(sass|scss)$/,
        exclude: /node_modules/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              modules: true,
              localIdentName: '[name]__[local]--[hash:base64:5]'
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              plugins: require('./postcss.config')
            }
          },
          {
            loader: 'sass-loader'
          }
        ]
      }
    ]
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      filename: 'js/vendor.[hash:8].js',
      minChunks: Infinity
    }),
    new webpack.DefinePlugin({
      __DEV__,
      __PROD__
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    // 当模块热替换(HMR)时在浏览器控制台输出对用户更友好的模块名字信息
    new HtmlWebpackPlugin({
      template: project.paths.client('index.html'),
      hash: false,
      filename: 'index.html',
      inject: 'body',
      minify: {
        collapseWhitespace: true
      }
    })
  ]
}
