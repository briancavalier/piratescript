define(['when'], function(when) {

	var undef;
	
	function noop() {}
	
	function Controller() {}
	
	Controller.prototype = {

		data: null,

		questionNum: 0,

		ready: function() {
			this._count = 0;
			this._score = 0;
			this._showNextCodez();
		},
		
		reset: function() {
			this._reset();
		},
		
		_reset: noop,
		
		_checkScore: function() {
			var found, i, correct;
			
			found = false;
			i = this._thresholds.length-1;
			correct = this._score / this._turns;
			
			while(!found) {
				var t = this._thresholds[i--];
				if(t.score <= correct) {
					found = t;
				}
			}
		
			return found;
		},
		
		_showResultsView: function(/*results*/) {},
		
		_showResults: function() {
			var found, self, results;
			
			found = this._checkScore();
			self = this;
			
			results = {
				results: {
					total: self._turns,
					score: self._score,
					message: found.message
				}
			};
			
			// Call the injected _showResultsView function, which will
			// wire a child context, and also inject results into that
			// child
			this._showResultsView(results)
				.then(function(resultsContext) {
				
				self._reset = function() {
					resultsContext.destroy().then(function() {
						self.ready();							
					});
				};
				
			});
		},
		
		_showNextCodez: function() {
			var self = this;
			when(this._codez, function(codez) {

				// pick a question and randomize the answer's position
				var data, which;
				data = beget(codez[self.questionNum]);
				which = data.which = (Math.random() * 2) >>> 0;
				data.firstScript = which ? data.pirateScript : data.noobScript;
				data.secondScript = !which ? data.pirateScript : data.noobScript;

				self._count++;
				var promise = self._codezView.showCodez(data);

				self.questionNum = (self.questionNum + 1) % codez.length;

				// When the view resolves the promise, check the answer and display
				// the next one.  Probably want a counter here so we can show a final
				// score screen after N questions.

				function check (answer) {
					var correct = self._checkAnswer(data, answer);

					self._codezView.setIsCorrect(correct);
					
					// TODO: record score
				}

				function next () {
					if(self._count < self._turns) {
						self._showNextCodez();
					} else {
						self._showResults();
					}
				}

				promise.then(next, null, check);

			});
		},
		
		_checkAnswer: function(data, answer) {
			var correct = data.which == answer;
			if(correct) this._score++;
			return correct;
		}
	};
	
	function F () {}
	function beget (o) {
		var result;
		F.prototype = o;
		result = new F();
		F.prototype = undef;
		return result;
	}

	return Controller;
	
});
