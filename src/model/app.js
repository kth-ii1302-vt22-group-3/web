
const App= (props)=>(
<div className="flexParent">
  <Show hash="#home"><HomePagePresenter model={props.model} /></Show>
</div>)


/* set the default user view to the home view, eg when app starts*/
function defaultRoute(){
     if(!["#home"]
     .find((knownRoute)=> window.location.hash === knownRoute)
     ) window.location.hash="#home";
 }

defaultRoute();
