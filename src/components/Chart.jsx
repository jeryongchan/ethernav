import React from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { useTheme } from '@emotion/react';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

export function Chart({ data, title }) {
    const theme = useTheme();

    const options = {
        responsive: true,
        plugins: {
            legend: {
                display: false,
            },
            title: {
                display: true,
                text: title,
                font: {
                    size: 16,
                },
                color: theme.palette.text.primary
            },
        },
    
        scales: {
            xAxes: [{
                type: 'time',
            }]
        },
    
    };
    return <Line options={options} data={data} maintainAspectRatio={false}  />;
}
