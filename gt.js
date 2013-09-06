'use strict';

var gt = require('mutable/gt');

module.exports = function (domjs/*, options*/) {
	var options = arguments[1];
	domjs.ns[(options && options.name) || 'gt'] = gt;
};
