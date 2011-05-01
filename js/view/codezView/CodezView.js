define(
[
	'when',
	'text!./CodezView.html',
	'cssx/css!./CodezView.css'
],
function(when, template) {

	function CodezView(node) {
		this.node = node;
		node.innerHTML = template;
	};
	
	CodezView.prototype = {
		newCodez: function(data) {
			var d = when.Deferred();
			
			return d.promise;
		}
	};

	return CodezView;

});
