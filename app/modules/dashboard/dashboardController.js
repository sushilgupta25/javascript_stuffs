define(['app', 'dashboardService'], function(app, dashboardService){
    function dashboardController($scope, $http, dashboardService){
    	dashboardService.getPayment().then(function(data){
    		// handle data
    	}).catch(function(data){
    		console.log(data);
    	});
        $scope.isWorking = false;
    }
    dashboardController.$inject = ['$scope', '$http', 'dashboardService'];

    app.register.controller('dashboardController', dashboardController);
});