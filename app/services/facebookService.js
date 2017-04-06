var facebookService = angular.module('FacebookService', []);
facebookService.factory('facebookService', function($rootScope, $timeout, googleAPIModel) {
	var facebookService = {};
	facebookService.getEnvironmentAppId = function() {
		if (window.location.hostname.match(/^(www\.payumoney\.com)/)) {
			return 502527149826763; 
		} else {
			return 585939898188681 
		} 
	};
	facebookService.AppId = facebookService.getEnvironmentAppId();
	facebookService.init = function(callback) { 
		window.fbAsyncInit = function() { 
			FB.init({ 
				appId: facebookService.AppId, 
				status: true, 
				cookie: true, 
				xfbml: true 
			}); 
		};
		if (callback) { 
			callback(); 
		} 
	};
	facebookService.load = function(callback) {
		(function() {
			var e = document.createElement('script');
			e.async = true;
			e.src = document.location.protocol + '//connect.facebook.net/en_US/all.js';
			e.id = 'facebookclient'
			document.getElementById('fb-root').appendChild(e);
		}());
		if (callback) { callback(); }
	};
	facebookService.fireFacebookPixels = function() {
		var fb_param = {};
		fb_param.pixel_id = '6012237377590';
		fb_param.value = '0.00';
		fb_param.currency = 'INR';
		(function() {
			var fpw = document.createElement('script');
			fpw.async = true;
			fpw.src = '//connect.facebook.net/en_US/fp.js';
			var ref = document.getElementsByTagName('script')[0];
			ref.parentNode.insertBefore(fpw, ref); 
		})(); 
	};
	return facebookService;
});