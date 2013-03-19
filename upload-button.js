'use strict';

var copy   = require('es5-ext/lib/Object/copy')
  , submit = require('dom-ext/lib/HTMLFormElement/prototype/submit-by-event')

  , slice = Array.prototype.slice

  , onFileSelect;

onFileSelect = function () { submit.call(this.form); };

module.exports = function (domjs) {
	var form = domjs.form, input = domjs.input, div = domjs.div
	  , label = domjs.label;

	return function (options) {
		var attrs, dom;
		options = Object(options);
		attrs = copy(options);
		attrs.method = 'post';
		attrs.enctype = 'multipart/form-data';
		delete attrs.inputName;
		delete attrs.multiple;
		delete attrs.progressContainer;
		delete attrs.label;
		dom = form(attrs, slice.call(arguments, 1),
			div(label(options.label, input({ type: 'file',
				name: options.inputName || 'file',
				multiple: (options.multiple == null) ? true :
							Boolean(options.multiple),
					onchange: onFileSelect }))));
		dom._progressContainer = options.progressContainer;
		return dom;
	};
};
