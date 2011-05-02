define({
	plugins: [
		{ module: 'wire/debug' },
		{ module: 'wire/dom' },
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
		destroy: 'destroy'
	}
});