define(
[
	'text!./ScoreView.html',
	'i18n!./nls/ScoreView',
	'cssx/css!./ScoreView.css'
],
function(template, strings) {

	function ScoreView(node) {
		this.node = node;
		node.innerHTML = template;
	}
	
	ScoreView.prototype = {
		
	};
	
	return ScoreView;

});
