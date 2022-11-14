import { useState, useEffect } from 'react';
import { 
    Box, 
    Grid,
    Typography,
    Modal
 } from '@mui/material'
import { LatBar, ListView } from '../components';

import { trans, labels } from '../tools/common';
import { useNavigate, useParams } from 'react-router-dom';
import { getResource } from '../tools/resourceRequest';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';


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

    ChartJS.register(ArcElement, Tooltip, Legend);

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
    }

    const getVariables = async (forName) => {
        const newVariables = modules.filter( module=>module.name === forName ).map( module => module.Variables )
        setvariables(prev => newVariables )        
    }

    const headers = [
        { key: 'name', name: trans('Name'), default: '' },
        { key: 'influence', name: trans('Influence'), default: '' },
        { key: 'dependence', name: trans('Dependence'), default: '' },
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
                    { name && <>
                        <Typography style={{fontSize:'2rem', textAlign:'center', fontWeight:'bold'}}>{name}</Typography>
                        <ListView 
                            headers={headers}
                            disableSelection
                            records={variables}
                            onView={openModal}
                            id={'id'}
                        />
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
                    </>}
                </Grid>
            </Grid>
        </Box>
    );
}


