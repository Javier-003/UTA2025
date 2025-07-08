import { useState } from "react";
import { Link } from "react-router-dom";
import { Modal, Button } from "react-bootstrap";
import '../assets/css/App.css';
import logoImage from "../assets/img/sigea.png";
import { 
  FaSignOutAlt, FaUser,  FaUserTie, FaGraduationCap, FaCalendarAlt,FaUpload,
  FaChalkboardTeacher, FaBriefcase,  FaUniversity, FaClipboardList, 
  FaTasks, FaMapSigns, FaBook, FaHistory, FaLayerGroup, FaFileAlt, FaClipboardCheck 
} from "react-icons/fa";
import "../assets/css/Navbar.css";
import hasAccess from '../hooks/AccesUsers'
import { logoutLogin } from '../api/login.api'

function OffcanvasNavbar() {
  const [activeMenu, setActiveMenu] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [loadingLogout] = useState(false);
  const username = localStorage.getItem("Username");

  const toggleModal = () => setShowModal(!showModal);
  const handleLogout = async () => {
    const data = await logoutLogin();
    if (data) {
      localStorage.clear();
      window.location.href = "/Login"; 
    }
  };
  
  return (
    <div style={{ marginTop: "150px" }}>
      <nav className="navbar">
      <div className="navbar-brand white">
        <Link to="/" className="d-flex align-items-center text-decoration-none" style={{ color: "white" }}>
        <img src={logoImage} alt="Logo" style={{ height: "40px", marginRight: "10px", filter: "brightness(0) invert(1)" }} />
        <span>{username}</span>
        </Link>
      </div>

        {/* Menú principal */}
        <div className="nav-links">
          {/* Menú Ajustes */}
          <div className="dropdown"
            onMouseEnter={() => setActiveMenu("ajustes")}
            onMouseLeave={() => setActiveMenu(null)}>
            <span className="menu-option"><FaUser /> Ajustes</span>
            {activeMenu === "ajustes" && (
              <div className="dropdown-content">
                <div className="column">
                  <h3>Núcleo</h3>
                  <Link className={!hasAccess(['Administrador']) ? 'opacity-50 cursor-not-allowed' : ''} to="/"><FaBook />Inicio</Link>
                  <Link className={!hasAccess(['Administrador']) ? 'opacity-50 cursor-not-allowed' : ''} to="/Usuario"><FaUser /> Usuario </Link>
                  <Link className={!hasAccess(['Administrador']) ? 'opacity-50 cursor-not-allowed' : ''} to="/Persona"><FaClipboardList /> Persona</Link>
                  <Link className={!hasAccess(['Administrador']) ? 'opacity-50 cursor-not-allowed' : ''} to="/Alumno"><FaGraduationCap /> Alumno</Link>
                  <Link className={!hasAccess(['Administrador']) ? 'opacity-50 cursor-not-allowed' : ''}  to="/Profesor"><FaChalkboardTeacher /> Profesor</Link>
                  <Link className={!hasAccess(['Administrador']) ? 'opacity-50 cursor-not-allowed' : ''} to="/Administrativo"><FaUserTie /> Administrativo</Link>
                </div>
                <div className="column">
                  <h3>.</h3>
                  <Link className={!hasAccess(['Administrador']) ? 'opacity-50 cursor-not-allowed' : ''} to="/Departamento"><FaBriefcase /> Departamento</Link>
                  <Link className={!hasAccess(['Administrador']) ? 'opacity-50 cursor-not-allowed' : ''} to="/Puesto"><FaTasks /> Puesto</Link>
                  <Link className={!hasAccess(['Administrador']) ? 'opacity-50 cursor-not-allowed' : ''} to="/Edificio"><FaTasks /> Edificio</Link>           
                  <Link className={!hasAccess(['Administrador']) ? 'opacity-50 cursor-not-allowed' : ''} to="/Aula"><FaTasks /> Aula</Link>
                  <Link className={!hasAccess(['Administrador','Servicios Escolares']) ? 'opacity-50 cursor-not-allowed' : ''} to="/AsignarPA"><FaUniversity /> Alumno PA</Link>
                  <Link className={!hasAccess(['Administrador']) ? 'opacity-50 cursor-not-allowed' : ''} to="/Historial"><FaHistory /> Bitácora</Link>
                </div>
                <div className="column">
                  <h3>Parametrización</h3>
                  <Link className={!hasAccess(['Administrador']) ? 'opacity-50 cursor-not-allowed' : ''} to="/Actividad"><FaTasks /> Actividad</Link>
                  <Link className={!hasAccess(['Administrador']) ? 'opacity-50 cursor-not-allowed' : ''} to="/Tramite"><FaClipboardCheck /> Trámite</Link>
                  <Link className={!hasAccess(['Administrador']) ? 'opacity-50 cursor-not-allowed' : ''} to="/TramiteProceso"><FaClipboardList /> Trámite Proceso</Link>
                </div>
                <div className="column">
                  <h3>.</h3>
                  <Link className={!hasAccess(['Administrador']) ? 'opacity-50 cursor-not-allowed' : ''} to="/NivelEstudio"><FaUniversity /> Nivel de Estudio</Link>
                  <Link className={!hasAccess(['Administrador']) ? 'opacity-50 cursor-not-allowed' : ''} to="/OfertaAcademica"><FaBook /> Oferta Académica</Link>
                  <Link className={!hasAccess(['Administrador']) ? 'opacity-50 cursor-not-allowed' : ''} to="/ProgramaAcademico"><FaLayerGroup /> Programa Académico</Link>
                  <Link className={!hasAccess(['Administrador']) ? 'opacity-50 cursor-not-allowed' : ''} to="/MapaCurricular"><FaMapSigns /> Mapa Curricular</Link>
                  <Link className={!hasAccess(['Administrador']) ? 'opacity-50 cursor-not-allowed' : ''} to="/MateriaUnidad"><FaFileAlt /> Materia Unidad</Link>
                  <Link className={!hasAccess(['Administrador']) ? 'opacity-50 cursor-not-allowed' : ''} to="/Bloque"><FaFileAlt /> Bloque</Link>
                </div>
              </div>
            )}
          </div>

          {/* Menú Planificación Académica */}
          <div className="dropdown"
            onMouseEnter={() => setActiveMenu("planificacion")}
            onMouseLeave={() => setActiveMenu(null)}>
            <span className="menu-option"> <FaBook /> Planificación Académica</span>
            {activeMenu === "planificacion" && (
              <div className="dropdown-content">
                <div className="column">
                  <h3>Planificación Académica</h3>
                  <Link className={!hasAccess(['Administrador','Direccion Academica']) ? 'opacity-50 cursor-not-allowed' : ''} to="/Periodo"><FaCalendarAlt /> Periodo</Link>
                  <Link className={!hasAccess(['Administrador','Direccion Academica']) ? 'opacity-50 cursor-not-allowed' : ''}  to="/Grupo"><FaLayerGroup /> Grupo</Link>
                  <Link className={!hasAccess(['Administrador','Direccion Academica','Cordinador Licienciatura']) ? 'opacity-50 cursor-not-allowed' : ''} to="/Materias"><FaBook /> Carga de Materias</Link>
                </div>
                <div className="column">
                  <h3>Profesor</h3>
                  <Link className={!hasAccess(['Administrador','Direccion Academica','Cordinador Licienciatura']) ? 'opacity-50 cursor-not-allowed' : ''} to="/AdicionProfesor"><FaChalkboardTeacher /> Adición de Profesor</Link>
                  <Link className={!hasAccess(['Administrador','Direccion Academica','Cordinador Licienciatura', 'Profesor']) ? 'opacity-50 cursor-not-allowed' : ''} to="/HorarioProfesor"><FaChalkboardTeacher /> HorarioProfesor</Link>
                  <Link className={!hasAccess(['Administrador','Direccion Academica']) ? 'opacity-50 cursor-not-allowed' : ''} to="/ControlCapturaCalificaciones"><FaClipboardCheck /> Control de Captura de Calificaciones</Link>
                  <Link className={!hasAccess(['Administrador']) ? 'opacity-50 cursor-not-allowed' : ''} to="/CorreccionCalificaciones"><FaClipboardCheck />Corrección de Calificaciones</Link>
                </div>
              </div>
            )}
          </div>

          {/* Menú Trámites */}
          <div className="dropdown"
            onMouseEnter={() => setActiveMenu("tramites")}
            onMouseLeave={() => setActiveMenu(null)}>
            <span className="menu-option"><FaClipboardList /> Trámites</span>
            {activeMenu === "tramites" && (
              <div className="dropdown-content">
                <div className="column">
                  <h3>Trámites</h3>
                  <Link className={!hasAccess(['Administrador']) ? 'opacity-50 cursor-not-allowed' : ''} to="/AlumnoProceso"><FaTasks />Alumno Proceso</Link>
                  <Link className={!hasAccess(['Administrador']) ? 'opacity-50 cursor-not-allowed' : ''} to="/AlumnoTramite"><FaClipboardList />Alumno Trámite</Link>
                  <Link className={!hasAccess(['Administrador','Servicios Escolares']) ? 'opacity-50 cursor-not-allowed' : ''} to="/SeguimientoTramite"><FaClipboardCheck />Seguimiento Trámite</Link>
                  <Link className={!hasAccess(['Administrador']) ? 'opacity-50 cursor-not-allowed' : ''} to="/AlumnoPeriodo"><FaClipboardList />Alumno Periodo</Link>
                </div>
              
              </div>
            )}
          </div>
          
          {/* Menú Servicio */}
          <div className="dropdown"
            onMouseEnter={() => setActiveMenu("Servicio")}
            onMouseLeave={() => setActiveMenu(null)}>
            <span className="menu-option"><FaClipboardList />Servicio</span>
            {activeMenu === "Servicio" && (
              <div className="dropdown-content">
                <div className="column">
                  <h3>Servicio</h3>
                  <Link className={!hasAccess(['Administrador','Servicios Escolares']) ? 'opacity-50 cursor-not-allowed' : ''} to="/Estadisticas"><FaTasks /> Estadistica</Link>
                  <Link className={!hasAccess(['Administrador','Servicios Escolares']) ? 'opacity-50 cursor-not-allowed' : ''} to="/Constancia"><FaTasks /> Constancia</Link>
                  <Link className={!hasAccess(['Administrador','Servicios Escolares']) ? 'opacity-50 cursor-not-allowed' : ''} to="/TramiteTitulacion"><FaClipboardList />Tramite Titulación</Link>
                  <Link className={!hasAccess(['Administrador','Servicios Escolares']) ? 'opacity-50 cursor-not-allowed' : ''} 
                  to="/ConclusiondeCarrera"><FaClipboardList />Conclusion de Carrera</Link>                
                </div>
                <div className="column">
                  <h3>Calificaciones</h3>

                  <Link className={!hasAccess(['Administrador','Profesor', 'Servicios Escolares','Cordinador Licienciatura']) ? 'opacity-50 cursor-not-allowed' : ''} to="/SubirCalificacion"><FaUpload />Subir Calificacion</Link>              
                  <Link className={!hasAccess(['Administrador','Direccion Academica','Cordinador Licienciatura', 'Profesor', 'Tesoreria']) ? 'opacity-50 cursor-not-allowed' : ''} to="/Consultadekadex"><FaBook />Consulta de Kardex</Link>
                  <Link className={!hasAccess(['Administrador']) ? 'opacity-50 cursor-not-allowed' : ''} to="/Kardex"><FaHistory />Kardex</Link>  
                  <Link className={!hasAccess(['Alumno']) ? 'opacity-50 cursor-not-allowed' : ''} to="/AlumnoKardex"><FaHistory />Calificaciones</Link>      
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Botón de Cerrar Sesión */}
        <button className="logout-btn" onClick={toggleModal}>
          <FaSignOutAlt />
        </button>
        {/* Modal para Confirmar Cierre de Sesión */}
        <Modal show={showModal} onHide={toggleModal} centered>
          <Modal.Header closeButton>
            <Modal.Title>Cerrar Sesión</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>¿Estás seguro de que deseas cerrar sesión, {username}?</p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={toggleModal} disabled={loadingLogout}>Cancelar</Button>
            <Button variant="danger" onClick={() => handleLogout()}>Cerrar Sesión</Button>
          </Modal.Footer>
        </Modal>
      </nav>
    </div>
  );
}

export default OffcanvasNavbar;
