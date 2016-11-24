'use strict';

describe("Task Dialog Controller", function () {
    var rootScope;
    var scope;
    var controller;

    beforeEach( module('concept'));
    beforeEach(inject(function($rootScope, $controller) {
        rootScope = $rootScope;
        scope = rootScope.$new();

        controller = $controller('TaskDialogController', {
            '$scope': scope
        });
    }));

    it("should have a default task (initially)", function() {
        expect(scope.task.title).toEqual("New task");
        expect(scope.task.state).toEqual("todo");
        expect(scope.task.effort).toEqual("soon");
        expect(scope.task.complexity).toEqual("easy");
    });
});