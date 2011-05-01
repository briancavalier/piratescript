define(['when'], function(when) {
	
	function Controller() {}
	
	Controller.prototype = {
		ready: function() {
			this._showNextCodez();
		},
		
		_showNextCodez: function() {
			var self = this;
			when(this._getCodez()).then(function(codez) {
				var promise = self._codezView.showCodez(codez.content);
				
				promise.then(function(answer) {
					self._checkAnswer(codez, answer);
					setTimeout(function() { self._showNextCodez(); });
				});
			});
		},
		
		_getCodez: function() {
			return { content: "codez go here", pirate: true };
		},
		
		_checkAnswer: function(codez, answer) {
			alert(answer == codez.pirate ? "Arr, Matey!" : "Keelhaul that landlubber");
		}
	};
	
	return Controller;
	
});