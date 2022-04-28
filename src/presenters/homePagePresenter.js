import React from "react";
import TemperatureView from "../views/temperatureView";

function HomePagePresenter(props) {
  const [temper, setTemper] = React.useState(0);
  const [dateTime, setDateTime] = React.useState("YYYYMMDDHHMMSS");

  React.useEffect(
    function () {
      // add observer to model
      props.model.addObserver(function () {
        setTemper(props.model.temperature);
        setDateTime(props.model.timeStamp);
      });
    },
    [props.model.temperature, props.model.timeStamp]
  );

  return (
    <>
    {/* TODO Add loading */}
      {temper !== 0 && (
        <TemperatureView temperature={temper} timeStamp={dateTime} />
      )}
    </>
  );
}

export default HomePagePresenter;