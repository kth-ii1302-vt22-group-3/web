describe("Temperature view component test", () => {
    it("Is the webpage active", () => {
        cy.visit("http://localhost:3000/");
    });

    it("Temperature should be displayed as integers of 0", () => {
        cy.visit("http://localhost:3000/");
        cy.get("#temperature").contains("0")
    });
    
    it("Timestamp should be displayed 1970-01-01 00:00:00", () => {
        cy.visit("http://localhost:3000/");
        cy.get("#timestamp").contains("1970-01-01 00:00:00")
    });
});