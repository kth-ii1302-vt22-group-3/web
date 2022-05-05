
function TemperatureView(props) {
    return (
        <div className="HomePage">
            <div className="Centered">
                <p className="Header">The current temperature is: </p>
                <p id='timestamp' className="Timestamp">Last updated: {props.timestamp}</p>
                <p id='temperature' className="Temperature">{props.temperature}°c</p>
            </div>
        </div>
    );
}

export default TemperatureView;