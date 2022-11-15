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
        setactors(prev => data.data)
    }

    

    const headers = [
        { key: 'name', name: trans('Name'), default: '' },
        { key: 'description', name: trans('Description'), default: '' },
    ]

    const openModule = async (moduleName) => {
        navigate(`/${process.env.REACT_APP_ROUTE_MODULE}/${moduleName}`)        
    }

    const openVariables = async (id) => {
        const ProyectId = actors.find(actor=>actor.id==id).ProyectId
        navigate(`/${process.env.REACT_APP_ROUTE_VARIABLE}/MACTOR/${ProyectId}`)
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
                    </Grid>
                </Grid>
            </Grid>
        </Box>
    );
}


