import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaUser, FaBook,  FaClipboardCheck, FaSignOutAlt, FaHistory, FaUserPlus, FaAddressCard, FaGraduationCap, FaUserTie, FaChalkboardTeacher, FaTasks, FaFileAlt, FaClipboardList, FaEdit, FaLayerGroup, FaMapSigns, FaRegBuilding, FaDoorOpen, FaUniversity, FaBriefcase, FaClipboard } from 'react-icons/fa';
import { Modal, Button } from 'react-bootstrap';
import '../assets/css/Navbar.css';

function OffcanvasNavbar() {
  const [activeMenu, setActiveMenu] = useState(null);
  const [showModal, setShowModal] = useState(false); 
  const username = localStorage.getItem('Username');

  const handleMouseEnter = (menu) => {
    setActiveMenu(menu);
  };

  const handleMouseLeave = () => {
    setActiveMenu(null);
  };

  const toggleModal = () => setShowModal(!showModal); 

  const handleLogout = () => {
    localStorage.removeItem('Username');
    window.location.href = "/Login"
  };

  return (
    <div style={{ marginTop: '100px' }}>
      <div className="navbar">
        <div className="navbar-brand">
          {username }
        </div>
        <div className="menu">
          {[
            { label: "Ajustes", key: "gestionUsuarios", icon: <FaUser />, links: [
              { text: "Núcleo", isTitle: true },

              { text: "Parametrización", isTitle: true }, 

              { to: "/Usuario", text: "Usuario", icon: <FaUserPlus /> },
              { to: "/Tramite", text: "Trámite", icon: <FaFileAlt /> },

              { to: "/Persona", text: "Persona", icon: <FaAddressCard /> },
              { to: "/Actividad", text: "Actividad", icon: <FaTasks /> },  

              { to: "/Alumno", text: "Alumno", icon: <FaGraduationCap /> },  
              { to: "/TramiteProceso", text: "Trámite Proceso", icon: <FaEdit /> },  

              { to: "/Profesor", text: "Profesor", icon: <FaChalkboardTeacher /> },
              { to: "/NivelEstudio", text: "Nivel de Estudio", icon: <FaUniversity /> },

              { to: "/Administrativo", text: "Administrativo", icon: <FaUserTie /> },
              { to: "/OfertaAcademica", text: "Oferta Académica", icon: <FaUniversity /> } ,

              { to: "/Departamento", text: "Departamento", icon: <FaBriefcase /> },
              { to: "/ProgramaAcademico", text: "Programa Académico", icon: <FaBook /> },

              { to: "/Puesto", text: "Puesto", icon: <FaBriefcase /> },
              { to: "/MapaCurricular", text: "Mapa Curricular", icon: <FaMapSigns /> },

              { to: "/Edificio", text: "Edificio", icon: <FaRegBuilding /> },
              { to: "/MateriaUnidad", text: "Materia Unidad", icon: <FaClipboard />},

              { to: "/Aula", text: "Aula", icon: <FaDoorOpen /> },
              { to: "/Bloque", text: "Bloque", icon: <FaLayerGroup /> },
              
              { to: "/AsignarPA", text: "AsignarPA", icon: <FaTasks /> },
              { to: "/Historial", text: "Historial", icon: <FaHistory /> } ,
          ]},

          { label: "Planificación Academica", key: "Planificación Academica", icon: <FaUser />, links: [
            { to: "/Periodo", text: "Apertura Periodo", icon: <FaRegBuilding /> },        
            { to: "/Grupo", text: "Grupo", icon: <FaLayerGroup /> },
            { to: "/Materias", text: "Carga de Materias", icon: <FaClipboardList /> },
            { to: "/AdicionProfesor", text: "Adición Profesor", icon: <FaUserPlus /> },
            { to: "/Evaluacion", text: "Evaluación", icon: <FaClipboardCheck /> },
          ]}, 

          { label: "Tramites", key: "Tramites", icon: <FaUser />, links: [
            { to: "/AlumnoProceso", text: "Alumno Proceso", icon: <FaLayerGroup /> }, 
            { to: "/AlumnoTramite", text: "Alumno Tramite", icon: <FaClipboardList /> },  
            { to: "/SeguimientoTramite", text: "Seguimiento Trámite", icon: <FaClipboardCheck /> },
            { to: "/Consultadekadex", text: "Consulta de Kardex", icon: <FaClipboardList /> }, 
            { to: "/Kardex", text: "Kardex", icon: <FaClipboardList /> },
          ]}

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
