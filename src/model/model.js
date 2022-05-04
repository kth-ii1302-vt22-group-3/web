import ApiCall from "../api/apiCall";

class Model{

    constructor(){
        //observers
        this.observers = [];

        //HomePageView
        this.temperature = 0;
        this.timestamp = "1970-01-01 00:00:00";
      
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

}

export default Model
