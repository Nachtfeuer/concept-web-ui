(function () {
    'use strict';

    /**
     * @ngdoc controller
     * @name concept.controller:StoryDialogController
     * @description
     * The story controller does send the story for which "edit"
     * has been clicked via 'broadcast' through the root scope.
     */
    angular.module('concept').controller('StoryDialogController', ['$scope', 'ngDialog', function ($scope, ngDialog) {
        $scope.story = $scope.$parent.ngDialogData;

        /**
         * @ngdoc method
         * @name nextId
         * @methodOf concept.controller:StoryDialogController
         * @description
         * Trying to find next id for a new task
         * @param {object} story that contains all tasks.
          * @returns {int} next id for task.
         */
        $scope.nextId = function(story) {
            if (story.tasks.length === 0) {
                return 1;
            }
            return Math.max.apply(Math,
                story.tasks.map(function(task){return task.id;})) + 1;
        };

        /**
         * @ngdoc method
         * @name addTask
         * @methodOf concept.controller:StoryDialogController
         * @description
         * @param {object} task to be added to the story
         */
        $scope.addTask = function(task) {
            task.id = $scope.nextId($scope.story);
            $scope.story.tasks.push(task);
        };

        /**
         * @ngdoc method
         * @name removeTaskAtIndex
         * @methodOf concept.controller:StoryDialogController
         * @description
         * @param {object} index of task to be deleted.
         */
        $scope.removeTaskAtIndex = function(index) {
            $scope.story.tasks.splice(index, 1);
        };

        $scope.taskPreCloseCallback = function(value) {
            if (value !== undefined && value != "$closeButton") {
                $scope.addTask(angular.copy(value));
            }
        };

        /**
         * @ngdoc method
         * @name addTask
         * @methodOf concept.controller:StoryController
         * @description
         * Does open the story options dialog.
         */
        $scope.openNewTaskDialog = function () {
            ngDialog.open({
                template: 'task-dialog'
                , className: 'ngdialog ngdialog-theme-default'
                , width: '30%'
                , preCloseCallback: $scope.taskPreCloseCallback
            });
        };
    }]);
})();