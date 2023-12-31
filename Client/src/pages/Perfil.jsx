import React, { useEffect, useState } from 'react';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import { useNavigate } from 'react-router-dom';

export function Perfil() {
    const [user, setUser] = useState(null);
    let navigate = useNavigate();
    
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            const decodedToken = jwt_decode(token);
            const userId = decodedToken.user_id;
            
            axios.get(`http://localhost:8000/users/${userId}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }).then(response => {
                setUser(response.data);
            }).catch(error => {
            });
        }else{
            navigate('/login');
        }
    }, [navigate]);

    return (
      <div>
        <p>Perfil</p>
        {user && (
            <div>
                <p>Nombre: {user.Nombre}</p>
                <p>Email: {user.email}</p>
                <p>Cargo: {user.Cargo}</p>
                <p>Cargo: {user.idUsuario}</p>
                {/* Añade aquí más campos según sea necesario */}
            </div>
        )}
      </div>
    );
}