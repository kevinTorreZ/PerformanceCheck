import axios from 'axios';
import { useState } from 'react';

export function Register() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

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
            console.log(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
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