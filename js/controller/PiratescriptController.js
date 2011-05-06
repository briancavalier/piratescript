define(
[
	'when',
	'css!../css/gray.css'
],
function(when) {

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
		
		_showResults: function() {
			var found, self;
			
			found = this._checkScore();
			self = this;
			
			when(this._wireContext).then(function(context) {
				// var context = wired.objects;
				
				context.wire('results-spec').then(function(resultsContext) {
					
					resultsContext.resultsView.showResults({ total: self._turns, score: self._score, message: found.message });
					self._appContainer.className = 'results-state';
					
					self._reset = function() {
						resultsContext.destroy().then(function() {
							self._appContainer.className = '';
							self.ready();							
						});
						// TODO: Change app state
					};
					
				});
			});
		},
		
		_showNextCodez: function() {
			var self = this;
			when(this._getCodez()).then(function(codez) {

				// pick a question and randomize the answer's position
				var data, which;
				data = beget(codez[self.questionNum]);
				which = data.which = (Math.random() * 2) >>> 0;
				data.firstScript = which ? data.pirateScript : data.noobScript;
				data.secondScript = !which ? data.pirateScript : data.noobScript;

				self._count++;
				var promise = self._codezView.showCodez(data);

				self.questionNum = (self.questionNum + 1) % self.data.length;

				// When the view resolves the promise, check the answer and display
				// the next one.  Probably want a counter here so we can show a final
				// score screen after N questions.

				function check (answer) {
					var node, correct;

					correct = self._checkAnswer(data, answer);

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
		
		_getCodez: function() {
			return this.data;
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
