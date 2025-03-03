import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { getKardex } from '../../api/Parametrizacion/kardex.api.js';
import { getEvaluacionTodos, addEvaluacion } from '../../assets/js/Parametrizacion/evaluacion.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import { EvaluacionModales } from './EvaluacionModales.jsx';

function Evaluar() {
    const location = useLocation();
    const { cargaMateria } = location.state || {};
    const [alumnos, setAlumnos] = useState([]);
    const [evaluaciones, setEvaluaciones] = useState([]);
    const [selectedAlumno, setSelectedAlumno] = useState(null);
    const [showModal, setShowModal] = useState(false);

    const [idKardex, setIdKardex] = useState("");
    const [idMapaCurricular, setIdMapaCurricular] = useState("");
    const [idMateriaUnidad, setIdMateriaUnidad] = useState("");
    const [calificacion, setCalificacion] = useState("");
    const [estatus, setEstatus] = useState("");
    const [mapa, setMapa] = useState("");
    const [faltas, setFaltas] = useState("");
    const [nombreUnidad, setNombreUnidad] = useState("");
    const [selectedEvaluacion, setselectedEvaluacion] = useState(null);

    useEffect(() => {
        if (cargaMateria) {
            getKardex(cargaMateria.idGrupoMateria).then(data => {
                const alumnosFiltrados = data.filter(alumno =>
                    alumno.idMateria === cargaMateria.idMateria &&
                    alumno.idGrupo === cargaMateria.idGrupo
                );
                // Eliminar duplicados
                const alumnosUnicos = alumnosFiltrados.filter((alumno, index, self) =>
                    index === self.findIndex((a) => (
                        a.idAlumnoPA === alumno.idAlumnoPA
                    ))
                );
                setAlumnos(alumnosUnicos);
            }).catch(error => console.error("Error al obtener alumnos:", error));

            getEvaluacionTodos(cargaMateria.idGrupoMateria).then(data => {
                if (Array.isArray(data)) {
                    setEvaluaciones(data);
                } else {
                    console.error("Los datos de evaluación no son válidos:", data);
                    setEvaluaciones([]); // Evitar que sea undefined
                }
            }).catch(error => console.error("Error al obtener evaluaciones:", error));
        }
    }, [cargaMateria]);

    const handleAsignarCalificacion = (alumno) => {
        setSelectedAlumno(alumno);
        setIdKardex(alumno.idKardex || "");
        setIdMapaCurricular(alumno.idMapaCurricular || "");
        setIdMateriaUnidad(alumno.idMateriaUnidad || "");
        setCalificacion("");
        setEstatus("");
        setMapa(alumno.mapa || "");
        setFaltas("");
        setNombreUnidad(alumno.nombreUnidad || "");
        setselectedEvaluacion(null);
        setShowModal(true);
    };

    const handleAddCalificacion = () => {
        if (selectedAlumno) {
            console.log("Alumno seleccionado:", selectedAlumno);
            addEvaluacion(
                idKardex,
                idMapaCurricular,
                idMateriaUnidad,
                calificacion,
                faltas,
                nombreUnidad,
                estatus
            ).then(() => {
                getEvaluacionTodos(cargaMateria.idGrupoMateria).then(data => {
                    setEvaluaciones(data);
                    setShowModal(false);
                });
            }).catch(error => console.error("Error al agregar la calificación:", error));
        }
    };

    const getCalificacion = (idAlumno) => {
        const evaluacion = evaluaciones.find(e => e.idAlumnoPA === idAlumno);
        return evaluacion ? evaluacion.calificacion : 'N/A';
    };

    return (
        <div className="container">
            <h2>Evaluar Materia</h2>
            {cargaMateria && (
                <div className="card shadow mb-3">
                    <div className="card-body">
                        <h5 className="card-title">{cargaMateria.materia}</h5>
                        <p><strong>Grupo:</strong> {cargaMateria.grupo}</p>
                        <p><strong>Profesor:</strong> {cargaMateria.profesor}</p>
                    </div>
                </div>
            )}
            <div className="table-responsive">
                <table className="table table-bordered">
                    <thead className="text-center">
                        <tr>
                            <th>Matrícula</th>
                            <th>Nombre</th>
                            <th>Calificación</th>
                            <th>Acción</th>
                        </tr>
                    </thead>
                    <tbody>
                        {alumnos.length > 0 ? (
                            alumnos.map((alumno, index) => (
                                <tr key={index}>
                                    <td>{alumno.matricula}</td>
                                    <td>{alumno.paterno} {alumno.materno} {alumno.nombre}</td>
                                    <td>{getCalificacion(alumno.idAlumnoPA)}</td>
                                    <td>
                                        <button 
                                            className="btn btn-primary"
                                            onClick={() => handleAsignarCalificacion(alumno)}
                                        >
                                            Registrar calificación
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="4" className="text-center">No hay alumnos inscritos</td>
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
                    materia={cargaMateria.materia}
                    handleAddCalificacion={handleAddCalificacion}
                    idKardex={idKardex} setIdKardex={setIdKardex}
                    idMapaCurricular={idMapaCurricular} setIdMapaCurricular={setIdMapaCurricular}
                    idMateriaUnidad={idMateriaUnidad} setIdMateriaUnidad={setIdMateriaUnidad}
                    calificacion={calificacion} setCalificacion={setCalificacion}
                    estatus={estatus} setEstatus={setEstatus}
                    mapa={mapa} setMapa={setMapa}
                    faltas={faltas} setFaltas={setFaltas}
                    nombreUnidad={nombreUnidad} setNombreUnidad={setNombreUnidad}
                    selectedEvaluacion={selectedEvaluacion} setselectedEvaluacion={setselectedEvaluacion}
                />
            )}
        </div>
    );
}

export default Evaluar;
