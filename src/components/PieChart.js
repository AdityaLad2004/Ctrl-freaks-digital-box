
'use client'
import { useEffect } from 'react';
import Chart from 'chart.js/auto';

const PieChart = ({ data1, data2 }) => {
    useEffect(() => {
        const ctx1 = document.getElementById('chart1');
        const ctx2 = document.getElementById('chart2');

        const chart1 = new Chart(ctx1, {
            type: 'pie',
            data: data1,
            options: {

            },
        });

        const chart2 = new Chart(ctx2, {
            type: 'pie',
            data: data2,
            options: {

            },
        });


        return () => {
            chart1.destroy();
            chart2.destroy();
        };
    }, [data1, data2]);

    return (
        <div className="flex justify-center w-1/4 align-middle h-1/6">
            <canvas id="chart1" className="w-1/2 h-auto" />
            <canvas id="chart2" className="w-1/2 h-auto" />
        </div>
    );
};

export default PieChart;
