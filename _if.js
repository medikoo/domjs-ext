'use strict';

var remove = require('dom-ext/node/#/remove')
  , _if    = require('mutable/if')

  , isArray = Array.isArray, unbind;

unbind = function (data) {
	if (data == null) return data;
	if (data.parentNode) remove.call(data);
	else if (isArray(data)) data.forEach(unbind);
	return data;
};

module.exports = function (domjs/*, options*/) {
	var options = arguments[1];
	domjs.ns[(options && options.name) || '_if'] = function (cond, t, f) {
		return _if(cond, unbind(t), unbind(f));
	};
};
