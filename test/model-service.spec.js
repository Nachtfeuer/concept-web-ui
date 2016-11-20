'use strict';

describe("Model Service", function () {
    var modelService;
    var testData = {
        stories: [
            {id: 1, title: "story one", tasks: [{id: 1, title: "task one one"}]}
            ,{id: 2, title: "story two", tasks: [{id: 1, title: "task two one"}]}
        ]
    };

    beforeEach( module('ConceptServices'));
    beforeEach(inject(function($injector, _ToggleService_) {
        modelService = $injector.get('ModelService');
    }));

    it("should set the data and all toggle states correctly", function () {
        var testModel = {toggles:{}};
        modelService.setData(testModel, angular.copy(testData));
        expect(testModel.data.stories.length).toBe(2);
        expect(testModel.data.stories[0].id).toBe(1);
        expect(testModel.data.stories[0].title).toBe("story one");
        expect(testModel.data.stories[1].id).toBe(2);
        expect(testModel.data.stories[1].title).toBe("story two");

        expect(Object.keys(testModel.toggles).length).toBe(2);
        expect(testModel.toggles[1]).toBe(false);
        expect(testModel.toggles[2]).toBe(false);
    });

    it("should have right toggle states when toggling all stories", function() {
        var testModel = {toggles:{}};
        modelService.setData(testModel, angular.copy(testData));
        modelService.toggleAllStories(testModel);
        expect(testModel.toggles[1]).toBe(true);
        expect(testModel.toggles[2]).toBe(true);
    });

    it("should update an existing story", function() {
        var testModel = {toggles:{}};
        var changedStory = {id: 1, title: "story one (updated)", tasks: [{id: 1, title: "task one one"}]}
        modelService.setData(testModel, angular.copy(testData));
        modelService.updateStory(testModel, changedStory);
        expect(testModel.data.stories.length).toBe(2);
        expect(testModel.data.stories[0].title).toBe("story one (updated)");
    });

    it("should update another existing story", function() {
        var testModel = {toggles:{}};
        var changedStory = {id: 2, title: "story two (updated)", tasks: [{id: 1, title: "task two one"}]}
        modelService.setData(testModel, angular.copy(testData));
        modelService.updateStory(testModel, changedStory);
        expect(testModel.data.stories.length).toBe(2);
        expect(testModel.data.stories[1].title).toBe("story two (updated)");
    });

    it("should add a new story", function() {
        var testModel = {toggles:{}};
        var newStory = {title: "story three"};
        modelService.setData(testModel, angular.copy(testData));
        modelService.updateStory(testModel, newStory);
        expect(testModel.data.stories.length).toBe(3);
        expect(testModel.data.stories[2].id).toBe(3);
    });
});