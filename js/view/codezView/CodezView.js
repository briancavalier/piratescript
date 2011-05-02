define(
[
	'when',
	'querySelectorAll',
	'array',
	'text!./CodezView.html',
	'cssx/css!./CodezView.css'
],
function(when, querySelectorAll, array, template) {

	var undef;

	function CodezView(node) {
		this.node = node;
		this.render();
	}
	
	CodezView.prototype = {

		render: function(map) {
			this.node.innerHTML = template.replace(/\$\{(\w+)\}/g, function(s, key) {
				return map && map[key] !== undef ? map[key] : '';
			});
		},
		
		showCodez: function(codez) {
			var d, self;
			
			this.render(codez);
			
			d = when.Deferred();
			self = this;
			
			this.node.onclick = function(e) {
				
				if(/\bproceed-button\b/.test(e.target.className)) {
					self.node.onclick = undef;
					d.resolve();
				}
				else if(/\bpirate-button\b/.test(e.target.className)) {
					var pirateButtons = querySelectorAll('.pirate-button', self.node);
					array.forEach(pirateButtons, function (button) {
						button.disabled = true;
					});
					d.progress(e.target.value);
				}
			};
			
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
