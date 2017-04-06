define(['app'], function(app) {
    function googleService() {
        googleService.getEnvironmentClientIdAndApiKey = function() { // Return Environment wise apiKey and clientId
            var obj = {}; // hold return value of apikey and clientId
            obj.clientId = '932013973568-llmf20ipobpnku0u51jorhv30r2ptner.apps.googleusercontent.com';
			obj.apiKey = 'AIzaSyDWlIvaMXzPO0MB6RAnUzbV0Nqs2abfHGI';
            return obj;
        };

        /*[API Configuration]*/
        var clientId = googleService.getEnvironmentClientIdAndApiKey().clientId;
        var apiKey = googleService.getEnvironmentClientIdAndApiKey().apiKey;
        /*[/API Configuration]*/

        var authResult = {};
        var api = {
            contact: 'https://www.google.com/m8/feeds'
        }; // API URL
        var loadGoogleAPI = function(callback) { // Load Google API.
            var s = document.createElement('script');
            s.src = "https://apis.google.com/js/client.js";
            s.id = 'googleclient';
            s.async = true;
            s.onreadystatechange = s.onload = function() {
                var state = s.readyState;
                if (!callback.done && (!state || /loaded|complete/.test(state))) {
                    callback.done = true;
                    callback();
                }
            };
            document.getElementsByTagName('head')[0].appendChild(s);
        };

        googleService.loginUser = function(callback) { // call google login api for gmail login popup.
        	loadGoogleAPI(function(){
        		gapi.load('client', function(){
        			gapi.client.setApiKey(apiKey); // Set API Key.
	        		gapi.auth.authorize({
	                client_id: clientId,
	                scope: api.contact,
	                immediate: false
		            }, callback);
        		})
        		
        	})
        };

        googleService.grabRecords = function(callback) { // will return the contact from google, @see: contact api.
            var restRequest = gapi.client.request({
                'path': '/m8/feeds/contacts/default/full',
                'params': {
                    'alt': 'json',
                    'max-results': 1000
                }
            });
            restRequest.execute(function(resp) {
                callback(resp);
            });
        };
        return googleService;
    };
    googleService.$inject = [];
    app.register.service('googleService', googleService);
});
