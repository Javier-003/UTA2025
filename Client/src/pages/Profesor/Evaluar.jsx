import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { getKardex } from '../../api/Parametrizacion/kardex.api.js';
import { getEvaluacionTodos, updateEvaluacionFunc } from '../../assets/js/Parametrizacion/evaluacion.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import ListaEvaluacion from "./ListaEvaluacion.jsx";
import ListaAsistencia from './ListaAsistencia.jsx';
import { EvaluacionModales } from './EvaluacionModales.jsx';

function Evaluar() {
    const location = useLocation();
    const navigate = useNavigate();
    const { cargaMateria } = location.state || {};
    const [alumnos, setAlumnos] = useState([]);
    const [evaluaciones, setEvaluaciones] = useState([]);
    const [selectedAlumno, setSelectedAlumno] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [selectedEvaluacion, setSelectedEvaluacion] = useState(null);
    const [calificaciones, setCalificaciones] = useState({});
    const [actualizarEvaluaciones, setActualizarEvaluaciones] = useState(false);
    const [loading, setLoading] = useState(true); // Estado de carga
    const programaAcademico = cargaMateria?.programaAcademico || "No disponible"; // Programa académico por defecto

    useEffect(() => {
        if (cargaMateria) {
            setLoading(true); // Inicia carga
            Promise.all([
                getKardex(cargaMateria.idGrupoMateria).then(data => {
                    const alumnosFiltrados = data.filter(alumno =>
                        alumno.idMapaCurricular === cargaMateria.idMapaCurricular &&
                        alumno.idGrupo === cargaMateria.idGrupo &&
                        alumno.estatus === 'Activo' // Filtrar solo alumnos activos
                    );
                    setAlumnos(alumnosFiltrados);
                }),
                getEvaluacionTodos(cargaMateria.idGrupoMateria).then(data => {
                    const evaluacionesFiltradas = data.filter(evaluacion => 
                        evaluacion.idMapaCurricular === cargaMateria.idMapaCurricular &&
                        evaluacion.materia === cargaMateria.materia
                    );
                    setEvaluaciones(evaluacionesFiltradas);
                    const initialCalificaciones = {};
                    evaluacionesFiltradas.forEach(evaluacion => {
                        if (!initialCalificaciones[evaluacion.idKadex]) {
                            initialCalificaciones[evaluacion.idKadex] = {};
                        }
                        initialCalificaciones[evaluacion.idKadex][evaluacion.idMateriaUnidad] = evaluacion.calificacion || '';
                    });
                    setCalificaciones(initialCalificaciones);
                })
            ]).finally(() => setLoading(false)); // Finaliza carga
        }
    }, [cargaMateria]);

    const handleEditCalificacion = (alumno, evaluacion) => {
        setSelectedAlumno(alumno);
        setSelectedEvaluacion(evaluacion);
        setShowModal(true);
    };

    const handleUpdateCalificacion = (idEvaluacion, idKardex, idMapaCurricular, idMateriaUnidad, calificacion, faltas, nombreUnidad, estatus) => {
        updateEvaluacionFunc(idEvaluacion, idKardex, idMapaCurricular, idMateriaUnidad, calificacion, faltas, nombreUnidad, estatus)
            .then(() => {
                getEvaluacionTodos(cargaMateria.idGrupoMateria).then(data => {
                    const evaluacionesFiltradas = data.filter(evaluacion => 
                        evaluacion.idMapaCurricular === cargaMateria.idMapaCurricular &&
                        evaluacion.materia === cargaMateria.materia
                    );
                    setEvaluaciones(evaluacionesFiltradas);
                    setShowModal(false);
                    setActualizarEvaluaciones((prev) => !prev); // Notificar actualización
                });
            }).catch(error => console.error("❌ Error al actualizar la calificación:", error));
    };

    const handleCalificacionChange = (idKadex, idMateriaUnidad, value) => {
        if (value === "" || (!isNaN(parseFloat(value)) && parseFloat(value) >= 0 && parseFloat(value) <= 10 && /^\d{1,2}(\.\d{1,2})?$/.test(value))) {
            setCalificaciones(prevCalificaciones => ({
                ...prevCalificaciones,
                [idKadex]: {
                    ...prevCalificaciones[idKadex],
                    [idMateriaUnidad]: value
                }
            }));
        }
    };

    const handleSubmitCalificaciones = () => {
        Object.keys(calificaciones).forEach(idKadex => {
            Object.keys(calificaciones[idKadex]).forEach(idMateriaUnidad => {
                const evaluacion = evaluaciones.find(e => e.idKadex === parseInt(idKadex) && e.idMateriaUnidad === parseInt(idMateriaUnidad));
                if (evaluacion) {
                    const calificacion = calificaciones[idKadex][idMateriaUnidad];
                    handleUpdateCalificacion(
                        evaluacion.idEvaluacion,
                        evaluacion.idKadex,
                        evaluacion.idMapaCurricular,
                        evaluacion.idMateriaUnidad,
                        calificacion === '' ? null : calificacion, // Enviar NULL si está vacío
                        evaluacion.faltas,
                        evaluacion.nombreUnidad,
                        evaluacion.estatus
                    );
                }
            });
        });
    };

    const unidades = [...new Set(evaluaciones.map(e => e.idMateriaUnidad))].sort();

    return (
        <div className="container">
            <h2>Evaluar Materia</h2>
            <button className="btn btn-secondary mb-3" onClick={() => navigate('/SubirCalificacion')}>
                Regresar
            </button>
            {cargaMateria && (
                <div className="card shadow mb-3">
                    <div className="card-body">
                        <h5 className="card-title">{cargaMateria.materia}</h5>
                        <p><strong>Grupo:</strong> {cargaMateria.grupo}</p>
                        <p><strong>Profesor:</strong> {cargaMateria.profesor}</p>
                        <p><strong>Periodo:</strong> {cargaMateria.periodo}</p>
                        {/* <p><strong>Programa Académico:</strong> {cargaMateria.programaAcademico}</p> */}
                        <div className="d-flex justify-content-between align-items-center">
                        <button className="btn btn-primary mb-2" onClick={handleSubmitCalificaciones}>Subir Calificaciones</button>
                            <div className="d-flex">
                                <div className="me-2">
                                    <ListaEvaluacion cargaMateria={cargaMateria} programaAcademico={programaAcademico} 
                                        actualizarEvaluaciones={actualizarEvaluaciones} />
                                </div>
                                <ListaAsistencia cargaMateria={cargaMateria} programaAcademico={programaAcademico} />
                                <a href='../../../public/assets/excel/ACTADECALIFICACIONESEXTEMPORANEA.xlsx' 
                                download className="btn btn-danger ms-2">
                                    Acta de Calificaciones Extemporanea
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {loading ? (
                <div className="text-center my-4">
                    <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Cargando datos...</span>
                    </div>
                    <div>Cargando datos...</div>
                </div>
            ) : (
                <div className="table-responsive" style={{ maxHeight: "500px", overflowY: "auto", overflowX: "auto" }}>
                    <table className="table table-bordered table-striped">
                        <thead className="text-center">
                            <tr>
                                <th>N°</th>
                                <th>Matrícula</th>
                                <th>Nombre</th>
                                {unidades.map((unidad, index) => (
                                    <th key={index}>Parcial {index + 1}</th>
                                ))}
                                <th>Faltas</th>
                            </tr>
                        </thead>
                        <tbody>
                            {alumnos.length > 0 ? (
                                // [...alumnos].sort((a, b) => a.matricula.localeCompare(b.matricula)).map((alumno, index) => { // Ordenar por matrícula
                                [...alumnos].sort((a, b) => a.paterno.localeCompare(b.paterno)).map((alumno, index) => { // Ordenar por apellido paterno
                                    const evalAlumno = evaluaciones.filter(e => e.idKadex === alumno.idKardex);
                                    return (
                                        <tr key={index}>
                                            <td>{index + 1}</td>
                                            <td>{alumno.matricula}</td>
                                            <td>{`${alumno.paterno} ${alumno.materno} ${alumno.nombre}`}</td>
                                            {unidades.map((unidad, idx) => {
                                                const evalUnidad = evalAlumno.find(e => e.idMateriaUnidad === unidad);
                                                const calificacion = calificaciones[alumno.idKardex]?.[unidad] || ''; // Mantener vacío si no hay calificación
                                                return (
                                                <td key={idx}>
                                                    <input
                                                        type="number"
                                                        step="0.01"
                                                        className="form-control"
                                                        value={calificacion}
                                                        placeholder="N/A" // Mostrar "N/A" cuando el campo está vacío
                                                        onChange={(e) => handleCalificacionChange(alumno.idKardex, unidad, e.target.value)}
                                                        disabled={evalUnidad?.estatus === 'Cerrado'} // Deshabilitar si el estatus está cerrado
                                                        // disabled={evalUnidad?.estatus === 'Cerrado' || evalUnidad?.calificacion !== null} // Deshabilitar si el estatus está cerrado o ya tiene calificación asignada
                                                    />
                                                </td>
                                                );
                                                })}
                                            <td>
                                                <button 
                                                    className="btn btn-warning"
                                                    onClick={() => handleEditCalificacion(alumno, evalAlumno)}
                                                >
                                                    <FontAwesomeIcon icon={faEdit} />
                                                </button>
                                            </td>
                                        </tr>
                                    );
                                })
                            ) : (
                                <tr>
                                    <td colSpan={3 + unidades.length} className="text-center">No hay alumnos inscritos</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            )}
            {showModal && (
                <EvaluacionModales 
                    showModal={showModal} 
                    setShowModal={setShowModal} 
                    alumno={selectedAlumno} 
                    evaluaciones={selectedEvaluacion}
                    handleUpdateCalificacion={handleUpdateCalificacion}
                />
            )}
        </div>
    );
}

export default Evaluar;
