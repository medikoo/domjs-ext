'use strict';

var eqSome = require('observable-value/eq-some');

module.exports = function (domjs/*, options*/) {
	var options = arguments[1];
	domjs.ns[(options && options.name) || 'eqSome'] = eqSome;
};
