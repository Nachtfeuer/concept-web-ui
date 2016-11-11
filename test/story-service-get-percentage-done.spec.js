'use strict';

describe("Story Service, testing 'getPercentageDone'", function () {
    var storyService;

    beforeEach( module('ConceptServices'));
    beforeEach(inject(function($injector) {
        storyService = $injector.get('StoryService');
    }));

    it("should provide '100' with no task", function () {
        var story = {tasks: []};
        expect(storyService.getPercentageDone(story)).toBe(100);
    });

    it("should provide '100' with all tasks done", function () {
        var story = {tasks: [{state: 'done'}, {state: 'done'}]};
        expect(storyService.getPercentageDone(story)).toBe(100);
    });

    it("should provide '50' with one task done and one task not done", function () {
        var story = {tasks: [{state: "todo"}, {state: "done"}]};
        expect(storyService.getPercentageDone(story)).toBe(50);
    });
});