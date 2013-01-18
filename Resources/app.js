var ui = require('lib/ui_sugar'),
	api = require('lib/codebits_api');

// our GLOBAL var container
GLOBAL = {};

// this sets the background color of the master UIView (when there are no windows/tab groups on it)
Ti.UI.setBackgroundColor('#fff');

var login = require('views/login');
login().open();