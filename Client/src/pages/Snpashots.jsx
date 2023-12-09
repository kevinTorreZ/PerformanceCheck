import React, { useState, useEffect } from "react";
import { Miembro } from "../components/Miembro";
import { Lider } from "../components/Lider";
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
} from "@nextui-org/react";

export function Snapshosts() {
  const [cargo, setCargo] = useState("");
  const [vista, setVista] = useState("Miembro"); // Establece la vista inicial a 'miembro'
  const [completandoSnapshot, setCompletandoSnapshot] = useState(false); // Nuevo estado
  const [selected, setSelected] = useState("Miembro de equipo");

  useEffect(() => {
    const cargoUsuario = localStorage.getItem("UserData");
    setCargo(cargoUsuario);
  }, []);

  const handleMiembroClick = () => {
    setVista("Miembro");
    setCompletandoSnapshot(false); // Cuando se hace clic en un botón, se establece completandoSnapshot en false
  };

  const handleLiderClick = () => {
    setVista("Lider");
    setCompletandoSnapshot(false); // Cuando se hace clic en un botón, se establece completandoSnapshot en false
  };

  const handleCompletarSnapshot = () => {
    if (completandoSnapshot) {
      setCompletandoSnapshot(false);
    } else {
      setCompletandoSnapshot(true);
    }
  };

  return (
    <div className="w-full h-full flex flex-col items-center">
      {!completandoSnapshot && ( // Solo muestra los botones si no se está completando un snapshot
        <>
          {cargo === "Miembro" && (
            <Tabs>
              <Tab
                key="Perfil"
                title="Miembro de equipo"
                className="w-full h-full flex items-center"
              >
                {vista === "Miembro" && <Miembro />}
              </Tab>
            </Tabs>
          )}

          {cargo === "Lider" && (
            <>
              <Tabs
                aria-label="Options"
                selectedKey={selected}
                onSelectionChange={setSelected}
              >
                <Tab key="Miembro de equipo" title="Miembro de equipo" className="w-full h-full flex items-center">
                  {vista === "Miembro" && <Miembro />}
                </Tab>
                <Tab key="Lider" title="Lider">
                  <Lider handleCompletarSnapshot={handleCompletarSnapshot} />
                </Tab>
              </Tabs>
              {/* <button
                style={{
                  borderBottom: vista === "Miembro" ? "2px solid red" : "none",
                }}
                onClick={handleMiembroClick}
              >
                Miembro de equipo
              </button>
              <button
                style={{
                  borderBottom: vista === "Lider" ? "2px solid red" : "none",
                }}
                onClick={handleLiderClick}
              >
                Líder de equipo
              </button> */}
            </>
          )}
        </>
      )}
    </div>
  );
}
