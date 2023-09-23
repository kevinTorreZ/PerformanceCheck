import React, { useEffect } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { useNavigate, Link } from 'react-router-dom';
import {useAuth} from '../components/verificador'

export function Login() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate();
    const { login } = useAuth();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            navigate('/');
        }
    }, [navigate]);

    const onSubmit = async data => {
        try{
            const response = await axios.post('http://localhost:8000/api/token/', data);
            const tokens = response.data;
            login(tokens.access);
            localStorage.setItem('refreshToken', tokens.refresh);
            navigate('/');
        }catch(error){
            document.getElementById('errorCredenciales').hidden = false
        }
    };

    return (
        <div>
            <h1>Login</h1>
            <form onSubmit={handleSubmit(onSubmit)} id='formularioLogin'>
                <input type="email" {...register('email', { required: 'El correo es requerido' })} placeholder='Correo'/>
                {errors.email?.message && <p>{errors.email.message}</p>}
                <input type="password" {...register('password', { required: 'La contraseña es requerida' })} placeholder='Contraseña'/>
                {errors.password?.message && <p>{errors.password.message}</p>}
                <button type="submit">Login</button>
            </form>
        </div>
    );
}
