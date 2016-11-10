(function () {
    'use strict';

    /**
     * @ngdoc controller
     * @name concept.controller:StoryDialogController
     * @description
     * The story controller does send the story for which "edit"
     * has been clicked via 'broadcast' through the root scope.
     */
    angular.module('concept').controller('StoryDialogController', ['$scope', function ($scope) {
        $scope.story = {};
        $scope.$on('storyEvent', function(event, story) {
            $scope.story = story;
        });
    }]);
})();