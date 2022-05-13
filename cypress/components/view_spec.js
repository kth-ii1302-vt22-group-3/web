import * as React from 'react';
import { mount } from '@cypress/react';
import Model from '../../src/model/model';
import TemperatureView from "../../src/views/temperatureView";

describe("Test case: Test the view-component with different data", () => {
    it("Test scenario 1: View-component with default value", () => {
        const model = new Model();
        mount(<TemperatureView temperature={model.getTemperature()} timestamp={model.getTimestamp()} />);
        cy.get("#temperature").contains("0");
        cy.get("#timestamp").contains("1970-01-01 00:00:00");
    });

    it("Test scenario 2: View-component with temperature = 100, and timestamp = '1000-10-10 10:10:10'", () => {
        const model = new Model();
        model.setTemperature(100);
        model.setTimestamp("1000-10-10 10:10:10");
        mount(<TemperatureView temperature={model.getTemperature()} timestamp={model.getTimestamp()} />);
        cy.get("#temperature").contains("100");
        cy.get("#timestamp").contains("1000-10-10 10:10:10");
    });

    it("Test scenario 3: View-component with temperature = -100", () => {
        const model = new Model();
        model.setTemperature(-100);
        mount(<TemperatureView temperature={model.getTemperature()} timestamp={model.getTimestamp()} />);
        cy.get("#temperature").contains("-100");
        cy.get("#timestamp").contains("1970-01-01 00:00:00");
    });

    it("Test scenario 4: View-component with temperature = 0", () => {
        const model = new Model();
        model.setTemperature(0);
        mount(<TemperatureView temperature={model.getTemperature()} timestamp={model.getTimestamp()} />);
        cy.get("#temperature").contains("0");
        cy.get("#timestamp").contains("1970-01-01 00:00:00");
    });

    it("Test scenario 5: View-component with temperature = null, and timestamp = null", () => {
        const model = new Model();
        model.setTemperature(null);
        model.setTimestamp(null);
        mount(<TemperatureView temperature={model.getTemperature()} timestamp={model.getTimestamp()} />);
        cy.get("#temperature").should("not.exist");
        cy.get("#timestamp").should("not.exist");
    });

    it("Test scenario 6: View-component with temperature = undefined, and timestamp = undefined", () => {
        const model = new Model();
        model.setTemperature(undefined);
        model.setTimestamp(undefined);
        mount(<TemperatureView temperature={model.getTemperature()} timestamp={model.getTimestamp()} />);
        cy.get("#temperature").should("not.exist");
        cy.get("#timestamp").should("not.exist");
    });

    it("Test scenario 7: View-component with temperature = NaN, and timestamp = 123", () => {
        const model = new Model();
        model.setTemperature(NaN);
        model.setTimestamp(123);
        mount(<TemperatureView temperature={model.getTemperature()} timestamp={model.getTimestamp()} />);
        cy.get("#temperature").should("not.exist");
        cy.get("#timestamp").should("not.exist");
    });

    it("Test scenario 8: View-component with temperature = '100', and timestamp = 123", () => {
        const model = new Model();
        model.setTemperature('100');
        model.setTimestamp(123);
        mount(<TemperatureView temperature={model.getTemperature()} timestamp={model.getTimestamp()} />);
        cy.get("#temperature").should("not.exist");
        cy.get("#timestamp").should("not.exist");
    });
});