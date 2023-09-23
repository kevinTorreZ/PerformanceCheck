import React, { createContext, useContext, useEffect, useState } from 'react';

// Crear un Contexto de Autenticación
const AuthContext = createContext();

// Crear un Proveedor de Autenticación que maneje el estado de inicio de sesión
export function AuthProvider({ children }) {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        const refreshToken = localStorage.getItem('refreshToken');
        setIsLoggedIn(!!token && !!refreshToken);
    }, []);

    const login = (token, refreshToken) => {
        localStorage.setItem('token', token);
        localStorage.setItem('refreshToken', refreshToken);
        setIsLoggedIn(true);
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('refreshToken');
        setIsLoggedIn(false);
    };

    return (
        <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

// Crear un hook personalizado para usar el Contexto de Autenticación
export function useAuth() {
    return useContext(AuthContext);
}