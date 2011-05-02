define({
	// wire plugins
	plugins: [
		{ module: 'wire/debug' },
		{ module: 'wire/dojo/dom' }
	],
	turns: 10,
	scores: [
		{ score: 0, message: "Keelhaul this landlubber!" },
		{ score: 2, message: "Fit this scoundrel for a gibbet!" },
		{ score: 5, message: "good" },
		{ score: 7, message: "better" },
		{ score: 10, message: "best" }
	],
	// View to show some codez
	codezView: {
		create: {
			module: 'view/codezView/CodezView',
			args: { $ref: 'dom.query!.codez-container', i: 0 }
		}
	},
	// Current Score
	scoreView: {
		create: {
			module: 'view/scoreView/ScoreView',
			args: { $ref: 'dom.query!.score-container', i: 0 }
		}
	},
	// DOM Node into which we'll place the results view
	resultsContainer: { $ref: 'dom.query!.results-container', i: 0 },
	// App controller
	controller: {
		create: 'controller/PiratescriptController',
		properties: {
			_appContainer: { $ref: 'dom.query!.app-container', i: 0 },
			_turns: { $ref: 'turns' },
			_codezView: { $ref: 'codezView' },
			_wireContext: { $ref: 'wire!context' },
			_thresholds: { $ref: 'scores' }
		},
		init: 'ready'
	}
});