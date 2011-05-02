define(
[
	'when',
	'querySelectorAll',
	'array',
	'event',
	'render',
	'text!./CodezView.html',
	'cssx/css!./CodezView.css'
],
function(when, querySelectorAll, array, event, render, template) {

	var undef;

	function CodezView(node) {
		this.node = node;
		this.render();
	}
	
	CodezView.prototype = {

		render: function(map) {
			this.node.innerHTML = render(template, map);
		},
		
		showCodez: function(codez) {
			var d, self;
			
			this.render(codez);
			
			d = when.Deferred();
			self = this;
			
			function onclick (e) {
				
				if(/\bproceed-button\b/.test(e.target.className)) {
					event.removeEventListener(self.node, 'click', onclick, false);
					d.resolve();
				}
				else if(/\bpirate-button\b/.test(e.target.className)) {
					var pirateButtons = querySelectorAll('.pirate-button', self.node);
					array.forEach(pirateButtons, function (button) {
						button.disabled = true;
					});
					d.progress(e.target.value);
				}
			}

			event.addEventListener(this.node, 'click', onclick, false);
			
			return d.promise;
		},

		setIsCorrect: function (value) {
			var node;

			node = querySelectorAll('.codez-view', this.node)[0];

			// change state
			node.className += ' answered';

			node.className += ' ' + (value ? 'correct' : 'incorrect');
		}
	};

	return CodezView;

});
