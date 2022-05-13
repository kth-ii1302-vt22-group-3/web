import { Link } from "react-router-dom";

function SidebarView(props) {
    return ( 
        <div className="sidebar">

            <Link to="/today">
            <p>
                <button id="currentTemperature" 
                        className="sidebarButton activePageButton" 
                        onClick={e=> activeCurrentTemperature()}>
                    Current Temperature
                </button></p>
            </Link>
            <Link to="/graph">
            <p>
                <button id="temperatureGraph" 
                        className="sidebarButton hover" 
                        onClick={e=> activeTemperatureGraph()}>
                    Temperature Graph
                </button></p>
            </Link>

            
            <p>
                <button id="currentHumidity" 
                        className="hidden"
                        onClick={e=> window.location.hash="#currentHumidity"}>
                    Current Humidity
                </button></p> 
            <p>
                <button id="humidityGraph" 
                        className="hidden" 
                        onClick={e=> window.location.hash="#humidityGraph"}>
                    Humidity Graph
                </button></p>
        </div>
    );
}

function activeCurrentTemperature(){
    var elementActive = document.getElementById("currentTemperature");
    elementActive.classList.add("activePageButton");
    elementActive.classList.remove("hover");
    var elementNotActive = document.getElementById("temperatureGraph");
    elementNotActive.classList.remove("activePageButton");
    elementNotActive.classList.add("hover");
}

function activeTemperatureGraph(){
    var elementActive = document.getElementById("temperatureGraph");
    elementActive.classList.add("activePageButton");
    elementActive.classList.remove("hover");
    var elementNotActive = document.getElementById("currentTemperature");
    elementNotActive.classList.remove("activePageButton");
    elementNotActive.classList.add("hover");
}

export default SidebarView; 