import React, { useEffect, useState } from 'react';
import {BrowserRouter, Routes,Route} from 'react-router-dom'
import { Inicio } from "./pages/Inicio";
import { Login } from "./pages/Login";
import { Nav } from "./components/Nav"
import {AuthProvider,useAuth} from "./components/verificador"
import { Logout } from "./pages/Logout";
import { withAuth } from './components/verificador';
import { GestionUsuarios } from "./pages/GestionUsuarios";
import { GestionProyectos } from "./pages/GestionProyectos";
import { Snapshosts } from "./pages/Snpashots";
import { Reportes } from "./pages/Reportes";
import { Perfil } from "./pages/Perfil"
import LineaTiempo from './pages/LineaTiempo';
import { NotFoundPage }  from "./pages/NotFoundPage";
import Footer from './components/Footer';

function App() {
  const AuthenticatedGestionUsuarios = withAuth(GestionUsuarios);
  const AuthenticatedGestionProyectos = withAuth(GestionProyectos);
  const AuthenticatedSnapshosts = withAuth(Snapshosts);

  return(
    <AuthProvider>
      <BrowserRouter>
        <Nav/>
        <Routes>
          <Route path="/" element={<Inicio/>}/>
          <Route path="Login/" element={<Login/>}/>
          <Route path="Logout/" element={<Logout/>}/>
          <Route path="Perfil/" element={<Perfil/>}/>
          <Route path="LineaTiempo/" element={<LineaTiempo/>}/>
          <Route path="GestionProyectos/" element={<AuthenticatedGestionProyectos/>}/>
          <Route path="GestionUsuarios/" element={<AuthenticatedGestionUsuarios/>}/>
          <Route path="Snapshots/" element={<Snapshosts/>}/>
          <Route path="Reportes/" element={<Reportes/>}/>
          <Route path="*" element={<NotFoundPage/>}/>

        </Routes>
        <Footer/>
      </BrowserRouter>
    </AuthProvider>
  )
}
export default App;