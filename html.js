'use strict';

module.exports = function (domjs) {
	var container = domjs.ns.div(), insert = domjs.ns.insert;
	if (container.parentNode) container.parentNode.removeChild(container);
	return function (html) {
		container.innerHTML = html;
		return insert(container.childNodes);
	};
};
