(function () {

	'use strict';

	/************************************************************
	 * Ensures console object is usable on non-console browsers *
	 ************************************************************/

	var method,
		noop = function noop() {},
		methods = [
			'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
			'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
			'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
			'timeStamp', 'trace', 'warn'
		],
		length = methods.length,
		console = (window.console = window.console || {});

	while (length--) {
		method = methods[length];

		// Only stub undefined methods.
		if (!console[method]) {
			console[method] = noop;
		}
	}

	/************************************************************
	 * Load Javascripts Asynchronously **************************
	 ************************************************************/

	// Load Angular Scripts
	Modernizr.load([

			// Load dependents
			'wp-content/themes/phipress/vendor/jquery/full/jquery.js',

			// Load extensions
			// 'wp-content/themes/phipress/src/ui-ix/extensions/navigation/phi.navigation.js',
			// 'wp-content/themes/phipress/src/ui-ix/extensions/tabs/jquery.foundation.tabs.js',
			'wp-content/themes/phipress/src/ui-ix/extensions/modals/jquery.foundation.reveal.js',
			// 'wp-content/themes/phipress/src/ui-ix/extensions/wayfinder/jquery.waypoints.js',
			// 'wp-content/themes/phipress/src/ui-ix/extensions/alerts/jquery.foundation.alerts.js',
			// 'wp-content/themes/phipress/src/ui-ix/extensions/date-picker/kalendae.js',

			// Load core js
			'wp-content/themes/phipress/src/ui-ix/core/core.js',

			// Load project js
			'wp-content/themes/phipress/src/ui-ix/project/project.js'
		]);
}());
