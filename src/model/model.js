/**
 * Model saves all data associated with the app. Eg username, score, questions.
 */
class Model {

    constructor(){

        this.picture = null;

        //observers
        this.observers = [];
        this.loggedIn = false;
    }
    //____________observers_________________
    addObserver(callback){
        this.observers = [...this.observers, callback];
    }

    removeObserver(callback){
        this.observers = this.observers.filter(x => x !== callback)
    }

    notifyObservers(){
        this.observers.forEach(cb => { try { cb(); } catch (error) {  } })
    }
    

    //____________For model_________________
    setPicture(pic){
        this.picture = pic;
        this.notifyObservers();
    }

    getPicture(){
        Source.searchPicture().then(elem => this.setPicture(elem));
    }
}
