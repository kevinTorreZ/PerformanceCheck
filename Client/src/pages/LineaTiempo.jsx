import React, { useEffect, useState } from 'react';
import axios from 'axios';
import jwt_decode from 'jwt-decode';

export function LineaTiempo() {
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
                setUser(response.data);
            }).catch(error => {
                console.error(error);
            });
        }
    }, []);

    return (
      <div>
        <p>Historial de Proyectos</p>
        {user && (
            <div>
                <p>Nombre Proyecto: {user.Fk_proyecto_asignado_id.Nombre}</p>
                <p>Nombre del Equipo: {user.Fk_equipo_asignado_id.Nombre_equipo}</p>
                <p>Descripcion del proyecto: {user.Fk_proyecto_asignado_id.Descripcion}</p>
                <p>Fecha Limite: {new Date(user.Fk_proyecto_asignado_id.FechaLimite).toLocaleDateString('es-ES')}</p>
            </div>
        )}
      </div>
    );
}