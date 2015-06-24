var fs   = require('fs')
var path = require('path')

module.exports = function (opts) {
  opts = opts || {}
  if (!('root' in opts)) opts.root = __dirname
  return function(req, res, next) {
    function resolve(file) { return path.join(opts.root, file) }
    function pathStarts(v) { return req.url.indexOf(v) === 0; }
    function pathEnds(v) { return req.url.indexOf(v) === (req.url.length - v.length); }
    function type (t) { res.setHeader('Content-Type', t) }
    function read(file) { return fs.createReadStream(resolve(file)); }
    function serve(file) { return read(file).on('error', serve404).pipe(res) }
    function serve404() { res.writeHead(404); res.end('Not found'); }

    // Homepage
    if (req.url == '/' || req.url == '/index.html') {
      type('text/html')
      return serve('html/home.html')
    }

    // Other pages
    if (opts.pages && req.method == 'GET' && opts.pages.indexOf(req.url.slice(1)) !== -1) {
      type('text/html')
      return serve('html/'+req.url.slice(1))
    }

    // Static asset routes
    if (pathEnds('.jpg'))        type('image/jpeg')
    else if (pathEnds('.jpeg'))  type('image/jpeg')
    else if (pathEnds('.gif'))   type('image/gif')
    else if (pathEnds('.ico'))   type('image/x-icon');
    else if (pathEnds('.png'))   type('image/png');
    else if (pathEnds('.woff'))  type('application/x-font-woff')
    else if (pathEnds('.woff2')) type('application/font-woff2')
    else if (pathEnds('.js'))    type('application/javascript')
    else if (pathEnds('.css'))   type('text/css')
    if (pathStarts('/img/') || pathStarts('/fonts/') || pathStarts('/css/') || pathStarts('/js/'))
      return serve(req.url)
    next()
  }
}