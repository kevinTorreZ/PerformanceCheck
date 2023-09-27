import React, { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

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
        localStorage.setItem('user', JSON.stringify(user));
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

        useEffect(() => {
            if (!token) {
                navigate('/login');
            }
        }, [navigate, token]);

        return token ? <Component {...props} /> : null;
    };
}