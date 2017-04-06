angular.module('JqueryAutoComplete', []).directive('jqueryAutoComplete', function($timeout, $http) {
    var defaultFormatter = function(data) {
        return data
    };
    var cachedResponse = {};
    return {
        scope: {
            source: "@",
            formatter: "=",
            callback: "&",
            searchparam: "@"
        },
        link: function(scope, element, attrs) {
            var loaderElement = null;
            if (attrs.loaderclass) {
                loaderElement = angular.element("." + attrs.loaderclass);
            }
            var formatter = scope.formatter || defaultFormatter,
                onSelect = {};
            if (scope.callback) {
                onSelect = function(e, u) {
                    scope.callback({
                        value: u.item.value,
                        result: u.item
                    });
                }
            }
            var dataSource = function(searchTerm, responseCallBack) {
                loaderElement ? loaderElement.removeClass("hidden") : null;
                if (cachedResponse[searchTerm.term]) {
                    responseCallBack(cachedResponse[searchTerm.term]);
                    loaderElement ? loaderElement.addClass("hidden") : null;
                } else {
                    var params = {};
                    params[scope.searchparam] = searchTerm.term;
                    var serverCall = $http({
                        url: scope.source,
                        params: params,
                        method: "GET"
                    });
                    serverCall.then(function(response) {
                        loaderElement ? loaderElement.addClass("hidden") : null;
                        if (response.data.status == 0) {
                            cachedResponse[searchTerm.term] = formatter(response.data.result);
                            responseCallBack(formatter(response.data.result));
                        } else {}
                    });
                }
            }
            element.autocomplete({
                source: dataSource,
                select: onSelect,
                minlength: 2
            });
        }
    };
});