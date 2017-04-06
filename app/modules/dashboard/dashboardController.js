
define(['app', 'dashboardService', 'googleService'], function(app){
    function dashboardController($scope, $http, dashboardService, googleService){
    	googleService.loginUser(function(authResult){
            if(authResult && !authResult.error){    // Handle if already logged in user(Gmail).
                googleService.grabRecords(function(data){
                    $scope.gmailContacts = data.feed.entry;
                })
            }
        })
    }
    dashboardController.$inject = ['$scope', '$http', 'dashboardService', 'googleService'];
    app.register.controller('dashboardController', dashboardController);
});