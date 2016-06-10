import {
  agent
}
from '../lib/agent';
import config from 'config';

export function* index() {
  // 提取路由规则，获取请求地址的路径
  const {
    0: path
  } = this.params;

  yield agent(this.req, this.res, `${config.PROXY_BASE}${path}`, this.query);
}
