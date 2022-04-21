import ApiCall from "../api/apiCall"; 
class Model{

    constructor(){
        //observers
        this.observers = [];

        //HomePageView
        this.temperature = 25;
        this.timeStamp = "1970-01-01";
        
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

    setTimeStamp(timeStamp){
        this.timeStamp = timeStamp;
    }

    setLatest(result){
        console.log(result);
        this.setTemperature(result["value"]);
        this.setTimeStamp(result["timestamp"]);
        this.notifyObservers();
    }

    getLatest(){
        ApiCall.getTemperature({
            params: "/temperature/current"
        }).then(e => this.setLatest(e))
    }

}

export default Model