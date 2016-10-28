angular.module('concept').controller('StoryController', ['$scope', function($scope) {
    $scope.data = {};
    
    // loading JSON data
    $.getJSON("data.json", function(data) {
        $scope.$apply(function() {
            $scope.data = data; 
        });
    });
}]);