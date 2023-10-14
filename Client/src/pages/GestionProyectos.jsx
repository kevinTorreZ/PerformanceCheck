import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export function GestionProyectos() {
  const Navigate = useNavigate();

  const BuscarUsuarios = () => {
    const token = localStorage.getItem('token');
    if (token) {
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
  };

  return (
    <div>
      <h1>Hola</h1>
    </div>
  );
}
