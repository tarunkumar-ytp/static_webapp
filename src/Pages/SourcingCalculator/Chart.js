

import React from "react";
import { Line } from "react-chartjs-2";
import Chart from 'chart.js/auto';
import './LineChart.css';

function LineChart() {
    const chartData = {
       
        labels: ["Monday", "Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"],
        datasets: [
            {
                label: "First dataset",
                data: [11, 19, 17, 14,8,5],
                fill:false,
                borderWidth:2,
                borderColor: "rgba(75,192,192,1)"
            },
        ]
    }
    return (
        <div class='col-md-6'  className="chart-container" >
           
            <Line
                data={chartData}
                // width={120}
                // height={30}
                // size={100}
                options={{
                    aspectRatio: 2  ,
                    plugins: {
                        
                        legend: {
                            display:false,
                            // position: 'right'
                        }
                    }
                }}

            />

        </div>

    );
}
export default LineChart;

