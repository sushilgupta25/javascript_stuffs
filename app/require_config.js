requirejs.config({
	baseUrl: './',
	paths: {
		angular: 'bower_components/angular/angular',
		angularRoute: 'bower_components/angular-route/angular-route',
		routeResolver: 'routeResolver',
		dashboardController: "modules/dashboard/dashboardController",
		dashboardService: 'modules/dashboard/dashboardService'
	},
	shim: {
		angularRoute: {
			deps: ['angular']
		},
		routeResolver: {
			deps: ['angular', 'angularRoute']
		}
	}
});