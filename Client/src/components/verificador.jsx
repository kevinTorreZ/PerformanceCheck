import React, { createContext, useContext, useEffect, useState } from 'react';
import jwt_decode from 'jwt-decode';
import {BuscarUsuarioForId} from '../api/UserManagerAPI'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { faL } from '@fortawesome/free-solid-svg-icons';

// Crear un Contexto de Autenticación
const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        const refreshToken = localStorage.getItem('refreshToken');
        let user = null;
        setIsLoggedIn(!!token && !!refreshToken);
        setUser(user);
    }, []);

    const login = (token, refreshToken, user) => {
        localStorage.setItem('token', token);
        localStorage.setItem('refreshToken', refreshToken);
        localStorage.setItem('user', user);
        setIsLoggedIn(true);
        setUser(user);
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('user');
        setIsLoggedIn(false);
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ isLoggedIn, login, logout, user }}>
            {children}
        </AuthContext.Provider>
    );
}

// Aquí es donde exportamos la función useAuth
export function useAuth() {
    return useContext(AuthContext);
}

export function withAuth(Component) {
    return function AuthenticatedComponent(props) {
        const navigate = useNavigate();
        const token = localStorage.getItem('token');
        const userCargo = localStorage.getItem('UserData')
        const [isLoading, setIsLoading] = useState(true);

        useEffect(() => {
            // Comprueba si el usuario está autenticado
            if (token && userCargo != 'Administrador') {
                navigate('/')
                
            }
            if(!token){
                navigate('/login')
            }
            setIsLoading(false)
        }, [navigate, token]);
        if (isLoading) {
            return <div>Cargando...</div>;
        }else{
            return token ? <Component {...props} /> : null;
        }
        
    };
}
