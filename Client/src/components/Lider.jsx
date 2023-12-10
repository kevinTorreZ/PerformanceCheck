import React, { useEffect, useState } from "react";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { CompletarSnapshot } from "./CompletarSnapshot";
import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
  Button,
  Divider
} from "@nextui-org/react";
export function Lider({ handleCompletarSnapshot }) {
  // Añade handleCompletarSnapshot a las props
  const token = localStorage.getItem("token");
  const [AllSnapshots, setAllSnapshots] = useState([]);
  const [showCompletarSnapshot, setShowCompletarSnapshot] = useState(false);
  const [Allproyect, setAllproyect] = useState("");
  const [AllUsers, setAllUsers] = useState("");
  const [Allteam, setAllteam] = useState("");
  const [idUser, setidUser] = useState("");
  const [idSnap, setidSnap] = useState("");
  const [idLider, setidLider] = useState("");
  const decodedToken = jwt_decode(token);
  const userId = decodedToken.user_id;

  const fetch = async () => {
    const resSnapshot = await axios.get(`http://localhost:8000/api/Snapshot/`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    const resUser = await axios.get(`http://127.0.0.1:8000/users/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const resProyect = await axios.get(`http://127.0.0.1:8000/api/proyectos`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const resTeam = await axios.get(`http://127.0.0.1:8000/api/equipos/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

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
    const FilterTeams = resTeam.data.filter((team) => team.Lider === userId);
    const FilterSnapshots = resSnapshot.data.filter(
      (snapshot) => snapshot.team === FilterTeams[0].idEquipo
    );
    setAllSnapshots(FilterSnapshots);
  };

  useEffect(() => {
    fetch();
  }, []);

  const handleCompletarSnapshotClick = (idUser, idSnap, idLider) => {
    setidSnap(idSnap);
    setidLider(idLider);
    setidUser(idUser);
    setShowCompletarSnapshot(true);
  };
  const handleCancelarClick = () => {
    setShowCompletarSnapshot(false);
    fetch();
  };
  if (showCompletarSnapshot) {
    return (
      <CompletarSnapshot
        handleCancelarClick={handleCancelarClick}
        info={{ idSnapshot: idSnap, idLider: idLider, idUserSnap: idUser }}
      />
    );
  }

  const columns = [
    {
      key: "Nombre",
      label: "Miembro de equipo",
    },
    {
      key: "NombreEquipo",
      label: "Proyecto",
    },
    {
      key: "Funcion",
      label: "Función",
    },
    {
      key: "startDate",
      label: "Fecha de inicio",
    },
    {
      key: "Estado",
      label: "Estado",
    },
  ];

  return (
    <div className="w-full h-full">
      <h1 className="text-center text-lg mt-4 mb-4">Snapshots por evaluar</h1>
      <Divider className="mb-4" />
      <Table>
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn key={column.key}>{column.label}</TableColumn>
          )}
        </TableHeader>
        <TableBody items={AllSnapshots}>
          {(snapshot) => {
            const user = AllUsers[snapshot.user];
            const team = Allteam[snapshot.team];
            return (
              <TableRow key={snapshot.idSnapshot}>
                {(columnKey) => {
                  if (columnKey === "Nombre") {
                    return <TableCell>{user.Nombre}</TableCell>;
                  }
                  if (columnKey === "Funcion") {
                    return <TableCell>{snapshot.Funcion}</TableCell>;
                  }
                  if (columnKey === "startDate") {
                    return <TableCell>{snapshot.startDate}</TableCell>;
                  }
                  if (columnKey === "Estado") {
                    return (
                      <TableCell>
                        {snapshot.Estado === "Pendiente" ? (
                          <Button
                            color="success"
                            className="text-white"
                            disabled={snapshot.Estado === "Completado"}
                            onClick={() =>
                              handleCompletarSnapshotClick(
                                user.idUsuario, snapshot.idSnapshot, team.Lider
                              )
                            }
                          >
                            Completar Snapshot
                          </Button>
                        ) : snapshot.Estado === "Completado" ? (
                          <div>
                            Completado
                            <h1>{snapshot.endDate}</h1>
                          </div>
                        ) : (
                          snapshot.Estado
                        )}
                      </TableCell>
                    );
                  }
                  const project = Allproyect[snapshot.project];
                  return <TableCell>{project ? project.Nombre : null}</TableCell>;
                }}
              </TableRow>
            );
          }}
        </TableBody>
      </Table>
    </div>
  );
}
