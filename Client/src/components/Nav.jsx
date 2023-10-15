import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import jwt_decode from 'jwt-decode';
import { useAuth } from './verificador';
import Amborgesa from './Hambuger';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightToBracket, faHouse, faUser, faBell, faTrash } from '@fortawesome/free-solid-svg-icons';
import logo from "../img/Dunder-Mifflin.png"
import { ToastContainer, toast, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

export function Nav() {
    const { isLoggedIn, logout } = useAuth();
    const [rol, setRol] = useState('');
    const [taOpen, setTaOpen] = useState(false);
    const types = ['info', 'success', 'error'];
    const Navigate = useNavigate();
    const handleCampanovishClick = () => {
        setTaOpen(!taOpen);
        setHasNotifications(false);
    };

    const [toastIds, setToastIds] = useState([]);
    const [hasToast, setHasToast] = useState(false);

    const [hasNotifications, setHasNotifications] = useState(false);

    
    const addTostadita = () => {
        const type = types[Math.floor(Math.random() * types.length)];
        const toastId = Math.random();
        toast("Lorem ipsum dolor sit amet, consectetur adipiscing elit", {
            toastId: toastId,
            type: type,
            position: "top-center",
            autoClose: false,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: false,
            draggable: false,
            progress: undefined,
            transition: Slide,
        });
        setToastIds(prevToastIds => [...prevToastIds, toastId]);
        setHasToast(true);
        setHasNotifications(true);
    }

    const handleLogout = () => {
        Navigate('/Logout');
    };

    const removertoas = () => {
        toastIds.forEach((toastId) => toast.dismiss(toastId));
        setToastIds([]);
        setHasNotifications(false);
    };

    
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (taOpen && !document.getElementsByClassName('contNoti')[0].contains(event.target)) {
                setTaOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [taOpen]);


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
                if (error.response.status === 401) { 
                    Navigate('/Logout'); 
                }
            });
        } else {
            setRol('');
        }
    }, [isLoggedIn]);
useEffect(() => {
    const intervalo = setInterval(async () => {
        const token = localStorage.getItem('token');
        const refreshToken = localStorage.getItem('refreshToken');
        if(token){
            try {
                const decodedToken = jwt_decode(token);
                const dateNow = new Date();
                if (decodedToken.exp < dateNow.getTime() / 2000 || dateNow.getTime() - decodedToken.iat > 86400) {
                    try {
                        const response = await fetch('http://127.0.0.1:8000/api/token/refresh/', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({refresh: refreshToken}),
                        });
                        if(response.ok) {
                            const data = await response.json();
                            localStorage.setItem('token', data.access);
                        } else {
                            console.error('Error al refrescar el token');
                        }
                    } catch (error) {
                        console.error('Error al refrescar el token', error);
                    }
                }
            } catch (error) {
                console.error('Error al decodificar el token', error);
            }
        }
    }, 1000);
    return () => clearInterval(intervalo);
}, []);
  
    const [clicked, setClicked] = useState(false)
    const handleClick = () => {
        setClicked(!clicked)
    }
    return (
        <div className="contDiv">
            <NavCont>
                <a href='/'><img className="logo" src={logo} /></a>
                <div className={`links ${clicked ? 'active' : ''}`}>
                    {isLoggedIn ? (
                        <div><a href={'/logout'} onClick={handleLogout}><FontAwesomeIcon icon={faRightToBracket} /> Salir</a>
                            <div>
                                <a id="bellIcon" onClick={handleCampanovishClick}>
                                <FontAwesomeIcon icon={faBell} />
                                {hasNotifications && <span className='notipuntito'></span>}
                                </a>
                                <BellIconContainer className='contCampanovish'>
                                    <NotificationCenter className='scrollbar contNoti' id="scrollbar1" style={{ display: taOpen ? 'block' : 'none' }}>
                                        <div className="divNotificaciones">
                                            {toastIds.length > 0 ? (
                                                <div>
                                                    <button id="btnEliminar" onClick={removertoas}><FontAwesomeIcon icon={faTrash}/> Borrar notificaciones</button>
                                                    <StyledToastContainer />
                                                </div>
                                            ) : (
                                                <p>No hay notificaciones</p>
                                            )}
                                        </div>
                                    </NotificationCenter>
                                </BellIconContainer>
                            </div>
                        </div>
                    ) : (
                        <>
                            <a href={'/login'}> <FontAwesomeIcon icon={faRightToBracket} /> Login</a>
                        </>
                    )}
                    {isLoggedIn && rol === 'Lider' && (
                        <a href={'/SolicitudGrupal'} >Solicitud Grupal</a>
                    )}
                    {isLoggedIn && rol === 'Administrador' && (<>
                        <a href={'/GestionUsuarios'}>Gestionar Usuarios</a>
                        <a href={'/GestionProyectos'}>Gestionar Proyectos</a>
                    </>
                    )}
                    {isLoggedIn && (rol === 'Lider' || rol === 'Miembro') && (<>
                        <a href={'/'}>Proyecto</a>
                        <a href={'/LineaTiempo'}> Linea de Tiempo</a>
                    </>)}
                    {isLoggedIn && (<a href={'/Perfil'}><FontAwesomeIcon icon={faUser} /> Perfil</a>)}
                    <a href={'/'}><FontAwesomeIcon icon={faHouse} /> Inicio</a>
                    <button onClick={addTostadita}>PRUEBA</button>
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
        background-size: contain;
        background-repeat: no-repeat;
        width: 130px;
        height: 60px;
        float: left;
    }
    padding: .4rem;
    background-color: transparent;
    display: flex;
    justify-content: space-between;
    align-items: center;
    a{
        color: white;
        text-decoration: none;
        margin-right: 1rem;
        font-family: 'Helvetica', 'Arial', sans-serif;
        
    }
    .links{
        position: absolute;
        top: -100px;
        left: -2000px;
        width: 1000px;
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
            text-shadow:  1px 1px 0.1px black;
            float: right;
            user-select: none;
            &:hover{
                color: #272B25;
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

const NotificationCenter = styled.div`
    position: absolute;
    background-color: #E9E9E9;
    border-radius: 10px;
    box-shadow: 0px 0px 5px 1px gray;
    width: 350px;
    height: auto;
    top: 2rem;
    color: #60544B;
    right: 0;
`
const BellIconContainer = styled.div`
    position: relative;
`

const StyledToastContainer = styled(ToastContainer)`
    position: absolute;
    top: 0;
    right: 0;
    overflow: hidden;
`;
