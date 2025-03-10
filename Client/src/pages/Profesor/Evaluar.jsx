import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { getKardex } from '../../api/Parametrizacion/kardex.api.js';
import { getEvaluacionTodos, updateEvaluacionFunc } from '../../assets/js/Parametrizacion/evaluacion.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import ListaEvaluacion from "./ListaEvaluacion.jsx";
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
    const programaAcademico = cargaMateria?.programaAcademico || "No disponible"; // Programa académico por defecto

    useEffect(() => {
        if (cargaMateria) {
            getKardex(cargaMateria.idGrupoMateria).then(data => {
                const alumnosFiltrados = data.filter(alumno =>
                    alumno.idMapaCurricular === cargaMateria.idMapaCurricular &&
                    alumno.idGrupo === cargaMateria.idGrupo &&
                    alumno.estatus === 'Activo' // Filtrar solo alumnos activos
                );
                setAlumnos(alumnosFiltrados);
            }).catch(error => console.error("❌ Error al obtener alumnos:", error));
            
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
            }).catch(error => console.error("❌ Error al obtener evaluaciones:", error));
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
                });
            }).catch(error => console.error("❌ Error al actualizar la calificación:", error));
    };

    const handleCalificacionChange = (idKadex, idMateriaUnidad, value) => {
        setCalificaciones(prevCalificaciones => ({
            ...prevCalificaciones,
            [idKadex]: {
                ...prevCalificaciones[idKadex],
                [idMateriaUnidad]: value
            }
        }));
    };

    const handleSubmitCalificaciones = () => {
        Object.keys(calificaciones).forEach(idKadex => {
            Object.keys(calificaciones[idKadex]).forEach(idMateriaUnidad => {
                const evaluacion = evaluaciones.find(e => e.idKadex === parseInt(idKadex) && e.idMateriaUnidad === parseInt(idMateriaUnidad));
                if (evaluacion) {
                    handleUpdateCalificacion(
                        evaluacion.idEvaluacion,
                        evaluacion.idKadex,
                        evaluacion.idMapaCurricular,
                        evaluacion.idMateriaUnidad,
                        calificaciones[idKadex][idMateriaUnidad],
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
                        <div className="d-flex justify-content-between">
                            <button className="btn btn-primary mb-2" onClick={handleSubmitCalificaciones}>Subir Calificaciones</button>
                            <ListaEvaluacion cargaMateria={cargaMateria} programaAcademico={programaAcademico} />
                        </div>
                    </div>
                </div>
            )}
            <div className="table-responsive">
                <table className="table table-bordered">
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
                            alumnos.map((alumno, index) => {
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
                                                    type="text"
                                                    className="form-control"
                                                    value={calificacion}
                                                    placeholder="N/A" // Mostrar "N/A" cuando el campo está vacío
                                                    onChange={(e) => handleCalificacionChange(alumno.idKardex, unidad, e.target.value)}
                                                    disabled={evalUnidad?.estatus === 'Cerrado'}
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
