import ApiCall from "../api/apiCall";

class Model {
  constructor() {
    //observers
    this.observers = [];

    //HomePageView
    this.temperature = "";
    this.temperatures = [];
    this.timestamp = "1970-01-01 00:00:00";
    this.labels = [];
    this.dataset = [];
    this.chartData = {
      labels: this.labels,
      dataset: this.dataset,
    };
    this.endDate = new Date();
    this.endDate.setHours(23);
    this.endDate.setMinutes(59);
    this.endDate.setSeconds(59);
    this.startDate = new Date(
      this.endDate.getFullYear(),
      this.endDate.getMonth(),
      this.endDate.getDate() - 7
    );
  }

  //____________observers_________________
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

  //____________HomePage_________________
  setTemperature(temperature) {
    this.temperature = temperature;
  }

  setTimestamp(timestamp) {
    this.timestamp = timestamp;
  }

  setChartData(chartData) {
    this.chartData = chartData;
    this.notifyObservers();
  }

  setLatest(result) {
    this.setTemperature(result["value"]);
    const date = result["timestamp"].split("T")[0];
    let time = result["timestamp"].split("T")[1];
    time = time.slice(0, time.length - 5);
    this.setTimestamp(`${date} ${time}`);
    this.notifyObservers();
  }

  getLatest() {
    ApiCall.getTemperature({
      value: this.temperature,
      timestamp: this.timeStamp,
    }).then((e) => this.setLatest(e));
  }

  setTemperatures(temperatures) {
    this.temperatures = temperatures;
    this.notifyObservers();
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

  getLatests() {
    this.labels = []
    this.dataset = []
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

  getTemperatures() {
    return this.temperatures;
  }

  getTemperature() {
    return this.temperature;
  }

  getTimestamp() {
    return this.timestamp;
  }
}

export default Model;
