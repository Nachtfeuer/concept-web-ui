(function () {
    'use strict';
    /**
     * @ngdoc controller
     * @name concept.controller:StoryController
     * @description
     * The controller does read the data stories and tasks from JSON file
     * providing those in the scope via the **data** variable.
     * Finally the controller contains all functionality for the table
     * which is about:
     *  - expand/collapse of an individual story (or all)
     *  - filtering of the table.
     */
    angular.module('concept').controller('StoryController', ['$scope', 'StoryService', 'ToggleService', 'ngDialog'
        , function ($scope, StoryService, ToggleService, ngDialog) {
            // map services to scope
            $scope.storyService = StoryService;
            $scope.toggleService = ToggleService;

            $scope.data = {};
            $scope.sortKey = "id";
            $scope.reverseOrder = false;
            $scope.searchStory = "";
            $scope.toggles = {};
            $scope.allExpanded = false;

            // loading JSON data
            $.getJSON("data.json", function (data) {
                $scope.$apply(function () {
                    $scope.data = data;
                    // adjust initial toggle states.
                    for (var i=0; i < $scope.data.stories.length; ++i) {
                        $scope.toggles[$scope.data.stories[i].id] = false;
                    }
                });
            });

            /**
             * @ngdoc method
             * @name toggleAllStories
             * @methodOf concept.controller:StoryController
             * @description
             * The outer left cell of the column header offers a +/- to expand/collapse
             * all stories at once. This is the function for this action.
             */
            $scope.toggleAllStories = function () {
                $scope.toggleService.setAllToggleStates($scope.toggles, !$scope.allExpanded);
                $scope.allExpanded = !$scope.allExpanded;
            };

            $scope.openSettings = function () {
                ngDialog.open({
                    template: 'settingsDialog'
                    , className: 'ngdialog ngdialog-theme-default'
                    , scope: $scope
                });
            };
            $scope.open = function (story) {
                $scope.currentStory = story;
                ngDialog.open({
                    template: 'templateTestId'
                    , className: 'ngdialog ngdialog-theme-default'
                    , scope: $scope
                });
            };
    }]);
})();