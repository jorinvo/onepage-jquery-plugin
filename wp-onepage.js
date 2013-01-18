(function( window, $, undefined ) {

	// jQuery is required
	if (! $) return;


	var $window = $(window);

	var $body;
	var $container;

	var internal_links;
	var containerSelector;

	var settings = {};
	var defaults = {
		scrollTop: true
	};


	// Public: This is the main function the user can call via jQuery. It has to be called to start onePage
	//
	// Example:
	//		$('#main').onePage();
	//		// and you're done!
	//
	// options - Hash of options to overwrite default settings (see above)
	var onePage = function(options) {

		// history.pushstate is required
		if ( ! Modernizr.history ) return;

		// Use defaults when no option is sepecified
		for ( var prop in defaults ) {
			settings[prop] = defaults[prop];
		}
		for ( prop in options ) {
			settings[prop] = options[prop];
		}

		containerSelector = this.selector;

		$body = $('body');
		$container = this;

		watchHistory();

		// Use onepage loading for all internal links
		internal_links = 'a[href^="' + location.origin + '"]';

		bindLinks();

	};


	// Public: Deactivate onePage
	onePage.stop = function() {
		unwatchHistory();
		unbindLinks();
	};



	// Load content of an URL into the $container
	//
	// url - url string to load
	var load = function(url) {
		console.log('onePage - load content');

		$container.load( url + ' ' + containerSelector, function() {
			if (settings.scrollTop) $window.scrollTop(0);
		});
	};



	/**
	 * DOM Event Binding
	*/

	// Bind all internal Links on the page to use onePage
	var bindLinks = function() {
		$body.on( 'click', internal_links, loadLink);
	};

	// Unbind all internal Links on the page to use onePage
	var unbindLinks = function() {
		$body.off( 'click', internal_links, loadLink);
	};

	// Event handler to push state
	//
	// e - A DOM event
	var loadLink = function(e) {
		e.preventDefault();

		var url = $(this).attr('href');

		load(url);
		history.pushState(null, null, url);
	};



	/**
	 * Handle History Updates
	*/

	// Call loadFromLocation() whenever the popstate event is fired
	var watchHistory = function() {
		// TODO: skip first popstate event when in chrome
		$window.on("popstate", loadFromLocation);
	};

	// Stop watching the popstate event
	var unwatchHistory = function() {
		$window.off("popstate", loadFromLocation);
	};

	// Load content for the current url
	var loadFromLocation = function() {
		load(location.href);
	};



	// Public access to onePage via jQuery.onePage
	$.fn.onePage = onePage;

} ( window, jQuery ));