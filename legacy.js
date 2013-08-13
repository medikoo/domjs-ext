'use strict';

var plainReplaceAll = require('es5-ext/lib/String/prototype/plain-replace-all')

  , slice = Array.prototype.slice
  , caller = function (name, args) { $[name].apply($, args); };

module.exports = function (domjs, globalName) {
	var script = domjs.ns.script, fn = caller;
	if ((globalName != null) && (String(globalName) !== '$')) {
		fn = eval('(' + plainReplaceAll.call(fn, '$', globalName) + ')');
	}
	return function (name) {
		return script(fn, name, slice.call(arguments, 1));
	};
};
