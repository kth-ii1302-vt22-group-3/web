// eslint-disable-next-line
import { Chart as chartJS } from "chart.js/auto";
import { Line } from "react-chartjs-2";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function chartOptions() {
  return {
    responsive: true,
    plugins: {
      title: { display: true, text: "The Previous Temperature was:" },
    },

    scales: {
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
    },
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

function TemperatureGraphView(props) {
  return (
    <div style={{ width: 1000 }}>
      <div>Select Interval:</div>
      <DatePicker
        selected={props.startDate}
        onChange={props.onChange}
        startDate={props.startDate}
        endDate={props.endDate}
        maxDate={new Date()}
        selectsRange
      />
      <Line
        id="graph"
        data={chartData(props.chartData)}
        height={500}
        width={1000}
        options={chartOptions()}
      />
    </div>
  );
}

export default TemperatureGraphView;
