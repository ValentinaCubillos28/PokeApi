import { useContext } from 'react';
import { AppContext } from '../../contexto/contexto';
import { useNavigate } from "react-router-dom";
import './style.css';

function Favoritos() {
  const { favoritos, setFavoritos } = useContext(AppContext);
  const navigate = useNavigate();

  return (
    <div className="c-favoritos">
      <h2 className="c-titulo">Mis Favoritos</h2>
      {favoritos.length === 0 ? (
        <p className="c-mensaje">No hay Pokémon favoritos aún.</p>
      ) : (
        <div className="c-lista">
          {favoritos.map((pokemon, index) => (
            <div
              className="c-lista-item"
              onClick={() => navigate(`/Pokemon/${pokemon.id}`)}
              key={index}
            >
              <img
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`}
                alt={`Pokémon ${pokemon.nombre}`}
                className="c-imagen"
                loading="lazy"
              />
              <p className="c-nombre">{pokemon.nombre}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Favoritos;
