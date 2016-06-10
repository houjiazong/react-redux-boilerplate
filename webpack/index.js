import webpack from 'webpack';
import webpackDevMiddleware from 'koa-webpack-dev-middleware';
import webpackHotMiddleware from 'koa-webpack-hot-middleware';
import webpackConfig from '../webpack/webpack.config';
import fs from 'fs';
import Debug from 'debug';
import path from 'path';

const debug = Debug('app:webpack');

export default (app) => {
  const compiler = webpack(webpackConfig);
  compiler.plugin('compilation', compilation => {
    compilation.plugin('html-webpack-plugin-after-emit', (htmlPluginData, cb) => {
      let buildPath = path.resolve(`${__dirname}/../build`);
      if (!fs.existsSync(buildPath)) {
        fs.mkdirSync(buildPath);
      }
      fs.writeFile(path.resolve(`${__dirname}/../build/${htmlPluginData.plugin.options.filename}`), htmlPluginData.html.source(), err => {
        if (err) {
          return debug(err);
        } else {
          debug(`HtmlWebpackPlugin: /build/${htmlPluginData.plugin.options.filename} saved`);
        }
      });
      cb();
    });
  });
  app.use(webpackDevMiddleware(compiler, {
    publicPath: webpackConfig.output.publicPath,
    noInfo: false,
    stats: {
      colors: true,
      hash: true,
      cached: true,
      chunkModules: false,
      cachedAssets: true
    }
  }));
  app.use(webpackHotMiddleware(compiler));
};
