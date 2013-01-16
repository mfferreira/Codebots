var api = require('lib/codebits_api');

function createView(){

	var emailInput = ui.textField({
		properties: {top: 20, left: 0, right: 0, hintText: 'Email', borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED}
	}),

	passwordInput = ui.textField({
		properties: {top: 10, left: 0, right: 0, hintText: 'Password', passwordMask: true, borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED}
	}),

	loginButton = ui.button({
		properties: {top: 10, left: 0, right: 0, title: 'Login'},
		events: [
			['click', function(e){
				api.getToken({
					email: emailInput.value,
					password: passwordInput.value
				}, {
					onload: function(e){
						// require and open the next window
						alert(e);
					},
					onerror: function(e){
						var errorMsg = e.error.id +' : '+e.error.msg;
						Ti.API.error(errorMsg);
						alert(errorMsg);
					}
				});
			}]
		]
	});

	var self = ui.win({
		properties: {
			title: 'Codebots'
		},
		content: [
			ui.view({
				properties: {layout: 'vertical', top: 10, left: 10, right: 10, height: Ti.UI.SIZE},
				content: [
					Ti.UI.createImageView({ top: 0, width: 153, height: 182, image: 'images/bot.png' }),
					emailInput,
					passwordInput,
					loginButton
				]
			})
		]
	});

	return self;
}

module.exports = createView;