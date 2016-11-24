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
    angular.module('concept').controller('StoryController', ['$rootScope', '$scope', '$cookies', 'StoryService', 'ToggleService', 'ModelService', 'ngDialog'
        , function ($rootScope, $scope, $cookies, StoryService, ToggleService, ModelService, ngDialog) {
            // map services to scope
            $scope.storyService = StoryService;
            $scope.toggleService = ToggleService;
            $scope.modelService = ModelService;
            $scope.model = model;

            // loading JSON data
            $.getJSON("data.json", function (data) {
                $scope.$apply(function () {
                    $scope.modelService.setData($scope.model, data);
                });
            });

            $scope.sortFunction = function(story) {
                return $scope.storyService.sortFunction(story, $scope.model.sortKey);
            };

            $scope.showStory = function(story) {
                return $scope.modelService.showStory($scope.model, story);
            };

            $scope.showTask = function(task) {
                return $scope.modelService.showTask($scope.model, task);
            };

            $scope.storyPreCloseCallback = function(value) {
                if (value !== undefined && value != "$closeButton") {
                    $scope.modelService.updateStory($scope.model, angular.copy(value));
                }
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
                    , data: angular.copy(story)
                    , preCloseCallback: $scope.storyPreCloseCallback
                 });
            };
    }]);
})();