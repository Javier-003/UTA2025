import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Row, Col, Alert } from 'react-bootstrap';
import { getAlumnoTramites } from '../../../api/Tramites/alumnotramite.api.js';


//ALUMNO
import { getPersonas } from "../../../api/Nucleo/persona.api.js";

//ALUMNOPA


const TramiteModal = ({
  title,
  idAlumnoTramite,
  estatus, setEstatus,
  observacion, setObservacion,
  handleUpdate, handleClose,
  show,
}) => {
  const [alumnotramiteList, setAlumnotramiteList] = useState([]);

  useEffect(() => {
    getAlumnoTramites()
      .then(setAlumnotramiteList)
      .catch((error) => console.error("Error al obtener los trámites:", error));
  }, []);

  const alumno = alumnotramiteList.find(al => al.idAlumnoTramite === idAlumnoTramite)?.alumno || "Desconocido";

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton className="bg-primary text-white">
        <Modal.Title className="fw-bold">{title}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Row className="mb-3">
          <Col>
            <Alert variant="light" className="border border-primary text-center fw-semibold fs-5">
              Alumno: <span className="text-primary">{alumno}</span>
            </Alert>
          </Col>
        </Row>

        <Form>
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

          <Form.Group className="mb-3">
            <Form.Label className="fw-semibold">Estado del Trámite</Form.Label>
            <Form.Select value={estatus} onChange={(e) => setEstatus(e.target.value)}>
              <option value="">Seleccionar</option>
              <option value="En proceso">En proceso</option>
              <option value="Concluido">Concluido</option>
            </Form.Select>
          </Form.Group>
        </Form>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>Cerrar</Button>
        <Button variant="primary" onClick={() => { handleUpdate(); handleClose(); }}>
          Guardar Cambios
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

// VALIDACIÓN DE INSCRIPCIÓN
export const tramiteValidaPagoInscripcion = (props) => (
  <TramiteModal title="Valdación de Pago de Inscripción" {...props} />
);

// ENTREGA DE ACTA DE NACIMIENTO
export const tramiteEntregaAN = (props) => (
  <TramiteModal title="Entrega de Acta de Nacimiento" {...props} />
);

// ENTREGA DE CERTIFICADO DE SECUNDARIA
export const tramiteEntregaCS = (props) => (
  <TramiteModal title="Entrega de Certificado de Secundaria" {...props} />
);

// ENTREGA DE CERTIFICADO DE BACHILLERATO
export const tramiteEntregaCB = (props) => (
  <TramiteModal title="Entrega de Certificado de Preparatoria o Bachillerato" {...props} />
);

// ENTREGA DE CURP
export const tramiteEntregaCURP = (props) => (
  <TramiteModal title="Entrega de CURP" {...props} />
);

// ENTREGA DE INE
export const tramiteEntregaINE = (props) => (
  <TramiteModal title="Entrega de INE" {...props} />
);

// ENTREGA DE FOTOS
export const tramiteEntregaFotos = (props) => (
  <TramiteModal title="Entrega de Fotos" {...props} />
);

// ENTREGA DE COMPROBANTE DE DOMICILIO
export const tramiteEntregaCompDomicilio = (props) => (
  <TramiteModal title="Entrega de Comprobante de Domicilio" {...props} />
);

export const tramiteAltaAlumno = (props) => (
  <TramiteModal title="Entrega tramite alumno prueba" {...props} />
);



// ------------------------------------------ REGISTRAR ALUMNO -------------------------------------------------------
export const tramiteRegistraAlumno = ({
  email, setemail,
  fecha, setfecha, 
  nss, setnss, 
  idPersona, setidPersona,
  showModal, setShowModal, 
  handleAdd,
  selectedAlumno, handleClose,
  show,
}) => {

  const [personaList, setPersonaList] = useState([]); 
  
  useEffect(() => {
    getPersonas().then((data) => setPersonaList(data)).catch((error) => console.error("Error al obtener las personas:", error));
  }, []);
  return (
    <Modal show={show} onHide={handleClose} centered>
      {/* Encabezado con color elegante */}
      <Modal.Header closeButton className="bg-primary text-white">
        <Modal.Title className="fw-bold">Dar de alta Alumno</Modal.Title>
      </Modal.Header>
      
      <Modal.Body>
        {/* Nombre del alumno resaltado pero sin exagerar */}
        <div className="input-group mb-3">
                <span className="input-group-text">Persona:</span>
                <select className="form-select" value={idPersona} onChange={(event) => setidPersona(event.target.value)}>
                  <option value="">Selecciona una persona</option>
                  {personaList.map((persona) => (
                    <option key={persona.idPersona} value={persona.idPersona}>
                      {`${persona.nombre} ${persona.paterno} ${persona.materno} - ${persona.curp}`}
                    </option>
                  ))}
                </select>
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text">Email:</span>
                <input
                  type="email"
                  className="form-control"
                  value={email}
                  onChange={(event) => setemail(event.target.value)}
                />
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text">Fecha de Registro:</span>
                <input
                  type="date"
                  className="form-control"
                  value={fecha}
                  onChange={(event) => setfecha(event.target.value)}
                />
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text">NSS:</span>
                <input
                  type="text"
                  className="form-control"
                  value={nss}
                  onChange={(event) => setnss(event.target.value)}
                />
              </div>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cerrar
        </Button>
        <Button 
          variant="primary" 
          onClick={() => {
            handleAdd();
            handleClose();
          }}
        >
          Guardar Cambios
        </Button>
      </Modal.Footer>
    </Modal>
  );
};


// ------------------------------------------ ALUMNO PA -------------------------------------------------------
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

// ------------------------------------------ ALUMNO GRUPO (KARDEX) -------------------------------------------------------
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

// ------------------------------------------ CARGAR DATOS (KARDEX, EVALUACIÓN) -------------------------------------------------------
export const tramiteReinscribir = ({
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
  <Modal show={show} onHide={handleClose}>
    {/* Encabezado con color elegante */}
    <Modal.Header closeButton className="bg-primary text-white">
      <Modal.Title className="fw-bold">Reinscribir Alumno</Modal.Title>
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
            <Form.Label className="fw-semibold">Estado del Reinscribir el Alumno</Form.Label>
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