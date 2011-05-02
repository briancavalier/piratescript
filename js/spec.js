define({
	// wire plugins
	plugins: [
		{ module: 'wire/debug' },
		{ module: 'wire/dom' }
	],
	turns: 2,
	// View to show some codez
	codezView: {
		create: {
			module: 'view/codezView/CodezView',
			args: { $ref: 'dom!codez-view' }
		}
	},
	// Current Score
	scoreView: {
		create: {
			module: 'view/scoreView/ScoreView',
			args: { $ref: 'dom!score-view' }
		}
	},
	// DOM Node into which we'll place the results view
	resultsContainer: { $ref: 'dom!results-view' },
	// App controller
	controller: {
		create: 'controller/PiratescriptController',
		properties: {
			_turns: { $ref: 'turns' },
			_codezView: { $ref: 'codezView' },
			_wireContext: { $ref: 'wire!context' }
		},
		init: 'ready'
	}
});