function TemperatureView(props) {
    return (
        <div className="HomePage">
            <div className="TemperaturePosition">
                <p className="TemperatureHeader">
                    The current temperature is: 
                </p>
                    {typeof(props.timestamp) === "string" && 
                        <p  id='timestamp' 
                            className="Timestamp">
                            Last updated: {props.timestamp}
                        </p>
                    }
                {typeof(props.temperature) === "number" && 
                    !isNaN(props.temperature) && 
                    <p  id='temperature' 
                        className="Temperature">
                            {props.temperature}°C
                    </p>
                }
            </div>
        </div>
    );
}

export default TemperatureView;
