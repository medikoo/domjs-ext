'use strict';

var eq = require('observable-value/eq');

module.exports = function (domjs/*, options*/) {
	var options = arguments[1];
	domjs.ns[(options && options.name) || 'eq'] = eq;
};
