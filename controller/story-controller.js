angular.module('concept').controller('StoryController', ['$scope', 'Story', function($scope, Story) {
    $scope.data = {};
    $scope.sortKey = "id";
    $scope.reverseOrder = false;
    $scope.searchStory = "";
    $scope.toggles = {};
    $scope.allExpanded = false;
    
    $scope.$watch(
        function(scope) { return scope.sortKey },
        function(newValue, oldValue) {
            console.log("sortKey new value is " + newValue);
        }
    );

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
     * @param story the story for which to toggle expand/collapse state.
     */
    $scope.toggle = function(story) {
        if (story.id in $scope.toggles) {
            $scope.toggles[story.id].expanded = !$scope.toggles[story.id].expanded;            
        } else {
            $scope.toggles[story.id] = { expanded: true };
        }
    }
    
    /**
     * @param story the story for which to check current expand/collapse state.
     * @return true when given story is expanded.
     */
    $scope.isExpanded = function(story) {
        return story.id in $scope.toggles && $scope.toggles[story.id].expanded;
    }
    
    $scope.toggleAllStories = function() {
        for (i = 0; i < $scope.data.stories.length; ++i) {
            if ($scope.data.stories[i].id in $scope.toggles) {
                $scope.toggles[$scope.data.stories[i].id].expanded = !$scope.allExpanded;            
            } else {
                $scope.toggles[$scope.data.stories[i].id] = { expanded: !$scope.allExpanded };
            }
        }
        $scope.allExpanded = !$scope.allExpanded;
    }
    
    /**
     * @return Value for sort depending on currently adjusted sort key.
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
    }
}]);