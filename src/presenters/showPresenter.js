import React from "react";
import { BrowserRouter, Route, Routes, Outlet, Navigate } from 'react-router-dom';
import TemperatureView from "../views/temperatureView";
import TemperatureGraphView from "../views/temperatureGraphView";
import SidebarView from "../views/sidebarView";

function ShowPresenter(props) {
    const [temper, setTemper] = React.useState(props.model.temperature);
    const [dateTime, setDateTime] = React.useState(props.model.timestamp);
    const [chartData, setChartData] = React.useState(props.model.chartData);

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
            <BrowserRouter>
            <SidebarView />
                <Routes>
                    <Route path="/" element={<Outlet/>}>
                        <Route path="" element={<Navigate to="/today" replace/>}></Route>
                        <Route index path="today" element={<TemperatureView temperature={temper} timestamp={dateTime} />}/>
                        <Route path="graph" element={<TemperatureGraphView chartData={chartData} />}/>
                    </Route>
                </Routes>
            </BrowserRouter></>
    );
}

export default ShowPresenter;
