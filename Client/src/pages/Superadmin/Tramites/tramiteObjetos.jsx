import React, { useState, useEffect } from 'react';
import {  Modal, Button, Form, Row, Col, Alert, Tabs, Tab  } from 'react-bootstrap';
import { getAlumnoTramites } from '../../../api/Tramites/alumnotramite.api.js';


//ALUMNO
import { getPersonas } from "../../../api/Nucleo/persona.api.js";

//ALUMNOPA
import { getAlumnos } from "../../../api/Nucleo/alumno.api.js";
import { getPeriodos } from "../../../api/PlanificacionAcademica/periodo.api.js";
import { getProgramaacademicos } from "../../../api/PlanificacionAcademica/programa_academico.api.js";

//KARDEX


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


// ------------------------------------------ REGISTRAR ALUMNO -------------------------------------------------------
const TramiteModalRegistro = ({
  title,
  idAlumnoTramite,
  estatus, setEstatus,
  observacion, setObservacion,
  handleUpdate, handleClose,
  show,
  // Props adicionales para tramiteRegistraAlumno
  email, setemail,
  fecha, setfecha,
  nss, setnss,
  idPersona, setidPersona,
  handleAdd,
  selectedAlumno,
}) => {
  const [alumnotramiteList, setAlumnotramiteList] = useState([]);
  const [personaList, setPersonaList] = useState([]);
  const [activeTab, setActiveTab] = useState("tramite"); // Estado para controlar la pestaña activa

  useEffect(() => {
    getAlumnoTramites()
      .then(setAlumnotramiteList)
      .catch((error) => console.error("Error al obtener los trámites:", error));

    getPersonas()
      .then((data) => setPersonaList(data))
      .catch((error) => console.error("Error al obtener las personas:", error));
  }, []);

  const alumno = alumnotramiteList.find(al => al.idAlumnoTramite === idAlumnoTramite)?.alumno || "Desconocido";

  return (
    <Modal show={show} onHide={handleClose} centered size="lg">
      <Modal.Header closeButton className="bg-primary text-white">
        <Modal.Title className="fw-bold">{title}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Tabs
          activeKey={activeTab}
          onSelect={(key) => setActiveTab(key)}
          className="mb-3"
        >
          {/* Pestaña para el trámite */}
          <Tab eventKey="tramite" title="Trámite">
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
          </Tab>

          {/* Pestaña para registrar alumno */}
          <Tab eventKey="registro" title="Registrar Alumno">
            <div className="input-group mb-3">
              <select
              className="form-select"
              value={idPersona}
              onChange={(event) => setidPersona(event.target.value)}
              disabled // Esto hace que el select sea de solo lectura
            >
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
          </Tab>
        </Tabs>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cerrar
        </Button>
        {activeTab === "tramite" ? (
          <Button variant="primary" onClick={() => { handleUpdate(); handleClose(); }}>
            Guardar Cambios (Trámite)
          </Button>
        ) : (
          <Button variant="primary" onClick={() => { handleAdd(); handleClose(); }}>
            Guardar Cambios (Registro)
          </Button>
        )}
      </Modal.Footer>
    </Modal>
  );
};

// ALTA DE ALUMNO
export const tramiteRegistraAlumno = (props) => (
  <TramiteModalRegistro title="Alta de Alumno" {...props} />
);



