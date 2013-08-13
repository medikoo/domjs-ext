'use strict';

var slice = Array.prototype.slice;

module.exports = function (domjs) {
	var script = domjs.ns.script;
	return function (name) {
		return script(function (name, args) {
			$[name].apply($, args);
		}, name, slice.call(arguments, 1));
	};
};
