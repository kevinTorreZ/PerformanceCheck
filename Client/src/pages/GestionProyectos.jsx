import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Select,
  SelectItem,
  Card,
  CardBody,
  Input,
  Button,
  Textarea,
} from "@nextui-org/react";

import docsRight from "../img/docs-right.png";
import bluePurple from "../img/blue-purple-1.svg";
import Greendots from "../img/greenl.png";
export function GestionProyectos() {
  const Navigate = useNavigate();
  const token = localStorage.getItem("token");
  const UserCargo = localStorage.getItem("UserData");
  const [equiposSinProyecto, setEquiposSinProyecto] = useState([]);
  const [equipos, setEquipos] = useState([]);
  const [proyectos, setProyectos] = useState([]);
  const ahora = new Date().toISOString().slice(0, 16);
  const [formKey, setFormKey] = useState(0);
  const [ProyectoSelected, setProyectoSelected] = useState("");
  const [equipoFromproject, setEquipoFromproject] = useState({ idEquipo: 0 });
  const [fechaInicio, setFechaInicio] = useState("");
  const [fechaTermino, setFechaTermino] = useState("");

  const [selectedEquipo, setSelectedEquipo] = useState("");
  const [proyecto, setProyecto] = useState({
    nombre: "",
    descripcion: "",
    fechaInicio: "",
    fechaTermino: "",
    Fk_equipo_asignado: "",
  });

  const BuscarEquiposYproyectos = () => {
    const fetchData = async () => {
      if (token && UserCargo === "Administrador") {
        try {
          const resEquipos = await axios.get(
            `http://localhost:8000/api/equipos/`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          const resProyectos = await axios.get(
            `http://localhost:8000/api/proyectos`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          // Crear un conjunto de todos los IDs de equipo que están asignados a un proyecto
          const equiposConProyecto = new Set(
            resProyectos.data.map((proyecto) => proyecto.Fk_equipo_asignado)
          );
          console.log(equiposConProyecto);
          // Filtrar los equipos para incluir solo aquellos que no están en el conjunto equiposConProyecto
          const equiposSinProyecto = resEquipos.data.filter(
            (equipo) => !equiposConProyecto.has(equipo.idEquipo)
          );

          setEquiposSinProyecto(equiposSinProyecto);
          setEquipos(equiposSinProyecto);
          setProyectos(resProyectos.data);
          console.log(equiposSinProyecto);
        } catch (error) {
          console.error(error);
        }
      } else {
        Navigate("/login");
      }
    };

    // Ejecutar fetchData la primera vez
    useEffect(() => {
      fetchData();
    }, []);

    // Retornar fetchData para que pueda ser llamada directamente
    return fetchData;
  };
  const actualizarEquiposYproyectos = BuscarEquiposYproyectos();

  useEffect(() => {
    var filterEquipo = equipos.filter(
      (equipo) => equipo.Fk_proyecto_asignado_id == ProyectoSelected.idProyecto
    );
    if (filterEquipo.length > 0) {
      setSelectedEquipo(filterEquipo[0].idEquipo);
    } else {
      setSelectedEquipo("0");
    }
  }, [ProyectoSelected]);
  const validarProyecto = (
    nombre,
    descripcion,
    fechaInicio,
    fechaTermino,
    equipo,
    proyectos
  ) => {
    console.log(equipo);
    if (
      !nombre ||
      !descripcion ||
      !fechaInicio ||
      !fechaTermino ||
      equipo === "" ||
      equipo === "Seleccionar..." ||
      equipo == undefined
    ) {
      throw new Error("Todos los campos son obligatorios");
    }
    if (
      proyectos.some(
        (objeto) =>
          objeto.Nombre.toLowerCase().replace(/ /g, "") ===
          nombre.toLowerCase().replace(/ /g, "")
      )
    ) {
      throw new Error("El nombre de proyecto ingresado ya existe!");
    }
    if (fechaInicio > fechaTermino) {
      throw new Error(
        "La fecha de inicio no puede ser posterior a la fecha de término."
      );
    }
  };
  const CrearProyecto = (event) => {
    event.preventDefault();
    const { nombre, descripcion, fechaInicio, fechaTermino, equipo } = proyecto;
    const jsonProyecto = {
      Nombre: nombre,
      Descripcion: descripcion,
      FechaInicio: fechaInicio,
      FechaTermino: fechaTermino,
      Fk_equipo_asignado: equipo,
    };

    try {
      validarProyecto(
        nombre,
        descripcion,
        fechaInicio,
        fechaTermino,
        equipo,
        proyectos
      );
      axios.post("http://127.0.0.1:8000/api/proyectos", jsonProyecto, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setProyecto({
        nombre: "",
        descripcion: "",
        fechaInicio: "",
        fechaTermino: "",
        equipo: "",
      });
      setFechaInicio("");
      setFechaTermino("");
      setFormKey((prevKey) => prevKey + 1);
      actualizarEquiposYproyectos();
      console.log("Se ha creado un nuevo proyecto!");
    } catch (error) {
      console.error(error.message);
    }
  };
  const handleDate = (fecha) => {
    if (fecha) {
      var nuevoDate = new Date(fecha).toISOString().slice(0, 16);
      return nuevoDate;
    } else {
      return console.error("Fecha inválida");
    }
  };
  const handleChange = (event) => {
    setProyectoSelected({
      ...proyecto,
      [event.target.name]: event.target.value,
    });
  };
  const handleSelectChange = (event) => {
    setSelectedEquipo(event.target.value);
  };

  const handleChange2 = (event) => {
    setProyecto({
      ...proyecto,
      [event.target.name]: event.target.value,
    });
  };

  const handleChangeInicio = (event) => {
    setFechaInicio(event.target.value);
    handleChange2(event);
  };

  const handleChangeTermino = (event) => {
    setFechaTermino(event.target.value);
    handleChange2(event);
  };

  // APARTIR DE ACA SOLO CODIGO DEL CRUD DE EQUIPOS

  const [UserFilter, setUserFilter] = useState("");
  const [NewEquipo, setNewEquipo] = useState({
    Nombre_equipo: "",
    Lider: 0,
  });
  const ValidarEquipo = async (Nombre_equipo, Lider) => {
    const resEquipos = await axios.get(`http://127.0.0.1:8000/api/equipos/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const equipoExistente = resEquipos.data.find(
      (equipo) => equipo.Nombre_equipo === Nombre_equipo
    );

    if (Nombre_equipo == "") {
      throw new Error("Debe ingresar un equipo");
    }
    if (equipoExistente) {
      throw new Error("El nombre de equipo ya existe!");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      if (token && UserCargo === "Administrador") {
        try {
          const resUsuarios = await axios.get(`http://localhost:8000/users/`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          const FiltrarUsuarios = resUsuarios.data.filter(
            (Usuario) => Usuario.Fk_equipo_asignado_id == null
          );
          setUserFilter(FiltrarUsuarios);
        } catch (error) {
          console.error(error);
        }
      } else {
        Navigate("/login");
      }
    };
    fetchData();
  }, []);

  const handleChangeEquipo = (event) => {
    setNewEquipo({
      ...NewEquipo,
      [event.target.name]: event.target.value,
    });
  };

  const CrearEquipo = (event) => {
    event.preventDefault();
    console.log(NewEquipo.Lider);
    if (NewEquipo.Lider == 0) {
      delete NewEquipo.Lider;
    }

    try {
      ValidarEquipo(NewEquipo.Nombre_equipo);
      const resUsuarios = axios.post(
        `http://127.0.0.1:8000/api/equipos/`,
        NewEquipo,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setFormKey((prevKey) => prevKey + 1);
      console.log("Se ha creado un nuevo equipo!");
      setNewEquipo("");
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (proyectos.length > 0) {
      setNewEquipo({
        ...NewEquipo,
        [proyectos[0].idUsuario]: proyectos[0],
      });
      setProyectoSelected(proyectos[0]);
    }
  }, [proyectos]);

  return (
    <div className="max-w-[1280px] divCenter">
      <div className="fixed hidden 3xl:-top-[30%] 3xl:-right-[40%] md:block opacity-100  -top-[80%] -right-[60%] 2xl:-top-[60%] 2xl:-right-[45%] -z-10 rotate-12">
        <img src={docsRight} />
      </div>
      <div className="fixed hidden 3xl:-bottom-[20%] 3xl:-left-[20%] md:block opacity-100 -bottom-[40%] -left-[20%] -z-10">
        <img src={bluePurple} />
      </div>
      <div className="fixed hidden 3xl:block 3xl:opacity-100 md:block lg:block xs:block dark:opacity-40 -bottom-[20%] left-[20%] -z-10">
        <img src={Greendots} />
      </div>

      <h1 className="text-center text-4xl mt-12 ">
        Gestionador de{" "}
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#5594d6] to-[#d21b9a]">
          Proyectos
        </span>
      </h1>
      {/* SELECCIONAR LISTA DE PROYECTOS */}
      <Select
        isRequired
        label="Lista de proyectos"
        placeholder="Selecciona el proyecto"
        className="max-w-xs mt-4"
        defaultSelectedKeys={NewEquipo ? [NewEquipo.idUsuario] : []}
      >
        {proyectos.map((proyecto) => (
          <SelectItem
            key={proyecto.idUsuario}
            value={proyecto}
            onClick={() =>
              handleChangeEquipo({
                target: { name: "proyecto", value: proyecto },
              })
            }
          >
            {proyecto.Nombre}
          </SelectItem>
        ))}
      </Select>
      <div>
        <Card className="mt-4 dark:bg-default-100/60 bg-background/100">
          <CardBody className="flex flex-col">
            {ProyectoSelected ? (
              <form id="formCrearProyecto" key={formKey}>
                {console.log(ProyectoSelected.FechaInicio)}
                <Input
                  label="Nombre del proyecto"
                  type="text"
                  name="nombre"
                  onChange={handleChange}
                  placeholder="Nombre del proyecto"
                  value={ProyectoSelected.Nombre}
                  isRequired={true}
                />
                <Textarea
                  label="Descripción del proyecto"
                  name="descripcion"
                  onChange={handleChange}
                  rows="4"
                  cols="50"
                  style={{ resize: "None" }}
                  className="mt-4"
                  placeholder="Descripcion"
                  isRequired={true}
                  value={ProyectoSelected.Descripcion}
                />
                <Input
                  label="Fecha de inicio"
                  type="datetime-local"
                  name="fechaInicio"
                  onChange={handleChange}
                  min={ahora}
                  className="mt-4"
                  value={handleDate(ProyectoSelected.FechaInicio)}
                  isRequired={true}
                />
                <Input
                  label="Fecha de termino"
                  type="datetime-local"
                  name="fechaTermino"
                  onChange={handleChange}
                  min={ahora}
                  className="mt-4"
                  value={handleDate(ProyectoSelected.FechaTermino)}
                  isRequired={true}
                />
                <Select
                  name="equipo"
                  onChange={handleSelectChange}
                  value={selectedEquipo}
                  label="Asignar equipo"
                  className="mt-4"
                  isRequired={true}
                >
                  {equipos.map((equipo) => (
                    <SelectItem key={equipo.idEquipo} value={equipo.idEquipo}>
                      {equipo.Nombre_equipo}
                    </SelectItem>
                  ))}
                </Select>
                <div className="flex justify-center w-full h-full mt-4">
                  <Button color="success" className="text-white">
                    Modificar proyecto
                  </Button>
                </div>
              </form>
            ) : (
              <div className="flex items-center justify-center">
                <h1>No hay proyectos disponibles</h1>
              </div>
            )}
          </CardBody>
        </Card>

        <Card className="mt-4 dark:bg-default-100/60 bg-background/100">
          <CardBody className="flex flex-col">
            <form id="formCrearProyecto" key={formKey}>
              <h1 className="text-center text-2xl mb-4">Crear proyecto</h1>
              <Input
                label="Nombre del proyecto"
                type="text"
                name="nombre"
                onChange={handleChange2}
                isRequired={true}
                placeholder="Nombre del proyecto"
              />
              <Textarea
                name="descripcion"
                onChange={handleChange2}
                rows="4"
                cols="50"
                style={{ resize: "None" }}
                className="mt-4"
                label="Descripción del proyecto"
                placeholder="Descripcion"
                isRequired={true}
              />
              <Input
                label="Fecha de inicio"
                type="datetime-local"
                name="fechaInicio"
                value={fechaInicio}
                onChange={handleChangeInicio}
                className="mt-4"
                isRequired={true}
                min={ahora}
              />
              <Input
                label="Fecha de termino"
                type="datetime-local"
                name="fechaTermino"
                value={fechaTermino}
                onChange={handleChangeTermino}
                className="mt-4"
                isRequired={true}
                min={fechaInicio}
                disabled={!fechaInicio}
              />

              <Select
                name="equipo"
                onChange={handleChange2}
                label="Asignar equipo"
                className="mt-4"
                isRequired={true}
                defaultSelectedKeys={""}
              >
                {equiposSinProyecto.map((equipo) => (
                  <SelectItem key={equipo.idEquipo} value={equipo.idEquipo}>
                    {equipo.Nombre_equipo}
                  </SelectItem>
                ))}
              </Select>
              <div className="flex justify-center w-full h-full mt-4">
                <Button
                  color="success"
                  className="text-white"
                  onClick={CrearProyecto}
                >
                  Crear proyecto
                </Button>
              </div>
            </form>
          </CardBody>
        </Card>
      </div>
      <div>
        <Card className="mt-4 mb-12 dark:bg-default-100/60 bg-background/100">
          <CardBody>
            {UserFilter && (
              <form id="formCrearProyecto" key={formKey}>
                <h1 className="text-center text-2xl mb-4">Crear equipo</h1>
                <Input
                  label="Nombre del equipo"
                  type="text"
                  name="Nombre_equipo"
                  onChange={handleChangeEquipo}
                  placeholder="Ingresa el nombre del equipo"
                  isRequired={true}
                />
                <Select
                  name="Lider"
                  label="Selecciona usuario lider"
                  onChange={handleChangeEquipo}
                  isRequired={true}
                  className="mt-4"
                >
                  <SelectItem key={0} value={0}>
                    Sin Lider
                  </SelectItem>
                  {UserFilter.map((Usuario) => (
                    <SelectItem
                      key={Usuario.idUsuario}
                      value={Usuario.idUsuario}
                    >
                      {Usuario.Nombre}
                    </SelectItem>
                  ))}
                </Select>
                <div className="flex justify-center w-full h-full mt-4">
                  <Button
                    className="text-white"
                    color="success"
                    onClick={CrearEquipo}
                  >
                    Crear Equipo
                  </Button>
                </div>
              </form>
            )}
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
