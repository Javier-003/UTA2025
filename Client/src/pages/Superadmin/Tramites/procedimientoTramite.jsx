import '../../../assets/css/App.css'; //Act.
import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { getAlumnoProceso, updateAlumnoProcesoFunc } from '../../../assets/js/Tramites/alumnoproceso.js';
import { AlumnoProcesoModales } from './AlumnoProcesoModales.jsx';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaEdit, FaClipboardList, FaArrowLeft } from 'react-icons/fa';

function ProcedimientoTramite() {
  const [alumnoprocesoList, setAlumnoProceso] = useState([]);
  const [idAlumnoTramite, setIdAlumnoTramite] = useState("");
  const [idTramiteProceso, setIdTramiteProceso] = useState("");
  const [idActividad, setIdActividad] = useState("");
  const [orden, setOrden] = useState("");
  const [estatus, setEstatus] = useState("");
  const [observacion, setObservacion] = useState("");
  
  const [tramite, setTramite] = useState(""); 
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedAlumnoProceso, setSelectedAlumnoProceso] = useState(null);

  const location = useLocation();
  const navigate = useNavigate();
  const params = new URLSearchParams(location.search);
  const idAlumnoTramiteParam = params.get("idAlumnoTramite");

  useEffect(() => {
    getAlumnoProceso(setAlumnoProceso);
  }, []);

  if (!idAlumnoTramiteParam) {
    return <h5 className="text-danger text-center mt-4">⚠ Acceso denegado: Falta seleccionar un trámite.</h5>;
  }

  const filteredData = alumnoprocesoList
    .filter((item) => item.idAlumnoTramite == idAlumnoTramiteParam)
    .sort((a, b) => a.orden - b.orden);

  const handleUpdate = () => {
    updateAlumnoProcesoFunc(
      selectedAlumnoProceso.idAlumnoProceso,
      idAlumnoTramite, idTramiteProceso, idActividad, orden, estatus, observacion,
      setShowEditModal, () => getAlumnoProceso(setAlumnoProceso)
    );
  };

  return (
    <div className="container mt-4">
      {/* Encabezado */}
      <div className="text-center py-3 mb-4 text-white rounded shadow" style={{ background: 'linear-gradient(90deg, #007bff, #6610f2)' }}>
        <h3 className="fw-bold">Proceso de {filteredData[0]?.tramite}</h3>
      </div>

      {/* Botón de regresar */}
      <button className="btn btn-outline-dark mb-3" onClick={() => navigate(-1)}>
        <FaArrowLeft /> Regresar
      </button>

      {/* Tarjeta con información del alumno */}
      <div className="card border-0 shadow-sm p-4 mb-4 bg-white rounded">
        <h5 className="text-primary fw-bold">{filteredData[0]?.tramite || "Trámite Desconocido"}</h5>
        <p className="card-text"><strong>👤 Alumno:</strong> {filteredData[0]?.NombreAlumno}</p>
        <p className="card-text"><strong>🎓 Matrícula:</strong> {filteredData[0]?.matricula}</p>
        <p className="card-text"><strong>🏫 Programa Académico:</strong> {filteredData[0]?.programa}</p>
      </div>

      {/* Lista de actividades en forma de tarjetas */}
      <div className="row">
        {filteredData.length > 0 ? (
          filteredData.map((alumnoproceso) => (
            <div key={alumnoproceso.idAlumnoProceso} className="col-md-6">
              <div className="card border-0 shadow-sm mb-4 bg-light">
                <div className="card-body">
                  <h5 className="card-title text-primary">
                    <FaClipboardList className="me-2" /> {alumnoproceso.NombreActividad}
                  </h5>
                  <p className="mb-1"><strong>Orden:</strong> {alumnoproceso.orden}</p>
                  <p className="mb-1"><strong>Trámite:</strong> {alumnoproceso.tramite}</p>
                  <p className="mb-1"><strong>Observación:</strong> {alumnoproceso.observacion || "Ninguna"}</p>
                  <p className="mb-1">
                    <strong>Estatus:</strong>
                    <span className={`badge ${alumnoproceso.estatus === "Concluido" ? "bg-success" : "bg-warning text-dark"} ms-2`}>
                      {alumnoproceso.estatus}
                    </span>
                  </p>
                  <div className="mt-3">
                    <button className="btn btn-sm btn-outline-primary me-2" onClick={() => {
                      setIdAlumnoTramite(alumnoproceso.idAlumnoTramite);
                      setIdTramiteProceso(alumnoproceso.idTramiteProceso);
                      setIdActividad(alumnoproceso.idActividad);
                      setOrden(alumnoproceso.orden);
                      setEstatus(alumnoproceso.estatus);
                      setObservacion(alumnoproceso.observacion);
                      setTramite(alumnoproceso.tramite);
                      setShowEditModal(true);
                      setSelectedAlumnoProceso(alumnoproceso);
                    }}>
                      <FaEdit /> Editar
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-muted text-center">No hay actividades registradas.</p>
        )}
      </div>

      {/* Modales */}
      <AlumnoProcesoModales
        idAlumnoTramite={idAlumnoTramite} setIdAlumnoTramite={setIdAlumnoTramite}
        idTramiteProceso={idTramiteProceso} setIdTramiteProceso={setIdTramiteProceso}
        idActividad={idActividad} setIdActividad={setIdActividad}
        orden={orden} setOrden={setOrden}
        estatus={estatus} setEstatus={setEstatus}
        observacion={observacion} setObservacion={setObservacion}
        showModal={showModal} setShowModal={setShowModal}
        showEditModal={showEditModal} setShowEditModal={setShowEditModal}
        handleUpdate={handleUpdate}
        setSelectedAlumnoProceso={setSelectedAlumnoProceso}
      />
    </div>
  );
}

export default ProcedimientoTramite;
