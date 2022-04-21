
function TemperatureView(props) {
    return (
        <div className="HomePage">
            <div className="Centered">
                <p className="Header">The current temperature is: </p>
                <p className="TimeStamp">Last updated: {props.timeStamp}</p>
                <p className="Temperature">{props.temperature}°c</p>
            </div>
        </div>
    );
}

export default TemperatureView;