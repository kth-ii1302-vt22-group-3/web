import Model from "../../src/model/model";

describe("Test case: Test the Model-component with different data", () => {
    it("Test scenario 1: View-component with empty value", () => {
        const model = null;
    });

    it("Test scenario 2: View-component with default value", () => {
        const model = new Model();
    });
})