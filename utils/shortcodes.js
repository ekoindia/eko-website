const outdent = require('outdent');

module.exports = {

    icon: name => `<svg class="icon icon--${name}" role="img" aria-hidden="true" width="24" height="24"><use xlink:href="#icon-${name}"></use></svg>`,

	iconScroll: () => `<center><div class="icon-scroll"><div class="mouse"></div></div></center>`,

	dotTag: (text, classes) => `<span class="dottagbox ${classes}">${text}</span>`

}
