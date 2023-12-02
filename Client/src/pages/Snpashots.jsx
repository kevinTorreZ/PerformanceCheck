import React, { useState, useEffect } from 'react';
import {Miembro} from '../components/Miembro';
import {Lider} from '../components/Lider';

export function Snapshosts() {
  const [cargo, setCargo] = useState('');
  const [vista, setVista] = useState('Miembro'); // Establece la vista inicial a 'miembro'
  const [completandoSnapshot, setCompletandoSnapshot] = useState(false); // Nuevo estado

  useEffect(() => {
    const cargoUsuario = localStorage.getItem("UserData");
    setCargo(cargoUsuario);
  }, []);

  const handleMiembroClick = () => {
    setVista('Miembro');
    setCompletandoSnapshot(false); // Cuando se hace clic en un botón, se establece completandoSnapshot en false
  };

  const handleLiderClick = () => {
    setVista('Lider');
    setCompletandoSnapshot(false); // Cuando se hace clic en un botón, se establece completandoSnapshot en false
  };

  const handleCompletarSnapshot = () => {
    if(completandoSnapshot){
      setCompletandoSnapshot(false)
    }else{
      setCompletandoSnapshot(true)
    }
  };

  return (
    <div>
      {!completandoSnapshot && ( // Solo muestra los botones si no se está completando un snapshot
        <>
          {cargo === 'Miembro' && <button style={{ borderBottom: vista === 'Miembro' ? '2px solid red' : 'none' }} onClick={handleMiembroClick}>Miembro de equipo</button>}
          {cargo === 'Lider' && (
            <>
              <button style={{ borderBottom: vista === 'Miembro' ? '2px solid red' : 'none' }} onClick={handleMiembroClick}>Miembro de equipo</button>
              <button style={{ borderBottom: vista === 'Lider' ? '2px solid red' : 'none' }} onClick={handleLiderClick}>Líder de equipo</button>
            </>
          )}
          <hr />
        </>
      )}
      {vista === 'Miembro' && <Miembro />}
      {vista === 'Lider' && <Lider handleCompletarSnapshot={handleCompletarSnapshot} />}

    </div>
  );
}

