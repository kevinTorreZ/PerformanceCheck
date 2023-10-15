import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export function GestionProyectos() {
  const Navigate = useNavigate();
  const token = localStorage.getItem('token');
  const UserCargo = localStorage.getItem('UserData')

  useEffect(() => {
    if (token && UserCargo === 'Administrador') {
        axios.get(`http://localhost:8000/users/`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then(response => {
            setUsuarios(response.data);
        }).catch(error => {
            console.error(error);
        });
    } else {
      Navigate('/login');
    }
},[]);
  

  return (
    <div>
      <h1>Gestionador proyectos y equipos</h1>
    </div>
  );
}
