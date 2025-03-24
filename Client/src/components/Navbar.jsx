import { useState } from "react";
import { Link } from "react-router-dom";
import { Modal, Button } from "react-bootstrap";
import '../assets/css/App.css';
import { 
  FaSignOutAlt, FaUser, FaBuilding, FaUserTie, FaGraduationCap, FaCalendarAlt,FaUpload,
  FaChalkboardTeacher, FaBriefcase, FaDoorOpen, FaUniversity, FaClipboardList, 
  FaTasks, FaMapSigns, FaBook, FaHistory, FaLayerGroup, FaFileAlt, FaClipboardCheck 
} from "react-icons/fa";
import "../assets/css/Navbar.css";

function OffcanvasNavbar() {
  const [activeMenu, setActiveMenu] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const username = localStorage.getItem("Username");

  const toggleModal = () => setShowModal(!showModal);

  const handleLogout = () => {
    localStorage.removeItem("Username");
    window.location.href = "/Login";
  };

  return (
    <div style={{ marginTop: "150px" }}>
      <nav className="navbar">
        <div className="navbar-brand white"  >{username}</div>

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
                  <Link to="/"><FaBook /> Inicio</Link>
                  <Link to="/Usuario"><FaUser /> Usuario</Link>
                  <Link to="/Persona"><FaClipboardList /> Persona</Link>
                  <Link to="/Alumno"><FaGraduationCap /> Alumno</Link>
                  <Link to="/Profesor"><FaChalkboardTeacher /> Profesor</Link>
                  <Link to="/Administrativo"><FaUserTie /> Administrativo</Link>
                </div>
                <div className="column">
                  <h3></h3>
                  <Link to="/Departamento"><FaBriefcase /> Departamento</Link>
                  <Link to="/Puesto"><FaUserTie /> Puesto</Link>
                  <Link to="/Edificio"><FaBuilding /> Edificio</Link>
                  <Link to="/Aula"><FaDoorOpen /> Aula</Link>
                  <Link to="/AsignarPA"><FaUniversity /> Asignar PA</Link>
                  <Link to="/Historial"><FaHistory /> Historial</Link>
                </div>
                <div className="column">
                  <h3>Parametrización</h3>
                  <Link to="/Actividad"><FaTasks /> Actividad</Link>
                  <Link to="/Tramite"><FaClipboardCheck /> Trámite</Link>
                  <Link to="/TramiteProceso"><FaClipboardList /> Trámite Proceso</Link>
                </div>
                <div className="column">
                  <h3></h3>
                  <Link to="/NivelEstudio"><FaUniversity /> Nivel de Estudio</Link>
                  <Link to="/OfertaAcademica"><FaBook /> Oferta Académica</Link>
                  <Link to="/ProgramaAcademico"><FaLayerGroup /> Programa Académico</Link>
                  <Link to="/MapaCurricular"><FaMapSigns /> Mapa Curricular</Link>
                  <Link to="/MateriaUnidad"><FaFileAlt /> Materia Unidad</Link>
                  <Link to="/Bloque"><FaLayerGroup /> Bloque</Link>
                </div>
              </div>
            )}
          </div>

          {/* Menú Planificación Académica */}
          <div className="dropdown"
            onMouseEnter={() => setActiveMenu("planificacion")}
            onMouseLeave={() => setActiveMenu(null)}>
            <span className="menu-option"> <FaBook /> Planeación Académica</span>
            {activeMenu === "planificacion" && (
              <div className="dropdown-content">
                <div className="column">
                  <h3>Planeación Académica</h3>
                  <Link to="/Periodo"><FaCalendarAlt /> Periodo</Link>
                  <Link to="/Grupo"><FaLayerGroup /> Grupo</Link>
                  <Link to="/Materias"><FaBook /> Carga de Materias</Link>
                </div>
                <div className="column">
                  <h3>Profesor</h3>
                  <Link to="/AdicionProfesor"><FaChalkboardTeacher /> Adición de Profesor</Link>
                  <Link to="/HorarioProfesor"><FaChalkboardTeacher /> HorarioProfesor</Link>
                  <Link to="/ControlCapturaCalificaciones"><FaClipboardCheck /> Control de Captura de Calificaciones</Link>
                  <Link to="/CorreccionCalificaciones"><FaClipboardCheck /> Corrección de Calificaciones</Link>
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
                  <Link to="/AlumnoProceso"><FaTasks /> Alumno Proceso</Link>
                  <Link to="/AlumnoTramite"><FaClipboardList /> Alumno Trámite</Link>
                  <Link to="/SeguimientoTramite"><FaClipboardCheck /> Seguimiento Trámite</Link>
                </div>
              
              </div>
            )}
          </div>
          
          {/* Menú Servicio */}
          <div className="dropdown"
            onMouseEnter={() => setActiveMenu("tramites")}
            onMouseLeave={() => setActiveMenu(null)}>
            <span className="menu-option"><FaClipboardList />Servicio</span>
            {activeMenu === "tramites" && (
              <div className="dropdown-content">
                <div className="column">
                  <h3>Servicio</h3>
                  <Link to="/Constancia"><FaTasks />Constancia</Link>
                  <Link to="/TramiteTitulacion">Tramite Titulación</Link>
                  <Link to="/ConclusiondeCarrera">Conclusión de Carerra</Link>
                </div>  
                <div className="column">
                  <h3>Calificaciones</h3>
                  <Link to="/SubirCalificacion"><FaUpload /> Subir Calificación</Link>
                  <Link to="/Consultadekadex"><FaBook />Consulta de Kardex</Link>
                  <Link to="/Kardex"><FaHistory /> Kardex</Link>
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
            <Button variant="secondary" onClick={toggleModal}>Cancelar</Button>
            <Button variant="danger" onClick={handleLogout}>Cerrar Sesión</Button>
          </Modal.Footer>
        </Modal>
      </nav>
    </div>
  );
}

export default OffcanvasNavbar;
