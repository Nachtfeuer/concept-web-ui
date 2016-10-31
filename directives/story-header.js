angular.module("ConceptDirectives", []).directive("thStory", function() {
   return {
       restrict: 'A',
       scope: {
           title: '@',
           key: '@',
           sortKey: '=',
           reverseOrder: '='
       },
       template: 
            '<a href="#" ng-click="sortKey = key; reverseOrder = !reverseOrder">' +
            '  <span ng-show="sortKey == key && !reverseOrder" class="fa fa-caret-down"></span>' +
            '  <span ng-show="sortKey == key &&  reverseOrder" class="fa fa-caret-up"></span>' +
            '  {{title}}' +
            '</a>'
   }
});