'use strict';

var not = require('mutable/not');

module.exports = function (domjs/*, name*/) {
	var options = arguments[1];
	domjs.ns[(options && options.name) || 'not'] = not;
};
