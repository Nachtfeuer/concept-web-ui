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
    angular.module('concept').controller('StoryController', ['$scope', 'Story', 'ngDialog', function($scope, Story, ngDialog) {
        $scope.data = {};
        $scope.sortKey = "id";
        $scope.reverseOrder = false;
        $scope.searchStory = "";
        $scope.toggles = {};
        $scope.allExpanded = false;

        // service functions
        $scope.getState = Story.getState;
        $scope.getPercentageDone = Story.getPercentageDone;
        $scope.getAverageComplexity = Story.getAverageComplexity;

        // loading JSON data
        $.getJSON("data.json", function(data) {
            $scope.$apply(function() {
                $scope.data = data; 
            });
        });

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
            if (story.id in $scope.toggles) {
                $scope.toggles[story.id].expanded = !$scope.toggles[story.id].expanded;            
            } else {
                $scope.toggles[story.id] = { expanded: true };
            }
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
                if ($scope.data.stories[i].id in $scope.toggles) {
                    $scope.toggles[$scope.data.stories[i].id].expanded = !$scope.allExpanded;            
                } else {
                    $scope.toggles[$scope.data.stories[i].id] = { expanded: !$scope.allExpanded };
                }
            }
            $scope.allExpanded = !$scope.allExpanded;
        };

        /**
         * @ngdoc method
         * @name sortFunction
         * @methodOf concept.controller:StoryController
         * @description
         *
         * Usually a string is sufficient for the **orderBy** as sorting criteria
         * but the story does have some information which are "hidden" in the tasks
         * like **state** and **complexity*. Therefor we require a sort function
         * providing the details depending on current sort criteria.
         *
         * @returns {object} Value for sort depending on currently adjusted sort key.
         */
        $scope.sortFunction = function(story) {
            if ($scope.sortKey == "id") {
                return story.id;
            } else if ($scope.sortKey === "title") {
                return story.title;
            } else if ($scope.sortKey === "priority") {
                return story.priority;
            } else if ($scope.sortKey === "avg complexity") {
                return $scope.getAverageComplexity(story);
            } else if ($scope.sortKey === "state") {
                return $scope.getState(story);
            } else if ($scope.sortKey === "#tasks") {
                return story.tasks.length;
            } else if ($scope.sortKey === "%done") {
                return $scope.getPercentageDone(story);
            }
            return "";
        };
        
        $scope.open = function(story) {
            $scope.currentStory = story
            ngDialog.open({
                template: 'templateTestId',
                className: 'ngdialog ngdialog-theme-default',
                scope: $scope
            });
        }
    }]);
})();