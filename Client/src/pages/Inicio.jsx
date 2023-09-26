import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import dwightPeluca from '../img/dwightPeluca.gif'
import Dwight from "../img/Dwight.png"

export function Inicio() {
  const [token, setToken] = useState(null);
  const [refreshToken, setRefreshToken] = useState(null);
  const navigate = useNavigate();
  let timeout;

  const mausdentrodelduai = (e) => {
    timeout = setTimeout(() => {
      e.target.src = dwightPeluca;
    }, 2000);
  }

  const mausfueradelduai = (e) => {
    clearTimeout(timeout);
    e.target.src = Dwight;
  }

  const rickroll = () => {
    window.open('https://youtu.be/dQw4w9WgXcQ', '_blank');
  };

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
            <p id="cardDesc" >Secretaria</p>
          </div>
          <div className='card'>
          <img onMouseOver={mausdentrodelduai} onMouseOut={mausfueradelduai} src={Dwight}/>
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
      <div className='tecnologiaDiv'>
        <h1>Tecnologia de nuestra empresa</h1>
        <div id='tecnologiaImagen'></div>
        <div id='tecnologiaTexto'>
        <p>Nuestra empresa se enorgullece de su tecnología innovadora, PerformanceCheck, diseñada para optimizar la gestión del desempeño de los empleados y la eficiencia operativa. 
          Esta tecnología integral permite a las empresas evaluar y documentar el rendimiento de sus empleados en proyectos. <br/><br/>Seguimiento detallado de proyectos: Esta característica permite a las empresas tener una visión clara del progreso de cada proyecto y entender cómo cada empleado contribuye a este progreso.
          </p>
        </div>
      </div>
      <div className='madera'></div>
      <div className='uneteDiv'>
        <h1>SI BUSCAS EMPLEO UNETE A NOSOTROS</h1>
        <button onClick={rickroll}>¡UNETE!</button>
      </div>
      <div className='madera'></div>
    </div>
  );
}
