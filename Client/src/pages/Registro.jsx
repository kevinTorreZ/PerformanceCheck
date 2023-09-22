import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate,Link } from 'react-router-dom';

export function Register() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    // Cuando se carga el componente, verifica si hay un token en el almacenamiento local
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            navigate('/');
        }
    }, [navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = {
            email: email,
            password: password,
            Fk_proyecto_asignado_id: 0,
            Fk_equipo_asignado_id: 0,
        };

        try {
            const response = await axios.post('http://127.0.0.1:8000/api/register', data);
            const response2 = await axios.post('http://localhost:8000/api/login', {
                email: email,
                password: password
              });
          
            const token = response2.data.token;
            localStorage.setItem('token', token);
            navigate('/')
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <Link to={'/Login'}>Login</Link> <Link to={'/'}>Inicio</Link>
            <label>
                Email:
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} required />
            </label>
            <label>
                Password:
                <input type="password" value={password} onChange={e => setPassword(e.target.value)} required />
            </label>
            <button type="submit">Register</button>
        </form>
    );
}