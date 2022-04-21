import React from "react"
import TemperatureView from "../views/temperatureView"

function HomePagePresenter(props){
    const [temper, setTemper] = React.useState(props.model.temperature)
    const [dateTime, setDateTime] = React.useState(props.model.timeStamp)

    React.useEffect(function(){
        function obs(){
                setTemper(props.model.temperature)
                setDateTime(props.model.timeStamp)
                props.model.addObserver(obs);
                return function(){
                    props.model.removeObserver(obs);
            }
        }
    }, []
    
    )

    return(
        <>
            <TemperatureView 
                temperature = {temper}
                timeStamp = {dateTime}
            />
        </>
    )
}

export default HomePagePresenter