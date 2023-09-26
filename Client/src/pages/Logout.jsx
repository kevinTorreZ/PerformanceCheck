import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Homero from '../img/Homero.gif'

export function Logout() {
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        localStorage.removeItem('token');
        localStorage.removeItem('refreshToken');
        setTimeout(() => {
            setLoading(false);
            navigate('/Login');
        }, 2000);
    }, [navigate]);

    return (
      <div className='cerrandoSesion'>
        <img src={Homero}/>
        <p>{loading ? 'Cerrando sesión...' : 'Redireccionando...'}</p>
      </div>
    );
}
