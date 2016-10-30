angular.module('concept').controller('StoryController', ['$scope', function($scope) {
    $scope.data = {};
    $scope.sortKey = "id";
    $scope.reverseOrder = false;
    $scope.searchStory = "";
    $scope.toggles = {};
    $scope.allExpanded = false;
    
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
    $scope.is_expanded = function(story) {
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
     * @return state for given story.
     */
    $scope.getState = function(story) {
        if (story.tasks.every(entry => entry.state === "todo")) {
            return "todo";
        }
        if (story.tasks.every(entry => entry.state === "done")) {
            return "done";
        }
        return "wip";
    };

    /**
     * @return percentage value of done stories.
     */
    $scope.getPercentageDone = function(story) {
        if (story.tasks.length === 0) {
            return 100.0;
        }

        var countDone = story.tasks.reduce(function(total, task) {
            if (task.state === "done") {
                return total + 1;
            }
            return total;
        }, 0);
        
        return countDone * 100.0 / story.tasks.length;
    }

    /**
     * @param story current story for which to calculate average complexity.
     * @return average complexity for given story.
     */
    $scope.getAverageComplexity = function(story) {
        if (story.tasks.length === 0) {
            return "none";
        }

        var complexity = story.tasks.reduce(function(total, task) {
            if (task.complexity === "easy") {
                total += 2;
            } else if (task.complexity == "moderate") {
                total += 8;
            } else if (task.complexity == "difficult") {
                total += 13;
            } else if (task.complexity == "unknown") {
                total += 144;
            }
            return total;
        }, 0);

        var averageComplexity =  complexity / story.tasks.length;

        if (averageComplexity < 5) { // (2+8)/2 = 5
            return "easy";
        } else if (averageComplexity < 10.5) { // (8+13)/2 = 10.5
            return "moderate";
        } else if (averageComplexity < 78.5) { // (13+144)/2 = 78.5
            return "difficult";
        }
        return "unknown";
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