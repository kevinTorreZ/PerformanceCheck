import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate,Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import {useAuth} from "../components/verificador"

export function Register() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate();
    const { login } = useAuth();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            window.location.href = '/';
        }
    }, [navigate]);

    const onSubmit = async (data) => {
        const { email, password } = data;
        const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)[a-zA-Z\d]{8,}$/;
        if (!passwordRegex.test(password)) {
            alert('La contraseña debe tener al menos 8 caracteres, incluyendo al menos una letra mayúscula y un número.');
            return;
        }

        const userData = {
            email: email,
            password: password,
            Fk_proyecto_asignado_id: 0,
            Fk_equipo_asignado_id: 0,
        };

        try {
            await axios.post('http://127.0.0.1:8000/api/register', userData);
            const response = await axios.post('http://localhost:8000/api/token/', {
                email: email,
                password: password
            });
          
            const tokens = response.data;
            login(tokens.access);
            localStorage.setItem('refreshToken', tokens.refresh);
            navigate('/');
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <h1>Registro</h1>
            <label>
                Email:
                <input type="email" {...register('email', { required: 'El correo es requerido' })} placeholder='Correo' />
                {errors.email?.message && <p>{errors.email.message}</p>}
            </label>
            <label>
                Password:
                <input type="password" {...register('password', { required: 'La contraseña es requerida' })} placeholder='Contraseña'/>
                {errors.password?.message && <p>{errors.password.message}</p>}
            </label>
            <button type="submit">Register</button>
        </form>
    );
}
