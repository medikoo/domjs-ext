'use strict';

var autoSubmit = require('dom-ext/lib/HTMLFormElement/prototype/auto-submit');

module.exports = function (domjs) {
	domjs.getDirectives('form').autoSubmit = function () {
		this.classList.add('auto-submit');
		autoSubmit.call(this);
	};
};
