import React from "react"
import TemperatureView from "../views/temperatureView"

function HomePagePresenter(props){
    const [temper, setTemper] = React.useState(props.model.temperature)
    const [dateTime, setDateTime] = React.useState(props.model.timeStamp)


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