define({
	plugins: [
		{ module: 'wire/debug' },
		{ module: 'wire/dom' }
	],
	codezView: {
		create: {
			module: 'view/codezView/CodezView',
			args: { $ref: 'dom!codez-view' }
		}
	},
	scoreView: {
		create: {
			module: 'view/scoreView/ScoreView',
			args: { $ref: 'dom!score-view' }
		}
	},
	controller: {
		create: 'controller/PiratescriptController',
		properties: {
			_codezView: { $ref: 'codezView' }
		},
		init: 'ready'
	}
});