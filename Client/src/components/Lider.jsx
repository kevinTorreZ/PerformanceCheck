import React, { useEffect, useState } from 'react';
import axios from 'axios';
import jwt_decode from 'jwt-decode';

export function Lider() {
    const token = localStorage.getItem('token');
    const [AllSnapshots, setAllSnapshots] = useState([])

    useEffect(() => {
        const decodedToken = jwt_decode(token);
        const userId = decodedToken.user_id;

        const fetch = async () =>{
            const resSnapshot = await axios.get(
                `http://localhost:8000/api/Snapshot/`,
                {
                  headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                  },
                }
              );
              const resTeam = await axios.get(
                `http://127.0.0.1:8000/api/equipos/`,
                {
                  headers: {
                    Authorization: `Bearer ${token}`,
                  },
                }
              );

            const FilterTeams = resTeam.data.filter(team => team.Lider === userId)
            const FilterSnapshots = resSnapshot.data.filter(snapshot => snapshot.team.idEquipo === FilterTeams[0].idEquipo)
            setAllSnapshots(FilterSnapshots)
        }
        fetch();
      }, []);
  return (
    <div>
    <h1>Lider de equipo</h1>
    <hr/>
    <table>
        <thead>
            <tr>
                <th>Miembro de equipo</th>
                <th>Proyecto</th>
                <th>Función</th>
                <th>Fecha de inicio</th>
                <th>Estado</th>
                
            </tr>
        </thead>
        <tbody>
            {AllSnapshots.map((snapshot, index) => (
                <tr key={index}>
                    <td>{snapshot.User.Nombre}</td>
                    <td>{snapshot.project.Nombre}</td>
                    <td>{snapshot.Funcion}</td>
                    <td>{snapshot.startDate}</td>
                    <td>{snapshot.Estado}</td>
                    
                </tr>
            ))}
        </tbody>
    </table>
</div>
  );
}
