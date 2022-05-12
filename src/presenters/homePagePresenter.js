import React from "react";
import TemperatureView from "../views/temperatureView";
import TemperatureGraphView from "../views/temperatureGraphView";

function HomePagePresenter(props) {
  const [temper, setTemper] = React.useState(props.model.temperature);
  const [dateTime, setDateTime] = React.useState(props.model.timestamp);
  const [chartData, setChartData] = React.useState(props.model.chartData);

  React.useEffect(() => {
    const interval = setInterval(() => {
        props.model.getLatest();
        props.model.getLatests();
      props.model.addObserver(() => {
        setTemper(props.model.temperature);
        setDateTime(props.model.timestamp);
        setChartData(props.model.chartData);
      })
      console.log(props.model);
      setTemper(props.model.temperature);
    }, 5000);


    return () => clearInterval(interval);
  }, [props.model, temper]);

  return (
    <>
      <TemperatureView temperature={temper} timestamp={dateTime} />
      <TemperatureGraphView chartData={chartData} />
    </>
  );
}

export default HomePagePresenter;
