console.log("starting to load concept module ...");

/**
 * @ngdoc object
 * @name concept
 * @description
 * Main module.
 */
angular.module('concept', [
    'ConceptServices',
    'ConceptDirectives',
    'ngDialog'
]);