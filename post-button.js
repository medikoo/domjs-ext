'use strict';

var genId = require('time-uuid')

  , slice = Array.prototype.slice;

module.exports = function (domjs) {
	var form = domjs.form, p = domjs.p, button = domjs.button
	  , script = domjs.script;

	return function (attrs) {
		var id, confirm, message, value, formAttrs = {};
		attrs = Object(attrs);
		formAttrs.method = attrs.hasOwnProperty('method') ? attrs.method : 'post';
		delete attrs.method;
		id = formAttrs.id =
			String(attrs.hasOwnProperty('id') ? attrs.id : 'form-' + genId());
		delete attrs.id;
		formAttrs.action = attrs.action;
		delete attrs.action;

		if (attrs.confirm) {
			confirm = true;
			message = (attrs.confirm === true) ? null : String(attrs.confirm);
			delete attrs.confirm;
		}
		value = attrs.value;
		delete attrs.value;
		attrs.type = 'submit';
		return [form(formAttrs,
			p(button(attrs, value), slice.call(arguments, 1))),
			confirm && script(function (formId, message) {
				$.confirmSubmit(formId, message);
			}, id, message)];
	};
};
