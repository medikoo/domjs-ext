'use strict';

var gtOrEq = require('mutable/gt-or-eq');

module.exports = function (domjs/*, options*/) {
	var options = arguments[1];
	domjs.ns[(options && options.name) || 'gtOrEq'] = gtOrEq;
};
