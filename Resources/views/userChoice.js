var ui = require('lib/ui_sugar'),
	nav, main;

exports.createView = function(){

	var botButton = ui.button({
		properties: {top: 0, height: '50%', left: 0, right: 0, title: 'Bot Builder'},
		events: [
			['click', function(e){
				Ti.API.debug('Tapped Bot Builder');
				var botBuilder = require('views/botBuilder').createView(nav);
				nav.open(botBuilder);
			}]
		]
	}),
	usersButton = ui.button({
		properties: {bottom: 0, height: '50%', left: 0, right: 0, title: 'Codebits Users'},
		events: [
			['click', function(e){
				Ti.API.debug('Tapped Codebits Users');
			}]
		]
	}),

	logoutButton = ui.button({
		properties: {title: 'Exit'},
		events: [['click', function(e){
			main.close({transition: Ti.UI.iPhone.AnimationStyle.FLIP_FROM_LEFT});
		}]]
	});

	var self = ui.win({
		properties: {
			title: '',
			leftNavButton: logoutButton
		},
		content: [
			ui.view({
				properties: {layout: 'vertical', width: Ti.UI.FILL, height: Ti.UI.FILL},
				content: [
					botButton,
					usersButton
				]
			})
		]
	});

	return self;
};

exports.nav_and_main = function(args){
	nav = args.nav;
	main = args.main;
};