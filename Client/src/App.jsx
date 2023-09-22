import React from "react";
import {BrowserRouter, Routes,Route, Navigate} from 'react-router-dom'
import { Inicio } from "./pages/Inicio";
import { Login } from "./pages/Login";
import { Logout } from "./pages/Logout";
import { Register } from "./pages/Registro";
import { NotFoundPage }  from "./pages/NotFoundPage";
function App() {
  return(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Inicio/>}/>
        <Route path="Registro/" element={<Register/>}/>
        <Route path="Login/" element={<Login/>}/>
        <Route path="Logout/" element={<Logout/>}/>
        <Route path="*" element={<NotFoundPage/>}/>
        
      </Routes>
    </BrowserRouter>
  )
}
export default App;