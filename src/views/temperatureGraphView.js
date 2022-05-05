// eslint-disable-next-line
import {Chart as chartJS} from 'chart.js/auto' 
import { Line } from 'react-chartjs-2'

function TemperatureGraphView(props) {
    return (
        <div style = {{width:400}}>
            <Line
            data={{
                labels: ["29/4", "30/4","1/5","2/5","3/5","4/5","5/5"],
                datasets:[{
                    label: 'Temperature',
                    data: props.data,
                    borderColor: [
                        'rgba(0, 0, 0, 0.6)'
                    ],
                    //fill: false,
                    borderWidth: 4,
                    tension: 0.1,
                    pointStyle: 'circle',
                }]
            }}
            height={400}
            width={600}
            options = {{
                //Make the size of graph to the same as container
                responsive: true,
                plugins: {
                    title: {display: true, 
                        text: "The Previous Temperature was:" 
                    }
                },
                
                scales: {
                    x: {
                      grid: {
                        display: false,
                      },
                      title: {
                          display:true,
                          text:'Day of the month'
                      }
                    },
                    y:{
                        grid: {
                            display: false,
                        },
                        ticks:{
                            callback: function(value, index, ticks){
                                return value+"°c";
                            },
                        },
                        title: {
                            display:true,
                            text:'Temperature'
                        }
                         
                    }
                } 
            }}
            
            />
        </div>
    );
}

export default TemperatureGraphView;