import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaUser, FaBook,  FaClipboardCheck, FaSignOutAlt, FaHistory, FaUserPlus, FaAddressCard, FaGraduationCap, FaUserTie, FaChalkboardTeacher, FaTasks, FaFileAlt, FaClipboardList, FaEdit, FaLayerGroup, FaMapSigns, FaRegBuilding, FaDoorOpen, FaUniversity, FaBriefcase, FaClipboard } from 'react-icons/fa';
import { Modal, Button } from 'react-bootstrap';
import '../assets/css/Navbar.css';

function OffcanvasNavbar() {
  const [activeMenu, setActiveMenu] = useState(null);
  const [showModal, setShowModal] = useState(false); // Estado para mostrar el modal
  const username = localStorage.getItem('Username');

  const handleMouseEnter = (menu) => {
    setActiveMenu(menu);
  };

  const handleMouseLeave = () => {
    setActiveMenu(null);
  };

  const toggleModal = () => setShowModal(!showModal); // Función para alternar el modal

  const handleLogout = () => {
    // Aquí debes agregar la lógica para cerrar sesión
    localStorage.removeItem('Username');
    window.location.reload(); // Redirige o recarga la página después de cerrar sesión
  };

  return (
    <div style={{ marginTop: '100px' }}>
      <div className="navbar">
        <div className="navbar-brand">
          {username ? username : "Servicios Escolares"}
        </div>
        <div className="menu">
          {[
            { label: "Ajustes", key: "gestionUsuarios", icon: <FaUser />, links: [
              { text: "Núcleo", isTitle: true }, // Título de sección
              { text: "Parametrización", isTitle: true }, // Título de sección
              { text: "Planificación Academica", isTitle: true }, // Título de sección
              { text: "Tramites", isTitle: true }, // Título de sección
              { to: "/Usuario", text: "Usuario", icon: <FaUserPlus /> },
              { to: "/Tramite", text: "Trámite", icon: <FaFileAlt /> }, 
              { to: "/Periodo", text: "Apertura Periodo", icon: <FaRegBuilding /> },
              { to: "/SeguimientoTramite", text: "Seguimiento Trámite", icon: <FaClipboardCheck /> },
              { to: "/Persona", text: "Persona", icon: <FaAddressCard /> },
              { to: "/Actividad", text: "Actividad", icon: <FaTasks /> },               
              { to: "/Grupo", text: "Grupo", icon: <FaLayerGroup /> },
              { to: "/Consultadekadex", text: "Consulta de Kardex", icon: <FaClipboardList /> },
              { to: "/Alumno", text: "Alumno", icon: <FaGraduationCap /> },  
              { to: "/TramiteProceso", text: "Trámite Proceso", icon: <FaEdit /> },  
              { to: "/Materias", text: "Carga de Materias", icon: <FaClipboardList /> },
              { to: "/AlumnoTramite", text: "Alumno Tramite", icon: <FaClipboardList /> },   
              { to: "/Profesor", text: "Profesor", icon: <FaChalkboardTeacher /> },
              { to: "/OfertaAcademica", text: "Oferta Académica", icon: <FaUniversity /> } ,
              { to: "/Evaluacion", text: "Evaluación", icon: <FaClipboardCheck /> },
              { to: "/AlumnoProceso", text: "Alumno Proceso", icon: <FaLayerGroup /> }, 
              { to: "/Administrativo", text: "Administrativo", icon: <FaUserTie /> },
              { to: "/ProgramaAcademico", text: "Programa Académico", icon: <FaBook /> },
              { to: "/Kardex", text: "Kardex", icon: <FaClipboardList /> },
              {},
              { to: "/Departamento", text: "Departamento", icon: <FaBriefcase /> },
              { to: "/MapaCurricular", text: "Mapa Curricular", icon: <FaMapSigns /> },
              { to: "/NivelEstudio", text: "Nivel de Estudio", icon: <FaUniversity /> },
              {},
              { to: "/Puesto", text: "Puesto", icon: <FaBriefcase /> },
              { to: "/MateriaUnidad", text: "Materia Unidad", icon: <FaClipboard />},
              { to: "/AsignarPA", text: "Asignar Programa Académico", icon: <FaTasks /> }, 
              {},
              { to: "/Edificio", text: "Edificio", icon: <FaRegBuilding /> },
              { to: "/Bloque", text: "Bloque", icon: <FaLayerGroup /> },
              {},
              {},
              { to: "/Aula", text: "Aula", icon: <FaDoorOpen /> },
              {},
              {},
              { to: "/Historial", text: "Historial", icon: <FaHistory /> } ,
          ]} ,
          ].map(({ label, key, icon, links }) => (
            <div key={key}  className={`menu-item ${activeMenu === key ? 'open' : ''}`}
              onMouseEnter={() => handleMouseEnter(key)} onMouseLeave={handleMouseLeave}>
              <span>{icon} {label}</span>
              {activeMenu === key && (
                <div className="submenu">
                  {links.map(({ to, text, icon }) => (
                    <Link key={to} to={to}>{icon} {text}</Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
        <button className="logout-btn" onClick={toggleModal}><FaSignOutAlt /></button>
      </div>
      {/* Modal para confirmar cierre de sesión */}
      <Modal show={showModal} onHide={toggleModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Cerrar Sesión</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>¿Estás seguro de que deseas cerrar sesión, {username}?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={toggleModal}>
            Cancelar
          </Button>
          <Button variant="danger" onClick={handleLogout}>
            Cerrar Sesión
          </Button>
        </Modal.Footer>
      </Modal>

    </div>
  );
}

export default OffcanvasNavbar;
