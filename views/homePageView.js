function HomePageView(props){  
    return (      
        <div className="mainContent center startMenu">
            <div><a><img className="logoIconHomePage" src="https://yellowishsuperability.vildsvinet.repl.co/Quizzerooo.png" alt="Logo" /></a></div>
            <p><button className="blueBackground greenHover" onClick={e=> {props.startQuiz()}} >Start Quiz</button></p>
            <p><button className="blueBackground greenHover" onClick={e=> window.location.hash="#settings" } >Quiz Settings</button></p>
            <p><button className="hideDisabled blueBackground greenHover" onClick={e=> {window.location.hash="#login"; props.clearError()} } disabled={props.areWeLoggedIn()} >Log In</button></p>
            <p><button className="hideDisabled blueBackground greenHover" onClick={e=> {window.location.hash="#signup"; props.clearError()} } disabled={props.areWeLoggedIn()} >Sign Up</button></p><div> &nbsp; </div>
            <p><button className="hideDisabled smallButton blueBackground orangeHover" onClick={e => {props.onSignOut(); window.location.hash = "#home"}} disabled={!props.areWeLoggedIn()}>Log Out</button></p>
        </div>
    );
}





