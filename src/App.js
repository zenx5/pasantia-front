import { useState, useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom"
import { LatBar, NavBar } from "./components";
import { Home, Login, Modules, Variables, Actors, Stats } from "./routes";
import { getResource, setResource } from "./tools/resourceRequest";


export default function App() {
  const [user, setUser] = useState(null)
  const [type, setType] = useState(null)
  const [errorLogin, seterrorLogin] = useState('')
  const navigate = useNavigate()
  useEffect(() => {
    setUser( prev => sessionStorage.getItem('user') )
  });

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
              <>
                <NavBar 
                  items={getMenu()} 
                  current={user} 
                  onLogout={handlerEventLogout}
                  onLogin={()=>navigate(process.env.REACT_APP_ROUTE_LOGIN)} />
                <Home />
              </>
            } />
          <Route path={`${process.env.REACT_APP_ROUTE_LOGIN}`} element={<Login onLogin={handlerEventLogin} error={errorLogin}/>} />
          <Route 
            path={`${process.env.REACT_APP_ROUTE_MODULE}`}
            element={
              <>
                <NavBar 
                  items={getMenu()} 
                  current={user} 
                  onLogout={handlerEventLogout}
                  onLogin={()=>navigate(process.env.REACT_APP_ROUTE_LOGIN)} />
                <Modules />
              </>
            } />
          <Route 
            path={`${process.env.REACT_APP_ROUTE_MODULE}/:name`}
            element={
              <>
                <NavBar 
                  items={getMenu()} 
                  current={user} 
                  onLogout={handlerEventLogout}
                  onLogin={()=>navigate(process.env.REACT_APP_ROUTE_LOGIN)} />
                <Modules />
              </>
            } />
          <Route 
            path={`${process.env.REACT_APP_ROUTE_VARIABLE}/:name/:idProyect`}
            element={
              <>
                <NavBar 
                  items={getMenu()} 
                  current={user} 
                  onLogout={handlerEventLogout} 
                  onLogin={()=>navigate(process.env.REACT_APP_ROUTE_LOGIN)}/>
                <Variables />
              </>
            } />
          <Route 
            path={`${process.env.REACT_APP_ROUTE_ACTOR}/:name/:idActor`}
            element={
              <>
                <NavBar 
                  items={getMenu()} 
                  current={user} 
                  onLogout={handlerEventLogout} 
                  onLogin={()=>navigate(process.env.REACT_APP_ROUTE_LOGIN)}/>
                <Actors />
              </>
            } />
          <Route 
            path={`${process.env.REACT_APP_ROUTE_STAT}`}
            element={
              <>
                <NavBar 
                  items={getMenu()} 
                  current={user} 
                  onLogout={handlerEventLogout} 
                  onLogin={()=>navigate(process.env.REACT_APP_ROUTE_LOGIN)}/>
                <Stats />
              </>
            } />
        </Routes>
      
    </>
  );
}


