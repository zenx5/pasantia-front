import { useState, useEffect } from 'react';
import { 
    Box, 
    Grid,
    Typography
 } from '@mui/material'
import { LatBar, ListView } from '../components';

import { trans, labels } from '../tools/common';
import { useNavigate, useParams } from 'react-router-dom';
import { getResource } from '../tools/resourceRequest';


export default function Modules( props ) {
    const navigate = useNavigate()
    const { name } = useParams()
    const [modules, setmodules] = useState([])
    const [proyects, setproyects] = useState([])

    useEffect(() => {
        
        (async ()=>{
            if(modules.length === 0){
                await getModules()
            }
            if(proyects.length === 0){
                await getProyects()     
            }       
        })()
    },[]);

    const getModules = async () => {
        const { data } = await getResource('modules')
        setmodules(prev => data.data )
    }

    const getProyects = async (forName) => {
        const { data } = await getResource('proyects')
        setproyects(prev => data.data.filter( proyect => proyect.Modules.map(module=>module.name).includes(forName ?? name)) )
    }

    const headers = [
        { key: 'name', name: trans('Proyect'), default: '' },
        { key: 'createdAt', name: trans('Date'), default: '', format: (index, item) => item.split('T')[0] },
        { key: 'Modules', name: trans('Method(s)'), default: [], format: (index, item) => item.map( element=>element.name).join(', ')  },
    ]

    const openModule = async (moduleName) => {
        await getProyects( moduleName )
        navigate(`/${process.env.REACT_APP_ROUTE_MODULE}/${moduleName}`)   
    }

    const showVariables = async (moduleName) => {
        navigate(`/${process.env.REACT_APP_ROUTE_VARIABLE}/${moduleName}`)   
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
                            records={proyects}
                            onView={()=>{showVariables(name)}}
                            id={'id'}
                        />
                    </>}
                </Grid>
            </Grid>
        </Box>
    );
}


