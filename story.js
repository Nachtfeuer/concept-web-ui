angular.module('concept').controller('StoryController', ['$scope', function($scope) {
    $scope.data = {};
    $scope.sortKey = "id";
    $scope.reverseOrder = false;
    
    // loading JSON data
    $.getJSON("data.json", function(data) {
        $scope.$apply(function() {
            $scope.data = data; 
        });
    });
    
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
     * @return Value for sort depending on currently adjusted sort key.
     */
    $scope.sortFunction = function(story) {
        if ($scope.sortKey == "id") {
            return story.id;
        } else if ($scope.sortKey === "title") {
            return story.title;
        } else if ($scope.sortKey === "priority") {
            return story.priority;
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