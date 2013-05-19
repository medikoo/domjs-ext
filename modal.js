'use strict';

var ee = require('event-emitter/lib/core');

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
		this.emit('show');
	};

	hide = function () {
		if (current === this) {
			this.classList.remove('visible');
			this.ownerDocument.body.classList.remove('modal-on');
			this.ownerDocument.body.classList.add('modal-off');
			this.classList.add('hidden');
			current = null;
			this.emit('hide');
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
		if (current.persistent) return;
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
		self = ee(fn.apply(this, arguments));
		self.classList.add('modal');
		if (curtain != null) self.curtain = curtain;
		self.persistent = options.persistent;
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
