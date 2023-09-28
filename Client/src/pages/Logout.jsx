import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Homero from '../img/Homero.gif';
import { useAuth } from '../components/verificador';

export function Logout() {
    const [loading, setLoading] = useState(true);
    const Navigate = useNavigate()
    const {logout} = useAuth()
    useEffect(() => {
        logout()
        setTimeout(() => {
            setLoading(false);
            Navigate('/');
        }, 2000);
    }, []);

    return (
      <div className='cerrandoSesion'>
        <img src={Homero}/>
        <p>{loading ? 'Cerrando sesión...' : 'Redireccionando...'}</p>
      </div>
    );
}
