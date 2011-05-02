// this is just temporary to show that this could also work for events

define({

	addEventListener: function (el, event, handler, capturePhase) {
		return el.addEventListener(event, handler, capturePhase);
	},

	removeEventListener: function (el, event, handler, capturePhase) {
		return el.removeEventListener(event, handler, capturePhase);
	}


});
