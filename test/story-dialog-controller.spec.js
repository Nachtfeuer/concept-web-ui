'use strict';

describe("Story Dialog Controller", function () {
    var rootScope;
    var scope;
    var controller;
    var ngDialog;

    beforeEach( module('concept'));
    beforeEach(inject(function($rootScope, $controller, _ngDialog_) {
        rootScope = $rootScope;
        scope = rootScope.$new();
        ngDialog = _ngDialog_;

        controller = $controller('StoryDialogController', {
            '$scope': scope
            ,ngDialog: _ngDialog_
        });
    }));

    it("should have an undefined story (initially)", function() {
        expect(scope.story).toEqual(undefined);
    });

    it("should have a valid next id", function() {
        var story = {title: "test", tasks: []};
        expect(scope.nextId(story)).toBe(1);
        story = {title: "test", tasks: [{id:5}]};
        expect(scope.nextId(story)).toBe(6);
    });

    it("should be able to add tasks correctly", function() {
        var story = {title: "test", tasks: []};
        scope.story = story;
        scope.addTask({title: "task one"});
        expect(story.tasks.length).toBe(1);
        expect(story.tasks[0].id).toBe(1);
        expect(story.tasks[0].title).toBe("task one");
    });

    it("should correctly remove a task at given index", function() {
        var story = {title: "test", tasks: [{id:1}, {id:2}, {id:3}]};
        scope.story = story;
        scope.removeTaskAtIndex(1);
        expect(story.tasks.length).toBe(2);
        expect(story.tasks[0].id).toBe(1);
        expect(story.tasks[1].id).toBe(3);
    });

    it("should open the task dialog", function() {
        spyOn(ngDialog, 'open');
        scope.openNewTaskDialog();
        expect(ngDialog.open).toHaveBeenCalled();
    });

    it("should handle pre close callback for task dialog correctly", function() {
        var story = {title: "test", tasks: []};
        scope.story = story;
        scope.taskPreCloseCallback({title: "task one"});
        expect(story.tasks.length).toBe(1);
        expect(story.tasks[0].id).toBe(1);
        expect(story.tasks[0].title).toBe("task one");
    });
});