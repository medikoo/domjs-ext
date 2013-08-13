'use strict';

var eq = require('mutable/eq');

module.exports = function (domjs/*, name*/) {
	var options = arguments[1];
	domjs.ns[(options && options.name) || 'eq'] = eq;
};
