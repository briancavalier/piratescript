define(
[
	'when',
	'text!./CodezView.html',
	'cssx/css!./CodezView.css'
],
function(when, template) {

	var undef;

	function CodezView(node) {
		this.node = node;
		this.render();
		// node.innerHTML = template;
	};
	
	CodezView.prototype = {
		render: function() {
			this.node.innerHTML = template.replace(/\$\{(\w+)\}/, function(s, key) { return this[key] === undef ? '' : this[key]; });
		},
		newCodez: function(data) {
			var d = when.Deferred();
			
			return d.promise;
		}
	};

	return CodezView;

});
