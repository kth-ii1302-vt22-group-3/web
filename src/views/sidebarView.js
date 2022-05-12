function SidebarView(props) {
    return ( 
        <div className="sidebar">
            <p>
                <button id="currentTemperature" 
                        className="sidebarButton activePageButton" 
                        onClick={e=> {activeCurrentTemperature(); window.location.hash="#currentTemperature"}}>
                    Current Temperature
                </button></p>
            <p>
                <button id="temperatureGraph" 
                        className="sidebarButton hover" 
                        onClick={e=> {activeTemperatureGraph(); window.location.hash="#temperatureGraph"}}>
                    Temperature Graph
                </button></p>
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