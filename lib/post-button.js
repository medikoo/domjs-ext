'use strict';

var genId = require('time-uuid')

  , slice = Array.prototype.slice;

module.exports = function (domjs) {
	var form = domjs.form, p = domjs.p, button = domjs.button
	  , script = domjs.script;

	return function (attrs) {
		var id, confirm, message;
		attrs = Object(attrs);
		if (!attrs.hasOwnProperty('method')) attrs.method = 'post';
		if (!attrs.hasOwnProperty('id')) attrs.id = 'form-' + genId();
		id = String(attrs.id);
		if (attrs.confirm) {
			confirm = true;
			message = (attrs.confirm === true) ? null : String(attrs.confirm);
		}
		return [form(attrs,
			p(button({ type: 'submit' }, slice.call(arguments, 1)))),
			confirm && script(function (formId, message) {
				$.confirmSubmit(formId, message);
			}, id, message)];
	};
};
