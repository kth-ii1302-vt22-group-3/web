import React from "react";
import TemperatureView from "../views/temperatureView";
import TemperatureGraphView from "../views/temperatureGraphView";

function HomePagePresenter(props) {
  const [temper, setTemper] = React.useState(props.model.temperature);
  const [dateTime, setDateTime] = React.useState(props.model.timestamp);
  const [chartData, setChartData] = React.useState(props.model.chartData);
  
  const [startDate, setStartDate] = React.useState(new Date());
  const [endDate, setEndDate] = React.useState(null);


  React.useEffect(
    function () {
      // add observer to model
      props.model.addObserver(function () {
        setTemper(props.model.temperature);
        setDateTime(props.model.timestamp);
        setChartData(props.model.chartData);
      });
    },
    [props.model]
  );

  return (
    <>
      <TemperatureView temperature={temper} timestamp={dateTime} />
      <TemperatureGraphView chartData={chartData}
      selected={startDate}
      onChange={(dates) => {
        const [start, end] = dates;
        setStartDate(start);
        setEndDate(end);
        props.model.setChosenDate(start, end);
      }}
      startDate={startDate}
      endDate={endDate} />
    </>
  );
}

export default HomePagePresenter;
