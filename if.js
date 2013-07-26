'use strict';

var remove = require('dom-ext/lib/Node/prototype/remove')
  , _if    = require('mutable/if')

  , isArray = Array.isArray, unbind;

unbind = function (data) {
	if (data == null) return data;
	if (data.parentNode) remove.call(data);
	else if (isArray(data)) data.forEach(data, unbind);
	return data;
};

module.exports = function (domjs) {
	return function (cond, t, f) { return _if(cond, unbind(t), unbind(f)); };
};
