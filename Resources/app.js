var ui = require('lib/ui_sugar'),
	loginView = require('views/login');

// this sets the background color of the master UIView (when there are no windows/tab groups on it)
Titanium.UI.setBackgroundColor('#fff');

var mainView = ui.win(),
	rootWin = loginView();

var nav = Titanium.UI.iPhone.createNavigationGroup({
   window: rootWin
});

mainView.add(nav);
mainView.open();