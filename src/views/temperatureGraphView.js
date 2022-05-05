import Chart from 'chart.js/auto'
import { Line } from 'react-chartjs-2'

function TemperatureGraphView(props) {
    return (
        <div>
            <Line
            data={{
                labels: ["29/4", "30/4","1/5","2/5","3/5","4/5","5/5"],
                datasets:[{
                    label: 'Temperature',
                    data: props.data,
                    borderColor: [
                        'rgba(75, 192, 192, 0.6)'
                    ],
                    //fill: false,
                    borderWidth: 4,
                    tension: 0.1
                }]
            }}
            height={400}
            width={600}
            />
        </div>
    );
}

export default TemperatureGraphView;