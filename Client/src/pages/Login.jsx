import React, { useEffect } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { useNavigate, Link } from 'react-router-dom';

export function Login() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            navigate('/');
        }
    }, [navigate]);

    const onSubmit = async data => {
        try{
            const response = await axios.post('http://localhost:8000/api/login', data);
            const token = response.data.token;
            localStorage.setItem('token', token); // Guarda el token en el almacenamiento local
            navigate('/');
        }catch(error){
            document.getElementById('errorCredenciales').hidden = false
        }
    };

    return (
        <div>
            <Link to={'/Registro'}>Registrarse</Link> <Link to={'/'}>Inicio</Link>
            <form onSubmit={handleSubmit(onSubmit)} id='formularioLogin'>
                <input type="email" {...register('email', { required: 'El correo es requerido' })} placeholder='Correo'/>
                {errors.email?.message && <p>{errors.email.message}</p>}
                <input type="password" {...register('password', { required: 'La contraseña es requerida' })} placeholder='Contraseña'/>
                {errors.password?.message && <p>{errors.password.message}</p>}
                {errors.AxiosError}
                <button type="submit">Iniciar sesión</button>
                <h1 id='errorCredenciales' hidden >Credenciales inválidas!</h1>
            </form>
        </div>
    );
}
