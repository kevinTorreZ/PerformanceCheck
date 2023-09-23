import React from "react";
import {BrowserRouter, Routes,Route} from 'react-router-dom'
import { Inicio } from "./pages/Inicio";
import { Login } from "./pages/Login";
import { Nav } from "./components/Nav"
import {AuthProvider} from "./components/verificador"
import { Logout } from "./pages/Logout";
import { Register } from "./pages/Registro";
import { Perfil } from "./pages/Perfil"
import { NotFoundPage }  from "./pages/NotFoundPage";
function App() {
  return(
    <AuthProvider>
      <BrowserRouter>
        <Nav/>
        <Routes>
          <Route path="/" element={<Inicio/>}/>
          <Route path="Registro/" element={<Register/>}/>
          <Route path="Login/" element={<Login/>}/>
          <Route path="Logout/" element={<Logout/>}/>
          <Route path="Perfil/" element={<Perfil/>}/>
          <Route path="*" element={<NotFoundPage/>}/>
          
        </Routes>
      </BrowserRouter>
    </AuthProvider>

  )
}
export default App;