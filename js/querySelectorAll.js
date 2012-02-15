(function(document) {

	function qsa(selector, root) {
		return (root || document).querySelectorAll(selector);
	}

	define({
		load: function(name, require, loaded) {
			if(document.querySelectorAll) {
				loaded(qsa);
			} else {
				require(['sizzle'], loaded);
			}
		}
	});

})(document);
