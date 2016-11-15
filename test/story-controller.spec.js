'use strict';

describe("Story Controller", function () {
    var rootScope;
    var scope;
    var controller;
    var testData = {
        stories: [
            {id: 1, title: "story one", tasks: [{id: 1, title: "task one one"}]}
            ,{id: 2, title: "story two", tasks: [{id: 1, title: "task two one"}]}
        ]
    }

    beforeEach( module('concept'));
    beforeEach(inject(function($rootScope, $controller, _$cookies_, _StoryService_, _ToggleService_, _ngDialog_) {
        rootScope = $rootScope;
        scope = rootScope.$new();
        controller = $controller('StoryController', {
            '$rootScope': rootScope
            , '$scope': scope
            , '$cookies': _$cookies_
            , 'StoryService': _StoryService_
            , 'ToggleService': _ToggleService_
            , 'ngDialog': _ngDialog_
        });
    }));

    it("should have right defaults", function() {
        expect(scope.model.data).toEqual({});
        expect(scope.model.toggles).toEqual({});
        expect(scope.model.sortKey).toBe("id");
        expect(scope.model.reverseOrder).toBe(false);
        expect(scope.model.searchStory).toBe("");
        expect(scope.model.options.hideDoneStories).toBe(false);
        expect(scope.model.options.hideDoneTasks).toBe(false);
        expect(scope.model.options.hideStoryLabels).toBe(false);
    });

    it("should show done stories when enabled", function() {
        var story = {tasks: [{state: "done"}]};
        expect(scope.showStory(story)).toBe(true);
    });

    it("should hide done stories when disabled", function() {
        var story = {tasks: [{state: "done"}]};
        scope.model.options.hideDoneStories = true;
        expect(scope.showStory(story)).toBe(false);
    });

    it("should show done task when enabled", function() {
        var task = {state: "done"};
        expect(scope.showTask(task)).toBe(true);
    });

    it("should hide done task when disabled", function() {
        var task = {state: "done"};
        scope.model.options.hideDoneTasks = true;
        expect(scope.showTask(task)).toBe(false);
    });

    it("should have right data and toggle states", function() {
        scope.setData(testData);
        expect(scope.model.data).toEqual(testData);
        expect(Object.keys(scope.model.toggles).length).toBe(2);
        expect(scope.model.toggles["1"]).toBe(false);
        expect(scope.model.toggles["2"]).toBe(false);
    });

    it("should have right toggle states when toggling all stories", function() {
        scope.setData(testData);
        scope.toggleAllStories();
        expect(scope.model.toggles["1"]).toBe(true);
        expect(scope.model.toggles["2"]).toBe(true);
    });
});