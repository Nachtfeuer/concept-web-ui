(function () {
    'use strict';

    /**
     * @ngdoc controller
     * @name concept.controller:TaskDialogController
     * @description
     * For the moment we define some defaults. That's all.
     */
    angular.module('concept').controller('TaskDialogController', ['$scope', function ($scope) {
        $scope.task = {
            title: 'New task'
            , effort: 'soon'
            , complexity: 'easy'
            , state: 'todo'
        };
    }]);
})();