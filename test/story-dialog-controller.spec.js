'use strict';

describe("Story Dialog Controller", function () {
    var rootScope;
    var scope;
    var controller;

    beforeEach( module('concept'));
    beforeEach(inject(function($rootScope, $controller) {
        rootScope = $rootScope;
        scope = rootScope.$new();
        controller = $controller('StoryDialogController', {
            '$scope': scope
        });
    }));

    it("should have an empty story (initially)", function() {
        expect(scope.story).toEqual({});
    });

    it("should receive a story via broacast", function() {
        var story = {title: 'test story'};
        rootScope.$broadcast('storyEvent', story);
        expect(scope.story).toEqual(story);
    });
});