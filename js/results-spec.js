define({
	plugins: [
		// { module: 'wire/debug' },
		{ module: 'wire/dom', classes: { ready: 'results-state' } },
		{ module: 'wire/dojo/events' }
	],
	resultsView: {
		create: {
			module: 'view/resultsView/ResultsView',
			args: { $ref: 'resultsContainer' }
		},
		connect: {
			onPlayAgain: {
				controller: 'reset'
			}
		},
		init: {
			showResults: { $ref: 'results' }
		},
		destroy: 'destroy'
	}
});