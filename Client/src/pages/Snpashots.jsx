import React, { useState, useEffect } from 'react';
import {Miembro} from '../components/Miembro';
import {Lider} from '../components/Lider';

export function Snapshosts() {
  const [cargo, setCargo] = useState('');
  const [vista, setVista] = useState('Miembro'); // Establece la vista inicial a 'miembro'

  useEffect(() => {
    const cargoUsuario = localStorage.getItem("UserData");
    setCargo(cargoUsuario);
  }, []);

  const handleMiembroClick = () => {
    setVista('Miembro');
  };

  const handleLiderClick = () => {
    setVista('Lider');
  };

  return (
    <div>
      {cargo === 'Miembro' && <button style={{ borderBottom: vista === 'Miembro' ? '2px solid red' : 'none' }} onClick={handleMiembroClick}>Miembro de equipo</button>}
      {cargo === 'Lider' && (
        <>
          <button style={{ borderBottom: vista === 'Miembro' ? '2px solid red' : 'none' }} onClick={handleMiembroClick}>Miembro de equipo</button>
          <button style={{ borderBottom: vista === 'Lider' ? '2px solid red' : 'none' }} onClick={handleLiderClick}>Líder de equipo</button>
        </>
      )}
      <hr />
      {vista === 'Miembro' && <Miembro />}
      {vista === 'Lider' && <Lider />}
    </div>
  );
}
