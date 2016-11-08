'use strict';

describe("Toggle Service", function () {
    var toggleService;

    beforeEach( module('ConceptServices'));
    beforeEach(inject(function($injector) {
        toggleService = $injector.get('ToggleService');
    }));

    it("should adjust individual toggle states correctly", function () {
        var toggles = {"1": false};
        toggleService.setToggleState(toggles, "1", true);
        expect(toggles["1"]).toBe(true);
        toggleService.setToggleState(toggles, "1", false);
        expect(toggles["1"]).toBe(false);
        // it should not create new entries
        toggleService.setToggleState(toggles, "2", true);
        expect("2" in toggles).toBe(false);
    });

    it("should tell current expand state correctly", function () {
        var toggles = {"1": false};
        expect(toggleService.isExpanded(toggles, "1")).toBe(false);
        toggles = {"1": true};
        expect(toggleService.isExpanded(toggles, "1")).toBe(true);
        expect(toggleService.isExpanded(toggles, "2")).toBe(false);
    });

    it("should toggle current state correctly", function () {
        var toggles = {"1": false};
        toggleService.toggleState(toggles, "1");
        expect(toggles["1"]).toBe(true);
        toggleService.toggleState(toggles, "1");
        expect(toggles["1"]).toBe(false);

        toggleService.toggleState(toggles, "2");
        expect("2" in toggles).toBe(false);
    });

    it("should toggle all states correctly", function () {
        var toggles = {"1": false, "2": true};
        toggleService.setAllToggleStates(toggles, true);
        expect(toggles["1"]).toBe(true);
        expect(toggles["2"]).toBe(true);
        toggleService.setAllToggleStates(toggles, false);
        expect(toggles["1"]).toBe(false);
        expect(toggles["2"]).toBe(false);
    });
});