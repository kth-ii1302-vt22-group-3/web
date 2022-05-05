import ApiCall from "../api/apiCall";

class Model{

    constructor(){
        //observers
        this.observers = [];

        //HomePageView
        this.temperature = 0;
        this.temperatures = [];
        this.timestamp = "1970-01-01 00:00:00";
        this.chartData = {labels: ["29/4", "30/4", "1/5", "2/5", "3/5", "4/5", "5/5"] ,
            dataset: [15, 12, 22, 13, 10 , 9, 11]} 
    }

    //____________observers_________________
    addObserver(callback) {
        this.observers = [...this.observers, callback];
    }

    removeObserver(callback) {
        this.observers = this.observers.filter(x => x !== callback)
    }

    notifyObservers() {
        this.observers.forEach(cb => { try { cb(); } catch (error) {  } })
    }

    //____________HomePage_________________
    setTemperature(temperature){
        this.temperature = temperature;
    }

    setTimestamp(timestamp){
        this.timestamp = timestamp;
    }

    setChartData(chartData){
        this.chartData = chartData;
    }

    setLatest(result){
        this.setTemperature(result["value"]);
        this.setTimestamp(result["timestamp"]);
        this.notifyObservers();
    }

    getLatest(){
        ApiCall.getTemperature({
            value: this.temperature,
            timestamp: this.timeStamp 
        }).then(e => this.setLatest(e))
    }

    setTemperatures(temperatures){
        this.temperatures = temperatures;
        this.notifyObservers();
    }

    getLatests() {
        ApiCall.getTemperatures({
            values: this.temperatures,
        }).then(e => {
            this.setTemperatures(e);
        });
    }

    getTemperatures(){
        return this.temperatures;
    }

}

export default Model
