'use strict';

describe("Story Service, testing 'sortFunction'", function () {
    var storyService;

    beforeEach( module('ConceptServices'));
    beforeEach(inject(function($injector) {
        storyService = $injector.get('StoryService');
    }));

    it("should provide id '123'", function () {
        var story = {id: 123};
        expect(storyService.sortFunction(story, "id")).toBe(123);
    });

    it("should provide title 'test story'", function () {
        var story = {title: 'test story'};
        expect(storyService.sortFunction(story, "title")).toBe('test story');
    });

    it("should provide priority 'urgent'", function () {
        var story = {priority: 'urgent'};
        expect(storyService.sortFunction(story, "priority")).toBe('urgent');
    });

    it("should provide state 'wip'", function () {
        var story = {tasks: [{state: 'todo'}, {state: 'done'}]};
        expect(storyService.sortFunction(story, "state")).toBe('wip');
    });

    it("should provide complexity 'moderate'", function () {
        var story = {tasks: [{complexity: 'easy'}, {complexity: 'difficult'}]};
        expect(storyService.sortFunction(story, "avg complexity")).toBe('moderate');
    });

    it("should provide #tasks '3'", function () {
        var story = {tasks: [{}, {}, {}]};
        expect(storyService.sortFunction(story, "#tasks")).toBe(3);
    });

    it("should provide %done '50.0'", function () {
        var story = {tasks: [{state: 'todo'}, {state: 'done'}]};
        expect(storyService.sortFunction(story, "%done")).toBe(50.0);
    });

    it("should provide empty string for unknown sort key", function () {
        var story = {}
        expect(storyService.sortFunction(story, "unknown")).toBe('');
    });
});