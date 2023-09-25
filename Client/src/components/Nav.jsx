import React, { useEffect, useState } from 'react';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import { useAuth } from '../components/verificador';

export function Nav() {
    const { isLoggedIn, logout } = useAuth();
    const [rol, setRol] = useState('');

    const handleLogout = () => {
        logout();
    };

    useEffect(() => {
        if (isLoggedIn) {
            const token = localStorage.getItem('token');
            const decodedToken = jwt_decode(token);
            const userId = decodedToken.user_id;
            
            axios.get(`http://localhost:8000/users/${userId}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }).then(response => {
                setRol(response.data.Cargo)
            }).catch(error => {
                console.error(error);
            });
        } else {
            setRol('');
        }
    }, [isLoggedIn]);

    return (
        <div>
            <header style={{background:'red',padding:'10px',display:'flex',position:'relative',color:'white'}}>
                <ul  style={{display:'flex',listStyle:'none'}}> 
                    <a href={'/'}  style={{margin:'10px',textDecoration:'None',color:'white'}}><li>Inicio</li></a>
                    <a href={'/Perfil'}  style={{margin:'10px',textDecoration:'None',color:'white'}}><li>Perfil</li></a>
                    {isLoggedIn && rol === 'Lider' && (
                        <a href={'/SolicitudGrupal'}  style={{margin:'10px',textDecoration:'None',color:'white'}}><li>Solicitud Grupal</li></a>
                    )}
                    {isLoggedIn && rol === 'Administrador' && (
                        <a href={'/GestionUsuarios'}  style={{margin:'10px',textDecoration:'None',color:'white'}}><li>Gestionar Usuarios</li></a>
                    )}
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
