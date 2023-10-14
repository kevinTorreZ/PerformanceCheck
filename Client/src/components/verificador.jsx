import React, { createContext, useContext, useEffect, useState } from 'react';
import jwt_decode from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

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
        const asda = localStorage.getItem('userData');
        const decodedToken = jwt_decode(token);
        const user_id = decodedToken;
        console.log(asda)
        useEffect(() => {
            const verificarAdmin = async () => {
                const esAdmin = await VerifyAdm();

                // Si el usuario no es administrador, redirige
                if (!esAdmin) {
                    navigate('/', { replace: true });
                }
            };

            // Comprueba si el usuario está autenticado
            if (token) {
                // Verifica si el usuario es administrador
                verificarAdmin();
            }
        }, [navigate, token]);

        return token ? <Component {...props} /> : null;
    };
}
