define(
[
	'view/render',
	'text!./ResultsView.html',
	'css!./ResultsView.css'
],
function(render, template) {

	var undef;

	function ResultsView(node) {
		var self = this;
		
		this.node = node;
		node.onclick = function(e) {
			if(e.target.nodeName == 'BUTTON') {
				node.onclick = undef;
				self.onPlayAgain();				
			}
		};
	}
	
	ResultsView.prototype = {
		showResults: function(results) {
			this.node.innerHTML = render(template, results);
		},
		
		onPlayAgain: function() {},
		
		destroy: function() {
			this.node.innerHTML = '';
			this.node.onclick = undef;
		}
	};
	
	return ResultsView;

});
