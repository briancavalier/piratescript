define({
	// wire plugins
	plugins: [
		// Enable wire debug and app tracing to see some magic
		{ module: 'wire/debug', trace: true },
		{ module: 'wire/dojo/store' },
		// We could use wire's builtin dom query resolver
		{ module: 'wire/dom' }
		// Or use dojo.query as our dom query resolver
//		{ module: 'wire/dojo/dom' }
		// Or we could use jquery
//		{ module: 'wire/jquery/dom' }
		// Or sizzle!
//		{ module: 'wire/sizzle' }
	],
	css: [
		{ module: 'css!styles/gray.css' }
	],
	// Easy dojo datastore creation via resource! ref resolver
	// provided by the wire/dojo/store plugin
	questionData: { $ref: 'resource!data/codez.json', query: {} },
	// Or alternately, we can just use AMD to pull in JSONP data!
//	questionData: { module: 'data/codez' },
	turns: 2,
	// Could easily pull this scoring reference data from a datastore
	// or JSONP, or simply use a plain old array, which works just fine
	// in wire.js, too.
	scores: [
		{ score: 0, message: "Keelhaul this landlubber!" },
		{ score: 0.25, message: "Fit this scoundrel for a gibbet!" },
		{ score: 0.5, message: "Arr, Matey!" },
		{ score: 0.75, message: "Shiver me timbers! Ye be a Pirate!" },
		{ score: 1, message: "Ye be Blackbeard himself!" }
	],
	// View to show some codez
	codezView: {
		create: {
			module: 'view/codezView/CodezView',
			args: { $ref: 'dom.first!.codez-container' }
		}
	},
	// Header
	headingView: {
		create: {
			module: 'view/headingView/HeadingView',
			args: { $ref: 'dom.first!.heading-container' }
		}
	},
	// DOM Node into which we'll place the results view
	resultsContainer: { $ref: 'dom.first!.results-container' },
	// App controller
	controller: {
		create: 'controller/PiratescriptController',
		properties: {
			_codezView: { $ref: 'codezView' },
			_turns: { $ref: 'turns' },
			_codez: { $ref: 'questionData' },
			_thresholds: { $ref: 'scores' },
			//
			// Inception
			// Inject a function that, when called, will wire() result-spec!
			// 
			_showResultsView: { wire: { spec: 'results-spec', defer: true } }
		},
		ready: 'ready'
	}
});
