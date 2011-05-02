define(['when'], function(when) {
	
	function noop() {}
	
	function Controller() {
		this._count = 0;
		this._score = 0;
	}
	
	Controller.prototype = {
		ready: function() {
			this._showNextCodez();
		},
		
		reset: function() {
			this._reset();
		},
		
		_reset: noop,
		
		_checkScore: function() {
			var found, i;
			
			found = false;
			i = this._thresholds.length-1;
			
			while(!found) {
				var t = this._thresholds[i--];
				if(t.score <= this._score) {
					found = t;
				}
			}
		
			return found;
		},
		
		_showResults: function() {
			var found, self;
			
			found = this._checkScore();
			self = this;
			
			when(this._wireContext).then(function(context) {
				
				context.objects.wire('results-spec').then(function(resultsContext) {
					
					resultsContext.resultsView.showResults({ total: self._turns, score: found.score, message: found.message });
					self._appContainer.className = 'results-state';
					
					self._reset = function() {
						resultsContext.destroy().then(function() {
							self._appContainer.className = '';							
						});
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
			// TODO: Really check the answer
			this._score++;
			alert(answer == codez.pirate ? "Arr, Matey!" : "Keelhaul that landlubber");
		}
	};
	
	return Controller;
	
});