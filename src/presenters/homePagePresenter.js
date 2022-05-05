import React from "react";
import TemperatureView from "../views/temperatureView";
import TemperatureGraphView from "../views/temperatureGraphView";

function HomePagePresenter(props) {
  const [temper, setTemper] = React.useState(props.model.temperature);
  const [dateTime, setDateTime] = React.useState(props.model.timestamp);
  const [chartData, setChartData] = React.useState(props.model.chartData);
  
  React.useEffect(
    function () {
      // add observer to model
      props.model.addObserver(function () {
        setTemper(props.model.temperature);
        setDateTime(props.model.timestamp);
        //setChartData(props.model.chartData);
      });
    },
    [props.model]
  );

  return (
    <>
      <TemperatureView temperature={temper} timestamp={dateTime} />
      <TemperatureGraphView labels={chartData.labels} dataset={chartData.dataset}/>
    </>
  );
}

export default HomePagePresenter;
