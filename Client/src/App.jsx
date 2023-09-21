import React from "react";
import {BrowserRouter, Routes,Route, Navigate} from 'react-router-dom'
import { Inicio } from "./pages/Inicio";
import { Register } from "./pages/Registro";
function App() {
  return(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Inicio/>}/>
        <Route path="Registro/" element={<Register/>}/>
      </Routes>
    </BrowserRouter>
  )
}
export default App;