import { useState } from "react";
import { Link } from "react-router-dom";
import { updatePassword, verifyUser } from '../../assets/js/recuperar.js';

function Recuperar() {
  const [usuario, setUsuario] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [fase, setFase] = useState("olvidaste"); // 'olvidaste' o 'recuperar'
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setCargando(true);
    setError("");
    try {
      const response = await verifyUser(usuario.trim());
      if (response === usuario.trim()) {
        setFase("recuperar");
      }
    } catch (error) {
      console.error("Error en la verificación del usuario:", error);
      setError("Usuario no encontrado. Por favor, verifica e intenta nuevamente.");
    } finally {
      setCargando(false);
    }
  };

  const handleChange = async (e) => {
    e.preventDefault();
    setCargando(true);
    setError("");
    try {
      await updatePassword(usuario.trim(), newPassword, repeatPassword);
      setNewPassword("");
      setRepeatPassword("");
    } catch (error) {
      console.error("Error al actualizar la contraseña:", error);
      setError("Hubo un problema actualizando la contraseña. Asegúrate de que las contraseñas coincidan y cumplan con los requisitos.");
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="container vh-100 d-flex justify-content-center align-items-center">
      <div className="card shadow" style={{ width: "22rem" }}>
        <div className="card-body">
          {fase === "olvidaste" ? (
            <>
              <h3 className="card-title text-center mb-4">Recuperar Contraseña</h3>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="username" className="form-label">Nombre de Usuario</label>
                  <input
                    type="text"
                    className="form-control"
                    id="username"
                    placeholder="Ingresa tu nombre de usuario"
                    value={usuario}
                    onChange={(e) => setUsuario(e.target.value)}
                    disabled={cargando}
                  />
                </div>
                <div className="d-grid">
                  <button type="submit" className="btn btn-primary" disabled={cargando}>
                    {cargando ? 'Cargando...' : 'Cambiar Contraseña'}
                  </button>
                </div>
                {error && <div className="alert alert-danger mt-3">{error}</div>}
              </form>
            </>
          ) : (
            <>
              <h3 className="card-title text-center mb-4">Nueva Contraseña</h3>
              <form onSubmit={handleChange}>
                <div className="mb-3">
                  <label htmlFor="new-password" className="form-label">Nueva Contraseña</label>
                  <div className="input-group">
                    <input
                      type={showNewPassword ? "text" : "password"}
                      className="form-control"
                      id="new-password"
                      placeholder="Ingresa tu nueva contraseña"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      disabled={cargando}
                    />
                    <button
                      type="button"
                      className="btn btn-outline-secondary"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                    >
                      <i className={`bi ${showNewPassword ? "bi-eye-slash" : "bi-eye"}`}></i>
                    </button>
                  </div>
                </div>
                <div className="mb-3">
                  <label htmlFor="confirm-password" className="form-label">Confirmar Contraseña</label>
                  <div className="input-group">
                    <input
                      type={showRepeatPassword ? "text" : "password"}
                      className="form-control"
                      id="confirm-password"
                      placeholder="Confirma tu nueva contraseña"
                      value={repeatPassword}
                      onChange={(e) => setRepeatPassword(e.target.value)}
                      disabled={cargando}
                    />
                    <button
                      type="button"
                      className="btn btn-outline-secondary"
                      onClick={() => setShowRepeatPassword(!showRepeatPassword)}
                    >
                      <i className={`bi ${showRepeatPassword ? "bi-eye-slash" : "bi-eye"}`}></i>
                    </button>
                  </div>
                </div>
                <div className="d-grid">
                  <button type="submit" className="btn btn-primary" disabled={cargando}>
                    {cargando ? 'Cargando...' : 'Restablecer Contraseña'}
                  </button>
                </div>
                {error && <div className="alert alert-danger mt-3">{error}</div>}
              </form>
            </>
          )}
          <div className="text-center mt-3">
            <Link to="/login">Regresar al login</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Recuperar;
