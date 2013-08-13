'use strict';

var arrayFrom = require('es5-ext/lib/Array/from')

  , forEach = Array.prototype.forEach;

module.exports = function (domjs/*, options*/) {
	var options = arguments[1];
	domjs.ns[(options && options.name) || 'url'] = function (/*,  …paths*/) {
		var paths = arguments, base, query, hash, path;
		if (this) {
			paths = arrayFrom(paths);
			paths.unshift(this);
		}
		if (!paths.length) return '/';
		base = [];
		query = [];
		hash = '';
		forEach.call(paths, function (path) {
			if (path[0] === '?') query.push(path.slice(1));
			else if (path[0] === '#') hash = path;
			else base.push(path);
		});
		path = base.length ? ('/' + base.join('/') + '/') : '/';
		if (query.length) path += '?' + query.join('&');
		return path + hash;
	};
};
