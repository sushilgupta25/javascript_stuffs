define(['app'], function(app){
    function dashboardService($timeout, $http){
        var getPayment = function(){
            return $http({
                method: 'get',
                url: '/es/payments'
            });
        };
        return {
            getPayment: getPayment
        }
    }
    dashboardService.$inject = ['$timeout', '$http'];

    app.register.service('dashboardService', dashboardService);

    return dashboardService;
});