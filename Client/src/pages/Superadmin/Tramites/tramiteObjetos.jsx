import { useState, useEffect } from 'react';
import { getTramitesProcesos } from "../../../api/Parametrizacion/tramiteproceso.api.js";
import { getAlumnoTramites } from "../../../api/Tramites/alumnotramite.api.js";
import { getActividades } from "../../../api/Parametrizacion/actividad.api.js";
import React from 'react';
import { Modal, Button, Form, Row, Col, Alert  } from 'react-bootstrap';// Asegúrate de que esto esté presente en cada archivo donde uses useState o useEffect



// ------------------------------------------ PAGO INSCRIPCIÓN -------------------------------------------------------
export const tramiteValidaPagoInscripcion = ({
  idAlumnoTramite, setIdAlumnoTramite,
  estatus, setEstatus,
  observacion, setObservacion,
  handleUpdate, handleClose,
  show,
}) => {
  const [alumnotramiteList, setAlumnotramiteList] = useState([]);

  useEffect(() => {
    getAlumnoTramites()
      .then((data) => setAlumnotramiteList(data))
      .catch((error) => console.error("Error al obtener los alumnos trámites:", error));
  }, []);

  const alumno = alumnotramiteList.find(alumno => alumno.idAlumnoTramite === idAlumnoTramite)?.alumno || "Desconocido";

  return (
    <Modal show={show} onHide={handleClose} centered>
      {/* Encabezado con color elegante */}
      <Modal.Header closeButton className="bg-primary text-white">
        <Modal.Title className="fw-bold">Validar Pago de Inscripción</Modal.Title>
      </Modal.Header>
      
      <Modal.Body>
        {/* Nombre del alumno resaltado pero sin exagerar */}
        <Row className="mb-3">
          <Col>
            <Alert variant="light" className="border border-primary text-center fw-semibold fs-5">
              Alumno: <span className="text-primary">{alumno}</span>
            </Alert>
          </Col>
        </Row>

        <Form>
          {/* Observaciones con diseño limpio */}
          <Form.Group className="mb-3">
            <Form.Label className="fw-semibold">Observaciones</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={observacion}
              onChange={(e) => setObservacion(e.target.value)}
              placeholder="Escribe aquí cualquier observación (opcional)"
            />
          </Form.Group>

          {/* Estatus con un diseño limpio y elegante */}
          <Form.Group className="mb-3">
            <Form.Label className="fw-semibold">Estado del Trámite</Form.Label>
            <Form.Select
              value={estatus}
              onChange={(e) => setEstatus(e.target.value)}
            >
              <option value="">Seleccionar</option>
              <option value="En proceso">En proceso</option>
              <option value="Concluido">Concluido</option>
            </Form.Select>
          </Form.Group>
        </Form>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cerrar
        </Button>
        <Button 
          variant="primary" 
          onClick={() => {
            handleUpdate();
            handleClose();
          }}
        >
          Guardar Cambios
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

//  --------------------------------------------- ACTA DE NACIMIENTO -------------------------------------------------------

export const tramiteEntregaAN = ({
  idAlumnoTramite, setIdAlumnoTramite,
  estatus, setEstatus,
  observacion, setObservacion,
  handleUpdate, handleClose,
  show,
}) => {
  const [alumnotramiteList, setAlumnotramiteList] = useState([]);

  useEffect(() => {
    getAlumnoTramites()
      .then((data) => setAlumnotramiteList(data))
      .catch((error) => console.error("Error al obtener los alumnos trámites:", error));
  }, []);

  const alumno = alumnotramiteList.find(alumno => alumno.idAlumnoTramite === idAlumnoTramite)?.alumno || "Desconocido";

  return (
    <Modal show={show} onHide={handleClose} centered>
      {/* Encabezado con color elegante */}
      <Modal.Header closeButton className="bg-primary text-white">
        <Modal.Title className="fw-bold">Entrega de Acta de Nacimiento</Modal.Title>
      </Modal.Header>
      
      <Modal.Body>
        {/* Nombre del alumno resaltado pero sin exagerar */}
        <Row className="mb-3">
          <Col>
            <Alert variant="light" className="border border-primary text-center fw-semibold fs-5">
              Alumno: <span className="text-primary">{alumno}</span>
            </Alert>
          </Col>
        </Row>

        <Form>
          {/* Observaciones con diseño limpio */}
          <Form.Group className="mb-3">
            <Form.Label className="fw-semibold">Observaciones</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={observacion}
              onChange={(e) => setObservacion(e.target.value)}
              placeholder="Escribe aquí cualquier observación (opcional)"
            />
          </Form.Group>

          {/* Estatus con un diseño limpio y elegante */}
          <Form.Group className="mb-3">
            <Form.Label className="fw-semibold">Estado del Trámite</Form.Label>
            <Form.Select
              value={estatus}
              onChange={(e) => setEstatus(e.target.value)}
            >
              <option value="">Seleccionar</option>
              <option value="En proceso">En proceso</option>
              <option value="Concluido">Concluido</option>
            </Form.Select>
          </Form.Group>
        </Form>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cerrar
        </Button>
        <Button 
          variant="primary" 
          onClick={() => {
            handleUpdate();
            handleClose();
          }}
        >
          Guardar Cambios
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

// ------------------------------------------ CERTIFICADO DE SECUNDARIA -------------------------------------------------------
export const tramiteEntregaCS = ({ show, handleClose }) => {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Entrega de Certificado de Secundaria</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Aquí puedes gestionar la entrega del Certificado de Secundaria.</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cerrar
        </Button>
        <Button variant="primary" onClick={handleClose}>
          Entregar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

// Función para la entrega de CURP
export const tramiteEntregaCURP = ({ show, handleClose }) => {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Entrega de CURP</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Aquí puedes gestionar la entrega de la CURP.</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cerrar
        </Button>
        <Button variant="primary" onClick={handleClose}>
          Entregar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

// Función para la entrega de INE
export const tramiteEntregaINE = ({ show, handleClose }) => {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Entrega de INE</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Aquí puedes gestionar la entrega de la INE.</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cerrar
        </Button>
        <Button variant="primary" onClick={handleClose}>
          Entregar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

// Función para la entrega de Fotos
export const tramiteEntregaFotos = ({ show, handleClose }) => {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Entrega de Fotos</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Aquí puedes gestionar la entrega de las Fotos.</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cerrar
        </Button>
        <Button variant="primary" onClick={handleClose}>
          Entregar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

// Función para la entrega de Comprobante de Domicilio
export const tramiteEntregaCompDomicilio = ({ show, handleClose }) => {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Entrega de Comprobante de Domicilio</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Aquí puedes gestionar la entrega del Comprobante de Domicilio.</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cerrar
        </Button>
        <Button variant="primary" onClick={handleClose}>
          Entregar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

// Función para registrar un alumno
export const tramiteRegistraAlumno = ({ show, handleClose }) => {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Registrar Alumno</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Aquí puedes registrar un nuevo alumno.</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cerrar
        </Button>
        <Button variant="primary" onClick={handleClose}>
          Registrar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

// Función para registrar un Programa Académico
export const tramiteRegistraPA = ({ show, handleClose }) => {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Registrar Programa Académico</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Aquí puedes registrar un nuevo Programa Académico.</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cerrar
        </Button>
        <Button variant="primary" onClick={handleClose}>
          Registrar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

// Función para registrar un grupo de materias
export const tramiteRegistraGrupoMaterias = ({ show, handleClose }) => {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Registrar Grupo de Materias</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Aquí puedes registrar un nuevo grupo de materias.</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cerrar
        </Button>
        <Button variant="primary" onClick={handleClose}>
          Registrar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

// Función para reinscribir a un alumno
export const tramiteReinscribir = ({ show, handleClose }) => {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Reinscribir Alumno</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Aquí puedes reinscribir a un alumno.</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cerrar
        </Button>
        <Button variant="primary" onClick={handleClose}>
          Reinscribir
        </Button>
      </Modal.Footer>
    </Modal>
  );
};