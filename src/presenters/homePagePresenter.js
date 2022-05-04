import React from "react";
import TemperatureView from "../views/temperatureView";

function HomePagePresenter(props) {
  const [temper, setTemper] = React.useState(props.model.temperature);
  const [dateTime, setDateTime] = React.useState(props.model.timestamp);
  
  React.useEffect(
    function () {
      // add observer to model
      props.model.addObserver(function () {
        setTemper(props.model.temperature);
        setDateTime(props.model.timestamp);
      });
    },
    [props.model]
  );

  return (
    <>
      <TemperatureView temperature={temper} timestamp={dateTime} />
    </>
  );
}

export default HomePagePresenter;
