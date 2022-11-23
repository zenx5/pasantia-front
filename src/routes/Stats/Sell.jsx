import { useState, useEffect } from 'react';
import {
    Chart as ChartJS,
    ArcElement,
    CategoryScale,
    LinearScale,
    BarElement,
    PointElement,
    LineElement,
    Title,
    Filler,
    Tooltip,
    Legend,
} from 'chart.js';
import { Chart, Line } from 'react-chartjs-2';



export default function Sell( props ) {
    ChartJS.register(
        ArcElement,
        CategoryScale,
        LinearScale,
        BarElement,
        PointElement,
        LineElement,
        Title,
        Filler,
        Tooltip,
        Legend
    );   
    
    const { type, labels, dataVisitas, dataLogeados, dataCompras } = props
    

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

    let data = {}
    const $type = type.split('.').at(0)
    const mode = type.split('.').at(1)
    if( $type === 'pie' ){
      data = {
        labels,
        datasets: [
          {
            label: 'Visitas',
            data: [
              eval(dataVisitas.join('+')),
              eval(dataLogeados.join('+')),
              eval(dataCompras.join('+'))
            ],
            borderColor: [
              'rgb(255, 99, 132)',
              'rgb(132, 255, 99)',
              'rgb(99, 132, 255)',
            ],
            backgroundColor: [
              'rgb(255, 99, 132, 0.5)',
              'rgb(132, 255, 99, 0.5)',
              'rgb(99, 132, 255, 0.5)',
            ],
          }
        ],
    };
    }else{
      data = {
          labels,
          datasets: [
            {
              fill: mode?.split('|').includes('fill'),
              label: 'Compras',
              data: dataCompras,
              borderColor: 'rgb(132, 255, 99, 0.5)',
              backgroundColor: 'rgba(132, 255, 99, 0.5)',
            },
            {
              fill: mode?.split('|').includes('fill'),
              label: 'Usuarios logeados',
              data: dataLogeados,
              borderColor: 'rgb(53, 162, 235)',
              backgroundColor: 'rgba(53, 162, 235, 0.5)',
            },
            {
              fill: mode?.split('|').includes('fill'),
              label: 'Visitas',
              data: dataVisitas,
              borderColor: 'rgb(255, 99, 132)',
              backgroundColor: 'rgba(255, 99, 132, 0.5)',
            },
          ],
      }
    }
    
    return (<Chart type={$type} height={800} options={{...options, maintainAspectRatio: false }} data={data} />)
}


