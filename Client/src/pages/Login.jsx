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
            login(tokens.access, tokens.refresh, tokens.user);
            localStorage.setItem('refreshToken', tokens.refresh);
            navigate('/');
        }catch(error){
            console.log("Contraseña equivocada.")
        }
    };

    return (
        <div className='loginDiv'>
        <script src="https://kit.fontawesome.com/c1366bcc7f.js" crossOrigin="anonymous"></script>
        <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet"/>
                <form onSubmit={handleSubmit(onSubmit)} id='formularioLogin'>
                    <h1>Iniciar sesión</h1>
                    <input type="email" {...register('email', { required: 'El correo es requerido' })} style={{fontFamily: '"Cabin", sans-serif, FontAwesome'}} placeholder='&#xF0e0; Correo'/>
                    {errors.email?.message && <p>{errors.email.message}</p>}
                    <input type="password" {...register('password', { required: 'La contraseña es requerida' })} style={{fontFamily: '"Cabin", sans-serif, FontAwesome'}} placeholder='&#xF023; Contraseña'/>
                    {errors.password?.message && <p>{errors.password.message}</p>}
                    <button type="submit">Iniciar sesión</button>
                </form>
        </div>
    );
}
