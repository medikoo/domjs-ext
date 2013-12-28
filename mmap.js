'use strict';

var map = require('observable-value/map');

module.exports = function (domjs/*, name*/) {
	var options = arguments[1];
	domjs.ns[(options && options.name) || 'mmap'] = map;
};
