'use strict';

var d          = require('es5-ext/lib/Object/descriptor')
  , isFunction = require('es5-ext/lib/Function/is-function')
  , isMutable  = require('mutable/is')
  , normalize  = require('dom-ext/lib/Document/prototype/normalize')
  , removeNode = require('dom-ext/lib/Node/prototype/remove')
  , isNode     = require('dom-ext/lib/Node/is-node')

  , defineProperty = Object.defineProperty
  , DOM, Attr;

DOM = function (document, value, onTrue, onFalse) {
	var df = document.createDocumentFragment(), current;
	this.document = document;
	if (!isMutable(value)) {
		this.normalize(value ? onTrue : onFalse).forEach(df.appendChild, df);
		return df;
	}
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
		old.forEach(function (el) { removeNode.call(el); });
		container = this.dom.parentNode;
		current = value;
		if (!container) return;
		nu.forEach(function (el) { container.insertBefore(el, this.dom); }, this);
	}.bind(this));
	current = Boolean(value.value);
	this[current ? 'true' : 'false'].forEach(df.appendChild, df);
	df.appendChild(this.dom);
	return df;
};
Object.defineProperties(DOM.prototype, {
	resolve: d(function (value) {
		return normalize.call(this.document, isFunction(value) ? value() : value);
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

Attr = function (element, name, value, onTrue, onFalse) {
	var current, attrValue;
	if (!isMutable(value)) {
		attrValue = this.normalize(value ? onTrue : onFalse);
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
