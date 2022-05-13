import React from "react";
import TemperatureView from "../views/temperatureView";
import TemperatureGraphView from "../views/temperatureGraphView";
import SidebarView from "../views/sidebarView";

function HomePagePresenter(props) {
  const [temper, setTemper] = React.useState(props.model.temperature);
  const [dateTime, setDateTime] = React.useState(props.model.timestamp);
  const [chartData, setChartData] = React.useState(props.model.chartData);
  
  const [startDate, setStartDate] = React.useState(props.model.startDate);
  const [endDate, setEndDate] = React.useState(props.model.endDate);


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
      <SidebarView />
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
