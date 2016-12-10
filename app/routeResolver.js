'use strict';
define([],function(){
    var routeResolver = function(){
        this.$get = function(){
            return this;
        };
        this.route = function(){
            var resolve = function(config){
                var routeDefinition = {};
                routeDefinition.controller = config.controller;
                routeDefinition.templateUrl = config.templateUrl;

                if(angular.isDefined(config.reloadOnSearch)){
                    routeDefinition.reloadOnSearch = config.reloadOnSearch;
                }
                if(angular.isDefined(config.url)){
                    routeDefinition.url = config.url;
                }
                if(angular.isDefined(config.name)){
                    routeDefinition.name = config.name;
                }
                var resolveDependencies = {
                    load: ['$q','$rootScope',function($q,$rootScope){
                        var dependencies = [config.controllerPath];
                        return function($q,$rootScope,dependencies){
                            var defer = $q.defer();
                            require(dependencies,function(){
                                defer.resolve();
                                $rootScope.$apply();
                            });
                            return defer.promise;
                        }($q,$rootScope,dependencies);
                    }]
                };
                if(config.resolveData){
                    for(var i in config.resolveData){
                        if(i == 'load'){
                            throw "Load method is already reserved for load depenendecies by requirejs";
                            return;
                        }
                        resolveDependencies[i] = config.resolveData[i];
                    }
                }
                routeDefinition.resolve = resolveDependencies;
                return routeDefinition;
            };
            
            return {
                resolve: resolve
            }
        }();
    };
    var routeHandler = angular.module('routeHandlerModule',[]);
    routeHandler.provider("routeResolver",routeResolver);
});