var Scipio = require ('index.js');

var scipio = new Scipio ();

scipio.setHeaders ({'User-Agent': 'My Awesome UserAgent'});

scipio.get ('http://ifconfig.me/ip', function ($, body) {
  if (body)
    console.log ('My IP address: ', body);
});

scipio.get ('http://ifconfig.me/ua', function ($, body) {
  if (body)
    console.log ('My User-Agent: ', body);
});

scipio.get ('http://example.org', function ($, body) {
  console.log (' - Heading h1:');
  console.log ('\t text: '+$ ('h1').text ());

  console.log ('');
  console.log (' - Paragraph:');
  console.log ('\t text: '+$ ('p').text ());
  
  console.log ('');
  console.log (' - Link:');
  console.log ('\t href: '+$ ('a').attr ('href'));
  console.log ('\t text: '+$ ('a').text ());
  console.log ('');
});

scipio.fromBody ('<html><body><h1>It works!</h1></body></html>', function ($) {
  console.log ($ ('h1').text ());
});

scipio = new Scipio ();
scipio.use (function (error, body, response) {
  return ['foo', 'bar', 'baz', body];
});

scipio.fromUrl ('http://example.org', function (foo, bar, baz, body) {
  console.log (arguments[0], arguments[1], arguments[2]);
});
