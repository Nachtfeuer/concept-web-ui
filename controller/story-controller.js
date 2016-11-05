(function() {
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
    angular.module('concept').controller('StoryController', ['$scope', 'StoryService', 'ngDialog', function($scope, StoryService, ngDialog) {
        $scope.data = {};
        $scope.sortKey = "id";
        $scope.reverseOrder = false;
        $scope.searchStory = "";
        $scope.toggles = {};
        $scope.allExpanded = false;

        // map service to scope
        $scope.storyService = StoryService;

        // loading JSON data
        $.getJSON("data.json", function(data) {
            $scope.$apply(function() {
                $scope.data = data; 
            });
        });
        
        $scope.getToggle = function(story) {
            if (!(story.id in $scope.toggles)) {
                $scope.toggles[story.id] = { expanded: false };
            }
            return $scope.toggles[story.id];
        };

        /**
         * @ngdoc method
         * @name toggle
         * @methodOf concept.controller:StoryController
         * @description
         * The given story is expanded or collapsed.
         *
         * @param {object} story for which to toggle expand/collapse state.
         */
        $scope.toggle = function(story) {
            var entry = $scope.getToggle(story);
            entry.expanded = !entry.expanded;
        };

        /**
         * @ngdoc method
         * @name isExpanded
         * @methodOf concept.controller:StoryController
         * @description
         * Check whether given story has been visually expanded.
         * @returns {boolean} true when given story has been visually expanded.
         */
        $scope.isExpanded = function(story) {
            return story.id in $scope.toggles && $scope.toggles[story.id].expanded;
        };

        /**
         * @ngdoc method
         * @name toggleAllStories
         * @methodOf concept.controller:StoryController
         * @description
         * The outer left cell of the column header offers a +/- to expand/collapse
         * all stories at once. This is the function for this action.
         */
        $scope.toggleAllStories = function() {
            for (var i = 0; i < $scope.data.stories.length; ++i) {
                var entry = $scope.getToggle($scope.data.stories[i]);
                entry.expanded = !$scope.allExpanded;
            }
            $scope.allExpanded = !$scope.allExpanded;
        };

        $scope.open = function(story) {
            $scope.currentStory = story;
            ngDialog.open({
                template: 'templateTestId',
                className: 'ngdialog ngdialog-theme-default',
                scope: $scope
            });
        };
    }]);
})();