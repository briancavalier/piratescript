define(
[
	'when',
	'css!../css/gray.css'
],
function(when) {

	var undef;
	
	function Controller() {}
	
	Controller.prototype = {

		data: null,

		questionNum: 0,

		ready: function() {
			this._showNextCodez();
		},
		
		_showNextCodez: function() {
			var self = this;
			when(this._getCodez()).then(function(codez) {

				// pick a question and randomize the answer's position
				var data, which = (Math.random() * 2) >>> 0;
				data = beget(codez[self.questionNum]);
				data.firstScript = which ? data.pirateScript : data.noobScript;
				data.secondScript = !which ? data.pirateScript : data.noobScript;


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
					self._showNextCodez();
				}

				promise.then(next, null, check);

			});
		},
		
		_getCodez: function() {
			return this.data;
		},
		
		_checkAnswer: function(data, answer) {
			return data.which == answer;
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
