import React, { useEffect, useState } from 'react';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import { CompletarSnapshot } from './CompletarSnapshot'

export function Lider({ handleCompletarSnapshot }) { // Añade handleCompletarSnapshot a las props
  const token = localStorage.getItem('token');
  const [AllSnapshots, setAllSnapshots] = useState([]);
  const [showCompletarSnapshot, setShowCompletarSnapshot] = useState(false);
  const [Allproyect, setAllproyect] = useState('')
  const [AllUsers, setAllUsers] = useState('')
  const [Allteam, setAllteam] = useState('')

  useEffect(() => {
    const decodedToken = jwt_decode(token);
    const userId = decodedToken.user_id;

    const fetch = async () => {
      const resSnapshot = await axios.get(
        `http://localhost:8000/api/Snapshot/`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      ); const resUser = await axios.get(
        `http://127.0.0.1:8000/users/`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const resProyect = await axios.get(
        `http://127.0.0.1:8000/api/proyectos`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
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

      const allProjectsObj = resProyect.data.reduce((obj, project) => ({ ...obj, [project.idProyecto]: project }), {});
      const allTeamsObj = resTeam.data.reduce((obj, team) => ({ ...obj, [team.idEquipo]: team }), {});
      const allUsersObj = resUser.data.reduce((obj, user) => ({ ...obj, [user.idUsuario]: user }), {});

      setAllteam(allTeamsObj);
      setAllproyect(allProjectsObj);
      setAllUsers(allUsersObj);
      const FilterTeams = resTeam.data.filter(team => team.Lider === userId)
      console.log(FilterTeams)
      const FilterSnapshots = resSnapshot.data.filter(snapshot => snapshot.team === FilterTeams[0].idEquipo)
      setAllSnapshots(FilterSnapshots)
      console.log(FilterSnapshots)
    };
    fetch();
  }, []);

  const handleCompletarSnapshotClick = () => {
    handleCompletarSnapshot();
    setShowCompletarSnapshot(true);
  };
  const handleCancelarClick = () => {
    setShowCompletarSnapshot(false);
    handleCompletarSnapshot();
  };
  if (showCompletarSnapshot) {
    return <CompletarSnapshot handleCancelarClick={handleCancelarClick} />;
  }

  return (
    <div>
      <h1>Lider de equipo</h1>
      <hr />
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
          {AllSnapshots.map((snapshot, index) => {
            const user = AllUsers[snapshot.user];
            const team = Allteam[snapshot.team];
            const project = Allproyect[snapshot.project];

            return (
              <tr key={index}>
                <td>{user.Nombre}</td>
                <td>{project ? project.Nombre : null}</td>
                <td>{snapshot.Funcion}</td>
                <td>{snapshot.startDate}</td>
                <td>
                  {snapshot.Estado === 'Pendiente' ?
                    <button onClick={handleCompletarSnapshotClick}>
                      Completar Snapshot
                    </button>
                    :
                    snapshot.Estado === 'Completado' ?
                      <div>
                        Completado
                        <h1>{snapshot.endDate}</h1>
                      </div>
                      :
                      snapshot.Estado
                  }
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
