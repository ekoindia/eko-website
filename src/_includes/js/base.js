/**
 * Common Javascript to be loaded on all pages
 */



/**
 * Utility to add multiple functions to be executed onPageLoad
 * @param {function} func The function to be executed after page load
 */
function addLoadEvent(func) {
	var oldonload = window.onload;
	if (typeof window.onload != 'function') {
		window.onload = func;
	} else {
		window.onload = function () {
			if (oldonload) {
				oldonload();
			}
			func();
		}
	}
}


/**
 * Load external Javascript
 * @param {string} src URL of the Javascript file
 * @param {function} onLoadCallback Function to be called after script has loaded successfully
 * @param {boolean} defer Defer loading of script?
 */
function loadScript(src, _id, onLoadCallback, defer) {
	if (document.querySelector('script[src="' + src + '"]')) {
		onLoadCallback && onLoadCallback();
		return;
	}

	var d = document;
	var s = d.createElement("script");
	s.setAttribute("async", "");
	if (_id) {
		s.id = _id;
	}
	if (defer) {
		s.defer = true;
	}
	if (onLoadCallback) {
		s.onload = onLoadCallback;
	}
	s.src = src;
	d.head.appendChild(s);
}


/**
 * SalesIQ: Open chat widget
 */
function showChat() {
	if ($zoho && $zoho.salesiq) {
		$zoho.salesiq.floatwindow.visible('show');	// show / hide
	}
}
