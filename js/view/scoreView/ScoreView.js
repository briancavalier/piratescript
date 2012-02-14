define(
[
	'text!./ScoreView.html',
	'css!./ScoreView.css'
],
function(template) {

	function ScoreView(node) {
		this.node = node;
		node.innerHTML = template;
	}
	
	ScoreView.prototype = {
		_updateScore: function() {}
	};
	
	return ScoreView;

});
