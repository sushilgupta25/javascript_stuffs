define(['app'], function(app) {
    app.register.directive('customPlaceholder', ['$timeout', function($timeout) {
        return {
            scope: {},
            link: function(scope, elem, attrs) {
                var placeholder;
                var attrType = 'data-placeholder';
                $timeout(function() {
                    var label = elem.find('label');
                    var input = elem.find('input');
                    if (('length' in input) && !input.length) {
                        input = elem.find('textarea');
                    }

                    placeholder = input.attr(attrType);
                    if (input.val()) {
                        elem.addClass('active');
                    }
                    if (placeholder) {
                        input.attr(attrType, '');
                        scope.placeholder = placeholder;
                        input.on('focus', function(e) {
                            if ($(this).attr(attrType)) {
                                scope.placeholder = $(this).attr(attrType);
                                input.attr(attrType, '');
                                scope.$apply();
                            }
                            elem.addClass('active');
                        });
                        input.on('blur', function(e) {
                            if (!input.val()) {
                                elem.removeClass('active');
                            }
                        });
                        label.on('click', function() {
                            elem.addClass('active');
                            $(input).trigger('focus');
                        });
                    }
                    $(input).trigger('blur');
                }, 0);
            },
            template: '<div class="input-placeholder"><label>{{placeholder}}</label><data-ng-transclude></data-ng-transclude></div>',
            transclude: true
        }
    }]);
});
