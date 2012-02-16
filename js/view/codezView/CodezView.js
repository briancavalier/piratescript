define(
[
	'when',
	'querySelectorAll!',
	'poly/array',
	'event',
	'render',
	'text!./CodezView.html',
	'css!./CodezView.css'
],
function(when, querySelectorAll, array, event, render, template) {

	function CodezView(node) {
		this.node = node;
		this.render();
	}
	
	CodezView.prototype = {

		render: function(map) {
			this.node.innerHTML = render(template, map);
		},
		
		showCodez: function(codez) {
			var d, node;
			
			this.render(codez);
			
			d = when.defer();
			node = this.node;
			
			function onclick (e) {
				
				if(/\bproceed-button\b/.test(e.target.className)) {
					event.removeEventListener(node, 'click', onclick, false);
					d.resolve();
				}
				else if(/\bpirate-button\b/.test(e.target.className)) {
					var pirateButtons = querySelectorAll('.pirate-button', node);
					for(var i = 0; i<pirateButtons.length; i++) {
						pirateButtons[i].disabled = true
					}
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
			node.className += ' answered ' + (value ? 'correct' : 'incorrect');
		}
	};

	return CodezView;

});
