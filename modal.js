'use strict';

var ee = require('event-emitter/lib/core').methods;

module.exports = function (domjs) {
	var fn = domjs.div, current, show, hide, toggle;

	show = function () {
		if (current === this) return;
		if (current) hide.call(current);
		this.classList.remove('hidden');
		this.ownerDocument.body.classList.remove('modal-off');
		if (this.curtain !== false) {
			this.ownerDocument.body.classList.add('modal-on');
		}
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

	return function (/* options */) {
		var options = Object(arguments[0]), self, curtain;
		if (options.curtain != null) {
			curtain = false;
			delete options.curtain;
		}
		self = fn.apply(this, arguments);
		if (curtain != null) self.curtain = curtain;
		self.show = show.bind(self);
		self.hide = hide.bind(self);
		self.toggle = toggle.bind(self);

		if (!self.classList.contains('visible')) {
			self.classList.add('hidden');
		} else {
			if (current) hide.call(current);
			current = self;
		}
		return self;
	};
};
