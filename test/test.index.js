var should = require ('should');
var thebulk = require ('thebulk');

var Scipio = require ('../index.js');

describe ('index.js', function () {
  var bulk = new thebulk ();
  var scipio = new Scipio ();
  describe ('new Scipio ()', function () {
    it ('should create a new Scipio object', function () {
      var scipio = new Scipio ();
      scipio.should.have.property ('request');
      scipio.should.have.property ('cheerio');
      scipio.should.have.property ('headers');
    });
  });

  describe ('Scipio.setHeaders ()', function () {
    it ('should set the headers property as a whole', function () {
      var headers = {foo: bulk.string (), bar: bulk.string (), baz: bulk.string ()};
      scipio.setHeaders (headers);
      scipio.should.have.property ('headers', headers);
    });
    it ('should set the headers, property by property', function () {
      var foo = bulk.string ();
      scipio.setHeaders ('foo', foo);
      var bar = bulk.string ();
      scipio.setHeaders ('bar', bar);
      var baz = bulk.string ();
      scipio.setHeaders ('baz', baz);
      scipio.headers.should.containEql ({'foo': foo});
      scipio.headers.should.containEql ({'bar': bar});
      scipio.headers.should.containEql ({'baz': baz});
    });
  });

  describe ('Scipio.fromBody ()', function () {
    it ('should get a jQuery selector from the body', function (done) {
      var title = bulk.string ();
      var paragraph = bulk.string ();
      scipio.fromBody ('<html><body><h1>'+title+'</h1><p id="paragraph">'+paragraph+'</p></body></html>', function ($, body) {
        ($ !== null).should.be.true;
        body.should.equal ('<html><body><h1>'+title+'</h1><p id="paragraph">'+paragraph+'</p></body></html>');
        $ ('h1').text ().should.equal (title);
        $ ('#paragraph').text ().should.equal (paragraph);
        done ();
      });
    });
  });

  describe ('Scipio.get () (no remote)', function () {
    it ('should get a jQuery selector from a URL', function (done) {
      var url = bulk.string ();
      var scipio = new Scipio (url);
      var title = bulk.string ();
      var paragraph = bulk.string ();
      var url = 'http://example.org';
      scipio.request = {
        get: function (options, callback) {
          var body = '<html><body><h1>'+title+'</h1><p id="paragraph">'+paragraph+'</p></body></html>';
          options.url.should.eql (url);
          callback (null, {statusCode: 200}, body);
        }
      };
      scipio.fromUrl (url, function ($) {
        $ ('h1').text ().should.equal (title);
        $ ('#paragraph').text ().should.equal (paragraph);
        done ();
      });
    });
  });

  describe ('Scipio.get () (remote)', function () {
    it ('should make a get query to a remote website', function (done) {
      this.timeout (5000);
      scipio.get ('http://example.org', function ($, body) {
        if ($ || body) {
          (($ && body) != null).should.be.true;
          $ ('h1').text ().should.equal ('Example Domain');
          $ ('a').attr ('href').should.equal ('http://www.iana.org/domains/example');
          $ ('a').text ().should.equal ('More information...');
        } else {
          console.log ('Test Scipio.get () ignored, an error happened while getting the test url');
        }
        done ();
      });
    });
  });

  describe ('Scipio.parser ()', function () {
    var title = bulk.string ();
    var paragraph = bulk.string ();
    var body = '<html><body><h1>'+title+'</h1><p id="paragraph">'+paragraph+'</p></body></html>';
    var data = scipio._parser (null, body, {statusCode: 200});
    var $ = data[0], body_ = data[1];
    it ('should return the body (default behavior)', function () {
      body_.should.equal (body);
    });
    it ('should return a $ selector (default behavior)', function () {
      $ ('h1').text ().should.equal (title);
      $ ('#paragraph').text ().should.equal (paragraph);
    });
  });

  describe ('Scipio.use ()', function () {
    var error = bulk.string ();
    var body = bulk.string ();
    var response = bulk.string ();
    var thingy = bulk.string ();
    var stuff = bulk.string ();
    var shiny = bulk.string ();
    var muddy = bulk.string ();
    var fn = function (error_, body_, response_) {
      return [thingy, stuff, shiny, muddy];
    };
    var scipio = new Scipio ();
    scipio.use (fn);
    scipio.request = {
      get: function (url, callback) {
        callback (error, response, body);
      }
    };
    it ('should return the values from the user defined parser, not the default one', function (done) {
      scipio.get ('http://example.org', function () {
        arguments[0].should.equal (thingy);
        arguments[1].should.equal (stuff);
        arguments[2].should.equal (shiny);
        arguments[3].should.equal (muddy);
        done ();
      });
    });
  });
});
