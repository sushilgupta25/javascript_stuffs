define([
	'routeResolver'
], function(){
	var app = angular.module('app', [
        'ngRoute',
        'routeHandlerModule'
    ]);
    app.config([
    '$controllerProvider', 
    '$provide',
    '$compileProvider', 
    '$filterProvider',
    'routeResolverProvider', 
    '$routeProvider',
    function(
    	$controllerProvider,
    	$provide,
	    $compileProvider, 
	    $filterProvider,
    	routeResolverProvider, 
    	$routeProvider
    ){
    	var route = routeResolverProvider.route;
	    app.register = {
	        controller: $controllerProvider.register,
	        service: $provide.service,
	        factory: $provide.factory,
	        directive: $compileProvider.directive,
	        filter: $filterProvider.register,
	        provider: $provide.provider,
	        constant: $provide.constant
	    };

	    $routeProvider.when('/', route.resolve({
	        controller: 'dashboardController',
	        templateUrl: 'modules/dashboard/dashboard.html',
	        controllerPath: 'modules/dashboard/dashboardController.js',
	        resolveData: {  // you can create any method here except load as it is used for internal purpose
	            getPayment: ['$q', function($q){ // do whatever you want to do for resolve
	                var deferred = $q.defer();
	                setTimeout(function(){
	                    deferred.resolve('got it!!');
	                },1000);
	                return deferred.promise;
	            }],
	            loadCustomPlaceholder: ['$q', function($q){
	            	var deferred = $q.defer();
	            	require(['directives/customPlaceholder/placeholder'], function(){
	            		deferred.resolve();
	            	});
	            	return deferred.promise;
	            }]
	        }
	    }))
    }]);
    return app;
});