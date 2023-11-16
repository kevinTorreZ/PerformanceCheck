import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

export function Inicio() {
  const [token, setToken] = useState(null);
  const [refreshToken, setRefreshToken] = useState(null);
  const navigate = useNavigate();
  let timeout;


  useEffect(() => {
    const token = localStorage.getItem('token');
    setToken(token);
    const refreshToken = localStorage.getItem('refreshToken');
    setRefreshToken(refreshToken);
  }, [navigate]);

  return (
    <div>
      
      {/* {token && refreshToken ? <p>Estás logueado.</p> : 
        <p>No estás logueado.</p>}
        */}
      
    </div>
  );
}
