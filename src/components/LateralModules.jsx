import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LatBar } from '.'
import { getResource } from '../tools/resourceRequest';

export default function LateralModules( props ) {
    const navigate = useNavigate()
    const [modules, setmodules] = useState([]);
    const { onClick } = props
    
    useEffect(() => {
        (async ()=>{
            if(modules.length === 0){
                await getModules()
            }
        })()
    },[]);

    const getModules = async () => {
        const { data } = await getResource('modules')
        console.log( data.data )
        setmodules( prev => data.data )
    }

    const openModule = async (moduleName) => {
        onClick( moduleName )
        navigate(`/${process.env.REACT_APP_ROUTE_MODULE}/${moduleName}`)   
    }

    return (<LatBar 
        items={modules.map( module => (
            { 
                label:module.label,
                disabled: module.disabled,
                action: (ev)=>{openModule( module.label )}
            }))
        } 
    />)
}