import request from 'request';

export function agent(req, res, path, query) {
  return new Promise((resolve, reject) => {
    req.pipe(request({
      uri: path,
      method: req.method,
      qs: query
    }, (err, response) => {
      if (err) {
        return reject(err);
      }
      return resolve(response);
    })).pipe(res);
  });
}
