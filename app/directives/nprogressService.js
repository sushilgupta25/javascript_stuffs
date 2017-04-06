var nProgressService = angular.module('NProgressService', []);
nProgressService.factory('nProgressService', function($rootScope) {
    var nProgressService = {};
    return nProgressService;
});
nProgressService.config(function($httpProvider) {
    if (typeof define === "function" && define.amd) {
        NProgress = require('ngProgress');
        if (!NProgress) {
            return false;
        }
    }
    var pendingRequest = 0;
    $httpProvider.interceptors.push(function($q) {
        return {
            request: function(config) {
                pendingRequest++;
                NProgress.start();
                return config;
            },
            response: function(response) {
                pendingRequest--;
                if (pendingRequest <= 0) {
                    NProgress.done();
                }
                return response;
            },
            responseError: function(response) {
                pendingRequest--;
                if (pendingRequest <= 0) {
                    NProgress.done();
                }
                return $q.reject(response);
            }
        };
    });
});