import { useState, useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom"
import { LatBar, LateralModules, NavBar } from "./components";
import { DobleColumns } from "./layout";
import { Home, Login, Modules, Entities, Stats } from "./routes";
import { getResource, setResource } from "./tools/resourceRequest";


export default function App() {
  const [proyects, setproyects] = useState([])
  const [user, setUser] = useState(null)
  const [type, setType] = useState(null)
  const [errorLogin, seterrorLogin] = useState('')
  const navigate = useNavigate()
  
  useEffect(() => {
    (async ()=>{
      setUser( prev => sessionStorage.getItem('user') )
      if(proyects.length === 0){
          await getProyects()
      }       
    })()
  },[]);

  const getProyects = async (byName) => {
    const { data } = await getResource('proyects')
    console.log( data )
    setproyects(prev => data.data.filter( proyect => {
        return proyect.module.includes( byName )
    } ) )
  }

  const getMenu = () => {
    const defaultMenu = [
      { label: 'Home', action: ()=>navigate(process.env.REACT_APP_ROUTE_MAIN) },
      { label: 'Statistics', action: ()=>navigate(`/${process.env.REACT_APP_ROUTE_STAT}`) },
    ]
    switch( type ){
      case 'administrador':
        return [
          ...defaultMenu,
          { label: 'Modules', action: ()=>navigate(`/${process.env.REACT_APP_ROUTE_MODULE}`) }
        ]
      case 'estudiante':
      case 'profesor':
      case 'instituto':
        return [
          ...defaultMenu,
          { label: 'Modules', action: ()=>navigate(`/${process.env.REACT_APP_ROUTE_MODULE}`) }
        ]
      default:
        return defaultMenu

    }
    
  }

  const handlerEventLogout = () => {
    sessionStorage.removeItem('user')
    sessionStorage.removeItem('typeuser')
    setUser( prev => null )
    setType( prev => null )
    navigate(process.env.REACT_APP_ROUTE_MAIN)
  }

  const handlerEventLogin = async (user, pass) => {
    const { data } = await setResource('login',{user, pass})
    if( !data.error ){
      sessionStorage.setItem('user', data.data[0].nickname)
      sessionStorage.setItem('typeuser', data.data[0].type)
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
              />
            } />
          <Route 
            path={`${process.env.REACT_APP_ROUTE_STAT}`}
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
              />
            } />
        </Routes>
      
    </>
  );
}


