define(['when'], function(when) {
	
	function noop() {}
	
	function Controller() {
		this._count = 0;
	}
	
	Controller.prototype = {
		ready: function() {
			this._showNextCodez();
		},
		
		reset: function() {
			this._reset();
		},
		
		_reset: noop,
		
		_showResults: function() {
			var self = this;
			
			when(this._wireContext).then(function(context) {
				
				context.objects.wire('results-spec').then(function(resultsContext) {
					
					resultsContext.resultsView.showResults({ total: 10, correct: 9 });
					
					self._reset = function() {
						resultsContext.destroy();
						// TODO: Change app state
					};
					
				});
			});
		},
		
		_showNextCodez: function() {
			var self = this;
			when(this._getCodez()).then(function(codez) {
				self._count++;
				
				var promise = self._codezView.showCodez(codez.content);
				
				// When the view resolves the promise, check the answer and display
				// the next one.  Probably want a counter here so we can show a final
				// score screen after N questions.
				promise.then(function(answer) {
					self._checkAnswer(codez, answer);
					
					if(self._count < self._turns) {						
						self._showNextCodez();
					} else {
						self._showResults();
					}
				});
			});
		},
		
		_getCodez: function() {
			// TODO: Get some real new codez here
			return { content: "codez go here", pirate: true };
		},
		
		_checkAnswer: function(codez, answer) {
			alert(answer == codez.pirate ? "Arr, Matey!" : "Keelhaul that landlubber");
		}
	};
	
	return Controller;
	
});