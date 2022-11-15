import { useState, useEffect } from 'react';
import { 
    Box, 
    Grid,
    Typography,
    Modal,
    Button
 } from '@mui/material'
import { LatBar, ListView } from '../../components';

import { trans, labels } from '../../tools/common';
import { useNavigate, useParams } from 'react-router-dom';
import { getResource, setResource } from '../../tools/resourceRequest';
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


export default function Actors( props ) {
    const navigate = useNavigate()
    const { name, idActor } = useParams()
    const [modules, setmodules] = useState([])
    const [actors, setactors] = useState([])
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
        console.log( data )
        setmodules(prev => data.data )
        await getActors()
    }

    const getActors = async () => {
        const { data } = await getResource('entities/byProyect', idActor )
        console.log(data.data)
        const newVariables = data.data.map( (entity, index) => { 
            let influence = 0
            let dependence = 0
            entity.Features.forEach( feature => {
                if( feature.name === 'dependence' ) dependence = parseFloat( feature.value )
                if( feature.name === 'influence' ) influence = parseFloat( feature.value )
            })
            return {
                ...entity,
                influence,
                dependence
            }  
        } )
        console.log('newVariables', newVariables)
        setactors(prev => newVariables )
        let maxI = Math.max(...newVariables.map(variable=>variable.influence))
        let maxD = Math.max(...newVariables.map(variable=>variable.dependence))
        setmaxInfluence( prev => maxI )
        setmaxDependence( prev => maxD )
        setfactorX( prev => Math.max( maxI, maxD ) )
    }

    

    const headers = [
        { key: 'name', name: trans('Name'), default: '' },
        { key: 'influence', name: trans('% Influence'), default: '', format: (index, item)=>(item*100/maxInfluence).toFixed(2) },
        { key: 'dependence', name: trans('% Dependence'), default: '', format: (index, item)=>(item*100/maxDependence).toFixed(2)  },
    ]

    const openModule = async (moduleName) => {
        navigate(`/${process.env.REACT_APP_ROUTE_MODULE}/${moduleName}`)        
    }

    const openVariables = async (id) => {
        const ProyectId = actors.find(actor=>actor.id==id).ProyectId
        navigate(`/${process.env.REACT_APP_ROUTE_VARIABLE}/MACTOR/${ProyectId}`)
    }

    const openModal = (id) => {
        setId(prev=>id)
        setTitle(prev=> actors.find(variable=>variable.id === id).name )
        setDescription(prev=> actors.find(variable=>variable.id === id).description )
        setInfluence(prev=> actors.find(variable=>variable.id === id).influence )
        setDependence(prev=> actors.find(variable=>variable.id === id).dependence )
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
        let variable = actors.find( variable => variable.id === index )
        const { influence, dependence } = variable
        if( influence>factorX/2 && dependence<factorX/2 ) return 1
        else if( influence>factorX/2 && dependence>factorX/2 ) return 2
        else if( influence<factorX/2 && dependence<factorX/2 ) return 3
        else if( influence<factorX/2 && dependence>factorX/2 ) return 4
        else return 0
    }

    const calculateZone = (index) => {
        let variable = actors.find( variable => variable.id === index )
        const { influence, dependence } = variable
        if( influence>factorX/2 && dependence<factorX/2 ) return <Typography>Actores Dominantes</Typography>
        else if( influence>factorX/2 && dependence>factorX/2 ) return <Typography style={{color:'#f10'}}>Actores de Enlace</Typography>
        else if( influence<factorX/2 && dependence<factorX/2 ) return <Typography>Actores Autonomos</Typography>
        else if( influence<factorX/2 && dependence>factorX/2 ) return <Typography>Actores Dominados</Typography>
        else return <Typography>Actores Regulares</Typography>
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
                                    records={actors}  
                                    onView={(id)=>openVariables(id)}
                                    id={'id'}
                                />
                            </Grid>
                        </>}
                        <Grid item xs={4}>
                            { !show && <Button variant="outlined" style={{marginLeft:20}} onClick={()=>setShow(true)}>Ver todas los Actores</Button>}
                            { show && <Button variant="outlined" style={{marginLeft:20}} onClick={()=>setShow(false)}>Ocultar todas los Actores</Button>}
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
                                        ...actors.map(variable => {
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
                                    { key: 'name', name: trans('ZONA'), default: '', format: (index)=>calculateZone(index) },
                                ]}
                                disableSelection
                                records={actors}  
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


