import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import { useAuth } from '../components/verificador';

export function GestionUsuarios() {
    const [usuarios, setUsuarios] = useState([]);
    const [rut, setRut] = useState('');
    const [nombre, setNombre] = useState('');
    const [email, setEmail] = useState('');
    const [error, setError] = useState(false);
    const [password, setPassword] = useState('');
    const [Cargo, setCargo] = useState('');
    const [equipo, setEquipo] = useState(null);
    const [UserModi, setUserModi] = useState('')
    const [proyecto, setProyecto] = useState('');
    const [equipos, setEquipos] = useState([]);
    const [proyectos, setProyectos] = useState([]);
    const [ErrorModiUser, setErrorModiUser] = useState('')
    const [usuarioSelected, setUsuarioSelected] = useState(null);
    const [equipoSelected, setEquipoSelected] = useState(null);
    const [proyectoSelected, setProyectoSelected] = useState(null);
    const [proyectosSelected, setProyectosSelected] = useState(null);
    const [cargoSelected, setCargoSelected] = useState(null);


    const Navigate = useNavigate()

    const BuscarUsuarios = () => {
        const token = localStorage.getItem('token');
        if (token) {
            axios.get(`http://localhost:8000/users/`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }).then(response => {
                setUsuarios(response.data);
            }).catch(error => {
                console.error(error);
            });
        } else {
            Navigate('/login');
        }
        console.log(usuarios)
    };
    useEffect(BuscarUsuarios, [Navigate])


    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token && Cargo != 'Administrador') {
            axios.get(`http://localhost:8000/api/equipos`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }).then(response => {
                setEquipos(response.data);
            }).catch(error => {
            });
        }
    }, [Navigate]);


    const tieneLider = (equipoId) => {
        if (equipos[equipoId] && equipos[equipoId].Lider !== undefined && equipos[equipoId].Lider !== null) {
            return true;
        }
        else {
            return false;
        }
    };

    const handleRutChange = (event) => {
        setRut(event.target.value);
    };

    const handleRutBlur = () => {
        const rutRegex = /^[0-9]+-[0-9kK]{1}$/;  // Expresión regular para validar el formato del RUT

        if (!rutRegex.test(rut)) {
            setError(true);
            console.log('Formato de RUT inválido. Ingrese el rut sin punto y con guion');
        } else {
            setError(false);
        }
    };

    useEffect(() => {
        if (usuarioSelected && usuarioSelected.Fk_equipo_asignado_id) {
            setProyectoSelected(usuarioSelected.Fk_proyecto_asignado_id);
            setEquipoSelected(usuarioSelected.Fk_equipo_asignado_id)
            console.log(equipoSelected)
        }
    }, [usuarioSelected]);


    const cargarProyectos = (equipoId) => {
        if (equipoId && equipos.find(e => e.idEquipo === equipoId).Fk_proyecto_asignado_id) {
            const token = localStorage.getItem('token');
            axios.get(`http://localhost:8000/api/proyectos/${equipos.find(e => e.idEquipo === equipoId).Fk_proyecto_asignado_id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }).then(response => {
                if (response.data) {
                    setProyectosSelected([response.data]);
                } else {
                    console.error('La API no devolvió un objeto');
                }
            }).catch(error => {
                console.error(error);
            });
        }
        else {
            setProyectosSelected([])
        }
    }

    useEffect(() => {
        cargarProyectos(equipoSelected);
    }, [equipoSelected]);


    const handleClickListaUsuario = (usuario) => {
        setUserModi(usuario);
        setEquipoSelected(usuario.Fk_equipo_asignado_id)
        setUsuarioSelected(usuario);
        console.log(equipoSelected)
    }

    useEffect(() => {
        if (equipo) {
            const token = localStorage.getItem('token');
            axios.get(`http://localhost:8000/api/proyectos/${equipos[equipo - 1].Fk_proyecto_asignado_id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }).then(response => {
                if (response.data) {
                    console.log(response.data)
                    setProyectos([response.data]);
                } else {
                    console.error('La API no devolvió un objeto');
                }
            }).catch(error => {
                console.error(error);
            });
        }
        else {
            setProyectos([])
        }
    }, [equipo]);

    const handleModificarUsuario = async (event) => {
        const rutRegex = /^[0-9]+-[0-9kK]{1}$/;
        const token = localStorage.getItem('token');
        event.preventDefault();
        const usuarioModificado = {
            idUsuario: usuarioSelected.idUsuario,
            email: usuarioSelected.email,
            Nombre: usuarioSelected.Nombre,
            password: usuarioSelected.password,
            Rut: usuarioSelected.Rut,
            Fk_equipo_asignado_id: Number(equipoSelected),
            Usuario: usuarioSelected.email,
            Cargo: document.getElementById('SelectorCargo').value,
            Fk_proyecto_asignado_id: Number(document.getElementById('SelectorProyecto').value)
        };
        if (!rutRegex.test(usuarioModificado.Rut)) {
            return setErrorModiUser('El rut ingresado es inválido.')
        } else {
            if (usuarios.filter(user => user.Rut === usuarioModificado.Rut && user.Rut != UserModi.Rut).length > 0) {
                return setErrorModiUser('El rut ingresado ya existe.')
            } else {
                if (isNaN(usuarioModificado.Fk_equipo_asignado_id) || isNaN(usuarioModificado.Fk_proyecto_asignado_id)) {
                    usuarioModificado.Fk_equipo_asignado_id = null;
                    usuarioModificado.Fk_proyecto_asignado_id = null;
                }
                if (usuarios.filter(user => user.email === usuarioModificado.email && user.email != UserModi.email && user.email != UserModi.email).length > 0) {
                    return setErrorModiUser('El usuario ingresado ya existe!')
                }
            }
        }
        console.log(usuarioModificado.Fk_equipo_asignado_id)
        setErrorModiUser()
        if (token) {
            axios.put(`http://localhost:8000/api/users/${usuarioSelected.idUsuario}/`, usuarioModificado, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }).then(response => {
                console.log('El usuario se ha modificado correctamente!.');
                BuscarUsuarios();
                setUsuarioSelected();
                setEquipoSelected();
            }).catch(error => {
                console.error(error);
            });
        }
    };
    const handleEliminarUsuario = async () => {
        //Logica para modifcar usuario
    };
    const handleCrearUsuario = async () => {
        const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)[a-zA-Z\d]{8,}$/;
        if (!passwordRegex.test(password)) {
            alert('La contraseña debe tener al menos 8 caracteres, incluyendo al menos una letra mayúscula y un número.')
            return;
        }
        const userData = {
            Rut: rut,
            Nombre: nombre,
            email: email,
            password: password,
            Cargo: Cargo,
            Fk_proyecto_asignado_id: proyecto,
            Fk_equipo_asignado_id: equipo,
        };
        const token = localStorage.getItem('token');
        try {
            await axios.post('http://127.0.0.1:8000/api/register', userData, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            document.getElementById('MensajeEstado').innerHTML = 'Se ha creado el usuario.'
        } catch (error) {
            document.getElementById('MensajeEstado').innerHTML = 'Se ha producido un error.'
        }
    };
    const manejarCambio = (evento) => {
        let valorEntrada = evento.target.value;
        valorEntrada = valorEntrada.replace(/\D|-/g, '');
        valorEntrada = valorEntrada.substring(0, 9);
        if (valorEntrada.length >= 8 && valorEntrada[valorEntrada.length - 1] !== '-') {
            valorEntrada = valorEntrada.substring(0, 8) + '-' + valorEntrada.substring(8);
        }

        setUsuarioSelected({ ...usuarioSelected, Rut: valorEntrada });
    };
    return (
        <div>
            <h1>Gestión de Usuarios</h1>
            <div className='ListaUsuarios'>
                <ul>
                    {usuarios.map(usuario => (
                        <li key={usuario.idUsuario} onClick={() => handleClickListaUsuario(usuario)}>{usuario.email} </li>

                    ))}
                </ul>
            </div>
            <div className='InfoUsuarios'>
                {UserModi.Cargo}
                {usuarioSelected && (<form onSubmit={handleModificarUsuario}>
                    <label>
                        Correo:
                        <input type="text" value={usuarioSelected.email} onChange={e => setUsuarioSelected({ ...usuarioSelected, email: e.target.value })} />
                    </label>
                    <label>
                        Nombre:
                        <input type="text" value={usuarioSelected.Nombre} onChange={e => setUsuarioSelected({ ...usuarioSelected, Nombre: e.target.value })} />
                    </label>
                    <label>
                        Rut:
                        <input type="text" value={usuarioSelected.Rut} onChange={manejarCambio} placeholder="RUT" />
                    </label>
                    <select value={equipoSelected} onChange={e => setEquipoSelected(Number(e.target.value))} id='selectEquipo'>
                        <option value={'0'} key={'0'} selected={equipoSelected === null}>Seleccionar</option>
                        {equipos.map((equipo) => (
                            <option key={equipo.idEquipo} value={equipo.idEquipo}>{equipo.Nombre_equipo}</option>
                        ))}
                    </select>
                    <select value={cargoSelected} onChange={e => setCargoSelected(e.target.value)} id='SelectorCargo'>
                        {equipoSelected && <option>Miembro</option>}
                        {(usuarioSelected.Cargo === 'Lider' || (equipoSelected && !tieneLider(equipoSelected))) && <option>Lider</option>}
                        {!equipoSelected && <option value='Administrador'>Administrador</option>}
                    </select>
                    <select onChange={e => setProyectoSelected(e.target.value)} id='SelectorProyecto'>
                        {!equipoSelected && <option value='Seleccionar'>Seleccionar</option>}
                        {
                            proyectosSelected && proyectosSelected.map((proyecto, index) => (
                                <option key={index} value={proyecto.idProyecto}>{proyecto.Nombre}</option>
                            ))
                        }
                    </select>
                    {ErrorModiUser && <p>{ErrorModiUser}</p>}
                    <button type="button">Eliminar</button>
                    <button type="submit">Modificar</button>
                </form>)}
            </div>
            <h2>Crear Usuario</h2>
            <input type="text" value={nombre} onChange={e => setNombre(e.target.value)} placeholder="Nombre" required />
            <input type="text" value={rut} onChange={handleRutChange} onBlur={handleRutBlur} placeholder="RUT" required />
            {error && <p>Formato de RUT inválido</p>}
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" required />
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Contraseña" required />
            <select onChange={e => setEquipo(e.target.value)}>
                <option defaultChecked value="">Seleccionar</option>
                {equipos.map((equipo) => (
                    <option key={equipo.idEquipo} value={equipo.idEquipo}>{equipo.Nombre_equipo}</option>
                ))}
            </select>
            <select onChange={e => setCargo(e.target.value)}>
                <option defaultChecked value="">Seleccionar</option>
                {equipo && <option>Miembro</option>}
                {equipo && !tieneLider(equipo) && <option>Lider</option>}
                {!equipo && <option>Administrador</option>}
            </select>

            <select onChange={e => setProyecto(e.target.value)}>
                <option selected value=''>Seleccionar</option>
                {proyectos && Array.isArray(proyectos) && proyectos.map((proyecto, index) => (
                    <option key={index} value={proyecto.idProyecto}>{proyecto.Nombre}</option>
                ))}
            </select>
            <button onClick={handleCrearUsuario}>Crear Usuario</button>
            <div id='MensajeEstado'>

            </div>
        </div>
    );
}