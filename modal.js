'use strict';

var ee = require('event-emitter/lib/core').methods;

module.exports = function (domjs) {
	var fn = domjs.div, current, show, hide, toggle;

	show = function () {
		if (current === this) return;
		if (current) hide.call(current);
		this.classList.remove('hidden');
		this.ownerDocument.body.classList.remove('modal-off');
		this.ownerDocument.body.classList.add('modal-on');
		this.classList.add('visible');
		current = this;
		ee.emit.call(this, 'show');
	};

	hide = function () {
		if (current === this) {
			this.classList.remove('visible');
			this.ownerDocument.body.classList.remove('modal-on');
			this.ownerDocument.body.classList.add('modal-off');
			this.classList.add('hidden');
			current = null;
			ee.emit.call(this, 'hide');
		}
	};

	toggle = function () {
		(this.classList.contains('hidden') ? 'show' : 'hide').call(this);
	};

	domjs.document.addEventListener('click', function (e) {
		var target;
		if (!current) return;
		target = e.target;
		if (target === current) return;
		if (!Boolean(current.compareDocumentPosition(target) & 16)) {
			hide.call(current);
		}
	}, true);

	return function () {
		var self = fn.apply(this, arguments);
		self.show = show.bind(self);
		self.hide = hide.bind(self);
		self.toggle = toggle.bind(self);

		if (!self.classList.contains('visible')) self.classList.add('hidden');
		return self;
	};
};
