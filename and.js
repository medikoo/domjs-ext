'use strict';

var and = require('mutable/and');

module.exports = function (domjs/*, options*/) {
	var options = arguments[1];
	domjs.ns[(options && options.name) || 'and'] = and;
};
