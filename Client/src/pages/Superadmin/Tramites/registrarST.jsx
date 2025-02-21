import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { getAlumnopatodos } from '../../../assets/js/Parametrizacion/alumnopa.js';
import { getPeriodo } from '../../../assets/js/PlanificacionAcademica/periodo.js';
import { getTramites } from '../../../api/Parametrizacion/tramite.api.js';
import { useNavigate } from 'react-router-dom';
import { getAlumnoTramite, addAlumnoTramite } from '../../../assets/js/Tramites/seguimientoTramite.js';

function NuevoTramite() {
  const [alumnoProgramaList, setAlumnoProgramaList] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [selectedAlumno, setSelectedAlumno] = useState(null);
  const [periodoList, setPeriodoList] = useState([]);
  const [tramiteList, setTramiteList] = useState([]);
  const [idPeriodo, setIdPeriodo] = useState("");
  const [idTramite, setIdTramite] = useState("");
  const [fecha, setFecha] = useState(new Date().toISOString().split('T')[0]);
  const [estatus, setEstatus] = useState("En proceso");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    getAlumnopatodos(setAlumnoProgramaList);
    getPeriodo(setPeriodoList);
    getTramites(setTramiteList);
  }, []);

  useEffect(() => {
    getTramites().then((data) => {
      console.log("Trámites obtenidos:", data); // Verifica si los trámites se están obteniendo correctamente
      setTramiteList(data); // Luego actualiza el estado
    }).catch((error) => console.error("Error al obtener los trámites:", error));
  }, []);

  const filteredData = alumnoProgramaList.filter(item =>
    item.nombre.toLowerCase().includes(searchText.toLowerCase())
  );

  const handleSelectAlumno = (alumno) => {
    setSelectedAlumno(alumno);
  };

  const validateFields = () => {
    let errors = {};
    if (!selectedAlumno) errors.selectedAlumno = "Selecciona un alumno";
    if (!idPeriodo) errors.idPeriodo = "Selecciona un periodo";
    if (!idTramite) errors.idTramite = "Selecciona un trámite";
    if (!fecha) errors.fecha = "Selecciona una fecha";

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!validateFields()) return;

    addAlumnoTramite(idTramite, selectedAlumno?.idAlumnoPA, idPeriodo, fecha, estatus, () => getAlumnoTramite(() => {}))
      .then(() => navigate('/SeguimientoTramite'))
      .catch(error => console.error('Error al registrar el trámite:', error));
  };

  return (
    <div className="container mt-4">
      <h4 className="text-center text-primary mb-4">Nuevo Trámite</h4>
      
      <div className="d-flex justify-content-start mb-3">
        <button className="btn btn-outline-primary" onClick={() => navigate(-1)}>
          <i className="bi bi-arrow-left-circle me-2"></i> Regresar
        </button>
      </div>

      <div className="row">
        {/* Sección de búsqueda y tabla de alumnos */}
        <div className="col-md-6">
          <div className="card shadow p-3">
            <h5 className="text-secondary">👨‍🎓 Seleccionar Alumno</h5>
            <input 
              type="text"  
              className="form-control mb-3"  
              value={searchText} 
              onChange={(e) => setSearchText(e.target.value)}  
              placeholder="🔍 Buscar por nombre..." 
            />
            <div className="table-responsive" style={{ maxHeight: "500px", overflowY: "auto" }}>
              <table className="table table-striped table-hover">
                <thead className="table-dark text-center">
                  <tr>
                    <th>Matrícula</th>
                    <th>Nombre</th>
                    <th>Programa</th>
                    <th>Periodo</th>
                    <th>Estatus</th>
                  </tr>
                </thead>
                <tbody className="text-center">
                  {filteredData.length > 0 ? (
                    filteredData.map((alumno) => (
                      <tr key={alumno.idAlumnoPA} onClick={() => handleSelectAlumno(alumno)} style={{ cursor: "pointer" }}>
                        <td>{alumno.matricula}</td>
                        <td>{alumno.nombre}</td>
                        <td>{alumno.programa || "N/A"}</td>
                        <td>{alumno.periodo}</td>
                        <td>{alumno.estatus}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" className="text-center text-danger">No se encontraron registros</td>
                    </tr>
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
                <label className="form-label fw-bold">Matrícula:</label>
                <input type="text" className="form-control" value={selectedAlumno?.matricula || ""} readOnly />
              </div>
              {errors.selectedAlumno && <div className="text-danger">{errors.selectedAlumno}</div>}

              <div className="mb-3">
                <label className="form-label fw-bold">Nombre:</label>
                <input type="text" className="form-control" value={selectedAlumno?.nombre || ""} readOnly />
              </div>

              <div className="mb-3">
                <label className="form-label fw-bold">Programa:</label>
                <input type="text" className="form-control" value={selectedAlumno?.programa || ""} readOnly />
              </div>

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
                <input type="date" className="form-control" value={fecha} onChange={(event) => setFecha(event.target.value)}   readOnly/>
              </div>
              {errors.fecha && <div className="text-danger">{errors.fecha}</div>}
              

              <button type="submit" className="btn btn-primary w-100">Registrar Trámite</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NuevoTramite;
