 (function () {
    'use strict';
    /**
     * @ngdoc service
     * @name ConceptServices.service:ModelService
     * @description
     * model related functionality.
     */
    angular.module('ConceptServices').service('ModelService', ['StoryService', 'ToggleService', function (storyService, toggleService) {
        /**
         * @ngdoc method
         * @name setData
         * @methodOf concept.controller:StoryController
         * @description
         * Does replace whole data and update all toggle state to false.
         */
        this.setData = function(model, data) {
            model.data = data;
            // adjust initial toggle states.
            for (var i=0; i < model.data.stories.length; ++i) {
                model.toggles[model.data.stories[i].id] = false;
            }
        };

        /**
         * @ngdoc method
         * @name toggleAllStories
         * @methodOf ConceptServices.service:ModelService
         * @description
         * The outer left cell of the column header offers a +/- to expand/collapse
         * all stories at once. This is the function for this action.
         */
        this.toggleAllStories = function (model) {
            toggleService.setAllToggleStates(model.toggles, !model.allExpanded);
            model.allExpanded = !model.allExpanded;
        };

        /**
         * @ngdoc method
         * @name showTask
         * @methodOf ConceptServices.service:ModelService
         * @description
         * Filter to show tasks which are not done only (when option is set)
         */
        this.showTask = function(model, task) {
            return task.state !== 'done' || !model.options.hideDoneTasks;
        };

        /**
         * @ngdoc method
         * @name showStory
         * @methodOf ConceptServices.service:ModelService
         * @description
         * Filter to show stories which are not done only (when option is set)
         */
        this.showStory = function(model, story) {
            return storyService.getState(story) !== 'done' || !model.options.hideDoneStories;
        };

        /**
         * @ngdoc method
         * @name indexOfStory
         * @methodOf ConceptServices.service:ModelService
         * @description
         * Trying to find index of given story
         * @param {object} story the story for which to find the index.
         * @returns {int} >= 0 when found otherwise -1
         */
        this.indexOfStory = function(model, story) {
            for (var i in model.data.stories) {
                if (model.data.stories[i].id == story.id) {
                    return i;
                }
            }
            return -1;
        };

        /**
         * @ngdoc method
         * @name nextId
         * @methodOf ConceptServices.service:ModelService
         * @description
         * Trying to find next id for a new story
         * @param {object} model that contains all stories.
         * @returns {int} next id for story.
         */
        this.nextId = function(model) {
            return Math.max.apply(Math,
                model.data.stories.map(function(story){return story.id;})) + 1;
        };

        /**
         * @ngdoc method
         * @name updateStory
         * @methodOf ConceptServices.service:ModelService
         * @description
         * Update the list of stories for given story which means that
         * existing story with same id will be replaced, otherwise it
         * will be added.
         * @param {object} model that contains all stories.
         * @param {story} story to update or add.
         */
        this.updateStory = function(model, story) {
            var i = this.indexOfStory(model, story);
            if (i >= 0) {
                model.data.stories[i] = story;
                return;
            }

            story.id = this.nextId(model);
            model.data.stories.push(story);
        };
    }]);
})();