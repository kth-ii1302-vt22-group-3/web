/**
 * QuizModel saves all data associated with the app. Eg username, score, questions.
 */
class QuizModel {

    constructor() {

        //observers
        this.observers = [];
        this.loggedIn = false;

        //from settingsView
        this.category = "Random";
        this.categoryListWithID = null;
        this.categoryList = [];
        this.categoryID = 0;
        this.difficulty = "Random";
        this.numberOfQuestions = 3;

        //from profile, login
        this.authUser = null; // Used to set in authStateListener
        this.username = "Anonymous user";
        this.toBeUsername = null;
        this.email = null;
        this.password = null;
        this.confirmPassword = null;
        this.currentAvatar=null;

        this.avatarType = "bottts";
        this.avatarSeed = "";
        this.googleProvider = null;

        this.resetEmail = null; 

        //from quizView
        this.highScores = [];
        this.currentScore = 0;
        this.questionList = [];                     //list of the objects from api call
        this.currentQuestionIndex = 0;              //step through questionList from 0 to numberOfQuestions
        this.personalHighScore = 0;
        this.errorMessage = "";

        //Firebase
        this.db=firebase.database();

        this.authStateListener(); // necessary to run the method once to activate listener 
        this.notifyObservers();
        this.setCurrentAvatar();
        this.setGeneratedAvatar(this.avatarType, this.avatarSeed);
        this.setNumberOfQuestions(this.numberOfQuestions);

        this.categoryHighScore = [{category: 0, highScores: [0], owner: [""]},{category: 9, highScores: [0], owner: [""]},
        {category: 10, highScores: [0], owner: [""]},{category: 11, highScores: [0], owner: [""]},{category: 12, highScores: [0], owner: [""]},{category: 13, highScores: [0], owner: [""]},{category: 14, highScores: [0], owner: [""]},
        {category: 15, highScores: [0], owner: [""]},{category: 16, highScores: [0], owner: [""]},{category: 17, highScores: [0], owner: [""]},{category: 18, highScores: [0], owner: [""]},{category: 19, highScores: [0], owner: [""]},
        {category: 20, highScores: [0], owner: [""]},{category: 21, highScores: [0], owner: [""]},{category: 22, highScores: [0], owner: [""]},{category: 23, highScores: [0], owner: [""]},{category: 24, highScores: [0], owner: [""]},
        {category: 25, highScores: [0], owner: [""]},{category: 26, highScores: [0], owner: [""]},{category: 27, highScores: [0], owner: [""]},{category: 28, highScores: [0], owner: [""]},{category: 29, highScores: [0], owner: [""]},
        {category: 30, highScores: [0], owner: [""]},{category: 31, highScores: [0], owner: [""]},{category: 32, highScores: [0], owner: [""]}];

    }


    updatePassword(password){
        this.password = password;
        this.notifyObservers();
    }
    updateConfurmPassword(password){
        this.confirmPassword = password;
        this.notifyObservers();
    }

    setNewEmail(email){
        this.email = email;
        this.notifyObservers();
    }

    updateToBeUsername(username){
        this.toBeUsername = username;
        this.notifyObservers();
    }
    updateUsername(username){
        this.username = username;
        this.notifyObservers();
    }

    firebaseSetCategoryHighScore(highScoreList){
        this.categoryHighScore = highScoreList;

    }

    //__________score page_____________

    setCategoryHighScore(){


        if (this.currentQuestionIndex >= this.numberOfQuestions-1) {
            if(this.personalHighScore < this.currentScore){
                this.personalHighScore = this.currentScore;
            }
            if (this.categoryID == null || this.categoryID < 9 || this.categoryID > 32) {
                if (this.categoryHighScore[0].highScores[0] <= this.currentScore) {
                    this.categoryHighScore[0].highScores[0] = this.currentScore;
                    this.categoryHighScore[0].owner[0] = this.username;
                }
            } else {
                this.categoryHighScore.map(e => {
                    if (e.category === this.categoryID) {
                        if (this.currentScore >= e.highScores[0])
                            e.highScores[0] = this.currentScore;

                        e.owner[0] = this.username;
                    }
                })
            }
            this.notifyObservers();
        }
    }

    //__________settings page_____________
    resetSettings() {
        this.categoryID = 0;
        this.category = "Random";
        this.difficulty = "Random";
        this.numberOfQuestions = 10;
        this.notifyObservers();
    }

    setDifficulty(diffLvl) {
        if (diffLvl === "-- Choose Difficulty Level--" || diffLvl === "Random")
            this.difficulty = "Random";
        else
            this.difficulty = diffLvl;
    }

    getCategoryList() {
        CategorySource.searchCategory()
            .then(e => this.categoryListWithID = e.trivia_categories)
            .then(() => this.categoryList = this.categoryListWithID.map(e => e.name))
            .then(() => this.notifyObservers());
    }

    setCategory(categoryName) {
        if (categoryName === "-- Choose Category --" || categoryName === "Random") {
            this.category = "Random";
            this.categoryID = 0;
        }
        else if (categoryName === null){
            //dont remove, fixes error on start up. Check later if necessary
        }
        else {
            this.category = categoryName;
            this.categoryID = this.categoryListWithID.filter(e => e.name === categoryName)[0].id;
          }

    }

