/**
 * @ngdoc object
 * @name ConceptServices
 * @description
 * Module for services.
 */
angular.module('ConceptServices', [
]);

/**
 * @ngdoc object
 * @name concept
 * @description
 * Main/Application module.
 */
angular.module('concept', [
    'ConceptServices'
    , 'ConceptDirectives'
    , 'ngDialog'
    , 'ngCookies'
]);