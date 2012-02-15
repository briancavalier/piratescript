(function(global) {
	var baseUrl = 'js';

	global.djConfig = {
		baseUrl: baseUrl
	};

	global.curl = {
		debug: true,
		baseUrl: baseUrl,
		pluginPath: null,
		paths: {
			jquery: 'jquery-1.7.min',
			'curl/domReady': 'curl/src/curl/domReady',
//			querySelectorAll: 'sizzle',
			array: 'arrr/array',
			render: 'view/render',
			data: '../data',
			styles: '../css',
			wire: 'wire/wire',
			text: 'curl/src/curl/plugin/text',
			css: 'curl/src/curl/plugin/css',
			domReady: 'curl/src/curl/plugin/domReady'
		},
		packages: [
			{ name: 'curl',  location: 'curl/src/curl' },
			{ name: 'wire',  location: 'wire',  main: 'wire' },
			{ name: 'aop',   location: 'aop',   main: 'aop' },
			{ name: 'when',  location: 'when',  main: 'when' },
			{ name: 'poly',  location: 'poly',  main: 'poly' },
			{ name: 'dojo',  location: 'dojo',  main: 'lib/main-browser' },
			{ name: 'dijit', location: 'dijit', main: 'lib/main' }
		],
		preloads: [
			'curl/shim/dojo16'
		]
	};

	global.document.write('<script type="text/javascript" src="js/curl/src/curl.js"></script>');
})(window);

