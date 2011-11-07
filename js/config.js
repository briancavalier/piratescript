(function(global) {
	var baseUrl = 'js';

	global.djConfig = {
		baseUrl: baseUrl
	};

	global.curl = {
		baseUrl: baseUrl,
		pluginPath: 'curl/src/curl/plugin',
		paths: {
			'curl/domReady': "curl/src/curl/domReady",
			querySelectorAll: "sizzle",
			array: "arrr/array",
			render: "view/render",
			data: '../data',
			styles: '../css'
		},
		packages: [
			{ name: 'dojo', path: 'dojo', lib: '.', main: './lib/main-browser' },
			{ name: 'dijit', path: 'dijit', lib: '.', main: './lib/main' },
			{ name: 'aop', path: 'aop', main: 'aop' },
			{ name: 'when', path: 'when', main: 'when' },
			{ name: 'wire', path: 'wire', lib: './wire', main: 'wire' }
		]				
	};

	global.document.write('<script type="text/javascript" src="js/curl/src/curl.js"></script>');
})(window);

