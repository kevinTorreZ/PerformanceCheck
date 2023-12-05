import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import jwt_decode from 'jwt-decode';

export function Miembro() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [step, setStep] = useState(1);
  const [Funcion, setFuncion] = useState('');
  const [projectTitle, setProjectTitle] = useState('');
  const [team, setTeam] = useState('');
  const [additionalInfo, setAdditionalInfo] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [userProjects, setUserProjects] = useState([]);
  const [teamName, setTeamName] = useState('');
  const [teamLeader, setTeamLeader] = useState('');
  const [MySnapshots, setMySnapshots] = useState('');
  const [Allproyect, setAllproyect] = useState('')
  const [AllUsers, setAllUsers] = useState('')
  const [Allteam, setAllteam] = useState('')
  const [UserSnap, setUserSnap] = useState('')
  const navigate = useNavigate();


  const BuscarAll = () => {
    const token = localStorage.getItem('token');

    const Fetch = async () => {
      const resUser = await axios.get(
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

      // Convertir los arrays a objetos para un acceso más rápido
      const allProjectsObj = resProyect.data.reduce((obj, project) => ({ ...obj, [project.idProyecto]: project }), {});
      const allTeamsObj = resTeam.data.reduce((obj, team) => ({ ...obj, [team.idEquipo]: team }), {});
      const allUsersObj = resUser.data.reduce((obj, user) => ({ ...obj, [user.idUsuario]: user }), {});

      setAllteam(allTeamsObj);
      setAllproyect(allProjectsObj);
      setAllUsers(allUsersObj);
    }

    useEffect(() => {
      Fetch();
    }, []);
  }
  BuscarAll();

  const RefreshSnapshots = async () =>{
      const resAllSnapshots = await axios.get(
        `http://localhost:8000/api/Snapshot/`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      const FilterSnapshots = resAllSnapshots.data.filter(Snapshot => Snapshot.user === UserSnap.idUsuario)
      setMySnapshots(FilterSnapshots)
  }


  useEffect(() => {
    const token = localStorage.getItem('token');
    const decodedToken = jwt_decode(token);
    const userId = decodedToken.user_id;
    if (token) {
      setIsLoggedIn(true);
      const fetchData = async () => {
        try {
          const resUser = await axios.get(
            `http://localhost:8000/api/users/${userId}/`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          const resAllTeams = await axios.get(
            `http://localhost:8000/api/equipos/`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          const resAllSnapshots = await axios.get(
            `http://localhost:8000/api/Snapshot/`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          const resAllProjects = await axios.get(
            `http://localhost:8000/api/proyectos`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          const FilterSnapshots = resAllSnapshots.data.filter(Snapshot => Snapshot.user === resUser.data.idUsuario)
          setMySnapshots(FilterSnapshots)
          console.log(FilterSnapshots)
          const userTeamId = resUser.data.Fk_equipo_asignado_id;
          const FilterTeamUser = resAllTeams.data.filter(Team => Team.idEquipo === resUser.data.Fk_equipo_asignado_id)
          const userProjects = resAllProjects.data.filter(project => project.Fk_equipo_asignado === userTeamId);
          setUserProjects(userProjects);
          setUserSnap(resUser.data)
          setTeam(FilterTeamUser)
          if (userProjects.length === 1) {
            setProjectTitle(userProjects[0].Nombre)
          }
          const resUserSearch = await axios.get(
            `http://localhost:8000/api/users/${FilterTeamUser[0].Lider}/`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          setTeamName(FilterTeamUser[0].Nombre_equipo)
          setTeamLeader(resUserSearch.data.Nombre)
        } catch (error) {
          console.error(error);
        }
      };
      fetchData();
    } else {
      navigate('/login');
    }
  }, []);

  const handleProjectChange = async (e) => {
    setProjectTitle(e.target.value);
    try {
      const resProject = await axios.get(
        `http://localhost:8000/api/proyectos/${e.target.value}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      setTeam(resProject.data.Fk_equipo_asignado);
    } catch (error) {
      console.error(error);
    }
  };

  const handleFunctionChange = (e) => {
    setFuncion(e.target.value);
  };

  const handleNext = async () => {
    if (step === 2) {
      if (!startDate || !endDate || new Date(startDate) > new Date(endDate)) {
        alert('Por favor, selecciona un rango de fechas válido');
        return;
      }
    }

    if (step === 1 && !Funcion) {
      alert('Por favor, ingresa una función antes de continuar.');
      return;
    }

    if (step < 3) {
      setStep(step + 1);
    } else {
      try {
        if (UserSnap && UserSnap.idUsuario) {
          const Snapshotinfo = {
            project: userProjects[0].idProyecto,
            team: team[0].idEquipo,
            Funcion: Funcion,
            additionalInfo: additionalInfo,
            user: UserSnap.idUsuario,
            startDate: startDate,
            endDate: endDate,
            Estado: 'Pendiente',
          }
          await axios.post(
            `http://localhost:8000/api/Snapshot/`, Snapshotinfo,
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
              },
            }
          )
          RefreshSnapshots();
          setStep(4);
        }
      } catch (error) {
        console.error(error);
      }
    }
  };



  if (!isLoggedIn) {
    return null;
  }

  return (
    <div>
      {step === 1 && (
        <div>
          <label>
            Proyecto
            <select value={projectTitle} onChange={handleProjectChange}>
              {userProjects.map((proyecto) => (
                <option key={proyecto.idProyecto} value={proyecto.idProyecto}>
                  {proyecto.Nombre}
                </option>
              ))}
            </select>
          </label>
          <label>
            Equipo
            <input type="text" value={teamName} readOnly />
          </label>
          <label>
            Funcion
            <input type="text" placeholder='Ingrese la función...' value={Funcion} onChange={handleFunctionChange} required />
          </label>
          <textarea value={additionalInfo} onChange={(e) => setAdditionalInfo(e.target.value)} placeholder="Información adicional (opcional)" />
        </div>
      )}

      {step === 2 && (
        <div>
          <h1>Tiempo</h1>
          <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} min={new Date().toISOString().split('T')[0]} />
          <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} min={startDate} disabled={!startDate} />
        </div>
      )}

      {step === 3 && (
        <div>
          <h1>Información del Snapshot</h1>
          <p>Proyecto: {projectTitle}</p>
          <p>Equipo: {teamName}</p>
          <p>Lider del equipo: {teamLeader}</p>
          <p>Función: {Funcion}</p>
          <p>Información adicional: {additionalInfo}</p>
          <p>Tiempo: {startDate} - {endDate}</p>
        </div>
      )}
      {step === 4 && (
        <div>
          <h1>¡Gracias!</h1>
          <p>El snapshot se ha enviado a tu lider de equipo.</p>
        </div>
      )}

      {step < 4 && (
        <button onClick={handleNext}>{step < 3 ? 'Siguiente' : 'Enviar Snapshot'}</button>
      )}


      {MySnapshots && (
        <div>
          <h1>Mis snapshots</h1>

          <table>
            <thead>
              <tr>
                <th>Líder de equipo</th>
                <th>Proyecto</th>
                <th>Fecha solicitada</th>
                <th>Estado</th>
              </tr>
            </thead>
            <tbody>
              {MySnapshots.map((snapshot) => {
                const team = Allteam[snapshot.team];
                const project = Allproyect[snapshot.project];
                const leader = AllUsers[team.Lider];
                return (
                  <tr key={snapshot.idSnapshot}>
                    <td>{leader.Nombre}</td>
                    <td>{project.Nombre}</td>
                    <td>{snapshot.startDate}</td>
                    <td>{snapshot.Estado}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
