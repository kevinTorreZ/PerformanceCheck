import React, { useEffect, useState } from 'react';
import {getAllUsers} from '../api/UserManagerAPI.js'
import axios from 'axios';

export function Inicio() {
    const [email, setUsername] = useState('');
    const [password, setPassword] = useState('');
  
    const handleSubmit = async event => {
      event.preventDefault();
  
      const response = await axios.post('http://localhost:8000/api/login', {
        email: email,
        password: password
      });
  
      const token = response.data.token;
      // Guarda el token en algún lugar de tu aplicación
    };
  
    return (
      <form onSubmit={handleSubmit}>
        <input type="email" value={email} onChange={e => setUsername(e.target.value)} />
        <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
        <button type="submit">Iniciar sesión</button>
      </form>
    );
  }

