import { useState, useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom"
import { LatBar, LateralModules, NavBar, FooterCustom } from "./components";
import { SingleColumns, DobleColumns } from "./layout";
import { Home, Contact, Team, Login, Modules, Entities, Stats, Profile } from "./routes";
import { getResource, setResource } from "./tools/resourceRequest";


export default function App() {
  const [proyects, setproyects] = useState([])
  const [user, setUser] = useState(null)
  const [type, setType] = useState(null)
  const [errorLogin, seterrorLogin] = useState('')
  const navigate = useNavigate()
  
  useEffect(() => {
    (async ()=>{
      const user = sessionStorage.getItem('user')
      const user_id = sessionStorage.getItem('user_id')
      if( user ){
        setUser( prev => user )
        if(proyects.length === 0){
            if( user === 'admin' ){
              await getProyects('')  
            }else{
              await getProyects('', user_id)
            }
        }
      }
      
    })()
  },[]);

  const getProyects = async (byName = '', id='') => {
    sessionStorage.getItem('user')
    const { data } = await getResource('proyects/user', id)
    console.log( data )
    setproyects(prev => data.data.filter( proyect => {
        return proyect.module.includes( byName )
    } ) )
  }

  const getMenu = () => {
    const defaultMenu = [
      { label: 'Info', action: ()=>navigate(process.env.REACT_APP_ROUTE_INFO) },
      { label: 'Perfiles', action: ()=>navigate(process.env.REACT_APP_ROUTE_PROFILE) },
      { label: 'Contactos', action: ()=>navigate(process.env.REACT_APP_ROUTE_CONTACT) },
      { label: 'Team', action: ()=>navigate(process.env.REACT_APP_ROUTE_TEAM) },
    ]
    switch( type ){
      case 'administrador':
        return [
          ...defaultMenu,
          { label: 'Metodos Prospectivos', action: ()=>navigate(process.env.REACT_APP_ROUTE_MODULE) },
          { label: 'Indicadores', action: ()=>navigate(process.env.REACT_APP_ROUTE_INDICATOR) },
        ]
      case 'estudiante':
      case 'profesor':
      case 'instituto':
        return [
          ...defaultMenu,
          { label: 'Metodos Prospectivos', action: ()=>navigate(process.env.REACT_APP_ROUTE_MODULE) },
        ]
      default:
        return defaultMenu

    }
    
  }

  const handlerEventLogout = () => {
    sessionStorage.removeItem('user')
    sessionStorage.removeItem('typeuser')
    sessionStorage.removeItem('user_id')
    setUser( prev => null )
    setType( prev => null )
    navigate(process.env.REACT_APP_ROUTE_MAIN)
  }

  const handlerEventLogin = async (user, pass) => {
    const { data } = await setResource('login',{user, pass})
    if( !data.error ){
      sessionStorage.setItem('user', data.data[0].nickname)
      sessionStorage.setItem('typeuser', data.data[0].type)
      sessionStorage.setItem('user_id', data.data[0].id)
      navigate(process.env.REACT_APP_ROUTE_MODULE)
      setUser( prev => data.data[0].nickname )
      setType( prev => data.data[0].type )
    }else{
      seterrorLogin(prev=> data.message )
    }
    
  }

  return (<>
      
        <Routes>
          <Route 
            path={`${process.env.REACT_APP_ROUTE_MAIN}`}
            element={
              <DobleColumns 
                header={<NavBar
                  items={getMenu()}
                  current={user}
                  onLogout={handlerEventLogout}
                  onLogin={()=>navigate(process.env.REACT_APP_ROUTE_LOGIN)} />
                }
                WidthTwo={12}
                ColumnTwo={<Home />}
                footer={<FooterCustom content='Solórzano Aneli y Villarroel Adrián 2022'/>}
              />
            } />
          <Route 
            path={`${process.env.REACT_APP_ROUTE_PROFILE}`}
            element={
              <DobleColumns 
                header={<NavBar
                  items={getMenu()}
                  current={user}
                  onLogout={handlerEventLogout}
                  onLogin={()=>navigate(process.env.REACT_APP_ROUTE_LOGIN)} />
                }
                WidthTwo={12}
                ColumnTwo={<Profile />}
                footer={<FooterCustom content='Solórzano Aneli y Villarroel Adrián 2022'/>}
              />
            } />
          <Route path={`${process.env.REACT_APP_ROUTE_LOGIN}`} element={<Login onLogin={handlerEventLogin} error={errorLogin}/>} />
          <Route 
            path={`${process.env.REACT_APP_ROUTE_MODULE}`}
            element={
              <DobleColumns 
                header={<NavBar
                  items={getMenu()}
                  current={user}
                  onLogout={handlerEventLogout}
                  onLogin={()=>navigate(process.env.REACT_APP_ROUTE_LOGIN)} />
                }
                WidthOne={3}
                WidthTwo={9}
                StyleOne={{ backgroundColor: '#393b48', color:'#fff' }}
                ColumnOne={<LateralModules onClick={getProyects} />}
                ColumnTwo={<Modules proyects={proyects} />}
                footer={<FooterCustom content='Solórzano Aneli y Villarroel Adrián 2022'/>}
              />
            } />
          <Route 
            path={`${process.env.REACT_APP_ROUTE_MODULE}/:name`}
            element={
              <DobleColumns 
                header={<NavBar
                  items={getMenu()}
                  current={user}
                  onLogout={handlerEventLogout}
                  onLogin={()=>navigate(process.env.REACT_APP_ROUTE_LOGIN)} />
                }
                WidthOne={3}
                WidthTwo={9}
                StyleOne={{ backgroundColor: '#393b48', color:'#fff' }}
                ColumnOne={<LateralModules onClick={getProyects} />}
                ColumnTwo={<Modules proyects={proyects} />}
                footer={<FooterCustom content='Solórzano Aneli y Villarroel Adrián 2022'/>}
              />
            } />
          <Route 
            path={`${process.env.REACT_APP_ROUTE_ENTITY}/:name/:idProyect/:type`}
            element={
              <DobleColumns 
                header={<NavBar
                  items={getMenu()}
                  current={user}
                  onLogout={handlerEventLogout}
                  onLogin={()=>navigate(process.env.REACT_APP_ROUTE_LOGIN)} />
                }
                WidthOne={3}
                WidthTwo={9}
                StyleOne={{ backgroundColor: '#393b48', color:'#fff' }}
                ColumnOne={<LateralModules onClick={getProyects} />}
                ColumnTwo={<Entities />}
                footer={<FooterCustom content='Solórzano Aneli y Villarroel Adrián 2022'/>}
              />
            } />
          <Route 
            path={`${process.env.REACT_APP_ROUTE_INDICATOR}`}
            element={
              <DobleColumns 
                header={<NavBar
                  items={getMenu()}
                  current={user}
                  onLogout={handlerEventLogout}
                  onLogin={()=>navigate(process.env.REACT_APP_ROUTE_LOGIN)} />
                }
                WidthTwo={12}
                ColumnTwo={<Stats />}
                footer={<FooterCustom content='Solórzano Aneli y Villarroel Adrián 2022'/>}
              />
            } />
          <Route 
            path={`${process.env.REACT_APP_ROUTE_CONTACT}`}
            element={
              <SingleColumns 
                header={<NavBar
                  items={getMenu()}
                  current={user}
                  onLogout={handlerEventLogout}
                  onLogin={()=>navigate(process.env.REACT_APP_ROUTE_LOGIN)} />
                }
                Column={<Contact />}
                footer={<FooterCustom content='Solórzano Aneli y Villarroel Adrián 2022'/>}
              />
            } />
          <Route 
            path={`${process.env.REACT_APP_ROUTE_TEAM}`}
            element={
              <SingleColumns 
                header={<NavBar
                  items={getMenu()}
                  current={user}
                  onLogout={handlerEventLogout}
                  onLogin={()=>navigate(process.env.REACT_APP_ROUTE_LOGIN)} />
                }
                Column={<Team />}
                footer={<FooterCustom content='Solórzano Aneli y Villarroel Adrián 2022'/>}
              />
            } />
        </Routes>
      
    </>
  );
}