// ------------------------------------------  (PRUEBAS) -------------------------------------------------------
export const tramiteRegistraAlumnor = ({
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

export const tramiteRegistraPAs = ({
  idAlumno,setIdAlumno,
  idProgramaAcademico,setIdProgramaAcademico,
  idPeriodo,setIdPeriodo,
  matricula,setMatricula,
  estatusAlumnoPA, setEstatusAlumnoPA, 
  desde,setDesde,
  hasta,setHasta,
  showModal, setShowModal, 
  handleAddPA,
  selectedAlumno, handleClose, setSelectedAlumnopa, 
  show,
}) => {

  const [programaAcademicoList, setProgramaAcademicoList] = useState([]);
  const [alumnoList, setAlumnoList] = useState([]);
  const [periodoList, setPeriodoList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const alumnosData = await getAlumnos();
        setAlumnoList(alumnosData || []);

        const periodosData = await getPeriodos();
        setPeriodoList(periodosData || []);
      } catch (error) {
        console.error("Error al obtener los datos:", error);
      }
    };
    fetchData();
  }, []);
  useEffect(() => {
    getProgramaacademicos()
      .then(data => setProgramaAcademicoList(data))
      .catch(error => console.error("Error al obtener los niveles de estudio:", error));
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
                <span className="input-group-text">Alumno:</span>
                <select className="form-select" value={idAlumno} onChange={(e) => setIdAlumno(e.target.value)}>
                  <option value="">Selecciona un alumno</option>
                  {alumnoList.map((alumno) => (
                    <option key={alumno.idAlumno} value={alumno.idAlumno}>
                      {alumno.nombre} {alumno.paterno} {alumno.materno}
                    </option>
                  ))}
                </select>
              </div>

              <div className="input-group mb-3">
                  <span className="input-group-text">Programa Académico:</span>
                  <select className="form-select" value={idProgramaAcademico} onChange={(event) => {
                    console.log("Programa Académico seleccionado:", event.target.value);
                    setIdProgramaAcademico(event.target.value);
                  }}>
                    <option value="">Selecciona un Programa Académico</option>
                    {programaAcademicoList && programaAcademicoList.map((programaAcademico) => (
                      <option key={programaAcademico.idProgramaAcademico} value={programaAcademico.idProgramaAcademico}>
                        {programaAcademico.nombreOficial}
                      </option>
                    ))}
                  </select>
                </div>

              <div className="input-group mb-3">
                <span className="input-group-text">Periodo:</span>
                <select className="form-select" value={idPeriodo} onChange={(e) => setIdPeriodo(e.target.value)}>
                  <option value="">Selecciona un periodo</option>
                  {periodoList.map((periodo) => (
                    <option key={periodo.idPeriodo} value={periodo.idPeriodo}>
                      {periodo.periodo}
                    </option>
                  ))}
                </select>
              </div>

              <div className="input-group mb-3">
                <span className="input-group-text">Matrícula:</span>
                <input type="text" className="form-control" value={matricula} onChange={(e) => setMatricula(e.target.value)} />
              </div>

              <div className="input-group mb-3">
                <span className="input-group-text">Estatus:</span>
                <select className="form-select" value={estatusAlumnoPA} onChange={(e) => setEstatusAlumnoPA(e.target.value)}>
                  <option value="">Selecciona un estatus</option>
                  <option value="Activo">Activo</option>
                  <option value="Baja">Baja</option>
                  <option value="Egresado">Egresado</option>
                </select>
              </div>

              <div className="input-group mb-3">
                <span className="input-group-text">Desde:</span>
                <input type="date" className="form-control" value={desde} onChange={(e) => setDesde(e.target.value)} />
              </div>

              <div className="input-group mb-3">
                <span className="input-group-text">Hasta:</span>
                <input type="date" className="form-control" value={hasta} onChange={(e) => setHasta(e.target.value)} />
              </div>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cerrar
        </Button>
        <Button 
          variant="primary" 
          onClick={() => {
            handleAddPA();
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

const TramiteModalRegistroPA = ({
  title,
  idAlumnoTramite,
  estatus, setEstatus,
  observacion, setObservacion,
  handleUpdate, handleClose,
  show,
  // Props adicionales para tramiteRegistraPA
  idAlumno, setIdAlumno,
  idProgramaAcademico, setIdProgramaAcademico,
  idPeriodo, setIdPeriodo,
  matricula, setMatricula,
  estatusAlumnoPA, setEstatusAlumnoPA,
  desde, setDesde,
  hasta, setHasta,
  handleAddPA
}) => {
  const [alumnotramiteList, setAlumnotramiteList] = useState([]);
  const [personaList, setPersonaList] = useState([]);
  const [activeTab, setActiveTab] = useState("tramite"); // Estado para controlar la pestaña activa

  const [programaAcademicoList, setProgramaAcademicoList] = useState([]);
  const [alumnoList, setAlumnoList] = useState([]);
  const [periodoList, setPeriodoList] = useState([]);

  useEffect(() => {
    getAlumnoTramites()
      .then(setAlumnotramiteList)
      .catch((error) => console.error("Error al obtener los trámites:", error));

    getPersonas()
      .then((data) => setPersonaList(data))
      .catch((error) => console.error("Error al obtener las personas:", error));

    const fetchData = async () => {
      try {
        const alumnosData = await getAlumnos();
        setAlumnoList(alumnosData || []);

        const periodosData = await getPeriodos();
        setPeriodoList(periodosData || []);
      } catch (error) {
        console.error("Error al obtener los datos:", error);
      }
    };
    fetchData();

    getProgramaacademicos()
      .then(data => setProgramaAcademicoList(data))
      .catch(error => console.error("Error al obtener los niveles de estudio:", error));
  }, []);

  const alumno = alumnotramiteList.find(al => al.idAlumnoTramite === idAlumnoTramite)?.alumno || "Desconocido";

  return (
    <Modal show={show} onHide={handleClose} centered size="lg">
      <Modal.Header closeButton className="bg-primary text-white">
        <Modal.Title className="fw-bold">{title}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Tabs
          activeKey={activeTab}
          onSelect={(key) => setActiveTab(key)}
          className="mb-3"
        >
          {/* Pestaña para el trámite */}
          <Tab eventKey="tramite" title="Trámite">
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
          </Tab>

          {/* Pestaña para tramitar programa académico */}
          <Tab eventKey="registro" title="Asignar Programa Académico">
            <div className="input-group mb-3">
              <span className="input-group-text">Alumno:</span>
              <select className="form-select" value={idAlumno} onChange={(e) => setIdAlumno(e.target.value)} disabled>
                <option value="">Aún no hay alumno creado</option>
                {alumnoList.map((alumno) => (
                  <option key={alumno.idAlumno} value={alumno.idAlumno}>
                    {alumno.nombre} {alumno.paterno} {alumno.materno}
                  </option>
                ))}
              </select>
            </div>

            <div className="input-group mb-3">
              <span className="input-group-text">Programa Académico:</span>
              <select className="form-select" value={idProgramaAcademico} onChange={(event) => setIdProgramaAcademico(event.target.value)}>
                <option value="">Selecciona un Programa Académico</option>
                {programaAcademicoList.map((programa) => (
                  <option key={programa.idProgramaAcademico} value={programa.idProgramaAcademico}>
                    {programa.nombreOficial}
                  </option>
                ))}
              </select>
            </div>

            <div className="input-group mb-3">
              <span className="input-group-text">Periodo:</span>
              <select className="form-select" value={idPeriodo} onChange={(e) => setIdPeriodo(e.target.value)}>
                <option value="">Selecciona un periodo</option>
                {periodoList.map((periodo) => (
                  <option key={periodo.idPeriodo} value={periodo.idPeriodo}>
                    {periodo.periodo}
                  </option>
                ))}
              </select>
            </div>

            <div className="input-group mb-3">
              <span className="input-group-text">Matrícula:</span>
              <input type="text" className="form-control" value={matricula} onChange={(e) => setMatricula(e.target.value)} />
            </div>

            <div className="input-group mb-3">
              <span className="input-group-text">Estatus:</span>
              <select className="form-select" value={estatusAlumnoPA} onChange={(e) => setEstatusAlumnoPA(e.target.value)}>
                <option value="">Selecciona un estatus</option>
                <option value="Activo">Activo</option>
                <option value="Baja">Baja</option>
                <option value="Egresado">Egresado</option>
              </select>
            </div>

            <div className="input-group mb-3">
              <span className="input-group-text">Desde:</span>
              <input type="date" className="form-control" value={desde} onChange={(e) => setDesde(e.target.value)} />
            </div>

            <div className="input-group mb-3">
              <span className="input-group-text">Hasta:</span>
              <input type="date" className="form-control" value={hasta} onChange={(e) => setHasta(e.target.value)} />
            </div>
          </Tab>
        </Tabs>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cerrar
        </Button>
        {activeTab === "tramite" ? (
          <Button variant="primary" onClick={() => { handleUpdate(); handleClose(); }}>
            Guardar Cambios (Trámite)
          </Button>
        ) : (
          <Button variant="primary" onClick={() => { handleAddPA(); handleClose(); }}>
            Guardar Cambios (Programa Académico)
          </Button>
        )}
      </Modal.Footer>
    </Modal>
  );
};

// Exportación de la nueva función
export const tramiteRegistraPA = (props) => (
  <TramiteModalRegistroPA title="Alta de Programa Académico" {...props} />
);




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