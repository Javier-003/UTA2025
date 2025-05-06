import React, { useState, useEffect } from 'react';
import {  Modal, Button, Form, Row, Col, Alert, Tabs, Tab, Badge  } from 'react-bootstrap';
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
import { getMateriasByGrupo } from '../../../api/Parametrizacion/kardex.api.js';

//ALUMNO TRÁMITE
import { getCausasBaja } from "../../../api/Tramites/causabaja.api.js";
import {getTramites} from "../../../api/Parametrizacion/tramite.api.js";

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

// ---------------- BAJA DEFINITIVA -------------------
export const tramiteSolicitudBajaDefinitiva = (props) => (
  <TramiteModal title="Proceso de Solicitud de Baja Definitiva" {...props} />
);

export const tramiteValidaPagoBajaDefinitiva = (props) => (
  <TramiteModal title="Valdación de Pago Baja Definitiva" {...props} />
);

// ---------------- EXTRAORDINARIO -------------------
export const tramiteValidaPagoExtraordinario = (props) => (
  <TramiteModal title="Valdación de Pago Recuperación de Saberes" {...props} />
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

const TramiteModalBajaTemporal = ({
  title,
  idAlumnoTramite,
  estatus, setEstatus,
  observacion, setObservacion,
  handleUpdate, handleClose,
  show,
  idAlumnoPA,
  idMapaCurricular, setIdMapaCurricular,
  idGrupo, setIdGrupo,
  idPeriodoKardex, setIdPeriodoKardex,
  calificacionFinal, setCalificacionFinal,
  tipo, setTipo, estatusKardex, setEstatusKardex,
  handleUpdateKardex
}) => {

  const [alumnoList, setAlumnoList] = useState([]);
  const [mapaList, setMapaList] = useState([]);
  const [grupoList, setGrupoList] = useState([]);
  const [periodoList, setPeriodoList] = useState([]);
  const [activeTab, setActiveTab] = useState('tramite');
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  useEffect(() => {
    getAlumnoPA().then(setAlumnoList);
    getMapaCurriculares().then(setMapaList);
    getGrupos().then(setGrupoList);
    getPeriodos().then(setPeriodoList);
  }, []);

  const alumnoData = alumnoList.find(a => a.idAlumnoPA === idAlumnoPA);
  const nombreCompleto = alumnoData
    ? `${alumnoData.nombre} ${alumnoData.paterno} ${alumnoData.materno}`
    : 'Desconocido';

  const mapa = mapaList.find(m => m.idMapaCurricular === idMapaCurricular)?.materia || 'Desconocido';
  const grupo = grupoList.find(g => g.idGrupo === idGrupo)?.nombre || 'Desconocido';
  const periodo = periodoList.find(p => p.idPeriodo === idPeriodoKardex)?.periodo || 'Desconocido';

  const handleConfirm = () => setShowConfirmModal(true);
  const handleCancelConfirm = () => setShowConfirmModal(false);

  const handleAcceptConfirm = () => {
    handleUpdateKardex();
    setShowConfirmModal(false);
    handleClose();
  };

  return (
    <>
      <Modal show={show} onHide={handleClose} centered size="lg">
        <Modal.Header closeButton className="bg-primary text-white">
          <Modal.Title className="fw-bold text-uppercase">{title}</Modal.Title>
        </Modal.Header>

        <Modal.Body className="bg-light">
          <Tabs
            activeKey={activeTab}
            onSelect={(key) => setActiveTab(key)}
            className="mb-4 nav-pills justify-content-center"
          >
            {/* Tab Trámite */}
            <Tab eventKey="tramite" title="Información Trámite">
              <Row className="mb-3">
                <Col>
                  <Alert variant="secondary" className="text-center fw-semibold fs-5 mb-4 shadow-sm">
                    Alumno: <span className="text-primary">{nombreCompleto}</span>
                  </Alert>
                </Col>
              </Row>

              <div className="mb-4">
                <label className="fw-semibold mb-2">Observaciones</label>
                <textarea
                  className="form-control"
                  rows={3}
                  value={observacion}
                  onChange={(e) => setObservacion(e.target.value)}
                  placeholder="Escribe aquí cualquier observación (opcional)"
                />
              </div>

              <div className="mb-4">
                <label className="fw-semibold mb-2">Estado del Trámite</label>
                <select
                  className="form-select"
                  value={estatus}
                  onChange={(e) => setEstatus(e.target.value)}
                >
                  <option value="">Seleccionar</option>
                  <option value="En proceso">En proceso</option>
                  <option value="Concluido">Concluido</option>
                </select>
              </div>
            </Tab>

            {/* Tab Baja Temporal */}
            <Tab eventKey="registro" title="Baja Temporal">
              <Alert variant="light" className="border border-danger p-3 text-center shadow-sm">
                <h5 className="text-danger mb-3 fw-bold text-uppercase">Baja Temporal del Alumno</h5>
                <p className="text-muted mb-0">
                  La baja temporal implica <strong className="text-danger">no derecho a evaluación</strong> mientras dure el estatus.
                </p>
              </Alert>

              <Row className="mb-3">
                <Col>
                  <label className="fw-semibold">Alumno:</label>
                  <div className="form-control bg-white">{nombreCompleto}</div>
                </Col>
              </Row>

              <Row className="mb-3">
                <Col>
                  <label className="fw-semibold">Grupo:</label>
                  <div className="form-control bg-white">{grupo}</div>
                </Col>
              </Row>

              <input
                type="hidden"
                value="Baja Temporal"
                name="estatusKardex"
              />

              <div className="mb-3">
                <label className="fw-semibold">Nuevo Estatus:</label>
                <select
                  className="form-select border-danger text-danger"
                  value="Baja Temporal"
                  disabled
                >
                  <option>Baja Temporal</option>
                </select>
              </div>

              <Alert variant="warning" className="p-3 mt-4 shadow-sm">
                <p className="fw-semibold mb-0 text-center">
                  ⚠️ Al cambiar el estatus a <strong>Baja Temporal</strong>, el alumno <u>no tendrá derecho a evaluación</u> en este programa académico.
                </p>
              </Alert>
            </Tab>
          </Tabs>
        </Modal.Body>

        <Modal.Footer className="justify-content-between">
          <Button variant="outline-secondary" onClick={handleClose}>Cerrar</Button>

          {activeTab === 'tramite' ? (
            <Button variant="primary" onClick={() => { handleUpdate(); handleClose(); }}>
              Guardar Cambios
            </Button>
          ) : (
            <Button variant="danger" onClick={handleConfirm} className="fw-bold">
              Confirmar Baja Temporal
            </Button>
          )}
        </Modal.Footer>
      </Modal>

      {/* Modal Confirmación Baja */}
      <Modal show={showConfirmModal} onHide={handleCancelConfirm} centered>
        <Modal.Header closeButton className="border-0">
          <Modal.Title className="fw-bold text-danger">Confirmar Baja Temporal</Modal.Title>
        </Modal.Header>

        <Modal.Body className="text-center">
          <h4 className="text-danger fw-bold mb-3">¡Atención!</h4>
          <p className="fs-5 text-muted mb-3">
            ¿Estás seguro que deseas cambiar el estatus del alumno a <strong className="text-danger">Baja Temporal</strong>?
          </p>
          <p className="text-danger fw-semibold">
            Esta acción impactará el kardex. <br />
            El alumno <u>no tendrá derecho a evaluación</u>.
          </p>
        </Modal.Body>

        <Modal.Footer className="justify-content-center border-0">
          <Button variant="outline-secondary" onClick={handleCancelConfirm} className="px-4 py-2">Cancelar</Button>
          <Button variant="danger" onClick={handleAcceptConfirm} className="px-4 py-2 fw-bold">Confirmar</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export const tramiteBajaTemporal = (props) => (
  <TramiteModalBajaTemporal title="Confirmación de Baja Temporal" {...props} />
);


//------------------------- CAUSAS DE BAJA (UPDATE ALUMNOTRAMITE) ------------------------------

const TramiteModalCausaBaja = ({
  title, handleUpdateBaja, handleClose, show,
  idAlumnoPA, idBajaCausa, setIdBajaCausa, alumnoNombre
}) => {
  const [causabaja, setCausaBaja] = useState([]);
  const [alumnoList, setAlumnoList] = useState([]);

  useEffect(() => {
    getCausasBaja().then(setCausaBaja).catch(console.error);
    getAlumnoPA().then(data => setAlumnoList(data || [])).catch(console.error);
  }, []);

  const getNombreAlumno = () => {
    if (!idAlumnoPA) return "No seleccionado";
    const alumno = alumnoList.find(a => a.idAlumnoPA == idAlumnoPA);
    return alumno ? `${alumno.nombre} ${alumno.paterno} ${alumno.materno}` : "No encontrado";
  };

  return (
    <Modal show={show} onHide={handleClose} centered size="lg">
      <Modal.Header closeButton className="bg-primary text-white">
        <Modal.Title className="fw-bold">{title}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form>
          <Form.Group className="mb-4">
            <Form.Label className="fw-bold">Alumno:</Form.Label>
            <div className="p-3 bg-light rounded">
              <h5 className="mb-0 text-primary">{alumnoNombre || getNombreAlumno()}</h5>
            </div>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label className="fw-semibold">Causa de baja</Form.Label>
            <Form.Select value={idBajaCausa} onChange={(e) => setIdBajaCausa(e.target.value)}>
              <option value="">Seleccionar causa</option>
              {causabaja.map(causa => (
                <option key={causa.idBajaCausa} value={causa.idBajaCausa}>{causa.nombre}</option>
              ))}
            </Form.Select>
          </Form.Group>
        </Form>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>Cerrar</Button>
        <Button variant="primary" onClick={() => { handleUpdateBaja(); handleClose(); }}>
          Guardar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export const tramiteCausaBaja = (props) => <TramiteModalCausaBaja title="Causas de Baja" {...props} />;

//------------------------- REACTIVA ALUMNO ------------------------------

const TramiteModalReactivar = ({
  title,
  idAlumnoTramite,
  estatus, setEstatus,
  observacion, setObservacion,
  handleUpdate, handleClose,
  show,
  idAlumno,
  idProgramaAcademico,
  idPeriodo,
  matricula,
  estatusAlumnoPA,
  handleUpdatePA
}) => {

  const [alumnotramiteList, setAlumnotramiteList] = useState([]);
  const [programaAcademicoList, setProgramaAcademicoList] = useState([]);
  const [periodoList, setPeriodoList] = useState([]);
  const [alumnoList, setAlumnoList] = useState([]);
  const [activeTab, setActiveTab] = useState('tramite');
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  useEffect(() => {
    getAlumnoTramites().then(setAlumnotramiteList);
    getAlumnos().then(setAlumnoList);
    getPeriodos().then(setPeriodoList);
    getProgramaacademicos().then(setProgramaAcademicoList);
  }, []);

  const alumnoData = alumnoList.find(a => a.idAlumno === idAlumno);
  const programa = programaAcademicoList.find(p => p.idProgramaAcademico === idProgramaAcademico)?.nombreOficial || 'Desconocido';
  const periodo = periodoList.find(p => p.idPeriodo === idPeriodo)?.periodo || 'Desconocido';

  const nombreCompleto = alumnoData
    ? `${alumnoData.nombre} ${alumnoData.paterno} ${alumnoData.materno}`
    : 'Desconocido';

  const handleConfirm = () => setShowConfirmModal(true);
  const handleCancelConfirm = () => setShowConfirmModal(false);

  const handleAcceptConfirm = () => {
    handleUpdatePA();
    setShowConfirmModal(false);
    handleClose();
  };

  return (
    <>
      <Modal show={show} onHide={handleClose} centered size="lg">
        <Modal.Header closeButton className="bg-primary text-white">
          <Modal.Title className="fw-bold text-uppercase">{title}</Modal.Title>
        </Modal.Header>

        <Modal.Body className="bg-light">
          <Tabs
            activeKey={activeTab}
            onSelect={(key) => setActiveTab(key)}
            className="mb-4 nav-pills justify-content-center"
          >
            {/* Tab Trámite */}
            <Tab eventKey="tramite" title="Información Trámite">
              <Row className="mb-3">
                <Col>
                  <Alert variant="secondary" className="text-center fw-semibold fs-5 mb-4 shadow-sm">
                    Alumno: <span className="text-primary">{nombreCompleto}</span>
                  </Alert>
                </Col>
              </Row>

              <div className="mb-4">
                <label className="fw-semibold mb-2">Observaciones</label>
                <textarea
                  className="form-control"
                  rows={3}
                  value={observacion}
                  onChange={(e) => setObservacion(e.target.value)}
                  placeholder="Escribe aquí cualquier observación (opcional)"
                />
              </div>

              <div className="mb-4">
                <label className="fw-semibold mb-2">Estado del Trámite</label>
                <select
                  className="form-select"
                  value={estatus}
                  onChange={(e) => setEstatus(e.target.value)}
                >
                  <option value="">Seleccionar</option>
                  <option value="En proceso">En proceso</option>
                  <option value="Concluido">Concluido</option>
                </select>
              </div>
            </Tab>

            {/* Tab Reactivación */}
            <Tab eventKey="registro" title="Reactivar Programa Académico">
              <Alert variant="light" className="border border-primary p-3 text-center shadow-sm">
                <h5 className="text-primary mb-3 fw-bold text-uppercase">Reactivar Programa Académico</h5>
                <p className="text-muted mb-0">
                  La reactivación implica que el alumno quedará nuevamente <strong className="text-primary">inscrito en el programa académico</strong>.
                </p>
              </Alert>

              <Row className="mb-3">
                <Col>
                  <label className="fw-semibold">Alumno:</label>
                  <div className="form-control bg-white">{nombreCompleto}</div>
                </Col>
              </Row>

              <Row className="mb-3">
                <Col>
                  <label className="fw-semibold">Programa Académico:</label>
                  <div className="form-control bg-white">{programa}</div>
                </Col>
              </Row>

              {/* <Row className="mb-3">
                <Col>
                  <label className="fw-semibold">Periodo:</label>
                  <div className="form-control bg-white">{periodo}</div>
                </Col>
              </Row> */}

              <Row className="mb-3">
                <Col>
                  <label className="fw-semibold">Matrícula:</label>
                  <div className="form-control bg-white">{matricula}</div>
                </Col>
              </Row>

              <input
                type="hidden"
                value="Activo"
                name="estatusAlumnoPA"
              />

              <div className="mb-3">
                <label className="fw-semibold">Nuevo Estatus:</label>
                <select
                  className="form-select border-primary text-primary"
                  value="Activo"
                  disabled
                >
                  <option>Activo</option>
                </select>
              </div>

              <Alert variant="warning" className="p-3 mt-4 shadow-sm">
                <p className="fw-semibold mb-0 text-center">
                  ⚠️ Al cambiar el estatus a <strong>Activo</strong>, el alumno quedará <u>inscrito nuevamente</u> en este programa académico. Sin embargo, las materias <u>no se activarán automáticamente</u>; para ello será necesario realizar el proceso de reinscripción.
                </p>
              </Alert>
            </Tab>
          </Tabs>
        </Modal.Body>

        <Modal.Footer className="justify-content-between">
          <Button variant="outline-secondary" onClick={handleClose}>Cerrar</Button>

          {activeTab === 'tramite' ? (
            <Button variant="primary" onClick={() => { handleUpdate(); handleClose(); }}>
              Guardar Cambios
            </Button>
          ) : (
            <Button variant="primary" onClick={handleConfirm} className="fw-bold">
              Confirmar Reactivación
            </Button>
          )}
        </Modal.Footer>
      </Modal>

      {/* Modal Confirmación Reactivación */}
      <Modal show={showConfirmModal} onHide={handleCancelConfirm} centered>
        <Modal.Header closeButton className="border-0">
          <Modal.Title className="fw-bold text-primary">Confirmar Reactivación</Modal.Title>
        </Modal.Header>

        <Modal.Body className="text-center">
          <h4 className="text-primary fw-bold mb-3">¡Atención!</h4>
          <p className="fs-5 text-muted mb-3">
            ¿Estás seguro que deseas reactivar al alumno en el <strong className="text-primary">programa académico</strong>?
          </p>
          <p className="text-primary fw-semibold">
            Esto permitirá que el alumno <u>se inscriba nuevamente</u>. <br />
            Deberás realizar el proceso de reinscripción de materias.
          </p>
        </Modal.Body>

        <Modal.Footer className="justify-content-center border-0">
          <Button variant="outline-secondary" onClick={handleCancelConfirm} className="px-4 py-2">Cancelar</Button>
          <Button variant="primary" onClick={handleAcceptConfirm} className="px-4 py-2 fw-bold">Confirmar</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export const tramiteReactivaAlumno = (props) => (
  <TramiteModalReactivar title="REACTIVAR ALUMNO Y PROGRAMA ACADÉMICO" {...props} />
);


//------------------------- CAMBIO DE ESTATUS BAJA TEMPORAL (UPDATE KARDEX) ------------------------------

const TramiteModalBajaDefinitiva = ({
  title,
  idAlumnoTramite,
  estatus, setEstatus,
  observacion, setObservacion,
  handleUpdate, handleClose,
  show,
  idAlumnoPA,
  idMapaCurricular, setIdMapaCurricular,
  idGrupo, setIdGrupo,
  idPeriodoKardex, setIdPeriodoKardex,
  calificacionFinal, setCalificacionFinal,
  tipo, setTipo, estatusKardex, setEstatusKardex,
  handleUpdateKardexBDef
}) => {

  const [alumnoList, setAlumnoList] = useState([]);
  const [mapaList, setMapaList] = useState([]);
  const [grupoList, setGrupoList] = useState([]);
  const [periodoList, setPeriodoList] = useState([]);
  const [activeTab, setActiveTab] = useState('tramite');
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  useEffect(() => {
    getAlumnoPA().then(setAlumnoList);
    getMapaCurriculares().then(setMapaList);
    getGrupos().then(setGrupoList);
    getPeriodos().then(setPeriodoList);
  }, []);

  const alumnoData = alumnoList.find(a => a.idAlumnoPA === idAlumnoPA);
  const nombreCompleto = alumnoData
    ? `${alumnoData.nombre} ${alumnoData.paterno} ${alumnoData.materno}`
    : 'Desconocido';

  const mapa = mapaList.find(m => m.idMapaCurricular === idMapaCurricular)?.materia || 'Desconocido';
  const grupo = grupoList.find(g => g.idGrupo === idGrupo)?.nombre || 'Desconocido';
  const periodo = periodoList.find(p => p.idPeriodo === idPeriodoKardex)?.periodo || 'Desconocido';

  const handleConfirm = () => setShowConfirmModal(true);
  const handleCancelConfirm = () => setShowConfirmModal(false);

  const handleAcceptConfirm = () => {
    handleUpdateKardexBDef();
    setShowConfirmModal(false);
    handleClose();
  };

  return (
    <>
      <Modal show={show} onHide={handleClose} centered size="lg">
        <Modal.Header closeButton className="bg-primary text-white">
          <Modal.Title className="fw-bold text-uppercase">{title}</Modal.Title>
        </Modal.Header>

        <Modal.Body className="bg-light">
          <Tabs
            activeKey={activeTab}
            onSelect={(key) => setActiveTab(key)}
            className="mb-4 nav-pills justify-content-center"
          >
            {/* Tab Trámite */}
            <Tab eventKey="tramite" title="Información Trámite">
              <Row className="mb-3">
                <Col>
                  <Alert variant="secondary" className="text-center fw-semibold fs-5 mb-4 shadow-sm">
                    Alumno: <span className="text-primary">{nombreCompleto}</span>
                  </Alert>
                </Col>
              </Row>

              <div className="mb-4">
                <label className="fw-semibold mb-2">Observaciones</label>
                <textarea
                  className="form-control"
                  rows={3}
                  value={observacion}
                  onChange={(e) => setObservacion(e.target.value)}
                  placeholder="Escribe aquí cualquier observación (opcional)"
                />
              </div>

              <div className="mb-4">
                <label className="fw-semibold mb-2">Estado del Trámite</label>
                <select
                  className="form-select"
                  value={estatus}
                  onChange={(e) => setEstatus(e.target.value)}
                >
                  <option value="">Seleccionar</option>
                  <option value="En proceso">En proceso</option>
                  <option value="Concluido">Concluido</option>
                </select>
              </div>
            </Tab>

            {/* Tab Baja Temporal */}
            <Tab eventKey="registro" title="Baja Definitiva">
              <Alert variant="light" className="border border-danger p-3 text-center shadow-sm">
                <h5 className="text-danger mb-3 fw-bold text-uppercase">Baja Definitiva del Alumno</h5>
                <p className="text-muted mb-0">
                  La baja definitiva implica <strong className="text-danger">cancelar todos los procesos</strong> del alumno.
                </p>
              </Alert>

              <Row className="mb-3">
                <Col>
                  <label className="fw-semibold">Alumno:</label>
                  <div className="form-control bg-white">{nombreCompleto}</div>
                </Col>
              </Row>

              <Row className="mb-3">
                <Col>
                  <label className="fw-semibold">Grupo:</label>
                  <div className="form-control bg-white">{grupo}</div>
                </Col>
              </Row>

              <input
                type="hidden"
                value="Baja Temporal"
                name="estatusKardex"
              />

              <div className="mb-3">
                <label className="fw-semibold">Nuevo Estatus:</label>
                <select
                  className="form-select border-danger text-danger"
                  value="Baja Temporal"
                  disabled
                >
                  <option>Baja Definitiva</option>
                </select>
              </div>

              <Alert variant="warning" className="p-3 mt-4 shadow-sm">
                <p className="fw-semibold mb-0 text-center">
                  ⚠️ Al cambiar el estatus a <strong>Baja Definitiva</strong>, el alumno <u>no tendrá derecho a reinscripción</u> en este programa académico.
                </p>
              </Alert>
            </Tab>
          </Tabs>
        </Modal.Body>

        <Modal.Footer className="justify-content-between">
          <Button variant="outline-secondary" onClick={handleClose}>Cerrar</Button>

          {activeTab === 'tramite' ? (
            <Button variant="primary" onClick={() => { handleUpdate(); handleClose(); }}>
              Guardar Cambios
            </Button>
          ) : (
            <Button variant="danger" onClick={handleConfirm} className="fw-bold">
              Confirmar Baja Definitiva
            </Button>
          )}
        </Modal.Footer>
      </Modal>

      {/* Modal Confirmación Baja */}
      <Modal show={showConfirmModal} onHide={handleCancelConfirm} centered>
        <Modal.Header closeButton className="border-0">
          <Modal.Title className="fw-bold text-danger">Confirmar Baja Definitiva</Modal.Title>
        </Modal.Header>

        <Modal.Body className="text-center">
          <h4 className="text-danger fw-bold mb-3">¡Atención!</h4>
          <p className="fs-5 text-muted mb-3">
            ¿Estás seguro que deseas cambiar el estatus del alumno a <strong className="text-danger">Baja Definitiva</strong>?
          </p>
          <p className="text-danger fw-semibold">
            Esta acción impactará el kardex. <br />
            El alumno <u>no tendrá derecho a reinscripción</u>.
          </p>
        </Modal.Body>

        <Modal.Footer className="justify-content-center border-0">
          <Button variant="outline-secondary" onClick={handleCancelConfirm} className="px-4 py-2">Cancelar</Button>
          <Button variant="danger" onClick={handleAcceptConfirm} className="px-4 py-2 fw-bold">Confirmar</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export const tramiteBajaDefinitiva = (props) => (
  <TramiteModalBajaDefinitiva title="Confirmación de Baja Definitiva" {...props} />
);

// ------------------------------------------ CARGAR DATOS (KARDEX, EVALUACIÓN) PARA EXTRAORDINARIO -------------------------------------------------------

export const tramiteRegistraGrupoExtraordinario = ({
  idAlumnoPA,
  show,
  handleClose,
  handleAddKardexExtra,
}) => {
  const [grupoList, setGrupoList] = useState([]);
  const [idGrupo, setIdGrupo] = useState("");
  const [materiasGrupo, setMateriasGrupo] = useState([]);
  const [materiasSeleccionadas, setMateriasSeleccionadas] = useState([]);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [alumnoList, setAlumnoList] = useState([]);

  useEffect(() => {
    if (show) {
      getGrupos().then(setGrupoList).catch(console.error);
      getAlumnoPA().then(setAlumnoList).catch(console.error);
    }
  }, [show]);

  useEffect(() => {
    if (idGrupo) {
      getMateriasByGrupo(idGrupo)
        .then((data) => {
          setMateriasGrupo(data);
          setMateriasSeleccionadas([]);
        })
        .catch(console.error);
    }
  }, [idGrupo]);

  const handleCheckboxChange = (idMateria) => {
    setMateriasSeleccionadas((prev) =>
      prev.includes(idMateria)
        ? prev.filter((id) => id !== idMateria)
        : [...prev, idMateria]
    );
  };

  const handleConfirm = () => {
    handleAddKardexExtra({
      idAlumnoPA,
      idGrupo,
      materiasSeleccionadas,
    });
    setShowConfirmModal(false);
    handleClose();
  };

  const alumnoData = alumnoList.find((a) => a.idAlumnoPA === idAlumnoPA);
  const nombreCompleto = alumnoData
    ? `${alumnoData.nombre} ${alumnoData.paterno} ${alumnoData.materno}`
    : "";

  return (
    <>
      <Modal show={show} onHide={handleClose} centered size="lg">
        <Modal.Header closeButton className="bg-primary text-white">
          <Modal.Title>Registrar Extraordinario</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          {nombreCompleto && (
            <div className="mb-3">
              <strong>Alumno:</strong> {nombreCompleto}
            </div>
          )}

          <div className="mb-3">
            <label className="form-label fw-bold">Grupo:</label>
            <select
              className="form-select"
              value={idGrupo}
              onChange={(e) => setIdGrupo(e.target.value)}
            >
              <option value="">-- Selecciona un grupo --</option>
              {grupoList.map((g) => (
                <option key={g.idGrupo} value={g.idGrupo}>
                  {g.nombre}
                </option>
              ))}
            </select>
          </div>

          {materiasGrupo.length > 0 && (
            <>
              <label className="form-label fw-bold">Materias del grupo:</label>
              <div className="list-group">
                {materiasGrupo.map((materia) => (
                  <label
                    key={materia.idMapaCurricular}
                    className={`list-group-item list-group-item-action d-flex justify-content-between align-items-center rounded-3 mb-2 ${
                      materiasSeleccionadas.includes(materia.idMapaCurricular)
                        ? "active bg-primary text-white"
                        : ""
                    }`}
                    style={{ cursor: "pointer" }}
                  >
                    <div>
                      {materia.nombreMateria} <small>({materia.clave})</small>
                    </div>
                    <Form.Check
                      type="checkbox"
                      checked={materiasSeleccionadas.includes(
                        materia.idMapaCurricular
                      )}
                      onChange={() =>
                        handleCheckboxChange(materia.idMapaCurricular)
                      }
                    />
                  </label>
                ))}
              </div>
            </>
          )}
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancelar
          </Button>
          <Button
            variant="primary"
            disabled={!idGrupo || materiasSeleccionadas.length === 0}
            onClick={() => setShowConfirmModal(true)}
          >
            Confirmar
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal de Confirmación */}
      <Modal
        show={showConfirmModal}
        onHide={() => setShowConfirmModal(false)}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Confirmar Registro</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>¿Deseas registrar extraordinario en las siguientes materias?</p>
          <ul>
            {materiasGrupo
              .filter((m) => materiasSeleccionadas.includes(m.idMapaCurricular))
              .map((m) => (
                <li key={m.idMapaCurricular}>
                  {m.nombreMateria} ({m.clave})
                </li>
              ))}
          </ul>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setShowConfirmModal(false)}
          >
            Cancelar
          </Button>
          <Button variant="primary" onClick={handleConfirm}>
            Confirmar y Registrar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};