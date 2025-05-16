import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route, Routes, Navigate } from
  'react-router-dom';
import { AppProvider } from './contexto/contexto';

import { supabase } from "./supabase";
import Aleatorios from './Componentes/Aleatorios'
import Capturados from './Componentes/Capturados'
import Favoritos from './Componentes/Favoritos'
import Listas from './Componentes/Listas'
import Pokemon from './Componentes/Pokemon'
import Usuario from './Componentes/Usuario'
import Menu from './Componentes/Menu';
import Login from './Componentes/login';
import Registro from './Componentes/registro';
import Administrador from './Componentes/Administrador';

function App() {
  const [usuario, setUsuario] = useState(null);
  const [cargando, setCargando] = useState(true);
  useEffect(() => {
    async function verificarSesion() {
      const { data: { session } } = await supabase.auth.getSession();
      setUsuario(session?.user || null);
      setCargando(false);
    }
    verificarSesion();

    supabase.auth.onAuthStateChange((_event, session) => {
      setUsuario(session?.user || null);
    });
  }, []);
  if (cargando) return <p>Cargando...</p>;

  return (
    <>
      <AppProvider>
        <Router>
          {usuario && <Menu />}
          <Routes>
            <Route path="/" element={usuario ? <Listas /> : <Navigate to="/login"
            />} />
            <Route path="/usuarios" element={usuario ? <Usuario /> : <Navigate
              to="/login" />} />
            <Route path="/aleatorios" element={usuario ? <Aleatorios /> :
              <Navigate to="/login" />} />
            <Route path="/capturados" element={usuario ? <Capturados /> :
              <Navigate to="/login" />} />
            <Route path="/favoritos" element={usuario ? <Favoritos /> :
              <Navigate to="/login" />} />
            <Route path="/Pokemon/:name" element={usuario ? <Pokemon /> :
              <Navigate to="/login" />} />

            <Route path="/login" element={<Login />} />
            <Route path="/registro" element={<Registro />} />
            <Route path="/Administrador" element={<Administrador />} />
          </Routes>
        </Router>
      </AppProvider>
    </>
  )
}

export default App