    setNumberOfQuestions(x) {
        (Number.isInteger(x)) ? ((x > 0) ?
            (this.numberOfQuestions = x)
            : function () { throw new Error("questions should be > 0") }())
            : function () { throw new Error("questions should be an integer") }();
        this.notifyObservers();
    }


    //__________profile page_____________
    setCurrentAvatarType(newAvatarType) {
        this.avatarType = newAvatarType;
        this.notifyObservers();
    }

    setCurrentAvatarSeed(newAvatarSeed) {
        this.avatarSeed = newAvatarSeed;
        this.notifyObservers();
    }

    setCurrentAvatar(){
        const avatarSource = "https://avatars.dicebear.com/api/";
        this.currentAvatar=avatarSource+this.avatarType+"/"+this.avatarSeed+".svg";
        this.notifyObservers();
    }

    setGeneratedAvatar(type, seed){
        const avatarSource = "https://avatars.dicebear.com/api/";
        this.generatedAvatar= avatarSource+type+"/"+seed+".svg";
        this.notifyObservers();
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

        }
        else{
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
// signout().
    async signOut() {
        // [START auth_sign_out]
        try {
            this.uid = null;
            await firebase.auth().signOut()
            this.username = "Anonymous user"
            this.category = "Random"
            this.difficulty = "Random"
            this.avatarType = "bottts";
            this.avatarSeed = "";
            this.personalHighScore = 0;
            this.setCurrentAvatar();
            this.uid = null;

        }
        catch{
                // An error happened.
            };
        this.notifyObservers();
    }

    createUserWithEmailAndPassword(email, password){

        if(!this.toBeUsername){
            this.errorMessage = "Username is missing";
            this.notifyObservers();
            return;
        } else if(this.confirmPassword!==this.password){
            this.errorMessage = "Password not equal";
            this.notifyObservers();
            return;
        }
        else{

            return firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(userCredential => {
            // Signed in
            var user = userCredential.user;
            
            
            window.location.hash = "#profile"
            this.updateUsername(this.toBeUsername);
            this.updateToBeUsername(null);

        }).catch((error) => {
            this.errorCode = error.code;
            this.errorMessage = error.message;
            this.notifyObservers();
        });
    }
    }
    
    signInWithEmailAndPassword(email, password){
        return firebase.auth().signInWithEmailAndPassword(email, password)
            .then((userCredential) => {
                // Signed in
                var user = userCredential.user;
                window.location.hash="#home"
            
            }).then(response=> response.status === 200 ? response :
                doThrow(new Error("Status was: " + response.statusText + " " + response.status)))
            .then(response => {response.json(); 
            }).catch((error) => {
                this.errorCode = error.code;
                this.errorMessage = error.message;
                this.notifyObservers();
            });
        }

    sendResetPasswordEmail(email){
    firebase.auth().sendPasswordResetEmail(email)
    .then(() => {
        this.errorMessage = 'A reset link has been sent to your email.'; 
        this.notifyObservers();
        // Password reset email sent!
    })
    .catch((error) => {
        this.errorCode = error.code;
        this.errorMessage = error.message;
        this.notifyObservers(); 
        // ..
    });
    }

    resetError(){
        this.errorMessage = "";
        this.notifyObservers();
    }

    setResetEmail(email){
        this.resetEmail = email;
        this.notifyObservers();
    }

    //__________Quiz page_________
    increaseQuestionIndex() {
        this.currentQuestionIndex += 1;
        this.notifyObservers();
    }

    resetQuiz() {
        this.questionList = [];
        this.currentQuestionIndex = 0;
        this.currentScore = 0;
        this.notifyObservers();
    }

    startNewQuiz() {
        this.currentQuestionIndex = 0;
        this.currentScore = 0;
        this.getQuizQuestions();
        window.location.hash = "#quiz";
    }

    
    //make API call and save result to questionList
    getQuizQuestions() {
        if (this.categoryID === null && this.difficulty === "Random") {
            QuizSource.searchQuestions({
                amount: this.numberOfQuestions,
                type: "multiple",
            })
                .then(e => this.setQuestionList(e));

        }
        else if (this.category === null) {          //todo can this even happen?
            QuizSource.searchQuestions({
                amount: this.numberOfQuestions,
                type: "multiple",
                difficulty: this.difficulty.toLowerCase()
            })
                .then(e => this.setQuestionList(e));
        }
        else if(this.difficulty === null){
                QuizSource.searchQuestions({
                    amount: this.numberOfQuestions,
                    category: this.categoryID,
                    type: "multiple",
                  }).then(e => this.setQuestionList(e));
        }
        else if(this.difficulty === "Random"){
            QuizSource.searchQuestions({
                amount: this.numberOfQuestions,
                category: this.categoryID,
                type: "multiple",
            }).then(e => this.setQuestionList(e));
        }
        else {
            QuizSource.searchQuestions({
                amount: this.numberOfQuestions,
                category: this.categoryID,
                type: "multiple",
                difficulty: this.difficulty.toLowerCase()
            })
                .then(e => this.setQuestionList(e));
        }
    }

    setQuestionList(arr) {
        this.questionList = arr;
        this.notifyObservers();
        this.correctStartCheck = "yes";
    }

    setScore(score){
        this.currentScore = score;
        var hold = this.currentScore;
        hold = hold+1;
        this.notifyObservers();}

}
