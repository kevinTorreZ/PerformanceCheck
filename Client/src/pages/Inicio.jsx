import React, { useEffect, useState } from 'react';
import { useNavigate,Link } from 'react-router-dom';
export function Inicio() {
    const [token, setToken] = useState(null);
    const navigate = useNavigate();

    // Cuando se carga el componente, verifica si hay un token en el almacenamiento local
    useEffect(() => {
        const token = localStorage.getItem('token');
        setToken(token);
    }, []);

    return (
      <div>
        {token ? <p>Estás logueado. <Link to={'/Logout'}>Salir</Link></p> : 
        <p>No estás logueado. <Link to={'/Login'}>Login</Link> <Link to={'/Registro'}>Registrarse</Link></p>}

        
      </div>
    );
}