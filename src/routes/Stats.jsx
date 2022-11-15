import { useState, useEffect } from 'react';
import { 
    Box, 
    Grid,
    IconButton,
    Select,
    MenuItem,
    TextField,
    Typography
 } from '@mui/material'

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
import { useNavigate, useParams } from 'react-router-dom';
import { getResource } from '../tools/resourceRequest';
import { Refresh } from '@mui/icons-material';
import { Sell, Visits } from '.'
import { ListView } from '../components'

export default function Stats( props ) {
    const navigate = useNavigate()
    const [labels, setLabels] = useState([])
    const [start, setStart] = useState(null)
    const [end, setEnd] = useState(null)
    const [stat, setStat] = useState('line')
    const [dataVisitas, setdataVisitas] = useState([])
    const [dataLogeados, setdataLogeados] = useState([])
    const [dataCompras, setdataCompras] = useState([])

    ChartJS.register(
        CategoryScale,
        LinearScale,
        PointElement,
        LineElement,
        Title,
        Tooltip,
        Legend
    );

    useEffect(() => {
        console.log('use effect')
        if( labels.length === 0 ){
            loadDates()
            // setTimeout(()=>{
            //     loadLabels()
            // }, 2000)
        }
    },[labels]);

    const loadDates = () => {
        let current = new Date( start ?? Date.now() )
        let next = new Date( end ?? Date.now() )
        setStart( prev => current.toISOString().split('T')[0] )
        next.setMonth( current.getMonth() + 5 )
        setEnd(prev => next.toISOString().split('T')[0] )
    }

    const loadLabels = () => {
        let fechaInicio = new Date(start);
        let fechaFin    = new Date(end);
        let result = []
        while(fechaFin.getTime() >= fechaInicio.getTime() ){
            fechaInicio.setMonth(fechaInicio.getMonth() + 1);
            console.log(fechaInicio.getFullYear() + '-' + (fechaInicio.getMonth() + 1) + '-' + fechaInicio.getDate())
            result.push(fechaInicio.getFullYear() + '-' + (fechaInicio.getMonth() + 1) + '-' + fechaInicio.getDate());
        }
        setLabels( prev => result )
        const visitas = result.map(() => Math.floor((Math.random()*1000)))
        const logeados = visitas.map( dato => Math.floor(Math.random()*dato ))
        const compras = logeados.map( dato => Math.floor(Math.random()*dato/2 ))
        setdataVisitas( prev => visitas )
        setdataLogeados( prev => logeados )
        setdataCompras( prev => compras )
    }        

    const handlerChangeDate = (handlerState) => (event) => {
        handlerState( prev => event.target.value )
    }

    
    

    
    return (
        <Box style={{
        // height: '100vh',
        // alignItems: 'center',
        // justifyContent: 'center',
        // display: 'flex'
        }}>

            <Grid container style={{ marginTop:20 }}>
                <Grid item xs={5}>
                    <Typography style={{fontSize:'2rem', textAlign:'center', fontWeight:'bold'}}>Estadisticas</Typography>
                </Grid>
                <Grid item xs={2}>
                    <Select label='Tipo' defaultValue={'line'} onChange={ev=>{setStat(ev.target.value)}}>
                        <MenuItem value={'line'}>Line</MenuItem>
                        <MenuItem value={'line.fill'}>Line (Fill)</MenuItem>
                        <MenuItem value={'pie'}>Pie</MenuItem>
                        <MenuItem value={'bar'}>Bar</MenuItem>
                    </Select>
                </Grid>
                <Grid item xs={2}>
                    <TextField type='date' value={start} onChange={handlerChangeDate(setStart)}/>
                </Grid>
                <Grid item xs={2}>
                    <TextField type='date' value={end} min={start} onChange={handlerChangeDate(setEnd)}/>
                </Grid>
                <Grid item xs={1}>
                    <IconButton onClick={loadLabels}>
                        <Refresh />
                    </IconButton>
                </Grid>
                <Grid item xs={12}>
                    <Sell 
                        type={stat} 
                        labels={labels} 
                        dataVisitas={dataVisitas}
                        dataLogeados={dataLogeados}
                        dataCompras={dataCompras}                    
                    />
                </Grid>
                <Grid item xs={12}>
                    <ListView 
                        headers={[
                            { key: 'data', name: 'Fecha' },
                            { key: 'visitas', name: 'Visitas', default: 0 },
                            { key: 'usuarios', name: 'Logins', default: 0 },
                            { key: 'compras', name: 'Compras', default: 0 },
                        ]}
                        disableSelection
                        records={ labels.map( (label, index) => 
                            ({
                                data: label,
                                visitas: dataVisitas[index],
                                usuarios: dataLogeados[index],
                                compras: dataCompras[index]
                            })
                        )}
                        id={'id'}
                    />
                    
                    
                </Grid>
            </Grid>
        </Box>
    );
}


