import Router from 'koa-router';
import requireDir from 'require-dir';

const controllers = requireDir('./controllers');

export default () => {
  const router = new Router({
    prefix: ''
  });

  router.redirect('/', '/app/', 302);

  router.get('/app/*', controllers.home.index);
  router.get('/app', controllers.home.index);

  router.all('/api/*', controllers.api.index);

  return router.routes();
};
