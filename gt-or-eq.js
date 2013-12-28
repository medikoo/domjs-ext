'use strict';

var gtOrEq = require('observable-value/gt-or-eq');

module.exports = function (domjs/*, options*/) {
	var options = arguments[1];
	domjs.ns[(options && options.name) || 'gtOrEq'] = gtOrEq;
};
