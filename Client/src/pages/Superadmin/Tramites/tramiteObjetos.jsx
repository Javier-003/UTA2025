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
import { getGrupos } from "../../../api/PlanificacionAcademica/grupo.api.js";
import { getMapaCurriculares } from "../../../api/PlanificacionAcademica/mapacurricular.api.js";
import { getAlumnoPA } from "../../../api/Parametrizacion/alumnopa.api.js";

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

// ---------------- REINSCRIPCIÓN -------------------
export const tramiteValidaPagoReinscripcion = (props) => (
  <TramiteModal title="Valdación de Pago de Reinscripción" {...props} />
);

// ---------------- BAJA TEMPORAL -------------------
export const tramiteValidaPagoBajaTemporal = (props) => (
  <TramiteModal title="Valdación de Pago Baja Temporal" {...props} />
);

export const tramiteValidaAdeudos = (props) => (
  <TramiteModal title="Valdación de Adeudos" {...props} />
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

export const tramiteRegistraGrupoMateriasss = ({
  idMapaCurricular, setIdMapaCurricular,
  idGrupo, setIdGrupo,idAlumnoPA,setIdAlumnoPA,
  idPeriodoKardex,  setIdPeriodoKardex, 
  calificacionFinal, setCalificacionFinal,
  tipo, setTipo,
  showModal, setShowModal, 
  handleKardex,
  setSelectedKardex, handleClose, 
  show,
}) => {

    const [alumnoList, setAlumnoList] = useState([]);
    const [mapaList, setMapaList] = useState([]);
    const [grupoList, setGrupoList] = useState([]);
    const [periodoList, setPeriodoList] = useState([]);
   
    useEffect(() => {
    getAlumnoPA().then(data => setAlumnoList(data)).catch(error => console.error("Error al obtener los alumnos:", error));
    getMapaCurriculares().then(data => setMapaList(data)).catch(error => console.error("Error al obtener los mapas curriculares:", error));
    getGrupos().then(data => setGrupoList(data)).catch(error => console.error("Error al obtener los grupos:", error));
    getPeriodos().then(data => setPeriodoList(data)).catch(error => console.error("Error al obtener los periodos:", error));
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
                <select className="form-select" value={idAlumnoPA} onChange={(event) => setIdAlumnoPA(event.target.value)}>
                  <option value="">Selecciona un alumno</option>
                  {alumnoList.map((alumnopa) => (
                    <option key={alumnopa.idAlumnoPA} value={alumnopa.idAlumnoPA}>
                        {alumnopa.nombre} {alumnopa.paterno} {alumnopa.materno}  
                    </option>
                  ))}
                </select>
              </div>
              <div className="input-group mb-3">
              <span className="input-group-text">Mapa Curricular:</span>
              <select className="form-select" value={idMapaCurricular} onChange={(event) => setIdMapaCurricular(event.target.value)}>
                <option value="">Selecciona un programa</option>
                {mapaList.map((mapacurricular) => (
                  <option key={mapacurricular.idmapaCurricular} value={mapacurricular.idMapaCurricular}>{mapacurricular.materia}</option>
                ))}
              </select>
            </div>
            <div className="input-group mb-3">
                <span className="input-group-text">Grupo:</span>
                <select className="form-select" value={idGrupo} onChange={(event) => setIdGrupo(event.target.value)}>
                  <option value="">Selecciona un grupo</option>
                  {grupoList.map((grupo) => (
                    <option key={grupo.idGrupo} value={grupo.idGrupo}>{grupo.nombre}</option>
                  ))}
                </select>
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text">Periodo:</span>
                <select className="form-select" value={idPeriodoKardex} onChange={(event) => setIdPeriodoKardex(event.target.value)}>
                  <option value="">Selecciona un periodo</option>
                  {periodoList.map((periodo) => (
                    <option key={periodo.idPeriodo} value={periodo.idPeriodo}>{periodo.periodo}</option>
                  ))}
                </select>
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text">Calificación Final:</span>
                <input type="text" className="form-control" value={calificacionFinal} onChange={(event) => setCalificacionFinal(event.target.value)} />
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text">Tipo:</span>
                <select className="form-select" value={tipo} onChange={(event) => setTipo(event.target.value)}>
                  <option value="">Selecciona un tipo</option>
                  <option value="Ordinaria">Ordinaria</option>
                  <option value="Extraordinaria">Extraordinaria</option>
                </select>
              </div>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cerrar
        </Button>
        <Button 
          variant="primary" 
          onClick={() => {
            handleKardex();
            handleClose();
          }}
        >
          Guardar Cambios
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export const tramiteRegistraGrupoMaterias2 = ({
  idGrupo, setIdGrupo, idAlumnoPA, idPeriodoKardex,
  handleKardex, handleClose, show,
}) => {
  
  const [grupoList, setGrupoList] = useState([]);
  const [alumnoList, setAlumnoList] = useState([]);
  const tipo = "Ordinaria"; // 👈 Siempre será "Activo" (No editable ni visible)

  useEffect(() => {
    getAlumnoPA().then(data => setAlumnoList(data)).catch(error => console.error("Error al obtener los alumnos:", error));
    getGrupos().then(data => setGrupoList(data)).catch(error => console.error("Error al obtener los grupos:", error));
  }, []);

  return (
    <Modal show={show} onHide={handleClose} centered>
      {/* Encabezado con color elegante */}
      <Modal.Header closeButton className="bg-primary text-white">
        <Modal.Title className="fw-bold">Dar de alta Alumno</Modal.Title>
      </Modal.Header>
      
      <Modal.Body>
        {/* Alumno (visible pero no editable) */}
        <div className="input-group mb-3">
                <span className="input-group-text">Alumno:</span>
                <select className="form-select" value={idAlumnoPA} onChange={(event) => setIdAlumnoPA(event.target.value)} disabled>
                  <option value="">Selecciona un alumno</option>
                  {alumnoList.map((alumnopa) => (
                    <option key={alumnopa.idAlumnoPA} value={alumnopa.idAlumnoPA}>
                        {alumnopa.nombre} {alumnopa.paterno} {alumnopa.materno}  
                    </option>
                  ))}
                </select>
              </div>

        {/* Grupo (único campo seleccionable) */}
        <div className="input-group mb-3">
          <span className="input-group-text">Grupo:</span>
          <select className="form-select" value={idGrupo} onChange={(event) => setIdGrupo(event.target.value)}>
            <option value="">Selecciona un grupo</option>
            {grupoList.map((grupo) => (
              <option key={grupo.idGrupo} value={grupo.idGrupo}>{grupo.nombre}</option>
            ))}
          </select>
        </div>

        {/* Campos ocultos (Periodo y Tipo) */}
        <input type="hidden" value={idPeriodoKardex} name="idPeriodoKardex" />
        <input type="hidden" value={tipo} name="tipo" />
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cerrar
        </Button>
        <Button 
          variant="primary" 
          onClick={() => {
            console.log("Tipo antes de enviar:", tipo);
            handleKardex(); 
            handleClose();
          }}
        >
          Guardar Cambios
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export const tramiteRegistraGrupoMaterias8 = ({
  idGrupo, setIdGrupo, idAlumnoPA, idPeriodoKardex,
  handleKardex, handleClose, show,
}) => {
  
  const [grupoList, setGrupoList] = useState([]);
  const [alumnoList, setAlumnoList] = useState([]);
  const tipo = "Ordinaria"; // 👈 Siempre será "Activo" (No editable ni visible)

  useEffect(() => {
    getAlumnoPA().then(data => setAlumnoList(data)).catch(error => console.error("Error al obtener los alumnos:", error));
    getGrupos().then(data => setGrupoList(data)).catch(error => console.error("Error al obtener los grupos:", error));
  }, []);

  return (
    <Modal show={show} onHide={handleClose} centered>
      {/* Encabezado con color elegante */}
      <Modal.Header closeButton className="bg-primary text-white">
        <Modal.Title className="fw-bold">Dar de alta Alumno</Modal.Title>
      </Modal.Header>
      
      <Modal.Body>
        {/* Alumno (visible pero no editable) */}
        <div className="input-group mb-3">
                <span className="input-group-text">Alumno:</span>
                <select className="form-select" value={idAlumnoPA} onChange={(event) => setIdAlumnoPA(event.target.value)} disabled>
                  <option value="">Selecciona un alumno</option>
                  {alumnoList.map((alumnopa) => (
                    <option key={alumnopa.idAlumnoPA} value={alumnopa.idAlumnoPA}>
                        {alumnopa.nombre} {alumnopa.paterno} {alumnopa.materno}  
                    </option>
                  ))}
                </select>
              </div>

        {/* Grupo (único campo seleccionable) */}
        <div className="input-group mb-3">
          <span className="input-group-text">Grupo:</span>
          <select className="form-select" value={idGrupo} onChange={(event) => setIdGrupo(event.target.value)}>
            <option value="">Selecciona un grupo</option>
            {grupoList.map((grupo) => (
              <option key={grupo.idGrupo} value={grupo.idGrupo}>{grupo.nombre}</option>
            ))}
          </select>
        </div>

        {/* Campos ocultos (Periodo y Tipo) */}
        <input type="hidden" value={tipo} name="tipo" />
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cerrar
        </Button>
        <Button 
          variant="primary" 
          onClick={() => {
            console.log("Tipo antes de enviar:", tipo);
            handleKardex(); 
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


// ------------------------------------------ CARGAR DATOS (KARDEX, EVALUACIÓN) -------------------------------------------------------

export const tramiteRegistraGrupoMaterias = ({ 
  idGrupo, setIdGrupo, idAlumnoPA, idPeriodoKardex, 
  handleKardex, handleClose, show,
}) => {
  
  const [grupoList, setGrupoList] = useState([]);
  const [alumnoList, setAlumnoList] = useState([]);
  const [datosTemporalmente, setDatosTemporalmente] = useState(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const tipo = "Ordinaria";
  const estatusKardex = "Activo";

  useEffect(() => {
    getAlumnoPA()
      .then(data => setAlumnoList(data))
      .catch(error => console.error("Error al obtener los alumnos:", error));
    
    getGrupos()
      .then(data => setGrupoList(data))
      .catch(error => console.error("Error al obtener los grupos:", error));
  }, []);

  // Función para guardar los datos temporalmente y abrir el modal de confirmación
  const handleGuardarTemporal = () => {
    const alumnoSeleccionado = alumnoList.find(alumno => alumno.idAlumnoPA === idAlumnoPA);
    const grupoSeleccionado = grupoList.find(grupo => String(grupo.idGrupo) === String(idGrupo)); // Asegurar comparación correcta

    console.log("Alumno seleccionado:", alumnoSeleccionado); // Debug
    console.log("Grupo seleccionado:", grupoSeleccionado); // Debug

    const datos = {
      idAlumnoPA,
      nombreAlumno: alumnoSeleccionado 
        ? `${alumnoSeleccionado.nombre} ${alumnoSeleccionado.paterno} ${alumnoSeleccionado.materno}`
        : "Desconocido",
      idGrupo,
      nombreGrupo: grupoSeleccionado ? grupoSeleccionado.nombre : "Desconocido",
      tipo,
      estatusKardex,
      idPeriodoKardex,
    };

    setDatosTemporalmente(datos);
    setShowConfirmModal(true);
  };

  return (
    <>
      {/* Modal principal */}
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton className="bg-primary text-white">
          <Modal.Title className="fw-bold">Asignar Grupo a Alumno</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          {/* Alumno */}
          <div className="input-group mb-3">
            <span className="input-group-text">Alumno:</span>
            <select className="form-select" value={idAlumnoPA} disabled>
              <option value="">Selecciona un alumno</option>
              {alumnoList.map((alumnopa) => (
                <option key={alumnopa.idAlumnoPA} value={alumnopa.idAlumnoPA}>
                  {alumnopa.nombre} {alumnopa.paterno} {alumnopa.materno}
                </option>
              ))}
            </select>
          </div>

          {/* Grupo */}
          <div className="input-group mb-3">
            <span className="input-group-text">Grupo:</span>
            <select 
              className="form-select" 
              value={idGrupo} 
              onChange={(event) => setIdGrupo(event.target.value)}
            >
              <option value="">Selecciona un grupo</option>
              {grupoList.map((grupo) => (
                <option key={grupo.idGrupo} value={grupo.idGrupo}>
                  {grupo.nombre}
                </option>
              ))}
            </select>
          </div>

          {/* Campo oculto */}
          <input type="hidden" value={tipo} name="tipo" />
          <input type="hidden" value={estatusKardex} name="estatusKardex" />
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cerrar
          </Button>
          <Button variant="primary" onClick={handleGuardarTemporal}>
            Guardar Cambios
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal de confirmación */}
      <TramiteReinscribir
        show={showConfirmModal}
        handleClose={() => setShowConfirmModal(false)}
        datos={datosTemporalmente}
        handleConfirm={() => {
          handleKardex(datosTemporalmente);
          setShowConfirmModal(false);
          handleClose();
        }}
      />
    </>
  );
};

// Modal de confirmación
export const TramiteReinscribir = ({ show, handleClose, datos, handleConfirm }) => {
  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Confirmar Registro e Impactar Historial</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {datos ? (
          <>
            <p><strong>Alumno:</strong> {datos.nombreAlumno} </p>
            <p><strong>Grupo:</strong> {datos.nombreGrupo} ({datos.idGrupo})</p>
            <p><strong>Tipo:</strong> {datos.tipo}</p>
            <p><strong>Estatus:</strong> {datos.estatusKardex}</p>
          </>
        ) : (
          <p>No hay datos seleccionados.</p>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancelar
        </Button>
        <Button variant="primary" onClick={handleConfirm}>
          Confirmar y Registrar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};


//------------------------- CAMBIO DE ESTATUS BAJA TEMPORAL (UPDATE KARDEX) ------------------------------
export const tramiteBajaTemporal = (props) => (
  <TramiteModal title="Cambio Baja Temporal, se realizará el update de Kardex" {...props} />
);