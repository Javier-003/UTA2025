import "bootstrap/dist/css/bootstrap.min.css";
import { accessLogin } from "../../api/login.api.js";
import { useState } from "react";
import { useNavigate } from 'react-router';
import backgroundImage from '../../assets/img/Uta.jpg'; // Importa la imagen

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const result = await accessLogin(username, password);
      if (result.Token) {
        setErrorMessage("");
        localStorage.setItem("token", result.Token);
        navigate('/');
      } else {
        setErrorMessage("Nombre de usuario o contraseña incorrectos.");
      }
    } catch (error) {
      setErrorMessage("Hubo un error al iniciar sesión. Inténtalo de nuevo.");
      console.error(error);
    }
  };

  return (
    <div 
      className="vh-100 d-flex justify-content-center align-items-center"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      <div 
        className="card shadow-lg p-4"
        style={{
          width: "400px",
          backdropFilter: "blur(10px)", // Desenfoque para destacar
          background: "rgba(255, 255, 255, 0.2)", // Fondo semitransparente
          borderRadius: "15px",
          boxShadow: "0 4px 10px rgba(0,0,0,0.3)"
        }}
      >
        <div className="card-body">
          <h3 className="card-title text-center mb-4 text-white">Iniciar Sesión</h3>
          {errorMessage && (
            <div className="alert alert-danger text-center" role="alert">
              {errorMessage}
            </div>
          )}
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="username" className="form-label text-white">Nombre de usuario</label>
              <input 
                type="text" 
                className="form-control" 
                id="username"
                placeholder="Ingresa tu nombre de usuario" 
                required 
                value={username}
                onChange={(e) => setUsername(e.target.value)} 
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label text-white">Contraseña</label>
              <div className="input-group">
                <input 
                  type={showPassword ? "text" : "password"}
                  className="form-control" 
                  id="password" 
                  placeholder="Ingresa tu contraseña" 
                  required
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)} 
                />
                <button 
                  type="button" 
                  className="btn btn-outline-light" 
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label="Toggle password visibility"
                >
                  <i className={`bi ${showPassword ? "bi-eye-slash" : "bi-eye"}`}></i>
                </button>
              </div>
            </div>
            <div className="d-grid">
              <button type="submit" className="btn btn-primary">
                Iniciar Sesión
              </button>
            </div>
          </form>
          <div className="text-center mt-3">
            <a href="/Recuperar" className="text-white">¿Has olvidado tu contraseña?</a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
