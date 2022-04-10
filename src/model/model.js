/**
 * QuizModel saves all data associated with the app. Eg username, score, questions.
 */
class QuizModel {

    constructor() {

        //observers
        this.observers = [];
        this.loggedIn = false;

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



    //____________for firebase db & auth_________________
    authStateListener() {

        // [START auth_state_listener]
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                this.authUser = user;

                this.uid=user.uid;

                this.getFirebaseUser( );
            } else {
                // User is signed out
                this.authUser = null;

            }
        });
    }

    areWeLoggedIn(){
        return this.username !== "Anonymous user";
    }


    getFirebaseUser(){
        const dbRef = this.db.ref();
        dbRef.child("users").child(this.uid).get().then((snapshot) => {
            if (snapshot.exists()) {
                this.username = snapshot.val().username;
                this.category = snapshot.val().categorySettings;
                this.difficulty = snapshot.val().difficultySettings;
                this.personalHighScore = snapshot.val().personalHighScore;
                this.numberOfQuestions = snapshot.val().numberOfQuestions;
                this.currentAvatar = snapshot.val().avatar;
                this.avatarType = snapshot.val().avatarType;
                this.avatarSeed = snapshot.val().avatarSeed;


                this.notifyObservers();
            } else {
    }
        }).catch((error) => {
        });
}
    writeUserData(userId) {
        if(userId == null){

}        else{
        firebase.database().ref('users/' + userId).set({
          username: this.username,
          email: this.email,
          personalHighScore: this.personalHighScore,
          numberOfQuestions: this.numberOfQuestions,
          categorySettings:this.category,
          difficultySettings:this.difficulty,
          avatar: this.currentAvatar,
          avatarType: this.avatarType,
          avatarSeed: this.avatarSeed
        });

        }
    }

    writeNewPost(data) {
        var updates = {};
        updates['/users/123' + '/email'] = data;
      
        return firebase.database().ref().update(updates);
    }

        }
    }
}
