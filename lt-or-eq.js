'use strict';

var ltOrEq = require('mutable/lt-or-eq');

module.exports = function (domjs/*, options*/) {
	var options = arguments[1];
	domjs.ns[(options && options.name) || 'ltOrEq'] = ltOrEq;
};