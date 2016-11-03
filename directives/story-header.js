console.log("starting to load ConceptDirectives.thStory ...");

/**
 * @ngdoc directive
 * @name ConceptDirectives.directive:thStory
 * @element th
 * @scope
 * @restrict A
 *
 * @description
 * This directive allows placing a one line column header instead of multiple
 * line which look the same for id, title, priority, state and so on.
 * The basic functionality is following:
 *
 * - when clicking the column the current sorting key is changed to the one adjusted with current column.
 * - when clicking same column twice the sorting order is toggled between ascending and descending.
 * - depending of current sorting order and sorting key the icon for up or down is shown.
 *
 * @param {string} title this is the visual title you see in the column header (readonly).
 * @param {string} key is the new sort key when you click on the column header (readonly).
 * @param {string} sortKey this is the internal current sorting key (read/write).
 * @param {boolean} reverseOrder this is the internal current sorting order (read/write).
 */
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
   };
});