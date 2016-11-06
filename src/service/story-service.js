(function() {
    'use strict';

    /**
     * @ngdoc service
     * @name ConceptServices.service:StoryService
     * @description
     * The story service provides function operating on a
     * data element representing a story.
     */
    angular.module('ConceptServices', []).service('StoryService', function () {
        /**
         * @ngdoc method
         * @name getState
         * @methodOf ConceptServices.service:StoryService
         * @description
         * 
         * Each task can have following state:
         *  - todo - no yet started with given task
         *  - wip - task has been started
         *  - done - task is done
         * 
         * <p></p>
         * A story state is:
         *  - done - when all stories are done
         *  - todo - when all stories are todo
         *  - wip - when first two condition are not fulfilled.
         *
         * @param {object} story the story for which to check current expand/collapse state.
         * @returns {string} state of given story.
         */
        this.getState = function (story) {
            if (story.tasks.length === 0) {
                return "done";
            }

            if (story.tasks.every(function (entry) {
                    return entry.state === "todo";
                })) {
                return "todo";
            }
            if (story.tasks.every(function (entry) {
                    return entry.state === "done";
                })) {
                return "done";
            }
            return "wip";
        };

        /**
         * @ngdoc method
         * @name getPercentageDone
         * @methodOf ConceptServices.service:StoryService
         * @description
         * It's basically the rule of three:
         *  - You have the number of all tasks (`a`: which is 100%)
         *  - we query the number of done tasks (`b`)
         *  - the percentage of done tasks is then the `b * 100.0 / a`
         *
         * <p></p>
         * When there is no task at all then percentage done is 100%.
         *
         * @param {object} story the story for which to calculate the percentage done.
         * @returns {float} percentage value of done stories.
         */
        this.getPercentageDone = function (story) {
            if (story.tasks.length === 0) {
                return 100.0;
            }
            var countDone = story.tasks.reduce(function (total, task) {
                if (task.state === "done") {
                    return total + 1;
                }
                return total;
            }, 0);
            return countDone * 100.0 / story.tasks.length;
        };

        /**
         * @ngdoc method
         * @name getAverageComplexity
         * @methodOf ConceptServices.service:StoryService
         * @description
         * Following complexities are recognized:
         *  - **easy** (internally counts as 2)
         *  - **moderate** (internally counts as 8)
         *  - **difficult** (internally counts as 13)
         *  - **unknown** (internally counts as 144)
         *
         * <p></p>
         * The values are taken from the fibonacci sequence.
         * The sum of those complexities is the complexity for the story.
         * Here are some note on the meaning of each complexity:
         *
         *  - **None** is "nothing to do" (the only case: you have no task)
         *  - **Easy** is "can do it adhoc, in a hour or two, today or latest tomorrow"
         *  - **Moderate** is "have to think about a while, takes a few days to implement only"
         *  - **Difficult** is "design and implementation might take more than a week, we might have external dependencies, not all facts are 100% clear, we might have to evaluate new technology"
         *  - **Unknown** is "too many details, a lot of open questions, too big, not understandable, requires split into smaller stories"
         *
         * @param {object} story the story for which to calculate the average complexity.
         * @returns {string} calculated average complexity
         */
        this.getAverageComplexity = function (story) {
            if (story.tasks.length === 0) {
                return "none";
            }
            var complexity = story.tasks.reduce(function (total, task) {
                if (task.complexity === "easy") {
                    total += 2;
                }
                else if (task.complexity == "moderate") {
                    total += 8;
                }
                else if (task.complexity == "difficult") {
                    total += 13;
                }
                else if (task.complexity == "unknown") {
                    total += 144;
                }
                return total;
            }, 0);
            var averageComplexity = complexity / story.tasks.length;
            if (averageComplexity < 5) { // (2+8)/2 = 5
                return "easy";
            }
            else if (averageComplexity < 10.5) { // (8+13)/2 = 10.5
                return "moderate";
            }
            else if (averageComplexity < 78.5) { // (13+144)/2 = 78.5
                return "difficult";
            }
            return "unknown";
        };

        /**
         * @ngdoc method
         * @name sortFunction
         * @methodOf ConceptServices.service:StoryService
         * @description
         * Depending on sortkey the return value is either the value of a field of
         * the given story or a calculated value.
         *
         * @param {object} story the story for which to provide the value which is taken for sorting.
         * @returns {object} calculated average complexity
         */
        this.sortFunction = function(story, sortKey) {
            if (sortKey == "id") {
                return story.id;
            } else if (sortKey === "title") {
                return story.title;
            } else if (sortKey === "priority") {
                return story.priority;
            } else if (sortKey === "avg complexity") {
                return this.getAverageComplexity(story);
            } else if (sortKey === "state") {
                return this.getState(story);
            } else if (sortKey === "#tasks") {
                return story.tasks.length;
            } else if (sortKey === "%done") {
                return this.getPercentageDone(story);
            }
            return "";
        };

    });

})();