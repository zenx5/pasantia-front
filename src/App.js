import { Route, Routes, useNavigate } from "react-router-dom"
import { LatBar, NavBar } from "./components";
import { Home, Login, Modules, Variables } from "./routes";


export default function App() {
  const navigate = useNavigate()

  const getMenu = () => {
    return [
      { label: 'Home', action: ()=>navigate(process.env.REACT_APP_ROUTE_MAIN) },
      { label: 'Modules', action: ()=>navigate(`/${process.env.REACT_APP_ROUTE_MODULE}`) },
    ]
  }

  return (<>
      
        <Routes>
          <Route 
            path="/" 
            element={
              <>
                <NavBar items={getMenu()} />
                <Home />
              </>
            } />
          <Route path="login" element={<Login />} />
          <Route 
            path="modules" 
            element={
              <>
                <NavBar items={getMenu()} />
                <Modules />
              </>
            } />
          <Route 
            path="modules/:name" 
            element={
              <>
                <NavBar items={getMenu()} />
                <Modules />
              </>
            } />
          <Route 
            path="variables/:name" 
            element={
              <>
                <NavBar items={getMenu()} />
                <Variables />
              </>
            } />
        </Routes>
      
    </>
  );
}


