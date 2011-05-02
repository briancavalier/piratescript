/**
 * @license Copyright (c) 2011 Brian Cavalier
 * LICENSE: see the LICENSE.txt file. If file is missing, this file is subject
 * to the MIT License at: http://www.opensource.org/licenses/mit-license.php.
 */

/*
	File: sizzle.js
	Adds querySelectorAll functionality to wire using John Resig's Sizzle library.
	Sizzle must be wrapped in an AMD define().  Kris Zyp as a version of this at
	http://github.com/kriszyp/sizzle
*/
define(['sizzle'], function(sizzle) {

	function resolveQuery(promise, name, refObj, wire) {

		require(['domReady'], function() {
			var result = sizzle(name);
			promise.resolve(typeof refObj.i == 'number' && refObj.i < result.length
				? result[refObj.i]
				: result);
		});

	}

	return {
		wire$plugin: function(ready, destroyed, options) {
			return {
				resolvers: {
					'dom.query': resolveQuery
				}
			};
		}
	};

});
