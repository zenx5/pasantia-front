import { useState, useEffect } from 'react';
import { 
    Box, 
    Grid,
    Typography,
    Modal,
    IconButton,
    Button
 } from '@mui/material'
import { ArrowBack } from '@mui/icons-material';
import { LateralModules, ListView } from '../../components';

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
import { pluginDownloadButton } from '../../tools/plugins'
import { Pie, Scatter } from 'react-chartjs-2';


export default function Entities( props ) {
    const navigate = useNavigate()
    const { name, idProyect, type } = useParams()
    const [entities, setentities] = useState([])
    const [open, setopen] = useState(false)
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [influence, setInfluence] = useState(0)
    const [dependence, setDependence] = useState(0)
    const [maxInfluence, setmaxInfluence] = useState(0)
    const [maxDependence, setmaxDependence] = useState(0)
    const [factorX, setfactorX] = useState(0)
    const [show, setShow] = useState(false)
    const [showG, setShowG] = useState(false)

    const [hasvariables, sethasvariables] = useState(false)
    const [hasactores, sethasactores] = useState(false)
    const [haseventos, sethaseventos] = useState(false)
    const [hashipotesis, sethashipotesis] = useState(false)

    ChartJS.register(pluginDownloadButton, ArcElement, LinearScale, PointElement, LineElement, Tooltip, Legend);

    useEffect(() => {
        
        (async ()=>{
            if(entities.length === 0){
                await getentities()
            }
        })()
    },[]);

    
    const getentities = async (typeSelect = '') => {
        if( typeSelect === ''){
            typeSelect = type
        }
        const { data } = await getResource('entities/p', idProyect )
        const newentities = data.data.filter( (entity, index) => { 
            if( entity.type === 'variables' ) { sethasvariables(prev => true) }
            if( entity.type === 'actores' ) { sethasactores(prev => true) }
            if( entity.type === 'eventos' ) { sethaseventos(prev => true) }
            if( entity.type === 'hipotesis' ) { sethashipotesis(prev => true) }
            if( entity.type === typeSelect ){
                return entity
            }            
        } )
        setentities(prev => newentities )
        let maxI = Math.max(...newentities.map(entity=>entity.influence))
        let maxD = Math.max(...newentities.map(entity=>entity.dependence))
        setmaxInfluence( prev => maxI )
        setmaxDependence( prev => maxD )
        setfactorX( prev => Math.max( maxI, maxD ) )
    }

    const headers = [
        { key: 'name', name: trans('Name'), default: '' },
        { key: 'influence', name: trans('% Influence'), default: '', format: (index, item)=>(item*100/maxInfluence).toFixed(2) },
        { key: 'dependence', name: trans('% Dependence'), default: '', format: (index, item)=>(item*100/maxDependence).toFixed(2)  },
    ]

    const openModal = (id) => {
        setTitle(prev=> entities.find(entity=>entity.id === id).name )
        setDescription(prev=> entities.find(entity=>entity.id === id).description )
        setInfluence(prev=> entities.find(entity=>entity.id === id).influence )
        setDependence(prev=> entities.find(entity=>entity.id === id).dependence )
        setopen(prev=>true)
    }

    const handlerViewEvent = async (id, selectType = '' ) => {
        if( selectType === '' ){
            selectType = type
        }
        switch( selectType ){
            case 'politicas': 
                if( haseventos ) {
                    navigate(`/${process.env.REACT_APP_ROUTE_ENTITY}/${name}/${idProyect}/eventos`)
                    await getentities('eventos')
                }else{
                    await handlerViewEvent(id, 'eventos')
                }
                break
            case 'eventos': 
                if( hashipotesis ) {
                    navigate(`/${process.env.REACT_APP_ROUTE_ENTITY}/${name}/${idProyect}/hipotesis`)
                    await getentities('hipotesis')
                }else{
                    await handlerViewEvent(id, 'hipotesis')
                }
                break
            case 'hipotesis': 
                if( hasactores ) {
                    navigate(`/${process.env.REACT_APP_ROUTE_ENTITY}/${name}/${idProyect}/actores`)
                    await getentities('actores')
                }else{
                    await handlerViewEvent(id, 'actores')
                }
                break
            case 'actores': 
                if( hasvariables ) {
                    navigate(`/${process.env.REACT_APP_ROUTE_ENTITY}/${name}/${idProyect}/variables`)
                    await getentities('variables')
                }else{
                    await handlerViewEvent(id, 'variables')
                }
                break
            default:
                openModal(id)
        }
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
        let entity = entities.find( entity => entity.id === index )
        const { influence, dependence } = entity
        if( influence>factorX/2 && dependence<factorX/2 ) return 1
        else if( influence>factorX/2 && dependence>factorX/2 ) return 2
        else if( influence<factorX/2 && dependence<factorX/2 ) return 3
        else if( influence<factorX/2 && dependence>factorX/2 ) return 4
        else return 0
    }

    const calculateZone = (index) => {
        let entity = entities.find( entity => entity.id === index )
        const { influence, dependence } = entity
        if( influence>factorX/2 && dependence<factorX/2 ) return <Typography>Poder</Typography>
        else if( influence>factorX/2 && dependence>factorX/2 ) return <Typography style={{color:'#f10'}}>Conflicto</Typography>
        else if( influence<factorX/2 && dependence<factorX/2 ) return <Typography>Autonomia</Typography>
        else if( influence<factorX/2 && dependence>factorX/2 ) return <Typography>Resultados</Typography>
        else return <Typography>Peloton</Typography>
    }

    return (
        <Grid container>
            { name && <>
                <Grid item xs={1}>
                    <IconButton onClick={()=>{window.history.go(-1)}}>
                        <ArrowBack />                            
                    </IconButton>
                </Grid>
                <Grid item xs={11}>
                    <Typography style={{fontSize:'2rem', textAlign:'center', fontWeight:'bold'}}>{name}</Typography>
                </Grid>
                <Grid item xs={12}>
                    <ListView 
                        headers={headers}
                        disableSelection
                        records={entities}  
                        // .filter( entity => (entity.influence>factorX/2 && entity.dependence>factorX/2) )
                        onView={handlerViewEvent}
                        id={'id'}
                        actionsTable={
                            <Button variant='outlined'>Download</Button>
                        }
                    />
                </Grid>
            </>}
            <Grid item xs={4}>
                { !show && <Button variant="outlined" style={{marginLeft:20}} onClick={()=>setShow(true)}>Ver todos(as) los(as) {type}</Button>}
                { show && <Button variant="outlined" style={{marginLeft:20}} onClick={()=>setShow(false)}>Ocultar todos(as) los(as) {type}</Button>}
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
                            ...entities.map(entity => {
                                const colors = [
                                    'rgba(100,50,50,1)',
                                    'rgba(50,100,50,1)',
                                    'rgba(50,50,100,1)',
                                    'rgba(100,50,100,1)',
                                    'rgba(100,100,50,1)'
                                ]
                                const zone = getZone(entity.id)
                                return { 
                                    label: entity.name,
                                    data: [{y: entity.influence, x:entity.dependence}],
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
                    records={entities}  
                    onView={handlerViewEvent}
                    id={'id'}
                    actionsTable={
                        <Button variant='outlined'>Download</Button>
                    }
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
    );
}


