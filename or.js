'use strict';

var or = require('observable-value/or');

module.exports = function (domjs/*, name*/) {
	var options = arguments[1];
	domjs.ns[(options && options.name) || 'or'] = or;
};
