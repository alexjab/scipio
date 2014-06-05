var request = require ('request');
var cheerio = require ('cheerio');

var Scipio = function () {
  this.request = request;
  this.cheerio = cheerio;
  this.headers = {};

  return this;
};

Scipio.prototype.setHeaders = function (key, value) {
  if (typeof key === 'string') {
    this.headers[key] = value;
  } else {
    this.headers = key;
  }
  return this;
};

Scipio.prototype.fromBody = function (body, callback) {
  var $ = null;
  $ = this.cheerio.load (body);
  callback ($, body);
  return this;
};

Scipio.prototype.get = function (url, callback) {
  this.request.get ({url: url, headers: this.headers}, function (error, response, body) {
    callback.apply (this, this._parser (error, body, response));
  }.bind (this));
  return this;
};
Scipio.prototype.fromUrl = Scipio.prototype.get;

Scipio.prototype._parser = function (error, body, response) {
  var $;
  try {
    $ = cheerio.load (body);
  } catch (e) {
    null;
  }
  return [$, body];
};

Scipio.prototype.use = function (fn) {
  this._parser = fn;
  return this;
};

module.exports = Scipio;
