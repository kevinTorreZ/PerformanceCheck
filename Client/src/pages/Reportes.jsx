import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import jwt_decode from "jwt-decode";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
  Button,
  Divider,
} from "@nextui-org/react";
export function Reportes() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [MySnapshots, setMySnapshots] = useState([]);
  const [Allproyect, setAllproyect] = useState("");
  const [AllUsers, setAllUsers] = useState("");
  const [Allteam, setAllteam] = useState("");
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  // Efecto para manejar el inicio de sesión y la navegación
  useEffect(() => {
    if (token) {
      setIsLoggedIn(true);
    } else {
      navigate("/login");
    }
  }, [navigate]);

  // Función para buscar todos los usuarios, proyectos y equipos
  useEffect(() => {
    const decodedToken = jwt_decode(token);
    const userId = decodedToken.user_id;

    const Fetch = async () => {
      const resUser = await axios.get(`http://127.0.0.1:8000/users/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const resProyect = await axios.get(
        `http://127.0.0.1:8000/api/proyectos`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const resTeam = await axios.get(`http://127.0.0.1:8000/api/equipos/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Convertir los arrays a objetos para un acceso más rápido
      const allProjectsObj = resProyect.data.reduce(
        (obj, project) => ({ ...obj, [project.idProyecto]: project }),
        {}
      );
      const allTeamsObj = resTeam.data.reduce(
        (obj, team) => ({ ...obj, [team.idEquipo]: team }),
        {}
      );
      const allUsersObj = resUser.data.reduce(
        (obj, user) => ({ ...obj, [user.idUsuario]: user }),
        {}
      );
      setAllteam(allTeamsObj);
      setAllproyect(allProjectsObj);
      setAllUsers(allUsersObj);
    };

    Fetch();
  }, []);

  // Función para actualizar los snapshots
  useEffect(() => {
    const token = localStorage.getItem("token");
    const decodedToken = jwt_decode(token);
    const userId = decodedToken.user_id;

    const Fetch = async () => {
      const resAllSnapshots = await axios.get(
        `http://localhost:8000/api/Snapshot/`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const FilterSnapshots = resAllSnapshots.data.filter(
        (Snapshot) => Snapshot.user === userId
      );
      setMySnapshots(FilterSnapshots);
    };

    Fetch();
  }, []);

  // Función para exportar la tabla a PDF
  const exportTableToPDF = () => {
    const doc = new jsPDF();

    // Título
    doc.setFontSize(22);
    doc.text("Reporte de Snapshots", 15, 15);

    // Subtítulo
    doc.setFontSize(15); // Aumenta el tamaño de la fuente
    doc.text(
      "Información detallada de los snapshots exportados del miembro",
      15,
      25
    );

    // Agrega más texto
    doc.setFontSize(11);
    const text =
      "Este reporte contiene información detallada sobre cada snapshot exportado por el miembro. Cada fila de la tabla representa un snapshot, incluyendo detalles como el líder del equipo, el proyecto, la fecha solicitada y el estado del snapshot.";
    const lines = doc.splitTextToSize(text, 180); // Ajusta el texto a un ancho máximo de 180
    doc.text(lines, 15, 35);
    // Fecha de exportación
    doc.setFontSize(10);
    const date = new Date().toLocaleDateString("es-ES");
    doc.text(`${date}`, 180, 15);
    const table = document.getElementById("TableSnapshots");
    autoTable(doc, { html: table, startY: 50 });
    if (MySnapshots.length === 0) {
      doc.text("No hay ningún Snapshot.", 105, 63, null, null, "center");
    }
    doc.save(`reporte-Snapshots-${date}.pdf`);
  };

  useEffect(() => {
    if (Object.keys(Allteam).length > 0) {
      console.log(Allteam);
      // Aquí puedes poner cualquier otra lógica que dependa de Allteam
    }
  }, [Allteam]);
  const columns = [
    {
      key: "leader",
      label: "Líder de equipo",
    },
    {
      key: "project",
      label: "Proyecto",
    },
    {
      key: "date",
      label: "Fecha solicitada",
    },
    {
      key: "status",
      label: "Estado",
    },
  ];
  return (
    <div>
      {MySnapshots && (
        <div>
          <div className="flex justify-center"> 
            <Button color="success" className="text-white font-bold mb-4 mt-4" onClick={exportTableToPDF}>Exportar tabla a PDF</Button>
          </div>

          <Table id="TableSnapshots" aria-label="Tabla de Snapshots">
            <TableHeader columns={columns}>
              {(column) => (
                <TableColumn key={column.key}>{column.label}</TableColumn>
              )}
            </TableHeader>
            <TableBody items={MySnapshots}>
              {(snapshot) => {
                const team = Allteam[snapshot.team];
                const project = Allproyect[snapshot.project];
                const leader = team && AllUsers[team.Lider];
                const endDate = new Date(snapshot.endDate).toLocaleDateString();

                // Si team, project o leader son undefined, no renderizamos el componente
                if (!team || !project || !leader) {
                  return null;
                }

                return (
                  <TableRow key={snapshot.idSnapshot}>
                    <TableCell>{leader.Nombre}</TableCell>
                    <TableCell>{project.Nombre}</TableCell>
                    <TableCell>{snapshot.startDate}</TableCell>
                    <TableCell>
                      {snapshot.Estado}
                      {snapshot.Estado === "Completado" && (
                        <div>
                          <br />
                          {endDate}
                        </div>
                      )}
                    </TableCell>
                  </TableRow>
                );
              }}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}
