import React from "react";
import {
  BrowserRouter,
  Route,
  Routes,
  Outlet,
  Navigate,
} from "react-router-dom";
import TemperatureView from "../views/temperatureView";
import TemperatureGraphView from "../views/temperatureGraphView";
import SidebarView from "../views/sidebarView";

function ShowPresenter(props) {
  const [temper, setTemper] = React.useState(props.model.temperature);
  const [dateTime, setDateTime] = React.useState(props.model.timestamp);
  const [chartData, setChartData] = React.useState(props.model.chartData);
  const [startDate, setStartDate] = React.useState(props.model.startDate);
  const [endDate, setEndDate] = React.useState(props.model.endDate);

  React.useEffect(() => {
    const interval = setInterval(() => {
      props.model.getLatest();
      props.model.getLatests();
      // add observer to model
      props.model.addObserver(function () {
        setTemper(props.model.temperature);
        setDateTime(props.model.timestamp);
        setChartData(props.model.chartData);
      });
      console.log(props.model);
      setTemper(props.model.temperature);
    }, 5000);

    return () => clearInterval(interval);
  }, [props.model, temper]);

  return (
    <>
      <BrowserRouter>
        <SidebarView />
        <Routes>
          <Route path="/" element={<Outlet />}>
            <Route path="" element={<Navigate to="/today" replace />}></Route>
            <Route
              index
              path="today"
              element={
                <TemperatureView temperature={temper} timestamp={dateTime} />
              }
            />
            <Route
              path="graph"
              element={
                <TemperatureGraphView
                  chartData={chartData}
                  selected={startDate}
                  onChange={(dates) => {
                    const [start, end] = dates;
                    setStartDate(start);
                    setEndDate(end);
                    props.model.setChosenDate(start, end);
                  }}
                  startDate={startDate}
                  endDate={endDate}
                />
              }
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default ShowPresenter;
