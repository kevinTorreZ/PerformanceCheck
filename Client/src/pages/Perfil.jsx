import React, { useEffect, useState } from 'react';
import axios from 'axios';
import jwt_decode from 'jwt-decode';

export function Perfil() {
    const [user, setUser] = useState(null);
    
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
                console.log(response.data)
                setUser(response.data);
            }).catch(error => {
                console.error(error);
            });
        }
    }, []);

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
