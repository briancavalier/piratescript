define(
[
	'when',
	'view/render',
	'text!./CodezView.html',
	'cssx/css!./CodezView.css'
],
function(when, render, template) {

	var undef;

	function CodezView(node) {
		this.node = node;
		this.render();
	};
	
	CodezView.prototype = {
		render: function(map) {
			this.node.innerHTML = render(template, map);
		},
		
		showCodez: function(codez) {
			var d, self;
			
			this.render({ codez: codez });
			
			d = when.Deferred();
			self = this;
			
			this.node.onclick = function(e) {
				self.node.onclick = undef;
				
				if(e.target.nodeName == 'BUTTON') {
					d.resolve(e.target.value);
				}
			};
			
			return d.promise;
		}
	};

	return CodezView;

});
