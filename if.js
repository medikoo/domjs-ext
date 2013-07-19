'use strict';

var toArray    = require('es5-ext/lib/Array/from')
  , d          = require('es5-ext/lib/Object/descriptor')
  , isFunction = require('es5-ext/lib/Function/is-function')
  , isMutable  = require('mutable/is')
  , normalize  = require('dom-ext/lib/Document/prototype/normalize')
  , isDF       = require('dom-ext/lib/DocumentFragment/is-document-fragment')
  , removeNode = require('dom-ext/lib/Node/prototype/remove')
  , isNode     = require('dom-ext/lib/Node/is-node')

  , defineProperty = Object.defineProperty, isArray = Array.isArray
  , DOM, Attr;

DOM = function (document, value, onTrue, onFalse) {
	var df, current, dom;
	this.document = document;
	if (!isMutable(value)) return this.resolve(value ? onTrue : onFalse);
	df = document.createDocumentFragment();
	this.dom = document.createTextNode("");
	this.onTrue = onTrue;
	if (isNode(onTrue)) removeNode.call(onTrue);
	this.onFalse = onFalse;
	if (isNode(onFalse)) removeNode.call(onFalse);

	value.on('change', function (value) {
		var nu, old, container;
		value = Boolean(value);
		if (value === current) return;
		old = value ? this.false : this.true;
		nu = value ? this.true : this.false;
		if (old) {
			if (isArray(old)) {
				old.forEach(function (el) { removeNode.call(el); });
			} else {
				removeNode.call(old);
			}
		}
		container = this.dom.parentNode;
		current = value;
		if (!container) return;
		if (nu) {
			if (isArray(nu)) {
				nu.forEach(function (el) {
					container.insertBefore(el, this.dom);
				}, this);
			} else {
				container.insertBefore(nu, this.dom);
			}
		}
	}.bind(this));
	current = Boolean(value.value);
	dom = this[current ? 'true' : 'false'];
	if (dom) {
		if (isArray(dom)) dom.forEach(df.appendChild, df);
		else df.appendChild(dom);
	}
	df.appendChild(this.dom);
	return df;
};
Object.defineProperties(DOM.prototype, {
	resolve: d(function (value) {
		return normalize.call(this.document, isFunction(value) ? value() : value);
	}),
	true: d.gs(function () {
		var dom = this.resolve(this.onTrue);
		if (isDF(dom)) {
			if (dom.childNodes.length) dom = toArray(dom.childNodes);
			else dom = null;
		}
		defineProperty(this, 'true', d(dom));
		delete this.onTrue;
		return this.true;
	}),
	false: d.gs(function () {
		var dom = this.resolve(this.onFalse);
		if (isDF(dom)) {
			if (dom.childNodes.length) dom = toArray(dom.childNodes);
			else dom = null;
		}
		defineProperty(this, 'false', d(dom));
		delete this.onFalse;
		return this.false;
	})
});

Attr = function (element, name, value, onTrue, onFalse) {
	var current, attrValue;
	if (!isMutable(value)) {
		attrValue = this.resolve(value ? onTrue : onFalse);
		if (attrValue == null) element.removeAttribute(name);
		else element.setAttribute(name, attrValue);
		return attrValue;
	}
	this.onTrue = onTrue;
	this.onFalse = onFalse;
	value.on('change', function (value) {
		var attrValue;
		value = Boolean(value);
		if (value === current) return;
		attrValue = value ? this.true : this.false;
		if (attrValue == null) element.removeAttribute(name);
		else element.setAttribute(name, attrValue);
		current = value;
	}.bind(this));
	current = Boolean(value.value);
	attrValue = this[current ? 'true' : 'false'];
	if (attrValue == null) element.removeAttribute(name);
	else element.setAttribute(name, attrValue);
	return value;
};
Object.defineProperties(Attr.prototype, {
	resolve: d(function (value) {
		if (isFunction(value)) value = value();
		return (value == null) ? null : String(value);
	}),
	true: d.gs(function () {
		defineProperty(this, 'true', d(this.resolve(this.onTrue)));
		delete this.onTrue;
		return this.true;
	}),
	false: d.gs(function () {
		defineProperty(this, 'false', d(this.resolve(this.onFalse)));
		delete this.onFalse;
		return this.false;
	})
});

module.exports = function (domjs) {
	return function (value, onTrue, onFalse) {
		var initialized;
		return {
			toDOM: function (document) {
				if (initialized) throw new Error("Cannot convert to DOM twice");
				initialized = true;
				return new DOM(document, value, onTrue, onFalse);
			},
			toDOMAttr: function (element, name) {
				if (initialized) throw new Error("Cannot convert to DOM twice");
				initialized = true;
				return new Attr(element, name, value, onTrue, onFalse);
			}
		};
	};
};
