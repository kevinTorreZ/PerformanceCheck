import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import jwt_decode from 'jwt-decode';
import { useAuth } from '../components/verificador';
import Amborgesa from './Hambuger';

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
    const [clicked, setClicked] = useState(false)
    const handleClick = () => {
        setClicked(!clicked)
    }
    return (
        <div className="contDiv">
            <NavCont>
                <div className="logo"></div>
                <div className={`links ${clicked ? 'active' : ''}`}>

                    <a href={'/'}>Inicio</a>
                    <a href={'/Perfil'}>Perfil</a>
                    {isLoggedIn && rol === 'Lider' && (
                        <a href={'/SolicitudGrupal'} >Solicitud Grupal</a>
                    )}
                    {isLoggedIn && rol === 'Administrador' && (
                        <a href={'/GestionUsuarios'}>Gestionar Usuarios</a>
                    )}
                    <a href={'/'}>Proyecto</a>
                    {isLoggedIn ? (
                        <a href={'/logout'} onClick={handleLogout}>Salir</a>
                    ) : (
                        <>
                            <a href={'/login'}>Login</a>
                            <a href={'/Registro'}>Registrarse</a>
                        </>
                    )}
                </div>
                <div className="LaBurger">
                    <Amborgesa clicked={clicked} handleClick={handleClick} />
                </div>
                <BackDiv className={`initial ${clicked ? ' active' : ''}`}></BackDiv>
            </NavCont>
        </div>
    );
}


const NavCont = styled.nav`
    @import url('https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,100;0,300;0,400;0,700;0,900;1,100;1,300;1,400;1,700;1,900&family=Rubik:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');
    max-width: 1280px;
    margin: 0 auto;
    height: 60px;
    max-height: 60px;
    .logo{
        background-image: url("https://res.cloudinary.com/dln364ilz/image/upload/v1695423691/Logo1_wjvqst.png");
        background-size: contain;
        background-repeat: no-repeat;
        width: 100%;
        height: 60px;
      
    }
    padding: .4rem;
    background-color: #0F1128;
    display: flex;
    justify-content: space-between;
    align-items: center;
    a{
        color: white;
        text-decoration: none;
        margin-right: 1rem;
        font-family: 'Lato', sans-serif;
        
    }
    .links{
        position: absolute;
        top: -100px;
        left: -2000px;
        right: 0;
        margin-left: auto;
        margin-right: auto;
        text-align: center;
        transition: all .5s ease;
        a{
            color: white;
            font-size: 3rem;
            font-weight: bold;
            display: block;
            transition: .2s ease;
            &:hover{
                color: #8D8D8D;
            }
        }
        @media(min-width: 768px){
        
            position: initial;
            margin: 0;
            margin-right: 1rem;
            a{
                font-size: 1.1rem;
                color: white;
                display: inline;
            }
            display: block;
        }
    }

    .links.active{
        width: 100%;
        display: block;
        position: absolute;
        margin-left: auto;
        margin-right: auto;
        top: 30%;
        left: 0;
        right: 0;
        text-align: center;
        a{
            font-size: 2rem;
            color:white;
            margin-top: 1rem;
        }
    }
    .LaBurger{
        @media(min-width: 768px){
            display: none;
        }
    }
`

const BackDiv = styled.div`
    position: absolute;
    background-color: #0F1128;
    top: -2000px;
    left: -2000px;
    width: 100%;
    height: 100%;
    z-index: -1;
    transition: all .6s ease;
    &.active{
        top:0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: -1;
    }
    
`
