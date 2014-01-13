'use strict';

var compact      = require('es5-ext/array/#/compact')
  , flatten      = require('es5-ext/array/#/flatten')
  , isList       = require('es5-ext/object/is-list')
  , callable     = require('es5-ext/object/valid-callable')
  , value        = require('es5-ext/object/valid-value')
  , d            = require('d/d')
  , memoize      = require('memoizee/lib/regular')
  , isObservable = require('observable-value/is-observable')
  , remove       = require('dom-ext/element/#/remove')

  , map = Array.prototype.map
  , DOMList, List;

DOMList = function (domjs, list, cb, thisArg) {
	var df;
	this.domjs = domjs;
	this.list = list;
	this.thisArg = thisArg;
	this.location = domjs.document.createTextNode("");
	this.cb = cb;
	if (isObservable(list)) {
		this.buildItem = memoize(this.buildItem.bind(this), { length: 1 });
		list.on('change', this.reload.bind(this));
	}
	this.current = this.build();
	df = domjs.document.createDocumentFragment();
	this.current.forEach(df.appendChild, df);
	df.appendChild(this.location);
	return df;
};

Object.defineProperties(DOMList.prototype, {
	build: d(function () {
		var result;
		if (isList(this.list)) {
			return compact.call(flatten.call(map.call(this.list,
				function (item, index) { return this.buildItem(item, index); }, this)));
		}
		result = [];
		this.list.forEach(function (item, key) {
			result.push(this.buildItem(item, key));
		}, this);
		return result;
	}),
	buildItem: d(function (item, index) {
		return this.domjs.safeCollect(this.cb.bind(this.thisArg, item, index,
			this.list));
	}),
	reload: d(function () {
		this.current.forEach(function (el) { remove.call(el); });
		this.current = this.build();
		this.current.forEach(function (el) {
			this.parentNode.insertBefore(el, this);
		}, this.location);
	})
});

List = function (domjs, list, cb, thisArg) {
	this.args = arguments;
};
Object.defineProperties(List.prototype, {
	toDOM: d(function () {
		return new DOMList(this.args[0], this.args[1], this.args[2], this.args[3]);
	})
});

module.exports = function (domjs/*, options*/) {
	var options = arguments[1], name = (options && options.name) || 'list';
	domjs.ns[name] = function (list, cb/*, thisArg*/) {
		return new List(domjs, value(list), callable(cb), arguments[2]);
	};
};
