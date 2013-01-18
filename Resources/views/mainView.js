// require our views
var botBuilder = require('views/botBuilder').createView(),
	userList = require('views/userList'),

// define tabs
tab_bots = Ti.UI.createTab({
	title: 'Bots',
	window: botBuilder
}),

tab_humans = Ti.UI.createTab({
	title: 'Humans',
	window: userList
}),

// create tab group
tabGroup = Ti.UI.createTabGroup();

// add tabs
tabGroup.addTab(tab_bots);
tabGroup.addTab(tab_humans);

tabGroup.addEventListener('focus', function(e){
	GLOBAL.cur_tab = e.tab;
});

GLOBAL.tabGroup = tabGroup;
module.exports = tabGroup;