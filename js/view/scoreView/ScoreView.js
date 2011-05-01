define(
[
	'text!./ScoreView.html',
	'cssx/css!./ScoreView.css'
],
function(template) {

	function ScoreView(node) {
		this.node = node;
		node.innerHTML = template;
	}
	
	ScoreView.prototype = {
		
	};
	
	return ScoreView;

});
