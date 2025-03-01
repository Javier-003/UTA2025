import React from 'react';
import { Modal, Button } from 'react-bootstrap';

// Función para validar el pago de la inscripción
export const tramiteValidaPagoInscripcion = ({ show, handleClose }) => {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Validar Pago de Inscripción</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Aquí puedes validar el pago de la inscripción.</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cerrar
        </Button>
        <Button variant="primary" onClick={handleClose}>
          Validar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

// Función para la entrega de Acta de Nacimiento
export const tramiteEntregaAN = ({ show, handleClose }) => {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Entrega de Acta de Nacimiento</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Aquí puedes gestionar la entrega del Acta de Nacimiento.</p>
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

// Función para la entrega de Certificado de Bachillerato
export const tramiteEntregaCB = ({ show, handleClose }) => {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Entrega de Certificado de Bachillerato</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Aquí puedes gestionar la entrega del Certificado de Bachillerato.</p>
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

// Función para la entrega de Certificado de Secundaria
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