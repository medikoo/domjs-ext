'use strict';

var compact   = require('es5-ext/array/#/compact')
  , flatten   = require('es5-ext/array/#/flatten')
  , extend    = require('es5-ext/object/extend')
  , callable  = require('es5-ext/object/valid-callable')
  , value     = require('es5-ext/object/valid-value')
  , memoize   = require('memoizee/lib/regular')
  , remove    = require('dom-ext/element/#/remove')

  , map = Array.prototype.map
  , List;

List = function (domjs, list, cb, thisArg) {
	var df;
	this.domjs = domjs;
	this.list = list;
	this.thisArg = thisArg;
	this.location = domjs.document.createTextNode("");
	this.cb = cb;
	if (typeof list.on === 'function') {
		this.buildItem = memoize(this.buildItem.bind(this), { length: 1 });
		list.on('change', this.reload.bind(this));
	}
	this.current = this.build();
	df = domjs.document.createDocumentFragment();
	this.current.forEach(df.appendChild, df);
	df.appendChild(this.location);
	return df;
};

extend(List.prototype, {
	build: function () {
		return compact.call(flatten.call(map.call(this.list,
			function (item, index) { return this.buildItem(item, index); }, this)));
	},
	buildItem: function (item, index) {
		return this.domjs.safeCollect(this.cb.bind(this.thisArg, item, index,
			this.list));
	},
	reload: function () {
		this.current.forEach(function (el) { remove.call(el); });
		this.current = this.build();
		this.current.forEach(function (el) {
			this.parentNode.insertBefore(el, this);
		}, this.location);
	}
});

module.exports = function (domjs/*, options*/) {
	var options = arguments[1], name = (options && options.name) || 'list';
	domjs.ns[name] = function (list, cb/*, thisArg*/) {
		return new List(domjs, value(list), callable(cb), arguments[2]);
	};
};
