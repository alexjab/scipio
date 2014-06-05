Scipio
======

A small web scraper

Scipio uses [request]() and [cheerio](https://github.com/cheeriojs/cheerio) to retrieve pages and parse them.

License: MIT.

##Example
```
var Scipio = require ('index.js');
var scipio = new Scipio ();

scipio.get ('http://example.org', function ($, body) {
  console.log ($ ('p').text ());
});
```

##Usage

###.fromBody (body, callback)
Get a $ selector from a body.

```
scipio.fromBody ('<html><body><h1>It works!</h1></body></html>', function ($) {
  console.log ($ ('h1').text ());
});
```

Callback takes `($, body)` as parameters.

###.fromUrl (url, callback)
Get a $ selector from a URL.

```
scipio.fromUrl ('http://example.org', function ($, body) {
  console.log ($ ('p').text ());
});
```

Callback takes `($, body)` as parameters.

Alias: `.get (url, callback)`

###.use (function)
Use a function instead of the default parser.

The parser receives `(error, body, response)` as parameters, and must return an array of parameters for the callback of the `.fromUrl` method.

The default parser returns [$, body].

```
scipio.use (function (error, body, response) {
  return ['foo', 'bar', 'baz', body];
});

scipio.fromUrl ('http://example.org', function (foo, bar, baz, body) {
  console.log (arguments[0], arguments[1], arguments[2]);
  //=> foo bar baz
});
```

###.setHeaders (key, value)
Set the headers to the specified parameter.

 - If the function receives two parameters, the couple `key/value` will be added to the headers,
 - If the function receives only one parameter, the headers will be set to it.

```
scipio.setHeaders ({'User-Agent': 'My Awesome UserAgent'});
```

