define({
	// wire plugins
	plugins: [
		// { module: 'wire/debug' },
		{ module: 'wire/dom' },
		{ module: 'wire/sizzle' }
	],
	css: [
		{ module: 'css!styles/gray.css' }
	],
	data: {
		module: 'data/codez'
	},
	turns: 2,
	scores: [
		{ score: 0, message: "Keelhaul this landlubber!" },
		{ score: .25, message: "Fit this scoundrel for a gibbet!" },
		{ score: .5, message: "Arr, Matey!" },
		{ score: .75, message: "Shiver me timbers! Ye be a Pirate!" },
		{ score: 1, message: "Ye be Blackbeard himself!" }
	],
	// View to show some codez
	codezView: {
		create: {
			module: 'view/codezView/CodezView',
			args: { $ref: 'dom.query!.codez-container', i: 0 }
		}
	},
	// Header
	headingView: {
		create: {
			module: 'view/headingView/HeadingView',
			args: { $ref: 'dom.query!.heading-container', i: 0 }
		}
	},
	// DOM Node into which we'll place the results view
	resultsContainer: { $ref: 'dom.query!.results-container', i: 0 },
	// App controller
	controller: {
		create: 'controller/PiratescriptController',
		properties: {
			_codezView: { $ref: 'codezView' },
			data: { $ref: 'data' },
			_appContainer: { $ref: 'dom.query!.app-container', i: 0 },
			_turns: { $ref: 'turns' },
			_wireContext: { $ref: 'wire!context' },
			_thresholds: { $ref: 'scores' }
		},
		init: 'ready'
	}
});
