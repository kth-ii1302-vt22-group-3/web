describe("Test case: Running the webpage in a test environment with default values.", () => {
    it("Test scenario 1: The webpage path '/',  accessible on 'localhost'.", () => {
        cy.visit("/");
        cy.url().should("include", "localhost");
    });

    it("Test scenario 2: The webpage path '/today',  should display the temperature as 0.", () => {
        cy.visit("/today");
        cy.get("#temperature").contains("0");
    });

    it("Test scenario 3: The webpage path '/today', should display the timestamp as 1970-01-01 00:00:00.", () => {
        cy.visit("/today");
        cy.get("#timestamp").contains("1970-01-01 00:00:00");
    });

    it("Test scenario 4: The webpage, path '/graph', should display a graph from 0 to 10 in a span of 10 days.", () => {
        cy.visit("/graph");
        cy.get("#graph").should("be.visible");
        cy.get("#graph").should("have.attr", "width", "1000");
        cy.get("#graph").should("have.attr", "height", "500");
    });
})