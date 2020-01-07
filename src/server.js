const http = require('http');
const url = require('url');
const { StringDecoder } = require('string_decoder');
const config = require('../config');
const routes = require('./routes');
const { jsonParse } = require('./utils');

const server = {};

/**
 * @param {ServerResponse} res
 * @return {function(statusCode: number, payload: Object)}
 */
const routeCallback = (res) => (statusCode, payload) => {
  if (typeof statusCode !== 'number') {
    statusCode = 200;
  }
  if (typeof payload !== 'object') {
    payload = {};
  }

  res.setHeader('Content-Type', 'application/json');
  res.writeHead(statusCode);
  res.end(JSON.stringify(payload));
};

server.init = () => {
  const _server = http.createServer((req, res) => {
    const decoder = new StringDecoder('utf8');
    let buffer = '';

    req.on('data', (data) => {
      buffer += decoder.write(data);
    });

    req.on('end', () => {
      buffer += decoder.end(); // Todo: check without it

      const parsedUrl = url.parse(req.url, true);
      const trimmedPath = parsedUrl.pathname.replace(/^\/+|\/+$/g, '');

      const routeHandler = routes[trimmedPath] || routes.notFound;

      const { headers = {}, method } = req;

      routeHandler(
        {
          headers,
          method: method.toLowerCase(),
          query: parsedUrl.query,
          payload: jsonParse(buffer),
        },
        routeCallback(res),
      );
    });
  });

  _server.listen(config.port, () => {
    console.log(`Server started on port ${config.port}!`);
  });
};

module.exports = server;
