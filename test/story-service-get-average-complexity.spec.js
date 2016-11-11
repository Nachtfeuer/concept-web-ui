'use strict';

describe("Story Service, testing 'getAverageComplexity'", function () {
    var storyService;

    beforeEach( module('ConceptServices'));
    beforeEach(inject(function($injector) {
        storyService = $injector.get('StoryService');
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