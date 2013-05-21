var libpath = require('path');

/**
 * Initialize a new `View` with the given `name`.
 *
 * @class View
 * @param {String} name the name of the view
 * @param {Object} options
 * @static
 * @constructor
 * @api private
 */
function View(name, options) {
  options = options || {};
  this.name = name;
  this.path = name; // this is required, otherwise `express` will assume the instance is not valid
  this.root = options.root; // same as app.set('views')
}

/**
 * Lookup view by the given `name`.
 *
 * @method lookup
 * @param {String} name the view name which is the first argument when calling `res.render()`
 * @param {Object} options the `options` passed as the second argument when calling `res.render()`
 * @param {Function} callback the `callback(err, fn)` function where fn represents the compiled view.
 * @api private
 */
View.prototype.lookup = function (name, options, callback) {

  /**
  // option #1: getting compiled template from a nodejs module
  // - leveraging require(): assumming the templates were precompiled into nodejs modules
  // callback(null, require(libpath.join(this.root, name)));
  **/

  /**
  // option #2: getting compiled template from memory allocation
  // - leveraging memory: assumming the templates were precompiled into memory
  // callback(null, global.compiledTemplates[name]);
  **/

  /**
  // option #3: getting content to be compiled from a REST-like api
  // - mongodb style to fetch a view by name, and compiling it with a global
  //   compiler method
  db.view.find({name: name}, function (err, view) {
    if (err) {
      return callback(err);
    }
    callback(null, global.compileView(view));
  });
  **/

  /** 
  // option #4: getting content to be compiled from a DB
  // - using http module to make a GET request to a server using the name as the path to request
  require('http').request({
    host: 'public-api.com',
    port: 80,
    path: name,
    method: 'GET'
  }, function (res) {
    var buf = '';
    res.setEncoding('utf8');
    res.on('data', function(str){ buf += str });
    res.on('end', function(){
      callback(null, global.compileView(buf));
    });
  }).end();
  **/

};

/**
 * Render with the given `options` and callback `fn(err, str)`.
 *
 * @method render
 * @param {Object} options the `options` passed as the second argument when calling `res.render()`
 * @param {Function} fn the callback function.
 * @api private
 */
View.prototype.render = function (options, fn) {
    var path = this.path;
    this.lookup(path, options, function (err, template) {
      if (err) {
        return fn(err);
      }
      if (!template) {
        return fn(new Error('Failed to lookup view "' + path + '"'));
      }
      fn(null, template(options));
    });
};