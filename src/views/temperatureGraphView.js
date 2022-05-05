// eslint-disable-next-line
import { Chart as chartJS } from "chart.js/auto";
import { Line } from "react-chartjs-2";

function chartOptions(){
    return {
        //Make the size of graph to the same as container
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
              callback: function (value, index, ticks) {
                return value + "°c";
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

function TemperatureGraphView(props) {
    //const{labels, dataset} = props.chartData
  
    const chartData = {
    labels: props.labels,
    datasets: [
      {
        label: "Temperature",
        data: props.dataset,
        borderColor: ["rgba(0, 0, 0, 0.6)"],
        //fill: false,
        borderWidth: 4,
        tension: 0.1,
        pointStyle: "circle",
      },
    ],
  };
  
  return (
    <div style={{ width: 600 }}>
      <Line data={chartData} height={400} width={600} options={chartOptions()} />
    </div>
  );
}

export default TemperatureGraphView;
