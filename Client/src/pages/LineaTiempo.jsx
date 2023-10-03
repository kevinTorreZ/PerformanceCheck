import React, { useEffect, useState } from 'react';
import axios from 'axios';
import jwt_decode from 'jwt-decode';

export function LineaTiempo() {

    useEffect(() => {
        const User = localStorage.getItem('user');
        // if (equipo) {
        //     const token = localStorage.getItem('token');
        //     axios.get(`http://localhost:8000/api/proyectos/${equipos[equipo - 1].Fk_proyecto_asignado_id}`, {
        //         headers: {
        //             'Authorization': `Bearer ${token}`
        //         }
        //     }).then(response => {
        //         if (response.data) {
        //             console.log(response.data)
        //             setProyectos([response.data]);
        //         } else {
        //             console.error('La API no devolvió un objeto');
        //         }
        //     }).catch(error => {
        //         console.error(error);
        //     });
        // }
        // else {
        //     setProyectos([])
        // }
        console.log(User)
    }, []);
    
    
    return (
      <div>
        {/* <p>Historial de Proyectos</p>
        {user ? (
            <div>
                <p>Nombre Proyecto: {user.Fk_proyecto_asignado_id}</p>
                <p>Nombre del Equipo: {user.Fk_equipo_asignado_id ? user.Fk_equipo_asignado_id.Nombre_equipo : 'No disponible'}</p>
                <p>Descripcion del proyecto: {user.Fk_proyecto_asignado_id ? user.Fk_proyecto_asignado_id.Descripcion : 'No disponible'}</p>
                <p>Fecha Limite: {user.Fk_proyecto_asignado_id ? new Date(user.Fk_proyecto_asignado_id.FechaLimite).toLocaleDateString('es-ES') : 'No disponible'}</p>
            </div>
        ) : (
            <p>No se encontraron proyectos.</p>
        )} */}
      </div>
    );
}