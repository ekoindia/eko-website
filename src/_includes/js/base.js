/**
 * Common Javascript to be loaded on all pages
 */


/**
 * Open SalesIQ Chat widget
 */
function showChat() {
	if ($zoho && $zoho.salesiq) {
		$zoho.salesiq.floatwindow.visible('show');	// show / hide
	}
}
