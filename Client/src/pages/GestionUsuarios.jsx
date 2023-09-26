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

    const handleCrearUsuario = async ()  => {
        const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)[a-zA-Z\d]{8,}$/;
        if (!passwordRegex.test(password)) {
            alert('La contraseña debe tener al menos 8 caracteres, incluyendo al menos una letra mayúscula y un número.');
            return;
        }
        const userData = {
            Rut: rut,
            Nombre: nombre,
            email: email,
            password: password,
            Cargo: Cargo,
            Fk_proyecto_asignado_id: null,
            Fk_equipo_asignado_id: null,
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

    return (
        <div>
            <h1>Gestión de Usuarios</h1>
            <ul>
                {usuarios.map(usuario => (
                    <li key={usuario.idUsuario}>{usuario.email}</li>
                ))}
            </ul>
            <h2>Crear Usuario</h2>
            <input type="text" value={nombre} onChange={e => setNombre(e.target.value)} placeholder="Nombre" required/>
            <input type="text" value={rut} onChange={handleRutChange} onBlur={handleRutBlur} placeholder="RUT"  required/>
            {error && <p>Formato de RUT inválido</p>}
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" required/>
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Contraseña" required/>
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
            <div id='MensajeEstado'>

            </div>
        </div>
    );
}
