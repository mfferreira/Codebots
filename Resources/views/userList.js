var ui = require('lib/ui_sugar');

function createView(){
	var self = ui.win(),

	tableView = ui.table({
		properties: {data: [{title: 'Loading human list...'}]}
	});

	self.add(tableView);

	function enlargeImage(e){
		var imageWin = ui.win({
			properties: {backgroundColor: '#000'},
			content: [
				Ti.UI.createImageView({
					image: e.source.image,
					width: 320, height: 320
				})
			]
		});
		GLOBAL.cur_tab.open(imageWin);
	}
	function loadUserAvatar(uid, imageView){
		api.getUserInfo(uid, {
			onload: function(e){
				imageView.setImage(e.avatar);
			},
			onerror: function(e) {
				Ti.API.error(JSON.stringify(e));
			}
		});
	}

	api.getUsers({
		onload: function(e){
			var tableData = [], user, userInfo, image;
			for (var i=0, j=e.length; i<j; i++){
				user = e[i];
				image = ui.image({
					properties: {height: 36, width: 36, left: 2},
					events: [['click', enlargeImage]]
				});
				loadUserAvatar(user.id, image);

				tableData.push(ui.row({
					properties: {height: 40},
					content: [
						image,
						ui.label({
							text: user.name,
							color: '#000',
							font: { fontSize: 16 },
							shadowColor: '#aaa',
							shadowOffset: {x:1, y:1},
							textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
							left: 41, top: 2,
							width: Ti.UI.SIZE, height: Ti.UI.SIZE
						}),
						ui.label({
							text: user.twitter ? '@'+user.twitter : 'No twitter',
							color: '#444',
							font: { fontSize: 13 },
							textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
							left: 41, bottom: 2,
							width: Ti.UI.SIZE, height: Ti.UI.SIZE
						})
					]
				}));
			}
			tableView.setData(tableData);
		},
		onerror: function(e){
			alert('Error loading humans');
		}
	});

	return self;
}


module.exports = new createView();