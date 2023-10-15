import React, { useEffect,useState } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../components/verificador'
import { ToastContainer, toast } from 'react-toastify';
import { Slide } from 'react-toastify';
import { BuscarUsuarioForId } from '../api/UserManagerAPI';

import 'react-toastify/dist/ReactToastify.css';

export function Login() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate();
    const { login } = useAuth();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if(localStorage.getItem('token') != null){
            navigate('/');
        }
        setIsLoading(false);
    }, [navigate]);

    if (isLoading) {
        return <div>Cargando...</div>;
    }

    const onSubmit = async data => {
        try {
            const response = await axios.post('http://localhost:8000/api/token/', data);
            const tokens = response.data;
            login(tokens.access, tokens.refresh, tokens.user);
            const userObjt = await BuscarUsuarioForId();
            if (userObjt && userObjt.Cargo) {
                localStorage.setItem('refreshToken', tokens.refresh);
                localStorage.setItem('UserData', userObjt.Cargo);
                window.location.href = '/';
            } else {
                throw new Error('No se pudo obtener el cargo del usuario');
            }
        } catch (error) {
            toast.error('Contraseña o correo inválido!');
        }
    };
    

    return (
        <div className='loginDiv'>
            <ToastContainer
                position="top-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                limit={1}
                transition={Slide}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss={false}
                draggable
                pauseOnHover
                theme="dark"
                style={{marginTop:"4rem"}}
            />
            <script src="https://kit.fontawesome.com/c1366bcc7f.js" crossOrigin="anonymous"></script>
            <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet" />
            <form onSubmit={handleSubmit(onSubmit)} id='formularioLogin'>
                <h1>Iniciar sesión</h1>
                <input type="email" {...register('email', { required: 'El correo es requerido' })} style={{ fontFamily: '"Cabin", sans-serif, FontAwesome' }} placeholder='&#xF0e0; Correo' onInput={() => document.getElementById('ErrorLogin').innerHTML = ''} />
                {errors.email?.message && <p>{errors.email.message}</p>}
                <input type="password" {...register('password', { required: 'La contraseña es requerida' })} style={{ fontFamily: '"Cabin", sans-serif, FontAwesome' }} placeholder='&#xF023; Contraseña' onInput={() => document.getElementById('ErrorLogin').innerHTML = ''} />
                {errors.password?.message && <p>{errors.password.message}</p>}
                <button type="submit">Iniciar sesión</button>
            </form>
        </div>
    );
}
