// Importaciones necesarias
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

// Componente Miembro
export function Miembro() {
  // Definición de estados
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
  const [UserSnap, setUserSnap] = useState('')
  const navigate = useNavigate();

  // Efecto para manejar el inicio de sesión y la navegación
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

  // Función para manejar el cambio de proyecto
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

  // Función para manejar el cambio de función
  const handleFunctionChange = (e) => {
    setFuncion(e.target.value);
  };

  // Función para manejar el siguiente paso
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
          setStep(4);
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  // Si el usuario no está logueado, no se devuelve nada
  if (!isLoggedIn) {
    return null;
  }

  // Renderizado del componente
  return (
    <div>
      {/* Paso 1: Se muestra un formulario para seleccionar el proyecto, el equipo, la función y la información adicional. */}
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

      {/* Paso 2: Se muestran dos campos de entrada para seleccionar las fechas de inicio y fin. */}
      {step === 2 && (
        <div>
          <h1>Tiempo</h1>
          <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} min={new Date().toISOString().split('T')[0]} />
          <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} min={startDate} disabled={!startDate} />
        </div>
      )}

      {/* Paso 3: Se muestra un resumen de la información del snapshot. */}
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

      {/* Paso 4: Se muestra un mensaje de agradecimiento indicando que el snapshot ha sido enviado al líder del equipo. */}
      {step === 4 && (
        <div>
          <h1>¡Gracias!</h1>
          <p>El snapshot se ha enviado a tu lider de equipo.</p>
        </div>
      )}

      {/* Si el paso es menor que 4, se muestra un botón para avanzar al siguiente paso o enviar el snapshot. */}
      {step < 4 && (
        <button onClick={handleNext}>{step < 3 ? 'Siguiente' : 'Enviar Snapshot'}</button>
      )}

    </div>
  );
}