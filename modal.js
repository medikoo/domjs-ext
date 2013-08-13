'use strict';

var getFactory = require('overlay').getFactory;

module.exports = function (domjs/*, options*/) {
	var factory = getFactory(domjs.document), insert = domjs.ns.insert
	  , options = arguments[1];
	domjs.ns[(options && options.name) || 'modal'] = function (/* options */) {
		var dom = factory.create.apply(factory, arguments);
		insert(dom);
		return dom;
	};
};
