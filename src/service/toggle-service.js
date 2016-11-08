(function () {
    'use strict';
    /**
     * @ngdoc service
     * @name ConceptServices.service:ToggleService
     * @description
     * Provides functionality to manage a list of toggle states.
     */
    angular.module('ConceptServices').service('ToggleService', function () {
        /**
         * @ngdoc method
         * @name setToggleState
         * @methodOf ConceptServices.service:ToggleService
         * @description
         * Adjust toogle state for a concrete id.
         *
         * @param {map} toggles map of id, boolean for toggles.
         * @param {object} id id for which to adjust toggle state.
         */
        this.setToggleState = function (toggles, id, state) {
            if (id in toggles) {
                toggles[id] = state;
            }
        };

        /**
         * @ngdoc method
         * @name isExpanded
         * @methodOf ConceptServices.service:ToggleService
         * @description
         * Adjust toogle state for a concrete id.
         *
         * @param {map} toggles map of id, boolean for toggles.
         * @param {object} id id for which to check expanded state.
         * @returns {boolean} true when given id has expanded state.
         */
        this.isExpanded = function (toggles, id) {
            return id in toggles && toggles[id] === true;
        };

        /**
         * @ngdoc method
         * @name toggleState
         * @methodOf ConceptServices.service:ToggleService
         * @description
         * Invert toogle state for a concrete id.
         *
         * @param {map} toggles map of id, boolean for toggles.
         * @param {object} id id for which to invert toggle state.
         */
        this.toggleState = function (toggles, id) {
            if (id in toggles) {
                toggles[id] = !toggles[id];
            }
        };

        /**
         * @ngdoc method
         * @name setAllToggleStates
         * @methodOf ConceptServices.service:ToggleService
         * @description
         * Adjust toogle state for all ids at once.
         *
         * @param {map} toggles map of id, boolean for toggles.
         * @param {boolean} state to adjust for all ids.
         */
        this.setAllToggleStates = function(toggles, state) {
            for (var id in toggles) {
                this.setToggleState(toggles, id, state);
            }
        };
    });
})();