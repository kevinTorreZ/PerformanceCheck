// Importaciones necesarias
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import jwt_decode from "jwt-decode";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Image,
  Button,
  Divider,
  Listbox,
  ListboxSection,
  ListboxItem,
  User,
  Tabs,
  Tab,
  SelectItem,
  Select,
  Input,
  Textarea,
} from "@nextui-org/react";

// Componente Miembro
export function Miembro() {
  // Definición de estados
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [step, setStep] = useState(1);
  const [Funcion, setFuncion] = useState("");
  const [projectTitle, setProjectTitle] = useState("");
  const [team, setTeam] = useState("");
  const [additionalInfo, setAdditionalInfo] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [userProjects, setUserProjects] = useState([]);
  const [teamName, setTeamName] = useState("");
  const [teamLeader, setTeamLeader] = useState("");
  const [UserSnap, setUserSnap] = useState("");
  const sizes = ["sm", "md", "lg"];
  const navigate = useNavigate();

  // Efecto para manejar el inicio de sesión y la navegación
  useEffect(() => {
    const token = localStorage.getItem("token");
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
          const FilterTeamUser = resAllTeams.data.filter(
            (Team) => Team.idEquipo === resUser.data.Fk_equipo_asignado_id
          );
          const userProjects = resAllProjects.data.filter(
            (project) => project.Fk_equipo_asignado === userTeamId
          );
          setUserProjects(userProjects);
          setUserSnap(resUser.data);
          setTeam(FilterTeamUser);
          if (userProjects.length === 1) {
            setProjectTitle(userProjects[0].Nombre);
          }
          const resUserSearch = await axios.get(
            `http://localhost:8000/api/users/${FilterTeamUser[0].Lider}/`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          setTeamName(FilterTeamUser[0].Nombre_equipo);
          setTeamLeader(resUserSearch.data.Nombre);
        } catch (error) {
          console.error(error);
        }
      };
      fetchData();
    } else {
      navigate("/login");
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
            Authorization: `Bearer ${localStorage.getItem("token")}`,
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
        alert("Por favor, selecciona un rango de fechas válido");
        return;
      }
    }

    if (step === 1 && !Funcion) {
      alert("Por favor, ingresa una función antes de continuar.");
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
            Estado: "Pendiente",
          };
          await axios.post(
            `http://localhost:8000/api/Snapshot/`,
            Snapshotinfo,
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
          );
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
    <Card className="mt-4 w-full h-full ">
      <CardBody>
        {/* Paso 1: Se muestra un formulario para seleccionar el proyecto, el equipo, la función y la información adicional. */}
        {step === 1 && (
          <div className="flex flex-col">
            <Select
              value={projectTitle}
              label="Proyecto"
              isRequired={true}
              onChange={handleProjectChange}
            >
              {userProjects.map((proyecto) => (
                <SelectItem
                  key={proyecto.idProyecto}
                  value={proyecto.idProyecto}
                >
                  {proyecto.Nombre}
                </SelectItem>
              ))}
            </Select>
            <Input
              type="text"
              label="Equipo"
              isRequired={true}
              value={teamName}
              readOnly
              className="mt-2"
            />
            <Input
              type="text"
              placeholder="Ingrese la función..."
              label="Función"
              isRequired={true}
              value={Funcion}
              onChange={handleFunctionChange}
              className="mt-2"
            />
            <Textarea
              value={additionalInfo}
              onChange={(e) => setAdditionalInfo(e.target.value)}
              placeholder="Información adicional (opcional)"
              className="mt-2"
            />
          </div>
        )}

        {/* Paso 2: Se muestran dos campos de entrada para seleccionar las fechas de inicio y fin. */}
        {step === 2 && (
          <div>
            <h1 className="mt-2 text-center">
              Selecciona el tiempo del Snapshot
            </h1>
            <label>Fecha de inicio</label>
            <Input
              type="date"
              className="mt-2"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              min={new Date().toISOString().split("T")[0]}
            />
            <label>Fecha de termino</label>
            <Input
              type="date"
              className="mt-2"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              min={startDate}
              disabled={!startDate}
            />
          </div>
        )}

        {/* Paso 3: Se muestra un resumen de la información del snapshot. */}
        {step === 3 && (
          <div className="flex flex-row w-full h-full items-center justify-center ">
            <div className="flex flex-col w-[50%] ">
              <Input
                label="Proyecto"
                size="sm"
                value={projectTitle}
                readOnly={true}
              ></Input>
              <Input
                label="Equipo"
                size="sm"
                className="mt-2"
                value={teamName}
                readOnly={true}
              ></Input>
              <Input
                label="Lider del equipo"
                size="sm"
                className="mt-2"
                value={teamLeader}
                readOnly={true}
              ></Input>
              <Input
                label="Función"
                size="sm"
                className="mt-2"
                value={Funcion}
                readOnly={true}
              ></Input>
              <Textarea
                label="Información adicional"
                size="sm"
                className="mt-2"
                value={additionalInfo}
                readOnly={true}
              ></Textarea>
              <div className="flex flex-row gap-2">
                <Input
                  label="Tiempo de inicio"
                  type="date"
                  size="sm"
                  className="mt-2"
                  value={startDate}
                  readOnly={true}
                ></Input>
                <Input
                  label="Tiempo de termino"
                  type="date"
                  size="sm"
                  className="mt-2"
                  value={endDate}
                  readOnly={true}
                ></Input>
              </div>
            </div>
          </div>
        )}

        {/* Paso 4: Se muestra un mensaje de agradecimiento indicando que el snapshot ha sido enviado al líder del equipo. */}
        {step === 4 && (
          <div className="flex flex-col items-center w-full h-full justify-center">
            <h1 className="text-3xl">¡Gracias!</h1>
            <p className="text-xl">El snapshot se ha enviado a tu lider de equipo.</p>
          </div>
        )}

        {/* Si el paso es menor que 4, se muestra un botón para avanzar al siguiente paso o enviar el snapshot. */}
        {step < 4 && (
          <Button
            onClick={handleNext}
            color="success"
            className="mt-4 w-[50%] self-center text-white "
          >
            {step < 3 ? "Siguiente" : "Enviar Snapshot"}
          </Button>
        )}
      </CardBody>
    </Card>
  );
}
