'use strict';

var plainReplaceAll = require('es5-ext/string/#/plain-replace-all')

  , slice = Array.prototype.slice
  , caller = function (name, args) { $[name].apply($, args); };

module.exports = function (domjs/*, options*/) {
	var script = domjs.ns.script, fn = caller, options = arguments[1];
	if (options && (options.globalName != null) &&
			(String(options.globalName) !== '$')) {
		fn = eval('(' + plainReplaceAll.call(fn, '$', options.globalName) + ')');
	}
	domjs.ns[(options && options.name) || 'legacy'] = function (name) {
		return script(fn, name, slice.call(arguments, 1));
	};
};
