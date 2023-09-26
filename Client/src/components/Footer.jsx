import React from 'react';
import logo from "../img/Dunder-Mifflin.png"

const Footer = () => {
    let timeout;

    const mausdentrodelduai = (e) => {
        timeout = setTimeout(() => {
            e.target.src = 'https://media.tenor.com/5AVmfMmwdFkAAAAM/oh-yeah-smile.gif';
        }, 3000);
    }

    const mausfueradelduai = (e) => {
        clearTimeout(timeout);
        e.target.src = logo;
    }
    return (
        <footer>
            <div id="logoDunder"><img onMouseOver={mausdentrodelduai} onMouseOut={mausfueradelduai} src={logo}/></div>
            <div className="contactoDunder">
                <a>Politicas de privacidad • Politica de cookies </a>
                <a>Dunder Mifflin • Scranton, Pennyslvania, United States • Numero: (570) 343-3400</a>
            </div>
            <div id="logoInacap"> </div>
        </footer>
    );
}

export default Footer;
