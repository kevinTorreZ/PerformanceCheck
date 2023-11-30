import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { useAuth } from "../components/verificador";
import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
  Select,
  SelectItem,
  Card,
  CardBody,
  Input,
  Button,
} from "@nextui-org/react";

import docsRight from "../img/docs-right.png";
import bluePurple from "../img/blue-purple-1.svg";
import Greendots from "../img/greenl.png";
import { EyeFilledIcon } from "../assets/EyeFilledIcon";
import { EyeSlashFilledIcon } from "../assets/EyeSlashFilledIcon";

export function GestionUsuarios() {
  const [usuarios, setUsuarios] = useState([]);
  const [rut, setRut] = useState("");
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState(false);
  const [password, setPassword] = useState("");
  const [Cargo, setCargo] = useState("");
  const [equipo, setEquipo] = useState(null);
  const [UserModi, setUserModi] = useState("");
  const [proyecto, setProyecto] = useState("");
  const [equipos, setEquipos] = useState([]);
  const [proyectos, setProyectos] = useState([]);
  const [ErrorModiUser, setErrorModiUser] = useState("");
  const [usuarioSelected, setUsuarioSelected] = useState(null);
  const [equipoSelected, setEquipoSelected] = useState(null);
  const [proyectoSelected, setProyectoSelected] = useState(null);
  const [proyectosSelected, setProyectosSelected] = useState(null);
  const [cargoSelected, setCargoSelected] = useState(null);

  const Navigate = useNavigate();

  const BuscarUsuarios = () => {
    const token = localStorage.getItem("token");
    if (token) {
      axios
        .get(`http://localhost:8000/users/`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          setUsuarios(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      Navigate("/login");
    }
  };
  useEffect(BuscarUsuarios, [Navigate]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token && Cargo != "Administrador") {
      axios
        .get(`http://localhost:8000/api/equipos`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          setEquipos(response.data);
        })
        .catch((error) => {});
    }
  }, [Navigate]);

  const tieneLider = (equipoId) => {
    if (
      equipos[equipoId] &&
      equipos[equipoId].Lider !== undefined &&
      equipos[equipoId].Lider !== null
    ) {
      return true;
    } else {
      return false;
    }
  };

  const handleRutChange = (evento) => {
    let valorEntrada = evento.target.value;
    valorEntrada = valorEntrada.replace(/\D|-/g, "");
    valorEntrada = valorEntrada.substring(0, 9);
    if (
      valorEntrada.length >= 8 &&
      valorEntrada[valorEntrada.length - 1] !== "-"
    ) {
      valorEntrada =
        valorEntrada.substring(0, 8) + "-" + valorEntrada.substring(8);
    }
    setRut(valorEntrada);
  };

  useEffect(() => {
    if (usuarioSelected && usuarioSelected.Fk_equipo_asignado_id) {
      setProyectoSelected(usuarioSelected.Fk_proyecto_asignado_id);
      setEquipoSelected(usuarioSelected.Fk_equipo_asignado_id);
    }
  }, [usuarioSelected]);

  const cargarProyectos = (equipoId) => {
    if (
      equipoId &&
      equipos.find((e) => e.idEquipo === equipoId).Fk_proyecto_asignado_id
    ) {
      const token = localStorage.getItem("token");
      axios
        .get(
          `http://localhost:8000/api/proyecto/${
            equipos.find((e) => e.idEquipo === equipoId).Fk_proyecto_asignado_id
          }`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((response) => {
          if (response.data) {
            setProyectosSelected([response.data]);
          } else {
            console.error("La API no devolvió un objeto");
          }
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      setProyectosSelected([]);
    }
  };

  useEffect(() => {
    cargarProyectos(equipoSelected);
  }, [equipoSelected]);

  const handleClickListaUsuario = (usuario) => {
    setUserModi(usuario);
    setEquipoSelected(usuario.Fk_equipo_asignado_id);
    setUsuarioSelected(usuario);
  };

  useEffect(() => {
    if (equipos) {
      const token = localStorage.getItem("token");
      axios
        .get(
          `http://localhost:8000/api/proyectos`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((response) => {
          if (response.data) {
            setProyectos(response.data);
          } else {
            console.error("La API no devolvió un objeto");
          }
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      setProyectos([]);
    }
  }, [equipo]);
  

  const handleModificarUsuario = async (event) => {
    const rutRegex = /^[0-9]+-[0-9kK]{1}$/;
    const token = localStorage.getItem("token");
    event.preventDefault();
    const usuarioModificado = {
      idUsuario: usuarioSelected.idUsuario,
      email: usuarioSelected.email,
      Nombre: usuarioSelected.Nombre,
      password: usuarioSelected.password,
      Rut: usuarioSelected.Rut,
      Fk_equipo_asignado_id: Number(equipoSelected),
      Usuario: usuarioSelected.email,
      Cargo: document.getElementById("SelectorCargo").value,
      Fk_proyecto_asignado_id: Number(
        document.getElementById("SelectorProyecto").value
      ),
    };
    if (!rutRegex.test(usuarioModificado.Rut)) {
      return setErrorModiUser("El rut ingresado es inválido.");
    } else {
      if (
        usuarios.filter(
          (user) =>
            user.Rut === usuarioModificado.Rut && user.Rut != UserModi.Rut
        ).length > 0
      ) {
        return setErrorModiUser("El rut ingresado ya existe.");
      } else {
        if (
          isNaN(usuarioModificado.Fk_equipo_asignado_id) ||
          isNaN(usuarioModificado.Fk_proyecto_asignado_id)
        ) {
          usuarioModificado.Fk_equipo_asignado_id = null;
          usuarioModificado.Fk_proyecto_asignado_id = null;
        }
        if (
          usuarios.filter(
            (user) =>
              user.email === usuarioModificado.email &&
              user.email != UserModi.email &&
              user.email != UserModi.email
          ).length > 0
        ) {
          return setErrorModiUser("El usuario ingresado ya existe!");
        }
      }
    }
    setErrorModiUser();
    if (token) {
      axios
        .put(
          `http://localhost:8000/api/users/${usuarioSelected.idUsuario}/`,
          usuarioModificado,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((response) => {
          console.log("El usuario se ha modificado correctamente!.");
          BuscarUsuarios();
          setUsuarioSelected();
          setEquipoSelected();
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };
  const handleEliminarUsuario = async () => {
    const token = localStorage.getItem("token");
    if (confirm("¿Estas seguro de eliminar el usuario?")) {
      if (token) {
        axios
          .delete(
            `http://localhost:8000/api/users/${usuarioSelected.idUsuario}/`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          )
          .then((response) => {
            BuscarUsuarios();
            setUsuarioSelected();
            console.log("Se ha eliminado el usuario correctamente.");
          })
          .catch((error) => {
            console.error(error);
          });
      }
    }
  };
  const handleCrearUsuario = async () => {
    setError();
    const rutRegex = /^[0-9]+-[0-9kK]{1}$/;
    const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)[a-zA-Z\d]{8,}$/;
    if (
      !rutRegex.test(rut) ||
      usuarios.filter((user) => user.Rut === rut).length > 0
    ) {
      setError("El rut ingresado ya existe o es inválido!");
      return console.error(error);
    }
    if (!passwordRegex.test(password)) {
      return alert(
        "La contraseña debe tener al menos 8 caracteres, incluyendo al menos una letra mayúscula y un número."
      );
    }
    if (usuarios.filter((user) => user.email === email).length > 0) {
      setError("El email ingresado ya existe");
      return console.error(error);
    }
    if (Cargo == "") {
      setError("Debe escoger un Cargo");
      return console.error(error);
    }
    if(Cargo != "Administrador"){
        var idEquipoEspecifico = equipo; // reemplaza esto con el id que estás buscando
        var Filterequipo = equipos.filter(equipo => equipo.idEquipo == idEquipoEspecifico);
        var idProyectoEspecifico = Filterequipo[0].Fk_proyecto_asignado;
        var Filterproyecto = proyectos.filter(proyecto => proyecto.idProyecto == idProyectoEspecifico);
        if(Filterproyecto.length > 0){
            setProyecto(Filterproyecto[0].idProyecto)
        }else{
            setProyecto('')
        }
        setEquipo(Filterequipo[0].Fk_proyecto_asignado)
        
    }
    const userData = {
      Rut: rut,
      Nombre: nombre,
      email: email,
      password: password,
      Cargo: Cargo,
      Fk_proyecto_asignado: proyecto,
      Fk_equipo_asignado: equipo,
    };
    console.log(userData)
    const token = localStorage.getItem("token");
    const formulario = document.getElementById("formularioCrearUsuario");
    try {
      await axios.post("http://127.0.0.1:8000/api/register", userData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      formulario.submit();
      BuscarUsuarios();
      document.getElementById("MensajeEstado").innerHTML =
        "Se ha creado el usuario.";
    } catch (error) {
      console.log(error);
      setError(error);
      document.getElementById("MensajeEstado").innerHTML =
        "Se ha producido un error.";
    }
  };
  const manejarCambio = (evento) => {
    let valorEntrada = evento.target.value;
    valorEntrada = valorEntrada.replace(/\D|-/g, "");
    valorEntrada = valorEntrada.substring(0, 9);
    if (
      valorEntrada.length >= 8 &&
      valorEntrada[valorEntrada.length - 1] !== "-"
    ) {
      valorEntrada =
        valorEntrada.substring(0, 8) + "-" + valorEntrada.substring(8);
    }

    setUsuarioSelected({ ...usuarioSelected, Rut: valorEntrada });
  };

  const [defaultKey, setDefaultKey] = useState([]);

  useEffect(() => {
    if (usuarios.length > 0) {
      setDefaultKey([usuarios[0].idUsuario]);
      handleClickListaUsuario(usuarios[0]);
    }
  }, [usuarios]);
  const handleChange = (event) => {
    setCargo(event.target.value);
  }

  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);
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
      <Card className="mb-4 mt-4 dark:bg-default-100/30 bg-background/100">
        <CardBody>
            <h1 className="text-center text-2xl">Gestionar usuarios</h1>
        </CardBody>
      </Card>
     
      {/* LISTA DE USUARIOS TOTAL */}
      <div className="ListaUsuarios">
        <Select
          isRequired
          label="Lista de usuarios"
          placeholder="Selecciona al usuario"
          className="max-w-xs"
          defaultSelectedKeys={defaultKey}
        >
          {usuarios.map((usuario) => (
            <SelectItem
              key={usuario.idUsuario}
              value={usuarios[0]}
              onClick={() => handleClickListaUsuario(usuario)}
            >
              {usuario.email}
            </SelectItem>
          ))}
        </Select>
      </div>
      <div className="flex flex-row lg:flex-nowrap md:flex-wrap sm:flex-wrap xs:flex-wrap gap-3 h-[65vh] w-[100%] max-w-[1280px] mainGestion mb-16">
        <div className="xl:w-[50%] md:w-[100%] sm:w-[100%] xs:w-[100%] ">
          {/* SELECCIONAR USUARIO Y MODIFICARLO O ELIMINARLO */}
          {usuarioSelected && (
            <Card className="mt-4 max-h-[600px] h-[100%] dark:bg-default-100/60 bg-background/100">
              <CardBody>
                <h1 className="text-center mb-4 text-xl">
                  Modificar o eliminar el usuario
                  <br />
                  <span className="text-red-500">
                    {" "}
                    {usuarioSelected.email}{" "}
                  </span>
                </h1>
                <form
                  onSubmit={handleModificarUsuario}
                  className="flex flex-col"
                >
                  <Input
                    type="text"
                    label="Email"
                    value={usuarioSelected.email}
                    isRequired={true}
                    onChange={(e) =>
                      setUsuarioSelected({
                        ...usuarioSelected,
                        email: e.target.value,
                      })
                    }
                  ></Input>
                  <Input
                    type="text"
                    label="Nombre"
                    value={usuarioSelected.Nombre}
                    className="mt-2"
                    isRequired={true}
                    onChange={(e) =>
                      setUsuarioSelected({
                        ...usuarioSelected,
                        Nombre: e.target.value,
                      })
                    }
                  ></Input>
                  <Input
                    type="text"
                    label="Rut"
                    value={usuarioSelected.Rut}
                    onChange={manejarCambio}
                    placeholder="RUT"
                    className="mt-2"
                    isRequired={true}
                  ></Input>
                  <Select
                    isRequired
                    label="Equipo"
                    placeholder="Selecciona el equipo"
                    className="max-w-xs mt-2"
                    onChange={(e) => setEquipoSelected(Number(e.target.value))}
                    id="selectEquipo"
                  >
                    {equipos.map((equipo) => (
                      <SelectItem key={equipo.idEquipo} value={equipo.idEquipo}>
                        {equipo.Nombre_equipo}
                      </SelectItem>
                    ))}
                  </Select>
                  {/* <label>
                  Equipo:
                  <select
                    value={equipoSelected}
                    onChange={(e) => setEquipoSelected(Number(e.target.value))}
                    id="selectEquipo"
                  >
                    <option
                      value={"0"}
                      key={"0"}
                      selected={equipoSelected === null}
                    >
                      Seleccionar
                    </option>
                    {equipos.map((equipo) => (
                      <option key={equipo.idEquipo} value={equipo.idEquipo}>
                        {equipo.Nombre_equipo}
                      </option>
                    ))}
                  </select>
                </label> */}
                  <Select
                    isRequired
                    label="Cargo"
                    placeholder="Selecciona el cargo"
                    className="max-w-xs mt-2"
                    value={cargoSelected}
                    defaultSelectedKeys={cargoSelected}
                    onChange={(e) => setCargoSelected(e.target.value)}
                    id="SelectorCargo"
                  >
                    {equipoSelected && <SelectItem>Miembro</SelectItem>}
                    {(usuarioSelected.Cargo === "Lider" ||
                      (equipoSelected && !tieneLider(equipoSelected))) && (
                      <SelectItem>Lider</SelectItem>
                    )}
                    {!equipoSelected && (
                      <SelectItem value="Administrador">
                        Administrador
                      </SelectItem>
                    )}
                    {equipoSelected && <SelectItem>Miembro</SelectItem>}
                  </Select>
                  {/* <label>
                  Cargo:
                  <select
                    value={cargoSelected}
                    onChange={(e) => setCargoSelected(e.target.value)}
                    id="SelectorCargo"
                  >
                    {equipoSelected && <option>Miembro</option>}
                    {(usuarioSelected.Cargo === "Lider" ||
                      (equipoSelected && !tieneLider(equipoSelected))) && (
                      <option>Lider</option>
                    )}
                    {!equipoSelected && (
                      <option value="Administrador">Administrador</option>
                    )}
                  </select>
                </label> */}
                  {ErrorModiUser && <p>{ErrorModiUser}</p>}
                  <Button
                    type="submit"
                    color="success"
                    className=" mt-2 text-white"
                  >
                    Guardar Cambios
                  </Button>
                  <Button
                    type="button"
                    color="danger"
                    onClick={handleEliminarUsuario}
                    className=" mt-2"
                  >
                    Eliminar usuario
                  </Button>
                </form>
              </CardBody>
            </Card>
          )}
        </div>

        {/* FORMULARIO CREAR USUARIO */}
        <Card className="mt-4 xl:w-[50%] md:w-[100%] sm:w-[100%] xs:w-[100%] max-h-[600px] h-[100%] dark:bg-default-100/60 bg-background/100">
          <CardBody>
            <form id="formularioCrearUsuario" className="flex flex-col">
              <h1 className="text-center mb-4 text-xl">Crear usuario</h1>
              <Input
                type="text"
                label="Nombre"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                placeholder="Ingresa el nombre"
                isRequired={true}
              ></Input>
              <Input
                type="text"
                label="Rut"
                value={rut}
                onChange={handleRutChange}
                placeholder="Ingresa el rut"
                isRequired={true}
                className="mt-2"
              ></Input>
              <Input
                type="email"
                label="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Ingresa el email"
                isRequired={true}
                className="mt-2"
              ></Input>
              <Input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Contraseña"
                label="Contraseña"
                labelPlacement="inside"
                className="mt-2"
                isRequired={true}
                endContent={
                    <button
                      className="focus:outline-none"
                      type="button"
                      onClick={toggleVisibility}
                    >
                      {isVisible ? (
                        <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                      ) : (
                        <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                      )}
                    </button>
                  }
                type={isVisible ? "text" : "password"}
                
              >
              
              </Input>
              <Select
                onChange={(e) => setEquipo(e.target.value)}
                isRequired
                label="Equipo"
                placeholder="Selecciona el equipo"
                className="max-w-xs mt-2"
              >
                {equipos.map((equipo) => (
                  <SelectItem key={equipo.idEquipo} value={equipo.idEquipo}>
                    {equipo.Nombre_equipo}
                  </SelectItem>
                ))}
              </Select>
              {/* <label>
                Equipo:
                <select onChange={(e) => setEquipo(e.target.value)}>
                  <option defaultChecked value="">
                    Seleccionar
                  </option>
                  {equipos.map((equipo) => (
                    <option key={equipo.idEquipo} value={equipo.idEquipo}>
                      {equipo.Nombre_equipo}
                    </option>
                  ))}
                </select>
              </label> */}
                <Select
                onChange={handleChange}
                value={Cargo}
                isRequired
                label="Cargo"
                placeholder="Selecciona el cargo"
                className="max-w-xs mt-2"
                >
                {equipo && <SelectItem key="Miembro">Miembro</SelectItem>}
                {equipo && !tieneLider(equipo) && (
                    <SelectItem key="Lider">Lider</SelectItem>
                )}
                {!equipo && <SelectItem key="Administrador">Administrador</SelectItem>}
                </Select>

              {/* <label>
                Cargo:
                <select onChange={(e) => setCargo(e.target.value)}>
                  <option defaultChecked value="">
                    Seleccionar
                  </option>
                  {equipo && <option>Miembro</option>}
                  {equipo && !tieneLider(equipo) && <option>Lider</option>}
                  {!equipo && <option>Administrador</option>}
                </select>
              </label> */}
              {/* <label>
                Proyecto:
                <select onChange={(e) => setProyecto(e.target.value)}>
                  <option selected value="">
                    Seleccionar
                  </option>
                  {proyectos &&
                    Array.isArray(proyectos) &&
                    proyectos.map((proyecto, index) => (
                      <option key={index} value={proyecto.idProyecto}>
                        {proyecto.Nombre}
                      </option>
                    ))}
                </select>
              </label> */}
              {error && <p>{error}</p>}
              <Button
                onClick={handleCrearUsuario}
                type="button"
                color="success"
                className="mt-2 text-white"
              >
                Crear Usuario
              </Button>
            </form>
          </CardBody>
        </Card>

        <div id="MensajeEstado"></div>
      </div>
    </div>
  );
}
