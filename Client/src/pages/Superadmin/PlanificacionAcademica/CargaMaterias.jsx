import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { getAllCargaMaterias, createCargaMateriasForm, updateCargaMateriasForm, deleteCargaMateriasForm } from '../../../assets/js/PlanificacionAcademica/cargamaterias.js';
import { getOfertaAcademica } from '../../../api/PlanificacionAcademica/ofertaacademica.api.js';
import { getProgramaacademicos } from '../../../api/PlanificacionAcademica/programa_academico.api.js';
import { getPeriodos } from '../../../api/PlanificacionAcademica/periodo.api.js';
import { getGrupos } from '../../../api/PlanificacionAcademica/grupo.api.js';
import CargaMateriaModales from './CargaMateriasModales.jsx';

function CargaMaterias() {
    const [cargaMateriasList, setCargaMaterias] = useState([]);
    const [ofertaAcademicaList, setOfertaAcademica] = useState([]);
    const [programaAcademicoList, setProgramaAcademico] = useState([]);
    const [periodoList, setPeriodo] = useState([]);
    const [grupoList, setGrupo] = useState([]);
    const [idGrupoMateria, setIdGrupoMateria] = useState("");
    const [idGrupo, setIdGrupo] = useState("");
    const [idProfesor, setIdProfesor] = useState("");
    const [idMapaCurricular, setIdMapaCurricular] = useState("");
    const [idAula, setIdAula] = useState("");
    const [idOfertaAcademica, setIdOfertaAcademica] = useState("");
    const [idProgramaAcademico, setIdProgramaAcademico] = useState("");
    const [idPeriodo, setIdPeriodo] = useState("");
    const [tipo, setTipo] = useState("");
    const [fecha, setFecha] = useState("");
    const [horarios, setHorarios] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedCargaMaterias, setSelectedCargaMaterias] = useState(null);
    const [searchText, setSearchText] = useState("");

    useEffect(() => {
        getAllCargaMaterias().then(data => setCargaMaterias(data));
        getOfertaAcademica().then(data => setOfertaAcademica(data));
        getProgramaacademicos().then(response => setProgramaAcademico(response.data));
        getPeriodos().then(data => setPeriodo(data));
        getGrupos().then(data => setGrupo(data));
    }, []);

    const handleAdd = () => {
        createCargaMateriasForm(idGrupo, idProfesor, idMapaCurricular, idAula, tipo, fecha, horarios, () => {
            getAllCargaMaterias().then(data => {
                setCargaMaterias(data);
                setShowModal(false); // Cerrar el modal después de agregar
            });
        });
    };

    const handleUpdate = () => {
        updateCargaMateriasForm(selectedCargaMaterias.idGrupoMateria, idGrupo, idProfesor, idMapaCurricular, idAula, tipo, fecha, horarios, () => {
            getAllCargaMaterias().then(data => {
                setCargaMaterias(data);
                setShowEditModal(false); // Cerrar el modal después de actualizar
            });
        });
    };

    const handleDelete = () => {
        deleteCargaMateriasForm(selectedCargaMaterias.idGrupoMateria, () => {
            getAllCargaMaterias().then(data => {
                setCargaMaterias(data);
                setShowDeleteModal(false); // Cerrar el modal después de eliminar
            });
        });
    };

    const filteredData = cargaMateriasList.filter(
        (item) =>
            (!idPeriodo || item.idPeriodo === idPeriodo) &&
            (!idProgramaAcademico || item.idProgramaAcademico === idProgramaAcademico) &&
            (item.materia.toLowerCase().includes(searchText.toLowerCase()) ||
            item.profesor.toLowerCase().includes(searchText.toLowerCase()))
    );

    const formatDateString = (dateString) => dateString ? dateString.split("T")[0] : "";

    return (
        <div className="container">
            <h2>Carga de Materias</h2>
            <div className="card shadow">
                <div className="card-body">
                    <div className="row mb-3">
                        <div className="col-md-3">
                            <select className="form-select" value={idProgramaAcademico} onChange={(e) => setIdProgramaAcademico(e.target.value)}>
                                <option value="">Todos los Programas Académicos</option>
                                    {Array.isArray(programaAcademicoList) && programaAcademicoList.map((programa) => (
                                        <option key={programa.idProgramaAcademico} value={programa.idProgramaAcademico}>
                                            {programa.nombre}
                                        </option>
                                ))}
                            </select>
                        </div>
                        <div className="col-md-3">
                            <select className="form-select" value={idPeriodo} onChange={(e) => setIdPeriodo(e.target.value)}>
                                <option value="">Todos los Periodos</option>
                                {periodoList.map((periodo) => (
                                    <option key={periodo.idPeriodo} value={periodo.idPeriodo}>
                                        {periodo.periodo}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="col-md-4">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Buscar por Materia o Profesor"
                                value={searchText}
                                onChange={(e) => setSearchText(e.target.value)}
                            />
                        </div>
                        <div className="col-md-2">
                            <button className="btn btn-success w-100" onClick={() => {
                                setIdGrupoMateria(""); setIdGrupo(""); setIdProfesor("");
                                setIdMapaCurricular(""); setIdAula(""); setTipo("");
                                setFecha(""); setHorarios([]); setShowModal(true);
                            }}>Agregar Materia</button>
                        </div>
                    </div>
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th>Grupo</th>
                                <th>Materia</th>
                                <th>Profesor</th>
                                <th>Horario</th>
                                <th>Editar</th>
                                <th>Eliminar</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredData.length > 0 ? (
                                filteredData.map((cargaMateria, index) => (
                                    <tr key={index}>
                                        <td>{cargaMateria.grupo}</td>
                                        <td>{cargaMateria.materia}</td>
                                        <td>{cargaMateria.profesor}</td>
                                        <td>
                                            {cargaMateria.dia && cargaMateria.horaInicio && cargaMateria.horaFin ? (
                                                <div>{cargaMateria.dia} de {cargaMateria.horaInicio} a {cargaMateria.horaFin}</div>
                                            ) : (
                                                <div>No hay horarios asignados</div>
                                            )}
                                        </td>
                                        <td>
                                            <button className='btn btn-warning' onClick={() => {
                                                console.log("Editar:", cargaMateria);
                                                setIdGrupoMateria(cargaMateria.idGrupoMateria);
                                                setIdGrupo(cargaMateria.idGrupo);
                                                setIdProfesor(cargaMateria.idProfesor);
                                                setIdMapaCurricular(cargaMateria.idMapaCurricular);
                                                setIdAula(cargaMateria.idAula);
                                                setTipo(cargaMateria.tipo);
                                                setFecha(formatDateString(cargaMateria.fecha));
                                                // Asegurar que 'horarios' sea un array válido
                                                setHorarios(cargaMateria.horarios && Array.isArray(cargaMateria.horarios) ? cargaMateria.horarios : []);
                                                setSelectedCargaMaterias(cargaMateria);
                                                setShowEditModal(true);
                                            }}>
                                                Editar
                                            </button>
                                        </td>
                                        <td>
                                            <button className='btn btn-danger' onClick={() => {
                                                setSelectedCargaMaterias(cargaMateria);
                                                setShowDeleteModal(true);
                                            }}>Eliminar</button>
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
            <CargaMateriaModales
                idGrupoMateria={idGrupoMateria} setIdGrupoMateria={setIdGrupoMateria}
                idGrupo={idGrupo} setIdGrupo={setIdGrupo}
                idProfesor={idProfesor} setIdProfesor={setIdProfesor}
                idMapaCurricular={idMapaCurricular} setIdMapaCurricular={setIdMapaCurricular}
                idAula={idAula} setIdAula={setIdAula}
                tipo={tipo} setTipo={setTipo}
                fecha={fecha} setFecha={setFecha}
                horarios={horarios} setHorarios={setHorarios}
                showModal={showModal} setShowModal={setShowModal}
                showEditModal={showEditModal} setShowEditModal={setShowEditModal}
                showDeleteModal={showDeleteModal} setShowDeleteModal={setShowDeleteModal}
                handleAdd={handleAdd}
                handleUpdate={handleUpdate}
                handleDelete={handleDelete}
                selectedCargaMaterias={selectedCargaMaterias}
            />
        </div>
    );
}

export default CargaMaterias;