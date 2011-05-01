/*
    cssx/sniff
    (c) copyright 2010, unscriptable.com
    author: john

    LICENSE: see the LICENSE.txt file. If file is missing, this file is subject to the AFL 3.0
    license at the following url: http://www.opensource.org/licenses/afl-3.0.php.

    TODO: start using has()

*/
define(
	[
		'./stylesheet'
	],
	function (stylesheet) {

		var _vendor,
			_testRule,
			prefixes = {
				'Moz': '-moz-', // mozilla
				'Webkit': '-webkit-', // webkit
				'O': '-o-', // opera
				'Khtml': '-khtml-', // konqueror
				'Ms': '' // IE is so b0rked (even IE 8)
			},
			sbSize;

		function capitalize (s) {
			// summary: returns the given string, s, with the first char capitalized.
			return (s || '').replace(/./, function (c) { return c.toUpperCase(); })
		}

		function _propSupported (propName, node) {
			return typeof (node || document.documentElement).style[propName] == 'string';
		}

//		function getPropPrefix (/* String */ propName, /* DOMNode? */ node) {
//			//  summary: obtains and returns the vendor prefix used for a particular property.
//			var prefix;
//			return _supported(propName) ? '' : getVendorPrefix(propName, node);
//		}

		function getVendorPrefix (/* String */ propName, /* DOMNode? */ node) {
			//  summary: tries to obtain the vendor prefix if it is used for the given property.
			if (_propSupported(propName)) {
				return '';
			}
			else {
				for (var camel in prefixes) {
					if (_propSupported(camel + capitalize(propName), node)) {
						var dash = prefixes[camel];
						getVendorPrefix = function () { return dash; };
						return dash;
					}
				}
				return null;
			}
		}

		function cssProp (/* String */ propName, /* Boolean? */ checkVendorPrefixes, /* DOMNode? */ node) {
			//  summary: Checks if a css property is supported by the current browser
			//  propName: String - the camelCased property name to check
			//  checkVendorPrefixes: Boolean? - if true, checks for vendor-specific variations
			//  node: DOMNode? - a dom node to test (checks the body if omitted)
			//  returns: String - If checkVendorPrefixes is true, returns the actual property
			//      name, if any. Otherwise, returns true if the property is supported.
			//
			//  example: hasRadius = sniff.cssProp('borderRadius', true);
			//  inspired by kangax: http://thinkweb2.com/projects/prototype/feature-testing-css-properties/
			//  Also see: http://yura.thinkweb2.com/cft/ (common feature tests)
			var supported = _propSupported(propName, node) && propName;
			if (!supported && checkVendorPrefixes) {
				var pre = getVendorPrefix(propName, node),
					prop = pre && (pre + capitalize(propName));
				return (pre && _propSupported(prop)) ? prop : void 0;
			}
			else
				return supported;

		}

		function cssValue (/* String */ propName, /* String */ testValue, /* Boolean? */ checkVendorPrefixes, /* DOMNode? */ node) {
			//  summary: Checks if a css value is supported by the current browser.
			//  propName: String - the camelCased property name to check
			//  testValue: String - the property value to test
			//  checkVendorPrefixes: Boolean? - if true, checks for vendor-specific variations
			//  node: DOMNode? - a dom node to test (checks the body if omitted)
			//  returns: String - If checkVendorPrefixes is true, returns the actual property
			//      name, if any. Otherwise, returns true if the property is supported.
			//  Also see: http://ryanmorr.com/archives/detecting-browser-css-style-support
			// TODO: check vendor prefixes!
			// NOTE: IE will always pass this test, so this is useless in IE! aarrrggghghhh
			var success = false;
			if (!_testRule)
				_testRule = stylesheet.appendRule('#cssx_test_rule', '');
			try {
				_testRule.style[propName] = testValue;
				success = _testRule.style[propName] !== '';
				_testRule.style[propName] = ''; // clean up
			}
			catch (ex) { /* squelch IE */ }
			return success;
		}

		function gcsValue (/* String */ propName, /* String */ testValue, /* Boolean? */ checkVendorPrefixes, /* DOMNode? */ node) {
			//  summary: returns true if the browser supports the css property in the getComputedStyle /
			//  currentStyle collections. be sure to supply a testValue that is not falsy already! (TODO: fix this?)
			// TODO: check vendor prefixes
			if (!node) {
				node = document.body;
			}
			var result = false,
				oldVal = node.style[propName];
			node.style[propName] = testValue;
			try {
				result = !!(window.getComputedStyle ? window.getComputedStyle(node, null)[propName] : node.currentStyle[propName]);
			}
			finally {
				node.style[propName] = oldVal;
			}
			return result;
		}

		function getScrollbarSize () {
			//  summary: figures out the height and width of the scrollbars on this system.
			//  something like this exists in dojox, but we don't want to rely on dojox
			//  Returns an object with w and h properties (width and height, Number) in pixels
			if (!sbSize) {
				sbSize = {w: 15, h: 15}; // default
				var testEl = document.createElement('div');
				testEl.style.cssText = 'width:100px;height:100px;overflow:scroll;bottom:100%;right:100%;position:absolute;visibility:hidden;';
				document.body.appendChild(testEl);
				try {
					sbSize = {
						w: testEl.offsetWidth - Math.max(testEl.clientWidth, testEl.scrollWidth),
						h: testEl.offsetHeight - Math.max(testEl.clientHeight, testEl.scrollHeight)
					};
					document.body.removeChild(testEl);
				}
				catch (ex) {
					// squelch
				}
			}
			return sbSize;
		}

		return {

			prefixes: prefixes,

			cssProp: cssProp,

			cssValue: cssValue,

			gcsValue: gcsValue,

			getScrollbarSize: getScrollbarSize,

			getVendorPrefix: getVendorPrefix

		};

	}
);
