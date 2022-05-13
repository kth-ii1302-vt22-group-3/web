// eslint-disable-next-line
import { getDefaultNormalizer } from "@testing-library/react";
import { Chart as chartJS } from "chart.js/auto";
import { Line } from "react-chartjs-2";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function TemperatureGraphView(props) {
  return (
    <div className="HomePage">
      <div className="GraphPosition" style={{ width: 1000 }}>
        <p className="GraphHeader">Select Interval:</p>
        <p>{getDatePicker(props)}</p>
        <p>{getGraphLine(props)}</p>
      </div>
    </div>
  );
}

function chartOptions() {
  return {
    responsive: true,
    plugins: {
      title: { display: true, text: "The Previous Temperature was:" },
    },
    scales: getGraphScales(),
  };
}

function chartData({ labels, dataset }) {
  return {
    labels: labels,
    datasets: [
      {
        label: "Temperature",
        data: dataset,
        borderColor: ["rgba(0, 0, 0, 0.6)"],
        borderWidth: 4,
        tension: 0.1,
        pointStyle: "circle",
      },
    ],
  };
}

function getDatePicker(props){
  return (
    <DatePicker
      id="datePicker"
      selected={props.startDate}
      onChange={props.onChange}
      startDate={props.startDate}
      endDate={props.endDate}
      maxDate={new Date()}
      selectsRange
    />)
}

function getGraphLine(props){
  return (
    <Line
      id="graph"
      data={chartData(props.chartData)}
      height={500}
      width={1000}
      options={chartOptions()}
    />)
}

function getGraphScales(){
  return (
    {
      x: {
        grid: {
          display: false,
        },
        title: {
          display: true,
          text: "Day of the month",
        },
      },
      y: {
        grid: {
          display: false,
        },
        ticks: {
          callback: function (value) {
            return value + " °c";
          },
        },
        title: {
          display: true,
          text: "Temperature",
        },
      },
    }
  )
}

export default TemperatureGraphView;
