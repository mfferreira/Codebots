var ui = require('lib/ui_sugar'),
	api = require('lib/codebits_api'),
	nav;

exports.createView = function(navView){
	nav = navView;

	var defaultBot = api.botMake(),

	botImage = ui.image({
		properties: {width: 320, height: 320, top: 0, image: defaultBot},
		events: [['click', function(e){

		}]]
	});

	var self = ui.win({
		properties: {
			title: "Let's build it!",
			rightNavButton: ui.button({
				properties: {title: 'Clear'},
				events: [['click', clearBot]]
			})
		},
		content: [ botImage ]
	});

	return self;
};

function clearBot(){}