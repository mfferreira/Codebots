var ui = require('lib/ui_sugar'),
	api = require('lib/codebits_api'),
	nav;

exports.createView = function(navView){
	nav = navView;

	var defaultBot = api.botMake(),
		thisBotParts = {body:'01',bgcolor:'01',grad:'01',eyes:'01',mouth:'01',legs:'01',head:'01',arms:'01'},

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
				events: [['click', function(e){
					botImage.setImage(defaultBot);
				}]]
			})
		},
		content: [ botImage ]
	});

	api.getBotParts({
		onload: function(parts){
			var columns = [], column;

			for (var part in parts) {
				if (parts.hasOwnProperty(part)) {
					Ti.API.debug('Generating picker column for: '+part);

					column = Ti.UI.createPickerColumn();
					var thisPart = parts[part];

					for(var i=0, j=thisPart.length; i<j; i++){
						var row = Ti.UI.createPickerRow({
							partValue: {part: part, id: thisPart[i].id}
						});
						row.add(Ti.UI.createImageView({image: 'https://codebits.eu'+thisPart[i].picker}));
						column.addRow(row);
					}

					columns.push(column);
				}
			}

			Ti.API.debug('Adding picker to the view.');

			try {
			var picker = ui.picker({
				columns: columns,
				selectionIndicator: true,
				useSpinner: true, // required in order to use multi-column pickers with Android
				top: 330, bottom: 0
			}, [
				['change', function(e){
					var row = e.row;
					thisBotParts[row.partValue.part] = row.partValue.id;
					botImage.setImage(api.botMake(thisBotParts));
				}]
			]);
			self.add(picker);
			} catch(err) {Ti.API.error(err);}
		},
		onerror: function(e){
			alert(e);
		}
	});


	return self;
};

function clearBot(){

}