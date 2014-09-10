'use strict';

module.exports = function (domjs) {
	domjs._directives._element.fixed = function () {
		var element = this, style = element.style, isFixed;
		window.addEventListener('scroll', function () {
			if (window.pageYOffset >= element.offsetTop) {
				if (isFixed) return;
				style.position = 'fixed';
				style.top = '0';
				isFixed = true;
				return;
			}
			if (!isFixed) return;
			style.position = style.top = '';
			isFixed = false;
		}, false);
	};
};
