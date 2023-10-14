import { faL } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios'
import jwt_decode from 'jwt-decode';
import { useState } from 'react';

export const getAllUsers = () => {
    return axios.get('http://127.0.0.1:8000/users/')
}

export const BuscarUsuarioForId = async () => {
    const token = localStorage.getItem('token');
    const decodedToken = jwt_decode(token);
    const user_id = decodedToken.user_id;
    if (token) {
        await axios.get(`http://localhost:8000/users/`+user_id, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then(response => {
            return response.data
            
        }).catch(error => {
            return console.error(error);
        });
    } else {
        Navigate('/login');
    }
};