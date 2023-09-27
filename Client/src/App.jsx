import React, { useEffect, useState } from 'react';
import {BrowserRouter, Routes, Route, useNavigate} from 'react-router-dom'
import { Inicio } from "./pages/Inicio";
import { Login } from "./pages/Login";
import { Nav } from "./components/Nav"
import {AuthProvider, useAuth} from "./components/verificador"
import { Logout } from "./pages/Logout";
import { GestionUsuarios } from "./pages/GestionUsuarios";
import { Perfil } from "./pages/Perfil"
import { NotFoundPage }  from "./pages/NotFoundPage";
import Footer from "./components/Footer";

function App() {
  return(
    <BrowserRouter>
      <AuthProvider>
        <RoutesComponent />
      </AuthProvider>
    </BrowserRouter>
  )
}

function RoutesComponent() {
  const {isLoggedIn} = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/Login');
    }
  }, [isLoggedIn, navigate]);

  return (
    <>
      <Nav/>
      <Routes>
        <Route path="/" element={<Inicio/>}/>
        <Route path="Login/" element={<Login/>}/>
        <Route path="Logout/" element={<Logout/>}/>
        <Route path="Perfil/" element={<Perfil/>}/>
        <Route path="GestionUsuarios/" element={<GestionUsuarios/>}/>
        <Route path="*" element={<NotFoundPage/>}/>
      </Routes>
      <Footer/>
    </>
  );
}

export default App;
