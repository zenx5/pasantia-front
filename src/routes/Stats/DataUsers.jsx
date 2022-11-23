import { Button } from "@mui/material";
import { useState, useEffect } from "react";
import { ListView } from "../../components"
import { getResource } from "../../tools/resourceRequest"
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

export default function DataUsers(){
    const [users, setusers] = useState([]);
    useEffect(() => {
        (async ()=>{
            if( users.length === 0){
                await loadData()
            }
        })() 
    });
    
    const loadData = async () => {
        const { data } = await getResource('users')
        setusers(prev => data.data)
    }

    const getModules = (proyects)=>{
        let result = []
        let modules = proyects.map( proyect => proyect.module.split(','))
        modules.forEach( module => {
            module.forEach( mod => {
                if( !result.includes( mod ) ){
                    result.push( mod )
                }
            })
        })
        return result.join(',')
    }

    const paymentMethods = ['Paypal', 'Reserve', 'Bank Transfer']

    const headers = [
        { key:'nickname', name:'Nick', default:''},
        { key:'type', name:'Type', default:''},
        { key:'Proyects', name:'Proyects', default:'', format:(index, item)=>item.length},
        { key:'Proyects', name:'Modules', default:'', format:(index, item)=>getModules(item)},
        { key: 'id', name: 'Payment Methods', default: 'Paypal', format:(index,item)=>paymentMethods[Math.floor( Math.random()*paymentMethods.length )]}
    ]

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

    const getData = () => {
        let bcolor = []
        let bgcolor = []
        users.forEach( user=>{
            let color = `rgb(${Math.random()*255},${Math.random()*255},${Math.random()*255}`
            bcolor.push(color+',1)')
            bgcolor.push(color+',0.5)')
        })
        return {
            labels: users.map(user=>user.nickname),
            datasets: [{
                label: '% Proyects',
                data: users.map(user=>user.Proyects.length),
                borderColor: bcolor,
                backgroundColor: bgcolor
            }]
        }
    }

    return(<>
        <Chart 
            type={'pie'} 
            height={300} 
            options={{...options, maintainAspectRatio: false }} 
            data={getData()} />
        <ListView 
            headers={headers}
            disableSelection
            records={users}  
            id={'id'}
            actionsTable={<Button variant='outlined'>Download</Button>}
        />
        
        </>)
}