
const App= (props)=>(
<div className="flexParent">
  <div className="header"><HeaderPresenter model={props.model}/></div>
  <Show hash="#quiz"><HighScorePresenter model={props.model} /></Show>
  <Show hash="#login"><LoginPresenter model={props.model} /></Show>
  <Show hash="#profile"><ProfilePresenter model={props.model} /></Show>
  <Show hash="#signup"><SignupPresenter model={props.model} /></Show>
  <Show hash="#home"><HomePagePresenter model={props.model} /></Show>
  <Show hash="#forgotPassword"><ForgotPasswordPresenter model={props.model} /></Show>
  <Show hash="#settings"><SettingsPresenter model={props.model} /></Show>
  <Show hash="#quiz"><QuizPresenter model={props.model} /></Show>
</div>)


/* set the default user view to the home view, eg when app starts*/
function defaultRoute(){
     if(!["#home", "#settings", "#signup", "#login", "#profile", "#forgotPassword"]
     .find((knownRoute)=> window.location.hash === knownRoute)
     ) window.location.hash="#home";
 }

defaultRoute();
