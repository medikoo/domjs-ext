'use strict';

var getFactory = require('overlay').getFactory;

module.exports = function (domjs) {
	var factory = getFactory(domjs.document), insert = domjs.ns.insert;
	return function (/* options */) {
		var dom = factory.create.apply(factory, arguments);
		insert(dom);
		return dom;
	};
};
