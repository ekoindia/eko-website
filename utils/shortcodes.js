const outdent = require('outdent');

module.exports = {

    icon: function (name) {
        return `<svg class="icon icon--${name}" role="img" aria-hidden="true" width="24" height="24"><use xlink:href="#icon-${name}"></use></svg>`;
	},

	orangeDot: function () {
		return `<span class="orange-dot"></span>`;
	},

	iconScroll: function () {
		return `<center><div class="icon-scroll"><div class="mouse"></div></div></center>`;
	}
}
