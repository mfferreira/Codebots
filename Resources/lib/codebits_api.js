var baseURI = 'https://services.sapo.pt/Codebits/',

cache = {
	email: Ti.App.Properties.getString('email', null),
	userInfo: null,
	botParts: null
};
if (cache.email) cache.userInfo = Ti.App.Properties.getString(cache.email+'_userInfo', null);


function XHR(callbacks) {
	return Ti.Network.createHTTPClient({
		timeout : 10000,  // in milliseconds
		tlsVersion: Ti.Network.TLS_VERSION_1_2,
		withCredentials: true,
		// function called when the response data is available
		onload : function() {
			Ti.API.log('api',"HTTP Code: " + this.status);
			// Ti.API.log('api',"HTTP HEADER: " + this.getResponseHeader( 'Link' ));
			// Ti.API.log('api',"Received text: " + this.responseText);
			// Ti.API.log('api',"Received Data: " + this.responseData);
			var responseParsed = (callbacks.noJson? '': JSON.parse(this.responseText));
			if (callbacks.onload) {
				callbacks.onload( {json: responseParsed, raw: this.responseText, data: this.responseData, status: this.status} );
				callbacks.onload = null;
			}
		},
		// function called when an error occurs, including a timeout
		onerror : function(e) {
			Ti.API.log('api',"HTTP Code: " + this.status);
			Ti.API.error(e.status+' '+this.responseText);
			// alert('ERROR: '+e.error);
			if (callbacks.onerror) {
				callbacks.onerror( {status: this.status, error: this.responseText} );
				callbacks.onerror = null;
			}
		},
		onreadystatechange: function() {
			Ti.API.log('api',"Ready state: " + ['UNSENT', 'OPENED', 'HEADERS_RECEIVED', 'LOADING', 'DONE'][this.readyState]);
		}
	});
}

function checkNetwork(callback) {
	if (Ti.Network.online) {
		callback.online.apply(API);
	}
	else {
		Ti.API.warn('Device is not online.');
		if (callback.offline) callback.offline.apply(API);
	}
}

var API = {

	hasToken: function(){
		return (cache.userInfo && cache.userInfo.token);
	},

	getToken: function(args, callback) {
		checkNetwork({
			online: function(){
				cache.email = args.email;
				Ti.App.Properties.setString('email', cache.email);

				var uri = baseURI + 'gettoken?user='+args.email+'&password='+args.password,

				xhr = new XHR({
					onload: function(resp){
						if (resp.json.error) {
							if (callback && callback.onerror) callback.onerror( resp );
							else Ti.App.fireEvent('api:getToken:error', resp);
						}
						else {
							cache.userInfo = resp.json;
							Ti.App.Properties.setString(cache.email+'_userInfo', cache.userInfo);

							if (callback && callback.onload) callback.onload( resp.json );
							else Ti.App.fireEvent('api:getToken:success', isFollowing);
						}
					},
					onerror: function(resp) {
						if (callback && callback.onerror) callback.onerror( resp );
						else Ti.App.fireEvent('api:getToken:error', resp);
					},
					noJson: false
				});

				Ti.API.debug('GET: '+uri);
				
				// Clears any cookies stored for the host
				xhr.clearCookies(uri);
				xhr.open('GET', uri, true);
				// xhr.setRequestHeader('Content-Type', mimeType);
				// xhr.setRequestHeader('Accept', mimeType);
				xhr.send();
			},
			offline: function(){
				alert('You are offline. Network is required.');
			}
		});
	},

	getBotParts: function(callback) {
		if (cache.botParts) return cache.botParts;
		checkNetwork({
			online: function(){
				var uri = baseURI + 'botparts',
				xhr = new XHR({
					onload: function(resp){
						cache.botParts = resp.json;
						if (callback && callback.onload) callback.onload( resp.json );
						else Ti.App.fireEvent('api:botMake:success', isFollowing);
					},
					onerror: function(resp) {
						if (callback && callback.onerror) callback.onerror( resp );
						else Ti.App.fireEvent('api:botMake:error', resp);
					},
					noJson: false
				});

				Ti.API.debug('GET: '+uri);
				xhr.open('GET', uri, true);
				xhr.send();
			}
		});
	},

	botMake: function(parts) {
		parts = parts || {body:'01',bgcolor:'01',grad:'01',eyes:'01',mouth:'01',legs:'01',head:'01',arms:'01',balloon:'Change me!'};
		return baseURI + 'botmake/'+[parts.body,parts.bgcolor,parts.grad,parts.eyes,parts.mouth,parts.legs,parts.head,parts.arms,encodeURIComponent(parts.balloon)].join(',');
	},

	getUsers: function(callback){
		checkNetwork({
			online: function(){
				var uri = baseURI + 'users?token='+cache.userInfo.token,

				xhr = new XHR({
					onload: function(resp){
						if (resp.json.error) {
							if (callback && callback.onerror) callback.onerror( resp );
							else Ti.App.fireEvent('api:getUsers:error', resp);
						}
						else {
							if (callback && callback.onload) callback.onload( resp.json );
							else Ti.App.fireEvent('api:getUsers:success', isFollowing);
						}
					},
					onerror: function(resp) {
						if (callback && callback.onerror) callback.onerror( resp );
						else Ti.App.fireEvent('api:getUsers:error', resp);
					},
					noJson: false
				});

				Ti.API.debug('GET: '+uri);
				
				// Clears any cookies stored for the host
				xhr.clearCookies(uri);
				xhr.open('GET', uri, true);
				xhr.send();
			},
			offline: function(){
				alert('You are offline. Network is required.');
			}
		});
	},

	getUserInfo: function(uid, callback){
		checkNetwork({
			online: function(){
				var uri = baseURI + 'user/'+uid+'?token='+cache.userInfo.token,

				xhr = new XHR({
					onload: function(resp){
						if (resp.json.error) {
							if (callback && callback.onerror) callback.onerror( resp );
							else Ti.App.fireEvent('api:getUsers:error', resp);
						}
						else {
							if (callback && callback.onload) callback.onload( resp.json );
							else Ti.App.fireEvent('api:getUsers:success', isFollowing);
						}
					},
					onerror: function(resp) {
						if (callback && callback.onerror) callback.onerror( resp );
						else Ti.App.fireEvent('api:getUsers:error', resp);
					},
					noJson: false
				});

				Ti.API.debug('GET: '+uri);
				
				// Clears any cookies stored for the host
				xhr.clearCookies(uri);
				xhr.open('GET', uri, true);
				xhr.send();
			},
			offline: function(){
				alert('You are offline. Network is required.');
			}
		});
	}

};

module.exports = API;