const { createServer } = require('http')
const { parse } = require('url')
const next = require('next')

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

const pathnames = [
  '/',
  '/article',
  '/edit',
  '/login'
];
app
  .prepare().then(() => {
  createServer((req, res) => {
    // Be sure to pass `true` as the second argument to `url.parse`.
    // This tells it to parse the query portion of the URL.
    const parsedUrl = parse(req.url, true)
    const { pathname, query } = parsedUrl;
    if (pathname === '/login' && req.method === 'POST') {
      res.setHeader('Set-Cookie', `token=123;Expires:${new Date(new Date().getTime() + 3600000).toUTCString()};path=/;`);
      res.writeHead(301, {'Location': '/'});
      res.end();
    } else if (pathnames.includes(pathname)) {
      app.render(req, res, pathname, query);
    } else {
      handle(req, res, parsedUrl);
    }
  }).listen(3000, err => {
    if (err) throw err
    console.log('> Ready on http://localhost:3000')
  })
});