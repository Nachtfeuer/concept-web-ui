'use strict';

describe("Story Service, testing 'getState'", function () {
    var storyService;

    beforeEach( module('ConceptServices'));
    beforeEach(inject(function($injector) {
        storyService = $injector.get('StoryService');
    }));

    it("should calculate the state as done with no tasks", function () {
        var story = {tasks: []};
        expect(storyService.getState(story)).toBe("done");
    });

    it("should calculate the state as done with all tasks done", function () {
        var story = {tasks: [{state: "done"}, {state: "done"}]};
        expect(storyService.getState(story)).toBe("done");
    });

    it("should calculate the state as todo with all tasks todo", function () {
        var story = {tasks: [{state: "todo"}, {state: "todo"}]};
        expect(storyService.getState(story)).toBe("todo");
    });

    it("should calculate the state as wip with at least one wip", function () {
        var story = {tasks: [{state: "todo"}, {state: "wip"}]};
        expect(storyService.getState(story)).toBe("wip");
        story = {tasks: [{state: "wip"}, {state: "done"}]};
        expect(storyService.getState(story)).toBe("wip");
        story = {tasks: [{state: "wip"}, {state: "wip"}]};
        expect(storyService.getState(story)).toBe("wip");
    });
});