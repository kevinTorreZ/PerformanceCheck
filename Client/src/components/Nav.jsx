import React, { useEffect } from 'react';
import { useAuth } from '../components/verificador';

export function Nav() {
    const { isLoggedIn, logout } = useAuth();

    const handleLogout = () => {
        logout();
    };

    return (
        <div>
            <header style={{background:'red',padding:'10px',display:'flex',position:'relative',color:'white'}}>
                <ul  style={{display:'flex',listStyle:'none'}}> 
                    <a href={'/'}  style={{margin:'10px',textDecoration:'None',color:'white'}}><li>Inicio</li></a>
                    <a href={'/Perfil'}  style={{margin:'10px',textDecoration:'None',color:'white'}}><li>Perfil</li></a>
                    <a href={'/'}  style={{margin:'10px',textDecoration:'None',color:'white'}}><li>Proyecto</li></a>
                </ul>
                <div style={{display:'flex',position:'absolute',right:'100px',top:'35px'}}>
                    {isLoggedIn ? (
                        <a href={'/logout'} onClick={handleLogout} style={{textDecoration:'none',color:'white'}}>Salir</a>
                    ) : (
                        <>
                            <a href={'/login'} style={{textDecoration:'none',color:'white',marginRight:'10px'}}>Login</a>
                            <a href={'/Registro'} style={{textDecoration:'none',color:'white'}}>Registrarse</a>
                        </>
                    )}
                </div>
            </header>
        </div>
    );
}
