define({
	plugins: [
		//{ module: 'wire/debug' },
		{ module: 'wire/dom' },
		{ module: 'wire/sizzle' }
	],
	data: {
		module: '../data/codez'
	},
	codezView: {
		create: {
			module: 'view/codezView/CodezView',
			args: { $ref: 'dom!codez-view' }
		}
	},
	headingView: {
		create: {
			module: 'view/headingView/HeadingView',
			args: { $ref: 'dom!heading-view' }
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
			_codezView: { $ref: 'codezView' },
			data: { $ref: 'data' }
		},
		init: 'ready'
	}
});
