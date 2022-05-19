import Model from "../../src/model/model";

describe("Test case: Test the Model-component with different data", () => {
  it("Test scenario 1: View-component with empty value", () => {
    const model = null;
    expect(model).equal(null);
  });

  it("Test scenario 2: View-component with default value", () => {
    const model = new Model();
    expect(model.getTemperature()).equal(0);
    expect(model.getTimestamp()).equal("1970-01-01 00:00:00");
    expect(model.getTemperatures()).empty;
    expect(model.getChartData().dataset).empty;
    expect(model.getChartData().labels).empty;
    expect(model.getEndDate().toISOString()).equal(
      new Date(new Date().setHours(23, 59, 59, 0)).toISOString()
    );
    expect(model.getStartDate().toISOString()).equal(
      new Date(
        new Date(
          model.getEndDate().getFullYear(),
          model.getEndDate().getMonth(),
          model.getEndDate().getDate() - 7
        ).setHours(0, 0, 0, 0)
      ).toISOString()
    );
  });

  it("Test scenario 3: View-component with changed value", () => {
    const model = new Model();
    model.setTemperature(10);
    model.setTimestamp("2020-01-01 00:00:00");
    model.setTemperatures([10, 20, 30]);
    model.setChartData({
      labels: ["1", "2", "3"],
      dataset: [10, 20, 30],
    });
    model.setEndDate(new Date("2020-01-01 00:00:00"));
    model.setStartDate(new Date("2020-01-01 00:00:00"));

    expect(model.getTemperature()).equal(10);
    expect(model.getTimestamp()).equal("2020-01-01 00:00:00");
    expect(model.getTemperatures()).to.eql([10, 20, 30]);
    expect(model.getChartData().dataset).to.eql([10, 20, 30]);
    expect(model.getChartData().labels).to.eql(["1", "2", "3"]);
    expect(model.getEndDate().toISOString()).equal(
      new Date(new Date().setHours(23, 59, 59, 0)).toISOString()
    );
    expect(model.getStartDate().toISOString()).equal(
      new Date(
        new Date(
          model.getEndDate().getFullYear(),
          model.getEndDate().getMonth(),
          model.getEndDate().getDate() - 7
        ).setHours(0, 0, 0, 0)
      ).toISOString()
    );
  });
});