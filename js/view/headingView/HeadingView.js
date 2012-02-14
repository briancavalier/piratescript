define(
[
	'text!./HeadingView.html',
	'css!./HeadingView.css'
],
function (template) {

	var undef;

	function HeadingView(node) {
		this.node = node;
		this.render();
	}

	HeadingView.prototype = {

		render: function(map) {
			this.node.innerHTML = template.replace(/\$\{(\w+)\}/g, function(s, key) {
				return map && map[key] !== undef ? map[key] : '';
			});
		}

	};

	return HeadingView;

});
