'use strict';

var arrayFrom = require('es5-ext/lib/Array/from')

  , join = Array.prototype.join;

module.exports = function (domjs) {
	return function (/*,  …paths*/) {
		var paths = arguments;
		if (this) {
			paths = arrayFrom(paths);
			paths.unshift(this);
		}
		if (!paths.length) return '/';
		return '/' + join.call(paths, '/') + '/';
	};
};
