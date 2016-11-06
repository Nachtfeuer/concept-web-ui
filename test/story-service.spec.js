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

describe("Story Service, testing 'getNumberOfAllTasks'", function () {
    var storyService;

    beforeEach( module('ConceptServices'));
    beforeEach(inject(function($injector) {
        storyService = $injector.get('StoryService');
    }));

    it("should provide 0 with no story", function () {
        expect(storyService.getNumberOfAllTasks([])).toBe(0);
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

