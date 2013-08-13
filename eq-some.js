'use strict';

var eqSome = require('mutable/eq-some');

module.exports = function (domjs/*, options*/) {
	var options = arguments[1];
	domjs.ns[(options && options.name) || 'eqSome'] = eqSome;
};
