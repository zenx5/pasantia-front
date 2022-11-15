import { useState, useEffect } from 'react';
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


export default function Visits( props ) {
    ChartJS.register(
        CategoryScale,
        LinearScale,
        PointElement,
        LineElement,
        Title,
        Tooltip,
        Legend
    );   
    
    const { labels } = props
    

    const options = {
        responsive: true,
        plugins: {
          legend: {
            position: 'bottom',
          },
          title: {
            display: true,
            text: 'Estadisticas de compra',
          },
        },
    };

    const dataVisitas = labels.map(() => (Math.random()*1000) )
    const dataLogeados = dataVisitas.map( dato => Math.random()*dato )
    const dataCompras = dataLogeados.map( dato => Math.random()*dato/2 )
    const data = {
        labels,
        datasets: [
          {
            label: 'Visitas',
            data: dataVisitas,
            borderColor: 'rgb(255, 99, 132)',
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
          },
          {
            label: 'Usuarios logeados',
            data: dataLogeados,
            borderColor: 'rgb(53, 162, 235)',
            backgroundColor: 'rgba(53, 162, 235, 0.5)',
          },
          {
            label: 'Compras',
            data: dataCompras,
            borderColor: 'rgb(132, 255, 99, 0.5)',
            backgroundColor: 'rgba(132, 255, 99, 0.5)',
          },
        ],
    };
    
    return (<Line options={options} data={data} />)
}


