'use strict';

var lt = require('mutable/lt');

module.exports = function (domjs/*, options*/) {
	var options = arguments[1];
	domjs.ns[(options && options.name) || 'lt'] = lt;
};
