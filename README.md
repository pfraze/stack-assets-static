# Stack Assets Server

built for [stack](https://github.com/creationix/stack) but can be used on its own

```js
var stack = require('stack')
require('http').createServer(stack(
  require('stack-assets-builder')({ enabled: true, root: __dirname }),
  require('stack-assets-static')({ root: __dirname, pages: ['other-page.html'] })
))
```

options

 - `root`: string, the path to look for the assets in
 - `pages`: array(string), html files to load from `/html/*`

js files will be looked for under `root+'/js/*'` and hosted at `/js/*`

css files will be looked for under `root+'/css/*'` and hosted at `/css/*`

font files will be looked for under `root+'/fonts/*'` and hosted at `/fonts/*`

image files will be looked for under `root+'/img/*'` and hosted at `/img/*`