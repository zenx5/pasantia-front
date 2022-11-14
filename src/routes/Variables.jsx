import { useState, useEffect } from 'react';
import { 
    Box, 
    Grid,
    Typography,
    Modal,
    Button
 } from '@mui/material'
import { LatBar, ListView } from '../components';

import { trans, labels } from '../tools/common';
import { useNavigate, useParams } from 'react-router-dom';
import { getResource } from '../tools/resourceRequest';
import { 
    Chart as ChartJS,
    ArcElement,
    LinearScale,
    PointElement,
    LineElement,
    Tooltip,
    Legend,
} from 'chart.js';
import { Pie, Scatter } from 'react-chartjs-2';


export default function Modules( props ) {
    const navigate = useNavigate()
    const { name } = useParams()
    const [modules, setmodules] = useState([])
    const [variables, setvariables] = useState([])
    const [open, setopen] = useState(false)
    const [id, setId] = useState(false)
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [influence, setInfluence] = useState(0)
    const [dependence, setDependence] = useState(0)
    const [maxInfluence, setmaxInfluence] = useState(0)
    const [maxDependence, setmaxDependence] = useState(0)
    const [factorX, setfactorX] = useState(0)
    const [show, setShow] = useState(false)
    const [showG, setShowG] = useState(false)

    ChartJS.register(ArcElement, LinearScale, PointElement, LineElement, Tooltip, Legend);

    useEffect(() => {
        
        (async ()=>{
            if(modules.length === 0){
                await getModules()
            }
        })()
    },[]);

    const getModules = async () => {
        const { data } = await getResource('modules')
        setmodules(prev => data.data )
        const newVariables = data.data.filter( module=>module.name === name ).map( module => module.Variables )
        setvariables(prev => newVariables[0] )
        let maxI = Math.max(...newVariables[0].map(variable=>variable.influence))
        let maxD = Math.max(...newVariables[0].map(variable=>variable.dependence))
        setmaxInfluence( prev => maxI )
        setmaxDependence( prev => maxD )
        setfactorX( prev => Math.max( maxI, maxD ) )
    }

    const getVariables = async (forName) => {
        const newVariables = modules.filter( module=>module.name === forName ).map( module => module.Variables )
        setvariables(prev => newVariables )        
    }

    const headers = [
        { key: 'name', name: trans('Name'), default: '' },
        { key: 'influence', name: trans('% Influence'), default: '', format: (index, item)=>(item*100/maxInfluence).toFixed(2) },
        { key: 'dependence', name: trans('% Dependence'), default: '', format: (index, item)=>(item*100/maxDependence).toFixed(2)  },
    ]

    const openModule = async (moduleName) => {
        await getVariables( moduleName )
        navigate(`/${process.env.REACT_APP_ROUTE_MODULE}/${moduleName}`)        
        
    }

    const openModal = (id) => {
        setId(prev=>id)
        setTitle(prev=> variables.find(variable=>variable.id === id).name )
        setDescription(prev=> variables.find(variable=>variable.id === id).description )
        setInfluence(prev=> variables.find(variable=>variable.id === id).influence )
        setDependence(prev=> variables.find(variable=>variable.id === id).dependence )
        setopen(prev=>true)
    }

    const formaterDataForPie = () => {
        return {
            labels: ['Influence', 'Dependence'],
            datasets: [
              {
                label: '# of Votes',
                data: [influence ?? 0, dependence ?? 0],
                backgroundColor: [
                    'rgba(0, 150, 200, 0.6)',
                    'rgba(200, 0, 150, 0.6)',
                ],
                borderColor: [
                    'rgba(0, 150, 200, 1)',
                    'rgba(200, 0, 150, 1)',
                ],
                borderWidth: 1,
              },
            ],
          }
    }

    const getZone = (index) => {
        let variable = variables.find( variable => variable.id === index )
        const { influence, dependence } = variable
        if( influence>factorX/2 && dependence<factorX/2 ) return 1
        else if( influence>factorX/2 && dependence>factorX/2 ) return 2
        else if( influence<factorX/2 && dependence<factorX/2 ) return 3
        else if( influence<factorX/2 && dependence>factorX/2 ) return 4
        else return 0
    }

    const calculateZone = (index) => {
        let variable = variables.find( variable => variable.id === index )
        const { influence, dependence } = variable
        if( influence>factorX/2 && dependence<factorX/2 ) return <Typography>Poder</Typography>
        else if( influence>factorX/2 && dependence>factorX/2 ) return <Typography style={{color:'#f10'}}>Conflicto</Typography>
        else if( influence<factorX/2 && dependence<factorX/2 ) return <Typography>Autonomia</Typography>
        else if( influence<factorX/2 && dependence>factorX/2 ) return <Typography>Resultados</Typography>
        else return <Typography>Peloton</Typography>
    }

    return (
        <Box style={{
        // height: '100vh',
        // alignItems: 'center',
        // justifyContent: 'center',
        // display: 'flex'
        }}>

            <Grid container style={{ height: '100vh' }}>
                <Grid item xs={3} style={{backgroundColor: '#393b48', color:'#fff'}}>
                    <LatBar 
                        items={modules.map( module => (
                            { 
                                label:module.name,
                                action: (ev)=>{openModule( module.name )}
                            }))
                        } 
                    />
                </Grid>
                <Grid item xs={9}>
                    <Grid container>
                        { name && <>
                            <Grid item xs={12}>
                                <Typography style={{fontSize:'2rem', textAlign:'center', fontWeight:'bold'}}>{name}</Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <ListView 
                                    headers={headers}
                                    disableSelection
                                    records={variables.filter( variable => (variable.influence>factorX/2 && variable.dependence>factorX/2) )}  
                                    onView={openModal}
                                    id={'id'}
                                />
                            </Grid>
                        </>}
                        <Grid item xs={4}>
                            { !show && <Button variant="outlined" style={{marginLeft:20}} onClick={()=>setShow(true)}>Ver todas las Variables</Button>}
                            { show && <Button variant="outlined" style={{marginLeft:20}} onClick={()=>setShow(false)}>Ocultar todas las Variables</Button>}
                        </Grid>
                        <Grid item xs={4}>
                            <Button variant='contained' style={{marginLeft:20}} onClick={()=>setShowG(!showG)}>Grafica</Button>
                        </Grid>
                        {showG && <Grid item xs={12}>
                            <Scatter 
                                options={{
                                    elements:{
                                        point:{
                                            borderWidth:4
                                        }
                                    },
                                    scales: {
                                        y: {
                                            beginAtZero: true,
                                            max: factorX
                                        },
                                        x: {
                                            beginAtZero: true,
                                            max: factorX
                                        }
                                    }
                                }} 
                                data={{
                                    datasets:[
                                        ...variables.map(variable => {
                                            const colors = [
                                                'rgba(100,50,50,1)',
                                                'rgba(50,100,50,1)',
                                                'rgba(50,50,100,1)',
                                                'rgba(100,50,100,1)',
                                                'rgba(100,100,50,1)'
                                            ]
                                            const zone = getZone(variable.id)
                                            return { 
                                                label: variable.name,
                                                data: [{y: variable.influence, x:variable.dependence}],
                                                backgroundColor: colors[zone],
                                                borderColor: colors[zone]
                                            }
                                        } ),
                                        {
                                            type:'line',
                                            data:[
                                                {x:0,y:factorX/2},
                                                {x:factorX,y:factorX/2}
                                            ],
                                            backgroundColor: 'rgba(0,0,0,0)'
                                        },
                                        {
                                            type:'line',
                                            data:[
                                                {x:factorX/2,y:0},
                                                {x:factorX/2,y:factorX}
                                            ],
                                            backgroundColor: 'rgba(0,0,0,0)',
                                        }
                                    ]
                                }} />
                        </Grid>}
                        { show && <Grid item xs={12}>
                            <ListView 
                                headers={[
                                    ...headers,
                                    { key: 'id', name: trans('ZONA'), default: '', format: calculateZone },
                                ]}
                                disableSelection
                                records={variables}  
                                onView={openModal}
                                id={'id'}
                            />
                        </Grid>}
                    
                        <Modal
                            open={open}
                            onClose={()=>setopen(prev=>false)}
                            aria-labelledby="modal-modal-title"
                            aria-describedby="modal-modal-description"
                            >
                            <Box sx={{height:'100vh', display:'flex', alignItems:'center', justifyContent:'center'}} onClick={()=>setopen(prev=>false)}>
                                <Box style={{
                                    background: '#fff',
                                    padding: '40px',
                                    borderRadius: '10px',
                                    width: '50vw'
                                }}>
                                    <Typography id="modal-modal-title" style={{textAlign:'center'}} variant="h6" component="h2">
                                        { title }
                                    </Typography>
                                    <Typography id="modal-modal-description" sx={{ mt: 2, mb: 2, textAlign:'center' }}>
                                        { description }
                                    </Typography>
                                    <Box>
                                        <Pie 
                                            data={ formaterDataForPie() } 
                                            height={400} 
                                            options={{ maintainAspectRatio: false }}/>
                                    </Box>
                                </Box>
                            </Box>
                            </Modal>
                    </Grid>
                </Grid>
            </Grid>
        </Box>
    );
}


