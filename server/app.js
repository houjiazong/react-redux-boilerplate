import koa from 'koa';
import path from 'path';
import Debug from 'debug';
import logger from 'koa-logger';
import serve from 'koa-static';
import cons from 'consolidate';
import nunjucks from 'nunjucks';
import views from 'koa-views';

import webpackDev from '../webpack';
import routes from './routes';

const app = koa();
const debug = Debug('app:server');

const IS_PROD = process.env.NODE_ENV == 'production';
const PORT = process.env.PORT || 9000;

if (!IS_PROD) {
  webpackDev(app);
}

app.use(logger());

cons.requires.nunjucks = nunjucks.configure({
  autoescape: true,
  noCache: !IS_PROD
});

app.use(views(path.join(__dirname, '../build'), {
  map: {
    html: 'nunjucks',
  },
}));

app.use(serve(path.join(__dirname, '../build')));

app.use(routes());

app.listen(PORT, () => {
  debug(`listening on PORT: ${PORT}`);
});
