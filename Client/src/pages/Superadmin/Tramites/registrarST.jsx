import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { getAlumnopatodos } from '../../../assets/js/Parametrizacion/alumnopa.js';
import { getPeriodo } from '../../../assets/js/PlanificacionAcademica/periodo.js';
import { getTramites } from '../../../api/Parametrizacion/tramite.api.js';
import { getPersonas } from '../../../api/Nucleo/persona.api.js';
import { useNavigate } from 'react-router-dom';
import { getAlumnoTramite, addAlumnoTramite } from '../../../assets/js/Tramites/seguimientoTramite.js';
import { getPersona, addPersona } from '../../../assets/js/Nucleo/persona.js';
import { PersonaModales } from '../../Superadmin/Nucleo/PersonaModales.jsx';

function NuevoTramite() {
  const [personaList, setPersonaList] = useState([]);
  const [alumnoProgramaList, setAlumnoProgramaList] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [selectedAlumno, setSelectedAlumno] = useState(null);
  const [periodoList, setPeriodoList] = useState([]);
  const [tramiteList, setTramiteList] = useState([]);
  const [idAlumnoPA, setIdAlumnoPA] = useState("");
  const [idPeriodo, setIdPeriodo] = useState("");
  const [idTramite, setIdTramite] = useState("");
  const [fecha, setFecha] = useState(new Date().toISOString().split('T')[0]);
  const [estatus, setEstatus] = useState("En proceso");
  const [errors, setErrors] = useState({});
  const [selectedEstatus, setSelectedEstatus] = useState("Activo");
  const [showModal, setShowModal] = useState(false);
  const [nombre, setnombre] = useState("");
  const [paterno, setpaterno] = useState("");
  const [materno, setmaterno] = useState("");
  const [nacimiento, setnacimiento] = useState("");
  const [curp, setcurp] = useState("");
  const [genero, setgenero] = useState("");
  const [direccion, setdireccion] = useState("");
  const [telefono, settelefono] = useState("");
  const [view, setView] = useState("persona"); // Estado para alternar entre "alumno" y "persona"
  const [idPersona, setIdPersona] = useState(""); // Nuevo estado para idPersona

  const navigate = useNavigate();

  useEffect(() => {
    getAlumnopatodos(setAlumnoProgramaList);
    getPersonas(setPersonaList);
    getPeriodo(setPeriodoList);
    getTramites(setTramiteList);
  }, []);

  useEffect(() => {
    getPersonas().then((data) => {
      console.log("personas obtenidas:", data);
      setPersonaList(data);
    }).catch((error) => console.error("Error al obtener las personas:", error));
  }, []);

  useEffect(() => {
    getTramites().then((data) => {
      console.log("Trámites obtenidos:", data);
      setTramiteList(data);
    }).catch((error) => console.error("Error al obtener los trámites:", error));
  }, []);

  const filteredAlumnoData = alumnoProgramaList.filter(item =>
    `${item.nombre} ${item.paterno} ${item.materno} ${item.matricula}`.toLowerCase().includes(searchText.toLowerCase()) &&
    (selectedEstatus === "" || item.estatus === selectedEstatus)
  );

  const filteredPersonaData = personaList.filter(item =>
    `${item.nombre} ${item.paterno} ${item.materno}`.toLowerCase().includes(searchText.toLowerCase())
  );

  const handleSelectAlumno = (alumno) => {
    setSelectedAlumno(alumno);
    if (view === "alumno") {
      // Si es un alumno de "Alumno Programa", asignamos idAlumno a idPersona
      setIdPersona(alumno.idAlumno);
      setIdAlumnoPA(alumno.idAlumnoPA); // También asignamos idAlumnoPA si es necesario
    } else {
      // Si es una persona, asignamos idPersona directamente
      setIdPersona(alumno.idPersona);
    }
  };

  const validateFields = () => {
    let errors = {};
    if (!selectedAlumno) errors.selectedAlumno = "Selecciona un alumno/persona";
    if (!idPeriodo) errors.idPeriodo = "Selecciona un periodo";
    if (!idTramite) errors.idTramite = "Selecciona un trámite";
    if (!fecha) errors.fecha = "Selecciona una fecha";

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!validateFields()) return;

    addAlumnoTramite(idTramite, idPersona, idAlumnoPA, idPeriodo, fecha, estatus, () => getPersonas(() => {}))
      .then(() => navigate('/SeguimientoTramite'))
      .catch(error => console.error('Error al registrar el trámite:', error));
  };

  const handleAdd = () => {
    addPersona(nombre, paterno, materno, nacimiento, curp, genero, direccion, telefono, setShowModal, () => {
      getPersona(setPersonaList);
    });
  };

  return (
    <div className="container mt-4">
      <h4 className="text-center text-primary mb-4">Nuevo Trámite</h4>
      
      <div className="d-flex justify-content-start mb-3">
        <button className="btn btn-outline-primary" onClick={() => navigate(-1)}>
          <i className="bi bi-arrow-left-circle me-2"></i> Regresar
        </button>
      </div>

      <div className="d-flex justify-content-start mb-3">
      <button className={`btn ${view === "persona" ? "btn-primary" : "btn-outline-primary"} me-2`} onClick={() => setView("persona")}>
        Trámite de inscripción
      </button>
      <button className={`btn ${view === "alumno" ? "btn-primary" : "btn-outline-primary"}`} onClick={() => setView("alumno")}>
        Trámites de alumnos
      </button>
    </div>

      <div className="row">
        {/* Sección de búsqueda y tabla de alumnos/personas */}
        <div className="col-md-6">
          <div className="card shadow p-3">
            <h5 className="text-secondary">{view === "alumno" ? "👨‍🎓 Seleccionar Alumno" : "👤 Seleccionar Persona"}</h5>
            
            {view === "persona" && (
              <div className="d-flex justify-content-start mb-3">
                <button type="button" className="btn btn-outline-primary" onClick={() => setShowModal(true)}>
                  <i className="bi bi-plus-lg me-2"></i>Agregar Nueva Persona
                </button>
              </div>
            )}

            <input 
              type="text"  
              className="form-control mb-3"  
              value={searchText} 
              onChange={(e) => setSearchText(e.target.value)}  
              placeholder="🔍 Buscar..." 
            />

            {view === "alumno" && (
              <div className="mt-4">
                <div className="d-flex mb-3">
                  <select className="form-select" value={selectedEstatus} onChange={(e) => setSelectedEstatus(e.target.value)}>
                    <option value="">Todos los Estatus</option>
                    {Array.from(new Set(alumnoProgramaList.map(item => item.estatus))).map(estatus => (
                      <option key={estatus} value={estatus}>{estatus}</option>
                    ))}
                  </select>
                </div>
              </div>
            )}

            <div className="table-responsive" style={{ maxHeight: "450px", overflowY: "auto" }}>
              <table className="table table-striped table-hover">
                <thead className="table-dark text-center">
                  <tr>
                    {view === "alumno" ? (
                      <>
                        <th>Matrícula</th>
                        <th>Nombre</th>
                        <th>Programa</th>
                        <th>Periodo</th>
                        <th>Estatus</th>
                      </>
                    ) : (
                      <>
                        <th>Nombre</th>
                        <th>Fecha de Nacimiento</th>
                        <th>CURP</th>
                        <th>Genero</th>
                      </>
                    )}
                  </tr>
                </thead>
                <tbody className="text-center">
                  {view === "alumno" ? (
                    filteredAlumnoData.length > 0 ? (
                      filteredAlumnoData.map((alumno) => (
                        <tr key={alumno.idAlumnoPA} onClick={() => handleSelectAlumno(alumno)} style={{ cursor: "pointer" }}>
                          <td>{alumno.matricula}</td>
                          <td>{alumno.nombre} {alumno.paterno} {alumno.materno}</td>
                          <td>{alumno.carrera || "N/A"}</td>
                          <td>{alumno.periodo}</td>
                          <td>{alumno.estatus}</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="5" className="text-center text-danger">No se encontraron registros</td>
                      </tr>
                    )
                  ) : (
                    filteredPersonaData.length > 0 ? (
                      filteredPersonaData.map((persona) => (
                        <tr key={persona.idPersona} onClick={() => handleSelectAlumno(persona)} style={{ cursor: "pointer" }}>
                          <td>{persona.nombre} {persona.paterno} {persona.materno}</td>
                          <td>{new Date(persona.nacimiento).toLocaleDateString()}</td>
                          <td>{persona.curp}</td>
                          <td>{persona.genero}</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="4" className="text-center text-danger">No se encontraron registros</td>
                      </tr>
                    )
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Formulario de Trámite */}
        <div className="col-md-6">
          <div className="card shadow p-3">
            <h5 className="text-secondary">✍️ Registro de Trámite</h5>
            <form onSubmit={handleSubmit}>
              
              <div className="mb-3">
                <label className="form-label fw-bold">{view === "alumno" ? "Matrícula:" : "Nombre:"}</label>
                <input type="text" className="form-control" value={selectedAlumno?.matricula || selectedAlumno?.nombre || ""} readOnly />
              </div>
              {errors.selectedAlumno && <div className="text-danger">{errors.selectedAlumno}</div>}

              {view === "alumno" && (
                <>
                  <div className="mb-3">
                    <label className="form-label fw-bold">Nombre:</label>
                    <input type="text" className="form-control" value={`${selectedAlumno?.nombre || ""} ${selectedAlumno?.paterno || ""} ${selectedAlumno?.materno || ""}`} readOnly />
                  </div>

                  <div className="mb-3">
                    <label className="form-label fw-bold">Programa:</label>
                    <input type="text" className="form-control" value={selectedAlumno?.carrera || ""} readOnly />
                  </div>
                </>
              )}

              {view === "persona" && (
                <>
                  <div className="mb-3">
                    <label className="form-label fw-bold">Apellido Paterno:</label>
                    <input type="text" className="form-control" value={selectedAlumno?.paterno || ""} readOnly />
                  </div>

                  <div className="mb-3">
                    <label className="form-label fw-bold">Apellido Materno:</label>
                    <input type="text" className="form-control" value={selectedAlumno?.materno || ""} readOnly />
                  </div>
                </>
              )}

              <div className="mb-3">
                <label className="form-label fw-bold">Periodo:</label>
                <select className="form-select" value={idPeriodo} onChange={(event) => setIdPeriodo(event.target.value)}>
                  <option value="">Selecciona un periodo</option>
                  {periodoList.map((periodo) => (
                    <option key={periodo.idPeriodo} value={periodo.idPeriodo}>{periodo.periodo}</option>
                  ))}
                </select>
              </div>
              {errors.idPeriodo && <div className="text-danger">{errors.idPeriodo}</div>}

              <div className="mb-3">
                <label className="form-label fw-bold">Trámite:</label>
                <select className="form-select" value={idTramite} onChange={(event) => setIdTramite(event.target.value)}>
                  <option value="">Selecciona un Trámite</option>
                  {tramiteList.map((tramite) => (
                    <option key={tramite.idTramite} value={tramite.idTramite}>{tramite.nombre}</option>
                  ))}
                </select>
              </div>
              {errors.idTramite && <div className="text-danger">{errors.idTramite}</div>}

              <div className="mb-3">
                <label className="form-label fw-bold">Fecha:</label>
                <input type="date" className="form-control" value={fecha} onChange={(event) => setFecha(event.target.value)} readOnly />
              </div>
              {errors.fecha && <div className="text-danger">{errors.fecha}</div>}
              

              <button type="submit" className="btn btn-primary w-100">Registrar Trámite</button>
            </form>
          </div>
        </div>
      </div>

      <PersonaModales
        nombre={nombre} setnombre={setnombre}
        paterno={paterno} setpaterno={setpaterno}
        materno={materno} setmaterno={setmaterno}
        nacimiento={nacimiento} setnacimiento={setnacimiento}
        curp={curp} setcurp={setcurp}
        genero={genero} setgenero={setgenero}
        direccion={direccion} setdireccion={setdireccion}
        telefono={telefono} settelefono={settelefono}
        showModal={showModal} setShowModal={setShowModal}
        handleAdd={handleAdd} 
      />
    </div>
  );
}

export default NuevoTramite;