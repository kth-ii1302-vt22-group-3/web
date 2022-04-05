
function HomePagePresenter(props){
    const [dishes, setDishes]=React.useState(props.model.dishes);
    const [number, setNumber]=React.useState(props.model.numberOfGuests);
    const [username, setUsername]=React.useState(props.model.username);

    React.useEffect( function(){
        function obs(){
            setUsername(props.model.username)
            setNumber(props.model.numberOfGuests)
            setDishes(props.model.dishes);}
        props.model.addObserver(obs);                               // 1. subscribe
        return function(){ props.model.removeObserver(obs);}        // 2.unsubscribe
    }, []
    )

    return <HomePageView persons={number}
						startQuiz={()=>{props.model.startNewQuiz()}}
                        onSignOut = {() => props.model.signOut()}
                        areWeLoggedIn = {() => props.model.areWeLoggedIn()}
                         username={username}
                         clearError = {()=>props.model.resetError()}
            />
}
