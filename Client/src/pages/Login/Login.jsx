import "bootstrap/dist/css/bootstrap.min.css";
import { accessLogin, getSession } from "../../api/login.api.js";
import { useState } from "react";
import { useNavigate } from "react-router";
import backgroundImage from "../../assets/img/sigea.png";
import logoImage from "../../assets/img/LOGO UTA.png";
import "../../assets/css/Login.css";
import { FaUser, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import { Modal, Button } from "react-bootstrap";
import Acercade from "../Login/Acercade.jsx"; // Importar el componente

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showModal, setShowModal] = useState(false); // Estado para el modal
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const chargeUser = async () => {
        const data = await getSession();
        if (data) {
           navigate("/");
        }
      };
      const result = await accessLogin(username, password);
      if (result.success) {
        setErrorMessage("");
        chargeUser()
      } else {
        setErrorMessage(result.message);
      }
    } catch (error) {
      setErrorMessage("Hubo un error al iniciar sesión. Inténtalo de nuevo.");
      console.error(error);
    }
  };

  return (
    <div className="vh-100 d-flex justify-content-center align-items-center bg-light">
      <div className="ocean">
        <div className="wave"></div>
        <div className="wave"></div>
      </div>
      <div className="container shadow-lg rounded-4 overflow-hidden" style={{ maxWidth: "900px" }}>
        <div className="row g-4">
          <div className="col-md-6" style={{ backgroundColor: "#004466" }}>
            <div className="p-5 d-flex justify-content-center align-items-center w-100">
              <div className="w-100">
                <h3 className="text-white text-center fw-bold mb-4">Bienvenido</h3>
                {errorMessage && <div className="alert alert-danger text-center">{errorMessage}</div>}
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label htmlFor="username" className="form-label text-white fw-semibold">Usuario</label>
                    <div className="input-group">
                      <span className="input-group-text bg-light"><FaUser /></span>
                      <input type="text" className="form-control" id="username" placeholder="Ingresa tu usuario" required value={username} onChange={(e) => setUsername(e.target.value)} />
                    </div>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="password" className="form-label text-white fw-semibold">Contraseña</label>
                    <div className="input-group">
                      <span className="input-group-text bg-light"><FaLock /></span>
                      <input type={showPassword ? "text" : "password"} className="form-control" id="password" placeholder="Ingresa tu contraseña" required value={password} onChange={(e) => setPassword(e.target.value)} />
                      <button type="button" className="btn btn-outline-secondary" onClick={() => setShowPassword(!showPassword)}>
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                      </button>
                    </div>
                  </div>
                  <div className="d-grid">
                    <button type="submit" className="btn btn-primary btn-lg shadow-sm">Iniciar Sesión</button>
                  </div>
                </form>
                <div className="text-center mt-3">
                  <a href="/Recuperar" className="text-white-50">¿Olvidaste tu contraseña?</a>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-6 bg-white p-5 d-flex flex-column justify-content-center align-items-center position-relative">
          <button className="btn text-dark fw-bold text-decoration-none position-absolute" style={{ top: '10px', right: '10px' }} onClick={() => setShowModal(true)}> Acerca de </button>
            {/* Imagen del logo con margen inferior */}
            <img src={logoImage} alt="Logo Universidad Tecnológica de Acapulco"  className="img-fluid img-transparent mb-4" style={{ maxWidth: "60%" }} />
            {/* Imagen de fondo */}
            <img src={backgroundImage} alt="Universidad Tecnológica de Acapulco"  className="img-fluid img-transparent" style={{ maxWidth: "120%" }} />
            </div>
        </div>
      </div>

      {/* Modal Acerca de */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Acerca de</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Acercade /> {/* Se renderiza el componente aquí */}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>Cerrar</Button>
        </Modal.Footer>
      </Modal>

    </div>
  );
}

export default Login;
