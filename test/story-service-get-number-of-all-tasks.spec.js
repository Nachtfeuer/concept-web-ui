'use strict';

describe("Story Service, testing 'getNumberOfAllTasks'", function () {
    var storyService;

    beforeEach( module('ConceptServices'));
    beforeEach(inject(function($injector) {
        storyService = $injector.get('StoryService');
    }));

    it("should provide 0 with no story", function () {
        expect(storyService.getNumberOfAllTasks([])).toBe(0);
    });

    it("should provide 0 with stories undefined", function () {
        expect(storyService.getNumberOfAllTasks(undefined)).toBe(0);
    });

    it("should provide 2 with one story with two tasks", function () {
        // only relevant data is provide (complete stories and tasks are not necessary)
        var stories = [{tasks: [{}, {}]}];
        expect(storyService.getNumberOfAllTasks(stories)).toBe(2);
    });

    it("should provide 4 with two stories each with two tasks", function () {
        // only relevant data is provide (complete stories and tasks are not necessary)
        var stories = [{tasks: [{}, {}]}, {tasks: [{}, {}]}];
        expect(storyService.getNumberOfAllTasks(stories)).toBe(4);
    });

    it("should provide 1 done task using a custom filter", function () {
        // only relevant data is provide (complete stories and tasks are not necessary)
        var stories = [{tasks: [{state: 'todo'}, {state: 'todo'}]}, {tasks: [{state: 'todo'}, {state: 'done'}]}];
        var filterByDone = function (task) { return task.state === 'done'; };
        expect(storyService.getNumberOfAllTasks(stories, filterByDone)).toBe(1);
    });
});