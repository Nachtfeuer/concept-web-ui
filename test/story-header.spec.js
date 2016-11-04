'use strict';

describe("Story Header Directive", function () {
    var compile;
    var scope;
    
    function compileElement(element) {
        var compiledElement = compile(angular.element(element))(scope);
        scope.$digest();
        return compiledElement;
    }
    
    beforeEach(module('ConceptDirectives'));
    beforeEach(inject(function ($compile, $rootScope) {
        compile = $compile;
        scope = $rootScope.$new();
        scope.reverseOrder = false;
        scope.sortKey = "id";
    }));

    it("shows correctly the rendered directive for a story header for a title column", function() {
        var html = '<th th-story title="Title" key="title" sort-key="sortKey" reverse-order="reverseOrder"></th>';
        var compiledDirective = compileElement(html);
        var isolatedScope = compiledDirective.isolateScope();
        isolatedScope.title = "Title";
        isolatedScope.key = "title";

        // we expect to see the visual title
        var expected = /.*Title<\/a>/;
        expect(compiledDirective.html()).toMatch(expected);
        // we expect to see click logic that does change to sortKey and does a reverse ordering.
        expected = /ng-click="sortKey = key; reverseOrder = !reverseOrder"/;
        expect(compiledDirective.html()).toMatch(expected);
        // we expect to see show logic for the down key
        expected = /<span ng-show="sortKey == key &amp;&amp; !reverseOrder" class="fa fa-caret-down/;
        expect(compiledDirective.html()).toMatch(expected);
        // we expect to see show logic for the up key
        expected = /<span ng-show="sortKey == key &amp;&amp;  reverseOrder" class="fa fa-caret-up/;
        expect(compiledDirective.html()).toMatch(expected);
    });

    it("does change correctly the sorting when clicking the title link", function() {
        var html = '<th th-story title="Title" key="title" sort-key="sortKey" reverse-order="reverseOrder"></th>';
        var compiledDirective = compileElement(html);
        var isolatedScope = compiledDirective.isolateScope();
        isolatedScope.title = "Title";
        isolatedScope.key = "title";

        var link = compiledDirective.find('a');
        link.triggerHandler('click');
        scope.$digest;
        
        expect(isolatedScope.sortKey).toBe('title');
        expect(isolatedScope.reverseOrder).toBe(true);
        // clicking the same column again does toggle reverse ordering
        link.triggerHandler('click');
        scope.$digest;
        expect(isolatedScope.reverseOrder).toBe(false);
    });
});