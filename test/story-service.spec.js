'use strict';

describe("Story Service, testing 'getState'", function () {
    var storyService;

    beforeEach( module('ConceptServices'));
    beforeEach(inject(function($injector) {
        storyService = $injector.get('Story');
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

describe("Story Service, testing 'getAverageComplexity'", function () {
    var storyService;

    beforeEach( module('ConceptServices'));
    beforeEach(inject(function($injector) {
        storyService = $injector.get('Story');
    }));

    it("should provide 'none' with no task", function () {
        var story = {tasks: []};
        expect(storyService.getAverageComplexity(story)).toBe("none");
    });

    it("should provide 'easy' with easy tasks only", function () {
        var story = {tasks: [{complexity: "easy"}, {complexity: "easy"}]};
        expect(storyService.getAverageComplexity(story)).toBe("easy");
    });

    it("should provide 'easy' with one easy task and one moderate task", function () {
        var story = {tasks: [{complexity: "easy"}, {complexity: "moderate"}]};
        expect(storyService.getAverageComplexity(story)).toBe("moderate");
    });

    it("should provide 'moderate' with one easy task, and one difficult task", function () {
        var story = {tasks: [{complexity: "easy"}, {complexity: "difficult"}]};
        expect(storyService.getAverageComplexity(story)).toBe("moderate");
    });

    it("should provide 'difficult' with one moderate task, and one difficult task", function () {
        var story = {tasks: [{complexity: "moderate"}, {complexity: "difficult"}]};
        expect(storyService.getAverageComplexity(story)).toBe("difficult");
    });

    it("should provide 'difficult' with one easy and one unknown task", function () {
        var story = {tasks: [{complexity: "easy"}, {complexity: "unknown"}]};
        expect(storyService.getAverageComplexity(story)).toBe("difficult");
    });

    it("should provide 'unknown' with one tasks: [easy, unknown, unknown]", function () {
        var story = {tasks: [{complexity: "easy"}, {complexity: "unknown"}, {complexity: "unknown"}]};
        expect(storyService.getAverageComplexity(story)).toBe("unknown");
    });
});

describe("Story Service, testing 'getPercentageDone'", function () {
    var storyService;

    beforeEach( module('ConceptServices'));
    beforeEach(inject(function($injector) {
        storyService = $injector.get('Story');
    }));

    it("should provide '100' with no task", function () {
        var story = {tasks: []};
        expect(storyService.getPercentageDone(story)).toBe(100);
    });

    it("should provide '100' with all tasks done", function () {
        var story = {tasks: [{state: "done"}, {state: "done"}]};
        expect(storyService.getPercentageDone(story)).toBe(100);
    });

    it("should provide '50' with one task done and one task not done", function () {
        var story = {tasks: [{state: "todo"}, {state: "done"}]};
        expect(storyService.getPercentageDone(story)).toBe(50);
    });
});