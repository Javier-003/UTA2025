import { useState } from 'react';
import '../assets/css/Navbar.css'; // Archivo de estilos personalizado
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Nav from 'react-bootstrap/Nav';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { logoutLogin } from "../api/login.api.js";
import { Link } from 'react-router-dom';

function OffcanvasNavbar() {
  let username = localStorage.getItem('Username');
  const [showModal, setShowModal] = useState(false);

  const handleLogout = (e) => {
    e.preventDefault();
    const result = logoutLogin();
    if (result) {
      localStorage.clear();
      window.location.href = "/";
    } else {
      return;
    }
  };

  const toggleModal = () => setShowModal(!showModal);

  return (
    <div style={{ marginTop: '100px' }}> {/* Ajusta según la altura de tu Navbar */}
      <Navbar bg="dark" variant="dark" expand={false} fixed="top">
        <Container fluid>
          <Navbar.Brand href="/">{username ? username : "Servicios Escolares"}</Navbar.Brand>
          <Navbar.Toggle aria-controls="offcanvasNavbar" />
          <Navbar.Offcanvas
            id="offcanvasNavbar"
            aria-labelledby="offcanvasNavbarLabel"
            placement="end"
            className="bg-dark text-light"
          >
            <Offcanvas.Header closeButton>
              <Offcanvas.Title id="offcanvasNavbarLabel">
                Menú
              </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>

              {/* Menú scrollable con categorías */}
              <div style={{ maxHeight: '70vh', overflowY: 'auto', paddingRight: '10px' }}>
                <h5>Categorías</h5>
                <Nav className="flex-column">
                  <Nav.Link as={Link} to="/">Inicio</Nav.Link>
                  <hr />
                  <h5>Gestión de Usuarios</h5>
                  <Nav.Link as={Link} to="/Usuario">Usuario</Nav.Link>
                  <Nav.Link as={Link} to="/Persona">Persona</Nav.Link>
                  <Nav.Link as={Link} to="/Alumno">Alumno</Nav.Link>
                  <Nav.Link as={Link} to="/Administrativo">Administrativo</Nav.Link>
                  <Nav.Link as={Link} to="/Profesor">Profesor</Nav.Link>
                </Nav>
                <hr />

                {/* Agrega más categorías aquí */}
                <h5>Parametrizacion</h5>
              <Nav className="flex-column">
                <Nav.Link as={Link} to="/Actividad">Actividad</Nav.Link>
                <Nav.Link as={Link} to="/Tramite">Tramite</Nav.Link>
                <Nav.Link as={Link} to="/AlumnoTramite">Alumno Tramite</Nav.Link>
                <Nav.Link as={Link} to="/TramiteProceso">Tramite Proceso</Nav.Link>
                <Nav.Link as={Link} to="/AlumnoProceso">Alumno Proceso</Nav.Link>
              </Nav>
              <hr />


              <h5>Oferta Academica</h5>
              <Nav className="flex-column">
                <Nav.Link as={Link} to="/AsignarPA">Asignar Programa Academico</Nav.Link>
                <Nav.Link as={Link} to="/ProgramaAcademico">Programa Academico</Nav.Link>
                <Nav.Link as={Link} to="/NivelEstudio">Nivel de Estudio</Nav.Link>
                <Nav.Link as={Link} to="/MapaCurricular">Mapa Curricular</Nav.Link>
                <Nav.Link as={Link} to="/Periodo">Tramite de Apertura Periodo</Nav.Link>
                <Nav.Link as={Link} to="/OfertaAcademica">Oferta Academica</Nav.Link>
              </Nav>
              <hr />

              <h5>Area</h5>
              <Nav className="flex-column">
                <Nav.Link as={Link} to="/Aula">Aula</Nav.Link>
                <Nav.Link as={Link} to="/Edificio">Edificio</Nav.Link>
                <Nav.Link as={Link} to="/Departamento">Departamento</Nav.Link>
                <Nav.Link as={Link} to="/Puesto">Puesto</Nav.Link>
              </Nav>
              <hr />

              <h5>Evaluacion</h5>
              <Nav className="flex-column">
                <Nav.Link as={Link} to="/Evaluacion">Evaluacion</Nav.Link>
                <Nav.Link as={Link} to="/Kardex">Kardex</Nav.Link>
                <Nav.Link as={Link} to="/MateriaUnidad">Materia Unidad</Nav.Link>
              </Nav>
              <hr />

              <h5>Autorizacion</h5>
              <Nav className="flex-column">
                <Nav.Link as={Link} to="/Bloque">Bloque</Nav.Link>
                <Nav.Link as={Link} to="/Grupo">Grupo</Nav.Link>
                <Nav.Link as={Link} to="/Materias">Carga de Materias</Nav.Link>
                <Nav.Link as={Link} to="/SeguimientoTramite">Seguimiento Tramite</Nav.Link>
                <Nav.Link as={Link} to="/Consultadekadex">Consulta de Kardex</Nav.Link>
              </Nav>

              <h5>Historial</h5>
              <Nav className="flex-column">
                <Nav.Link as={Link} to="/Historial">Historial</Nav.Link>  
              </Nav>

              </div>
            </Offcanvas.Body>
            <button
              type="button"
              id="logout"
              className="btn btn-secondary"
              onClick={toggleModal}
            >
              Cerrar Sesión
            </button>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>

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
