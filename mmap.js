'use strict';

var map = require('mutable/map');

module.exports = function (domjs/*, name*/) {
	var options = arguments[1];
	domjs.ns[(options && options.name) || 'mmap'] = map;
};
