import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilePen } from '@fortawesome/free-solid-svg-icons';
import { getCargaMaterias } from '../../api/PlanificacionAcademica/cargamaterias.api.js';
import { getPeriodos } from '../../api/PlanificacionAcademica/periodo.api.js';
import { getGrupos } from '../../api/PlanificacionAcademica/grupo.api.js';
import { useNavigate } from 'react-router-dom'; // Importar useNavigate

function SubirCalificacion() {
    const [cargaMateriasList, setCargaMaterias] = useState([]);
    const [periodoList, setPeriodoList] = useState([]);
    const [grupoList, setGrupoList] = useState([]);
    const [idPeriodo, setIdPeriodo] = useState("");
    const [idProfesor, setIdProfesor] = useState("");
    const [searchTerm, setSearchTerm] = useState(""); // Estado para el término de búsqueda
    const navigate = useNavigate(); // Definir useNavigate
    const username = localStorage.getItem("Username");
    const rol = localStorage.getItem("Rol");

    useEffect(() => {
        getCargaMaterias().then(data => setCargaMaterias(data));
        getPeriodos().then(data => setPeriodoList(data));
        getGrupos().then(data => setGrupoList(data));
    }, []);

    // Filtrar profesores por periodo seleccionado (si hay un periodo seleccionado)
    let profesoresFiltrados = cargaMateriasList
        .filter(cargaMateria => !idPeriodo || cargaMateria.periodo === idPeriodo)
        .map(cargaMateria => ({
            idProfesor: cargaMateria.idProfesor,
            nombre: cargaMateria.profesor.split(' ')[0],
            paterno: cargaMateria.profesor.split(' ')[1],
            materno: cargaMateria.profesor.split(' ')[2],
            usuario: cargaMateria.usuario // Asegúrate de que usuario venga en la cargaMateriasList
        }))
        .filter((profesor, index, self) =>
            index === self.findIndex((p) => (
                p.idProfesor === profesor.idProfesor
            ))
        );

    // Si el rol es Profesor, filtrar solo su usuario y seleccionar automáticamente
    if (rol === "Profesor" && username) {
        profesoresFiltrados = profesoresFiltrados.filter(profesor => profesor.usuario === username);
        if (profesoresFiltrados.length > 0 && idProfesor !== String(profesoresFiltrados[0].idProfesor)) {
            setTimeout(() => setIdProfesor(String(profesoresFiltrados[0].idProfesor)), 0);
        }
    }

    // Filtrar cargaMateriasList solo si se selecciona un periodo, un profesor o se realiza una búsqueda
    const filteredData = cargaMateriasList.filter(cargaMateria => 
        (idPeriodo && cargaMateria.periodo === idPeriodo) &&
        ((idProfesor && cargaMateria.idProfesor === parseInt(idProfesor)) ||
        (searchTerm && (cargaMateria.profesor.toLowerCase().includes(searchTerm.toLowerCase()) || 
                        cargaMateria.materia.toLowerCase().includes(searchTerm.toLowerCase()))))
    );

    // Agrupar datos por idGrupoMateria para evitar duplicados
    const groupedData = filteredData.reduce((acc, item) => {
        const existingItem = acc.find(i => i.idGrupoMateria === item.idGrupoMateria);
        if (!existingItem) {
            acc.push(item);
        }
        return acc;
    }, []);

    // Obtener el programa académico a través del grupo
    const getProgramaAcademicoPorGrupo = (idGrupo) => {
        const grupo = grupoList.find(grupo => grupo.idGrupo === idGrupo);
        return grupo ? grupo.programa_academico : "Desconocido";
    };

    // Definir la función handleButtonClick para manejar la navegación
    const handleButtonClick = (cargaMateria) => {
        const programaAcademico = getProgramaAcademicoPorGrupo(cargaMateria.idGrupo);
        console.log("Datos enviados a Evaluar:", { ...cargaMateria, programaAcademico });
        navigate('/Evaluar', { state: { cargaMateria: { ...cargaMateria, programaAcademico } } });
    };
    

    return (
        <div className="container">
            <h2>Carga de Calificaciones</h2>
            <div className="card shadow">
                <div className="card-body">
                    <div className="row">
                        <div className="col-md-4">
                            <h6 className="card-title">Periodo</h6>
                            <select className="form-select" value={idPeriodo} onChange={(e) => {
                                setIdPeriodo(e.target.value);
                                setIdProfesor(""); // Resetear el profesor seleccionado al cambiar el periodo
                                setSearchTerm(""); // Resetear el término de búsqueda al cambiar el periodo
                            }}>
                                <option value="">Selecciona un Periodo</option>
                                {periodoList && periodoList.map((periodo) => (
                                    <option key={periodo.idPeriodo} value={periodo.periodo}>
                                        {periodo.periodo}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="col-md-4">
                            <h6 className="card-title">Profesor</h6>
                            <select className="form-select" value={idProfesor}
                                onChange={(e) => setIdProfesor(e.target.value)}
                                disabled={!idPeriodo || rol === "Profesor"} >
                                <option value="">Selecciona un Profesor</option>
                                {profesoresFiltrados.length > 0 ? (
                                    profesoresFiltrados.map((profesor) => (
                                        <option key={profesor.idProfesor} value={profesor.idProfesor}>
                                            {profesor.nombre} {profesor.paterno} {profesor.materno}
                                        </option>
                                    ))
                                ) : (
                                    <option value="">No hay profesores disponibles</option>
                                )}
                            </select>
                        </div>
                        <div className="col-md-4">
                            <h6 className="card-title">Buscar Materia o Nombre del Profesor</h6>
                            <input 
                                type="text" 
                                className="form-control" 
                                value={searchTerm} 
                                onChange={(e) => setSearchTerm(e.target.value)} 
                                placeholder="Buscar por Materia o por Nombre del Profesor"
                                disabled={!idPeriodo}
                            />
                        </div>
                    </div>
                    <div className="table-responsive mt-3">
                        <table className="table table-bordered">
                            <thead className="text-center">
                                <tr>
                                    <th>Programa Académico</th>
                                    <th>Grupo</th>
                                    <th>Materia</th>
                                    <th>Profesor</th>
                                    <th>Evaluar</th>
                                </tr>
                            </thead>
                            <tbody>
                                {groupedData.length > 0 ? (
                                    groupedData.map((cargaMateria, index) => (
                                        <tr key={index}>
                                            <td>{getProgramaAcademicoPorGrupo(cargaMateria.idGrupo)}</td>
                                            <td>{cargaMateria.grupo}</td>
                                            <td>{cargaMateria.materia}</td>
                                            <td>{cargaMateria.profesor}</td>
                                            <td>
                                                <button className="btn btn-primary" onClick={() => handleButtonClick(cargaMateria)}>
                                                    <FontAwesomeIcon icon={faFilePen} /> {/*Evaluar*/}
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="5" className="text-center">No se encontraron resultados</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SubirCalificacion;