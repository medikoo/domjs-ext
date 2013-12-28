'use strict';

var resolve = require('observable-value/resolve');

module.exports = function (domjs/*, name*/) {
	var options = arguments[1];
	domjs.ns[(options && options.name) || 'resolve'] = resolve;
};
