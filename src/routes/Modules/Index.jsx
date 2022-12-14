import { useState, useEffect } from 'react';
import { 
    Typography,
 } from '@mui/material'
import { LateralModules, ListView } from '../../components';

import { trans, labels } from '../../tools/common';
import { useNavigate, useParams } from 'react-router-dom';
import { getResource } from '../../tools/resourceRequest';



export default function Index( props ) {
    const navigate = useNavigate()
    const { name } = useParams()
    

    const headers = [
        { key: 'name', name: trans('Proyect'), default: '' },
        { key: 'createdAt', name: trans('Date'), default: '', format: (index, item) => item.split('T')[0] },
        { key: 'module', name: trans('Method(s)'), default: [] },
    ]

    const showVariables = async (moduleName, ID) => {
        if(moduleName==='MICMAC') navigate(`/${process.env.REACT_APP_ROUTE_ENTITY}/${moduleName}/${ID}/variables`)
        if(moduleName==='MACTOR') navigate(`/${process.env.REACT_APP_ROUTE_ENTITY}/${moduleName}/${ID}/actores`)
        if(moduleName==='SMIC-PRO EXPERT') navigate(`/${process.env.REACT_APP_ROUTE_ENTITY}/${moduleName}/${ID}/eventos`)
        if(moduleName==='MORPHOL') navigate(`/${process.env.REACT_APP_ROUTE_ENTITY}/${moduleName}/${ID}/hipotesis`)
        if(moduleName==='MULTIPOL') navigate(`/${process.env.REACT_APP_ROUTE_ENTITY}/${moduleName}/${ID}/politicas`)
    }

    return (<>
        { name && <>
            <Typography style={{fontSize:'2rem', textAlign:'center', fontWeight:'bold'}}>{name}</Typography>
            <ListView 
                headers={headers}
                disableSelection
                records={props.proyects}
                onView={(id)=>{showVariables(name, id)}}
                id={'id'}
            />
        </>}  
        </>              
    );
}


