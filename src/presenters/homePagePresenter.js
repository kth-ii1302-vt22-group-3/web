
function HomePagePresenter(props){
    const [picture, setPicture]=React.useState(props.model.picture);

    React.useEffect(function(){
        function obs(){
            setPicture(props.model.picture); 
        }
        props.model.addObserver(obs);                               // 1. subscribe
        return function(){ props.model.removeObserver(obs);}        // 2.unsubscribe
    }, [])

    return <HomePageView picture={picture}/>
}
