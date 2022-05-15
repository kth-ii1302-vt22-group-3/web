import { mount } from "@cypress/react";
import Model from "../../src/model/model";
import TemperatureGraphView from "../../src/views/temperatureGraphView";

describe("Test case: Test the graph-component with different data", () => {
  it("Test scenario 1: graph-component with empty values", () => {
    // Mount a graph to the view.
    // Create an instance of Model and fetch the default chartData
    const model = new Model();
    const data = model.getChartData();
    mount(<TemperatureGraphView chartData={data} />);
  });

  it("Test scenario 2: graph-component with 1-10 values.", () => {
    const model = new Model();
    model.setChartData({
      dataset: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      labels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    });
    const data = model.getChartData();
    mount(<TemperatureGraphView chartData={data} />);
  });

  it("Test scenario 3: graph-component with dataset of integers(-10 to 10) and labels of strings.", () => {
    const model = new Model();
    model.setChartData({
      dataset: [-10, -8, -6, -4, -2, 0, 2, 4, 6, 8, 10],
      labels: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
    });
    const data = model.getChartData();
    mount(<TemperatureGraphView chartData={data} />);
  });

  it("Test scenario 4: graph-component with dataset of strings, labels of integers, should not exists.", () => {
    const model = new Model();
    model.setChartData({
      dataset: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
      labels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    });
    const data = model.getChartData();
    mount(<TemperatureGraphView chartData={data} />);
    cy.get("#graph").should("not.exist");
  });
});
