import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import { useAuth } from '../components/verificador'

export function GestionUsuarios() {
    const [usuarios, setUsuarios] = useState([]);
    const [rut, setRut] = useState('');
    const [nombre, setNombre] = useState('');
    const [email, setEmail] = useState('');
    const [error, setError] = useState(false);
    const [password, setPassword] = useState('');
    const [Cargo, setCargo] = useState('');
    const [equipo, setEquipo] = useState(null);
    const [proyecto, setProyecto] = useState('');
    const [equipos, setEquipos] = useState([]);
    const [proyectos, setProyectos] = useState([]);
    const navigate = useNavigate();
    const auth = useAuth();  // Usa el hook useAuth para obtener el estado de autenticación

    const tieneLider = (equipoId) => {
        if(equipos[equipoId].Lider != undefined){
            return true
        }
        else{
            return false
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
        const token = localStorage.getItem('token');
        if (token && Cargo != 'Administrador') {
            axios.get(`http://localhost:8000/api/equipos`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }).then(response => {
                setEquipos(response.data);
            }).catch(error => {
                navigate("/logout");
                console.error(error);
            });
        }
    }, []);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token && equipo && equipo != "") {
            axios.get(`http://localhost:8000/api/proyectos/${equipos[equipo].Fk_proyecto_asignado_id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }).then(response => {
                if (response.data) {
                    setProyectos([response.data]);
                } else {
                    console.error('La API no devolvió un objeto');
                }
            }).catch(error => {
                console.error(error);
            });
        }
        else{
            setProyectos([])
        }
    }, [equipo]);

    const handleCrearUsuario = () => {
        console.log(tieneLider(equipo))
        console.log(nombre);  // Imprime el valor del input de nombre
        console.log(Cargo);  // Imprime el valor del input de nombre
        console.log(email);  // Imprime el valor del input de email
        console.log(password);  // Imprime el valor del input de password
        console.log(equipo);  // Imprime el valor del select de equipo
        console.log(proyecto);
    };

    return (
        <div>
            <h1>Gestión de Usuarios</h1>
            <ul>
                {usuarios.map(usuario => (
                    <li key={usuario.idUsuario}>{usuario.email}</li>
                ))}
            </ul>
            <h2>Crear Usuario</h2>
            <input type="text" value={nombre} onChange={e => setNombre(e.target.value)} placeholder="Nombre" />
            <input type="text" value={rut} onChange={handleRutChange} onBlur={handleRutBlur} placeholder="RUT" />
            {error && <p>Formato de RUT inválido</p>}
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" />
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Contraseña" />
            <select onChange={e => setEquipo(e.target.value + 1)}>
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

            <select value={proyecto} onChange={e => setProyecto(e.target.value)}>
                <option defaultChecked value=''>Seleccionar</option>
                {proyectos.map((proyecto, index) => (
                    <option key={index} value={proyecto.idProyecto}>{proyecto.Nombre}</option>
                ))}
            </select>
            <button onClick={handleCrearUsuario}>Crear Usuario</button>
        </div>
    );
}
