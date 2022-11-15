import { useState, useEffect } from "react";
import { ListView } from "../components"
import { getResource } from "../tools/resourceRequest"

export default function DataUsers(){
    const [users, setusers] = useState([]);
    useEffect(() => {
        (async ()=>{
            if( users.length === 0){
                await loadData()
            }
        })() 
    });
    
    const loadData = async ()=>{
        const { data } = await getResource('users')
        console.log(data.data)
        setusers(prev => data.data)
    }

    const getModules = async (proyects)=>{
        // let modules = []
        // for( let index=0; index < proyects.length; index++){
        //     const { data } = await getResource('proyects', proyects[index].id )
        //     data.data.forEach( proyect )
        //     modules.push( data.data.map( item => item.Modules.name ))
        // }
        return ''
    }

    const headers = [
        { key:'nickname', name:'Nick', default:''},
        { key:'type', name:'Type', default:''},
        { key:'Proyects', name:'Proyects', default:'', format:(index, item)=>item.length},
        { key:'Proyects', name:'Modules', default:'', format:(index, item)=>getModules(item)},

    ]

    return(<ListView 
        headers={headers}
        disableSelection
        records={users}  
        id={'id'}
    />)
}