'use strict';

describe("Story Service, testing 'getNumberOfAllTasks'", function () {
    var storyService;

    beforeEach( module('ConceptServices'));
    beforeEach(inject(function($injector) {
        storyService = $injector.get('StoryService');
    }));

    it("should provide 0 with no story", function () {
        expect(storyService.getNumberOfAllTasksByState([], 'todo')).toBe(0);
        expect(storyService.getNumberOfAllTasksByState([], 'wip')).toBe(0);
        expect(storyService.getNumberOfAllTasksByState([], 'done')).toBe(0);
    });

    it("should provide 0 with stories undefined", function () {
        expect(storyService.getNumberOfAllTasksByState(undefined, 'todo')).toBe(0);
        expect(storyService.getNumberOfAllTasksByState(undefined, 'wip')).toBe(0);
        expect(storyService.getNumberOfAllTasksByState(undefined, 'done')).toBe(0);
    });

    it("should provide correct number of tasks by state", function () {
        // only relevant data is provide (complete stories and tasks are not necessary)
        var stories = [{tasks: [{state: 'todo'}, {state: 'todo'}]}, {tasks: [{state: 'todo'},
                       {state: 'wip'},{state: 'wip'},{state: 'done'}]}];
        expect(storyService.getNumberOfAllTasksByState(stories, "todo")).toBe(3);
        expect(storyService.getNumberOfAllTasksByState(stories, "wip")).toBe(2);
        expect(storyService.getNumberOfAllTasksByState(stories, "done")).toBe(1);
    });
});