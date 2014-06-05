Scipio
======

[![NPM version](https://badge.fury.io/js/scipio.svg)](http://badge.fury.io/js/scipio)

A small web scraper

Scipio uses [request](https://github.com/mikeal/request) and [cheerio](https://github.com/cheeriojs/cheerio) to retrieve pages and parse them.

License: MIT.

##Example
```
var Scipio = require ('scipio');
var scipio = new Scipio ();

scipio.get ('http://example.org', function ($, body) {
  // $ is a jQuery selector
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
scipio.fromUrl ('http://example.org', function ($) {
  console.log ($ ('p').text ());
});
```

Callback takes `($, body)` as parameters.

Alias: `.get (url, callback)`

###.use (function)
Use a function instead of the default parser.

The parser receives `(error, response, body)` as parameters, and must return an array of parameters for the callback of the `.fromUrl` method.

The default parser returns [$, body, response].

```
scipio.use (function (error, response, body) {
  return ['foo', 'bar', 'baz', body];
});

scipio.fromUrl ('http://example.org', function (foo, bar, baz, body) {
  console.log (arguments[0], arguments[1], arguments[2]);
  //=> foo bar baz
});
```

The parser function must always return an array of values as [line 30 of index.js](https://github.com/alexjab/scipio/blob/master/index.js#L30) shows:
```
  callback.apply (this, this._parser (error, body, response));
```

###.setHeaders (key, value)
Set the headers to the specified parameter.

 - if the function receives two parameters, the couple `key/value` will be added to the headers,
 - if the function receives only one parameter, the headers will be set to it.

```
scipio.setHeaders ('User-Agent', 'My Awesome UserAgent');
// => sets the headers 'User-Agent' property to 'My Awesome UserAgent'

scipio.setHeaders ({'User-Agent': 'My Awesome UserAgent'});
// => sets the headers to {'User-Agent': 'My Awesome UserAgent'}
```

##Testing
```
make test
```

##License
MIT

The MIT License (MIT)

Copyright (c) 2014 Alexandre Jablon <alex@jablon.me>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
