import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export function GestionProyectos() {
  const Navigate = useNavigate();
  const token = localStorage.getItem('token');
  const UserCargo = localStorage.getItem('UserData')
  const [equiposSinProyecto, setEquiposSinProyecto] = useState([]);
  const [equipos, setEquipos] = useState([]);
  const [proyectos, setProyectos] = useState([]);
  const ahora = new Date().toISOString().slice(0, 16);
  const [formKey, setFormKey] = useState(0);
  const [ProyectoSelected, setProyectoSelected] = useState('');
  const [proyecto, setProyecto] = useState({
    nombre: '',
    descripcion: '',
    fechaInicio: '',
    fechaTermino: '',
    equipo: ''
  });

  useEffect(() => {

    const fetchData = async () => {
      if (token && UserCargo === 'Administrador') {
        try {
          const resEquipos = await axios.get(`http://localhost:8000/api/equipos/`, {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });
          const resProyectos = await axios.get(`http://localhost:8000/api/proyectos`, {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });
          const equiposSinProyecto = resEquipos.data.filter(equipo => equipo.Fk_proyecto_asignado_id == 0);
          setEquiposSinProyecto(equiposSinProyecto)
          setEquipos(resEquipos.data)
          setProyectos(resProyectos.data)
        } catch (error) {
          console.error(error);
        }
      } else {
        Navigate('/login');
      }
    };
    fetchData();
  }, []);

  const validarProyecto = (nombre, descripcion, fechaInicio, fechaTermino, equipo, proyectos) => {
    if (!nombre || !descripcion || !fechaInicio || !fechaTermino || equipo === '' || equipo === 'Seleccionar...') {
      throw new Error('Todos los campos son obligatorios');
    }
    if (proyectos.some(objeto => objeto.Nombre.toLowerCase().replace(/ /g, '') === nombre.toLowerCase().replace(/ /g, ''))) {
      throw new Error('El nombre de proyecto ingresado ya existe!');
    }
    if (fechaInicio > fechaTermino) {
      throw new Error('La fecha de inicio no puede ser posterior a la fecha de término.');
    }
  };

  const CrearProyecto = (event) => {
    event.preventDefault();
    const { nombre, descripcion, fechaInicio, fechaTermino, equipo } = proyecto;
    const jsonProyecto = {
      Nombre: nombre,
      Descripcion: descripcion,
      FechaInicio: fechaInicio,
      FechaTermino: fechaTermino
    }
    try {
      validarProyecto(nombre, descripcion, fechaInicio, fechaTermino, equipo, proyectos);
      axios.post('http://127.0.0.1:8000/api/proyectos', jsonProyecto, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      setProyecto({
        nombre: '',
        descripcion: '',
        fechaInicio: '',
        fechaTermino: '',
        equipo: ''
      });
      setFormKey(prevKey => prevKey + 1);
      console.log('Se ha creado un nuevo proyecto!')
    } catch (error) {
      console.error(error.message);
    }
  };
  const handleChange = (event) => {
    setProyecto({
      ...proyecto,
      [event.target.name]: event.target.value
    });
  }
  return (
    <div>
      <h1>Gestionador proyectos y equipos</h1>
      <hr />
      <div>
        <h2>CRUD proyectos </h2>
        <h3>Lista Proyectos</h3>
        <div>
          <ul>
            {proyectos.map(proyecto => (<li onClick={() => setProyectoSelected(proyecto)}>{proyecto.idProyecto} {proyecto.Nombre}</li>))}
          </ul>
          {ProyectoSelected && (
            <form id='formCrearProyecto' key={formKey}>
              <input type='text' name='nombre' onChange={handleChange} placeholder='Nombre del proyecto...' />
              <textarea name="descripcion" onChange={handleChange} rows="4" cols="50" style={{ resize: 'None' }} placeholder='Descripcion...' />
              <label>
                Fecha Inicio:
                <input type='datetime-local' name='fechaInicio' onChange={handleChange} min={ahora} />
              </label>
              <label>
                Fecha Termino:
                <input type='datetime-local' name='fechaTermino' onChange={handleChange} min={ahora} />
              </label>
              <label>
                Asignar equipo:
                <select name='equipo' onChange={handleChange}>
                  <option defaultChecked key=''>Seleccionar...</option>
                  <option key='0' value='0'>Sin equipo</option>
                  {equiposSinProyecto.map(equipo => (
                    <option key={equipo.idEquipo} value={equipo.idEquipo}>{equipo.Nombre_equipo}</option>
                  ))}
                </select>
              </label>
              <button onClick={CrearProyecto}>Crear proyecto</button>
            </form>
          )}
        </div>
        <form id='formCrearProyecto' key={formKey}>
          <input type='text' name='nombre' onChange={handleChange} placeholder='Nombre del proyecto...' />
          <textarea name="descripcion" onChange={handleChange} rows="4" cols="50" style={{ resize: 'None' }} placeholder='Descripcion...' />
          <label>
            Fecha Inicio:
            <input type='datetime-local' name='fechaInicio' onChange={handleChange} min={ahora} />
          </label>
          <label>
            Fecha Termino:
            <input type='datetime-local' name='fechaTermino' onChange={handleChange} min={ahora} />
          </label>
          <label>
            Asignar equipo:
            <select name='equipo' onChange={handleChange}>
              <option defaultChecked key=''>Seleccionar...</option>
              <option key='0' value='0'>Sin equipo</option>
              {equiposSinProyecto.map(equipo => (
                <option key={equipo.idEquipo} value={equipo.idEquipo}>{equipo.Nombre_equipo}</option>
              ))}
            </select>
          </label>
          <button onClick={CrearProyecto}>Crear proyecto</button>
        </form>
      </div>
      <hr />
      <div>
        <h2>CRUD equipos </h2>
        <form>
        </form>
      </div>
    </div>
  );
}
