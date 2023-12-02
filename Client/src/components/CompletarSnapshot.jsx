import React, { useEffect, useState } from 'react';
import axios from 'axios';
import jwt_decode from 'jwt-decode';

export function CompletarSnapshot({ handleCancelarClick }){
    // ...
    return (
        <div>
            <h1>asdfasdfaso</h1>
            <button onClick={() => handleCancelarClick(false)}>Cancelar</button>
        </div>
    );
}
