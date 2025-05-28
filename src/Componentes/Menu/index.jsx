import { useState } from 'react'
import { Link } from 'react-router-dom';
import './style.css'

function Menu() {

    return (
        <nav className="c-menu">
          <Link to="/">Home</Link>
          <Link to="/favoritos">Favoritos</Link>
          <Link to="/aleatorios">Aleatorio</Link>
          <Link to="/capturados">Capturados</Link>
          <Link to="/usuarios">Usuario</Link>

        </nav>
    )
}

export default Menu