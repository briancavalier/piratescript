define(
[
	'render',
	'text!./HeadingView.html',
	'css!./HeadingView.css'
],
function (render, template) {

	var undef;

	function HeadingView(node) {
		this.node = node;
		this.render();
	}

	HeadingView.prototype = {

		render: function(map) {
			this.node.innerHTML = render(template, map);
		}

	};

	return HeadingView;

});
