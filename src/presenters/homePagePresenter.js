import React from "react"
import TemperatureView from "../views/temperatureView"

function HomePagePresenter(props){
    const [temper, setTemper] = React.useState(props.model.temperature)
    const [dateTime, setDateTime] = React.useState(props.model.timestamp)


    return(
        <>
            <TemperatureView 
                temperature = {temper}
                timestamp = {dateTime}
            />
        </>
    )
}

export default HomePagePresenter