import ApiCall from "../api/apiCall";

class Model {
  //__________Constructor_______________
  constructor() {
    //Current Temperature
    this.temperature = 0;
    this.timestamp = "1970-01-01 00:00:00";

    //Collection Temperatures
    this.temperatures = [];

    // Chart Data
    this.labels = [];
    this.dataset = [];
    this.chartData = {
      labels: this.labels,
      dataset: this.dataset,
    };
    this.endDate = this.setEndDate();
    this.startDate = this.setStartDate(this.endDate);

    //observers
    this.observers = [];
  }

  //____________Getters_________________

  getTemperature() {
    return this.temperature;
  }

  getTimestamp() {
    return this.timestamp;
  }

  getTemperatures() {
    return this.temperatures;
  }

  getChartData() {
    return this.chartData;
  }

  //____________Setters_________________
  setTemperature(temperature) {
    this.temperature = temperature;
  }

  setTimestamp(timestamp) {
    this.timestamp = timestamp;
  }

  setCurrentTemperature(result) {
    this.setTemperature(result["value"]);
    const date = result["timestamp"].split("T")[0];
    let time = result["timestamp"].split("T")[1];
    time = time.slice(0, time.length - 5);
    this.setTimestamp(`${date} ${time}`);
    this.notifyObservers();
  }

  setTemperatures(temperatures) {
    this.temperatures = temperatures;
    this.notifyObservers();
  }

  setChartData(chartData) {
    this.chartData = chartData;
    this.notifyObservers();
  }

  setEndDate() {
    const endDate = new Date();
    endDate.setHours(23);
    endDate.setMinutes(59);
    endDate.setSeconds(59);
    return endDate;
  }

  setStartDate(endDate) {
    const startDate = new Date(
      endDate.getFullYear(),
      endDate.getMonth(),
      endDate.getDate() - 7
    );
    return startDate;
  }

  setChosenGraphRange() {
    let preRange = this.getTemperatures();
    preRange.forEach(({ timestamp, value }) => {
      if (
        new Date(timestamp).getDate() <= this.endDate.getDate() &&
        new Date(timestamp).getDate() >= this.startDate.getDate()
      ) {
        const date = timestamp.split("T")[0].split("-");

        const time = timestamp.split("T")[1];
        this.labels.push(
          `${date[2]}/${date[1]} ${time.slice(0, time.length - 5)}`
        );
        this.dataset.push(value);
      }
    });
  }

  //______________API___________________

  retrieveCurrentTemperature() {
    ApiCall.getTemperature({
      value: this.temperature,
      timestamp: this.timeStamp,
    }).then((e) => this.setCurrentTemperature(e));
  }

  retrieveCollectionOfTemperatures() {
    this.labels = [];
    this.dataset = [];
    ApiCall.getTemperatures({
      values: this.temperatures,
    }).then((e) => {
      this.setTemperatures(e);
      this.setChosenGraphRange();
      this.setChartData({
        labels: this.labels,
        dataset: this.dataset,
      });
    });
  }

  setChosenDate(start, end) {
    this.startDate = start;
    console.log(start);
    this.endDate = end;
    console.log(end);

    this.labels = [];
    this.dataset = [];
    if (this.endDate != null) {
      this.setChosenGraphRange();
    }
    this.setChartData({
      labels: this.labels,
      dataset: this.dataset,
    });
    console.log(this.chartData);
    this.notifyObservers();
  }

  //___________observers________________

  addObserver(callback) {
    this.observers = [...this.observers, callback];
  }

  removeObserver(callback) {
    this.observers = this.observers.filter((x) => x !== callback);
  }

  notifyObservers() {
    this.observers.forEach((cb) => {
      try {
        cb();
      } catch (error) {}
    });
  }
}

export default Model;
