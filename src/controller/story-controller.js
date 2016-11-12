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
    angular.module('concept').controller('StoryController', ['$rootScope', '$scope', '$cookies', 'StoryService', 'ToggleService', 'ngDialog'
        , function ($rootScope, $scope, $cookies, StoryService, ToggleService, ngDialog) {
            // map services to scope
            $scope.storyService = StoryService;
            $scope.toggleService = ToggleService;

            $scope.data = {};
            $scope.sortKey = "id";
            $scope.reverseOrder = false;
            $scope.searchStory = "";
            $scope.toggles = {};
            $scope.allExpanded = false;

            $scope.options = { hideDoneStories: false, hideStoryLabels: false, hideDoneTasks: false };

            // loading JSON data
            $.getJSON("data.json", function (data) {
                $scope.setData(data);
            });

            /**
             * @ngdoc method
             * @name setData
             * @methodOf concept.controller:StoryController
             * @description
             * Does replace whole data and update all toggle state to false.
             */
            $scope.setData = function(data) {
                $scope.$apply(function () {
                    $scope.data = data;
                    // adjust initial toggle states.
                    for (var i=0; i < $scope.data.stories.length; ++i) {
                        $scope.toggles[$scope.data.stories[i].id] = false;
                    }
                });
            };

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

            /**
             * @ngdoc method
             * @name showStory
             * @methodOf concept.controller:StoryController
             * @description
             * Filter to show stories which are not done only (when option is set)
             */
            $scope.showStory = function(story) {
                return $scope.storyService.getState(story) !== 'done' || !$scope.options.hideDoneStories;
            };

            /**
             * @ngdoc method
             * @name showTask
             * @methodOf concept.controller:StoryController
             * @description
             * Filter to show tasks which are not done only (when option is set)
             */
            $scope.showTask = function(task) {
                return task.state !== 'done' || !$scope.options.hideDoneTasks;
            };

            /**
             * @ngdoc method
             * @name openSettings
             * @methodOf concept.controller:StoryController
             * @description
             * Does open the story options dialog.
             */
            $scope.openSettings = function () {
                ngDialog.open({
                    template: 'story-options'
                    , className: 'ngdialog ngdialog-theme-default'
                    , scope: $scope
                });
            };

            /**
             * @ngdoc method
             * @name openStory
             * @methodOf concept.controller:StoryController
             * @description
             * Does open the story dialog. It's also waiting until the
             * dialog is opened sending then the clicked story to it.
             */
            $scope.openStory = function (story) {
                ngDialog.open({
                    template: 'story-dialog'
                    , className: 'ngdialog ngdialog-theme-default'
                });

                $scope.$on('ngDialog.opened', function () {
                    $rootScope.$broadcast('storyEvent', story);
                });
            };
    }]);
})();