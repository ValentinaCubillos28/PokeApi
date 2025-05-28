import { useEffect, useState } from "react";
import { supabase } from "../../supabase";
import './style.css'; // Importa los estilos

export default function Usuario() {
  const [usuario, setUsuario] = useState(null);
  const [form, setForm] = useState({
    nombre: "",
    correo: "",
    fecha_nacimiento: "",
    telefono: "",
    roll: ""
  });
  const [nuevaUrl, setNuevaUrl] = useState("");
  const [imagenes, setImagenes] = useState([]);

  // Obtener datos del usuario
  useEffect(() => {
    async function fetchUsuario() {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data, error } = await supabase
          .from("usuario")
          .select("*")
          .eq("id", user.id)
          .single();
        if (data) {
          setUsuario(data);
          setForm(data);
          fetchImagenes(user.id);
        }
      }
    }
    fetchUsuario();
  }, []);

  const fetchImagenes = async (usuarioid) => {
    const { data, error } = await supabase
      .from("multimedia")
      .select("*")
      .eq("usuarioid", usuarioid);
    if (data) setImagenes(data);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    const { error } = await supabase
      .from("usuario")
      .update(form)
      .eq("id", usuario.id);
    if (error) alert("Error al actualizar");
    else alert("Datos actualizados");
  };

  const handleAgregarUrl = async () => {
    if (!nuevaUrl.trim()) return;
    const { error } = await supabase
      .from("multimedia")
      .insert([{ url: nuevaUrl, usuarioid: usuario.id }]);
    if (error) {
      alert("Error al agregar la imagen");
    } else {
      setNuevaUrl("");
      fetchImagenes(usuario.id);
    }
  };

  const handleEliminarImagen = async (id) => {
    const { error } = await supabase
      .from("multimedia")
      .delete()
      .eq("id", id);
    if (!error) {
      setImagenes(imagenes.filter((img) => img.id !== id));
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUsuario(null);
  };

  if (!usuario) return <p className="c-cargando">Cargando...</p>;

  return (
    <div className="c-usuario">
      <h2 className="c-titulo">Perfil de Usuario</h2>

      <div className="c-formulario">
        <label>Nombre:
          <input name="nombre" value={form.nombre} onChange={handleChange} />
        </label>

        <label>Correo:
          <input name="correo" value={form.correo} onChange={handleChange} />
        </label>

        <label>Fecha de nacimiento:
          <input type="date" name="fecha_nacimiento" value={form.fecha_nacimiento} onChange={handleChange} />
        </label>

        <label>Teléfono:
          <input name="telefono" value={form.telefono} onChange={handleChange} />
        </label>

        <label>Rol:
          <input name="roll" value={form.roll} onChange={handleChange} />
        </label>

        <button className="c-boton" onClick={handleUpdate}>Guardar cambios</button>
      </div>

      <hr />

      <h3 className="c-subtitulo">Agregar imagen</h3>
      <div className="c-agregar">
        <input type="text" placeholder="URL de la imagen" value={nuevaUrl} onChange={(e) => setNuevaUrl(e.target.value)} />
        <button className="c-boton" onClick={handleAgregarUrl}>Agregar</button>
      </div>

      <h3 className="c-subtitulo">Imágenes guardadas</h3>
      <ul className="c-imagenes">
        {imagenes.map((img) => (
          <li key={img.id} className="c-imagen-item">
            <img src={img.url} alt="Imagen" />
            <button className="c-boton-pequeño" onClick={() => handleEliminarImagen(img.id)}>Eliminar</button>
          </li>
        ))}
      </ul>

      <hr />

      <h2 className="c-subtitulo">Cerrar sesión</h2>
      <button className="c-boton" onClick={handleLogout}>Cerrar sesión</button>

      {/* espacio para que el menú no tape */}
      <br /><br /><br /><br /><br />
    </div>
  );
}
