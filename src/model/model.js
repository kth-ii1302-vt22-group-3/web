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
}

export default Model