import * as React from 'react';
import { mount } from '@cypress/react'
import TemperatureView from "../../src/views/temperatureView"


describe("Temperature view component test with dummy data", () => {
    it("Temperature is set correctly", () => {
        //cy.visit("http://localhost:3000/");
        const temperature = 100;
        const timestamp = "2222-11-22 11:22:33"
        mount(<TemperatureView temperature={temperature} timeStamp={timestamp} />)
        cy.get("#temperature").contains("100");
    });
    
    it("Timestamp is set correctly", () => {
        //cy.visit("http://localhost:3000/");
        const temperature = 100;
        const timestamp = "2222-11-22 11:22:33"
        mount(<TemperatureView temperature={temperature} timeStamp={timestamp} />)
        cy.get("#timestamp").contains("2222-11-22 11:22:33");
    });
});