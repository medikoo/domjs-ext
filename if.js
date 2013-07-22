'use strict';

var remove = require('dom-ext/lib/Node/prototype/remove')
  , _if    = require('mutable/if');

module.exports = function (domjs) {
	return function (cond, t, f) {
		if (t && t.parentNode) remove.call(t);
		if (f && f.parentNode) remove.call(f);
		return _if(cond, t, f);
	};
};
