define(
	[
		'when',
		'css!../css/gray.css'
	],
	function(when) {
	
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
				var promise = self._codezView.showCodez(codez[self.questionNum]);

				self.questionNum = (self.questionNum + 1) % self.data.length;
				// When the view resolves the promise, check the answer and display
				// the next one.  Probably want a counter here so we can show a final
				// score screen after N questions.
				promise.then(function(answer) {
					self._checkAnswer(codez, answer);
					
					setTimeout(function() { self._showNextCodez(); }, 0);
				});
			});
		},
		
		_getCodez: function() {
			return this.data;
		},
		
		_checkAnswer: function(codez, answer) {
			alert(answer == codez.pirate ? "Arr, Matey!" : "Keelhaul that landlubber");
		}
	};
	
	return Controller;
	
});
