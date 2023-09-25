import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

export function Inicio() {
  const [token, setToken] = useState(null);
  const [refreshToken, setRefreshToken] = useState(null);
  const navigate = useNavigate();
  let timeout;

  const mausdentrodelduai = (e) => {
    timeout = setTimeout(() => {
      e.target.src = 'https://media.tenor.com/R8Ot9SBUktQAAAAd/dwight-schrute-the-office.gif';
    }, 3000);
  }

  const mausfueradelduai = (e) => {
    clearTimeout(timeout);
    e.target.src = 'https://res.cloudinary.com/dln364ilz/image/upload/v1695676998/Dwight_ozdb3c.png';
  }

  useEffect(() => {
    const token = localStorage.getItem('token');
    setToken(token);
    const refreshToken = localStorage.getItem('refreshToken');
    setRefreshToken(refreshToken);
  }, []);
  return (
    <div>
      <div className="bannerInicio">
        <div className='letrasIzquierda'>
          <img src="https://logos-world.net/wp-content/uploads/2022/02/Dunder-Mifflin-Emblem.png" />
          <h2>Papel sin límites en un mundo sin papel</h2>
          <button>Ordena tu papel</button>
        </div>
      </div>
      {/* {token && refreshToken ? <p>Estás logueado.</p> : 
        <p>No estás logueado.</p>}
        */}
      <div className='madera'></div>
      <div className='bajoBanner'>
        <h1>¿Quienes somos?</h1>
        <div className='somosDiv'>
          <p>Somos Dunder Mifflin, una empresa de papel que se enorgullece de suministrar a empresas de todo el país con productos de papel de alta calidad. Nuestro lema,
            “Papel sin límites en un mundo sin papel”, refleja nuestro compromiso inquebrantable con la excelencia en la fabricación y distribución de papel, incluso en una era cada vez más digital.</p>
        </div>
        <div className='somosImg'></div>
      </div>
      <div className='madera'></div>
      <div className='conocenosDiv'>
        <h1>Conoce a nuestros empleados</h1>
        <div className='cards'>
          <div className='card'>
            <img src='https://res.cloudinary.com/dln364ilz/image/upload/v1695674938/Jim_yih2iw.png' />
            <h1 id="cardName" >Jim Halpert</h1>
            <p id="cardDesc" >Representante de ventas</p>
          </div>
          <div className='card'>
            <img src='https://res.cloudinary.com/dln364ilz/image/upload/v1695675274/Pam_lliknu.png' />
            <h1 id="cardName" >Pam Beesly</h1>
            <p id="cardDesc" >Vendedora</p>
          </div>
          <div className='card'>
          <img onMouseOver={mausdentrodelduai} onMouseOut={mausfueradelduai} src='https://res.cloudinary.com/dln364ilz/image/upload/v1695676998/Dwight_ozdb3c.png'/>
            <h1 id="cardName" >Dwight Schrute</h1>
            <p id="cardDesc" >Asistente del gerente regional</p>
          </div>
          <div className='card'>
            <img src='https://res.cloudinary.com/dln364ilz/image/upload/v1695675722/Michael_baovbc.png' />
            <h1 id="cardName" >Michael Scott</h1>
            <p id="cardDesc" >Gerente general</p>
          </div>
        </div>
      </div>
      <div className='madera'></div>

    </div>

  );
}
