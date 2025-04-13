import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { getCargaMaterias, createCargaMaterias, updateCargaMaterias, deleteCargaMaterias } from '../../../api/PlanificacionAcademica/cargamaterias.api.js';
import { getProgramaacademicos } from '../../../api/PlanificacionAcademica/programa_academico.api.js';
import { getPeriodos } from '../../../api/PlanificacionAcademica/periodo.api.js';
import { getGrupos } from '../../../api/PlanificacionAcademica/grupo.api.js';
import CargaMateriaModales from './CargaMateriasModales.jsx';
import VerHorarioModal from './HorarioModales.jsx';
import ConsultarHorario from '../plantillaAlumno/ConsultarHorario.jsx';
import Swal from 'sweetalert2';

function CargaMaterias() {
    const [cargaMateriasList, setCargaMaterias] = useState([]);
    const [programaAcademicoList, setProgramaAcademicoList] = useState([]);
    const [periodoList, setPeriodo] = useState([]);
    const [grupoList, setGrupo] = useState([]);
    const [idPeriodo, setIdPeriodo] = useState("");
    const [idProgramaAcademico, setIdProgramaAcademico] = useState("");
    const [idGrupo, setIdGrupo] = useState(""); // Nuevo estado para el grupo seleccionado
    const [showModal, setShowModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showHorarioModal, setShowHorarioModal] = useState(false);
    const [selectedCargaMaterias, setSelectedCargaMaterias] = useState(null);
    const [horarios, setHorarios] = useState([]);
    const [idGrupoMateria, setIdGrupoMateria] = useState("");
    const [idProfesor, setIdProfesor] = useState("");
    const [idMapaCurricular, setIdMapaCurricular] = useState("");
    const [idAula, setIdAula] = useState("");
    const [tipo, setTipo] = useState("");
    const [fecha, setFecha] = useState(() => {
        // Establecer la fecha actual como predeterminada
        const today = new Date();
        return today.toISOString().split("T")[0]; // Formato YYYY-MM-DD
    });

    useEffect(() => {
        getCargaMaterias().then(data => setCargaMaterias(data));
        getPeriodos().then(data => setPeriodo(data));
        getGrupos().then(data => {
            setGrupo(data);
        });
    }, []);


    // Agrega un useEffect para registrar la lista de niveles de estudio cada vez que cambie
    useEffect(() => {
      //console.log("Lista de niveles de estudio:", programaAcademicoList);
    }, [programaAcademicoList]);
  
    useEffect(() => {
      getProgramaacademicos()
        .then(data => setProgramaAcademicoList(data))
        .catch(error => console.error("Error al obtener los niveles de estudio:", error));
    }, []);
    
    const handleAdd = async () => {
        try {
            await createCargaMaterias(idGrupo, idProfesor, idMapaCurricular, idAula, tipo, fecha, horarios);
            const data = await getCargaMaterias();
            setCargaMaterias(data);
            setShowModal(false); // Cerrar el modal después de agregar
        } catch (error) {
            Swal.fire({
                title: "Error",
                text: error.message || "No se pudo crear la carga de materias.",
                icon: "error",
            });
        }
    };

    const handleUpdate = async () => {
        try {
            await updateCargaMaterias(selectedCargaMaterias.idGrupoMateria, idGrupo, idProfesor, idMapaCurricular, idAula, tipo, fecha, horarios);
            const data = await getCargaMaterias();
            setCargaMaterias(data);
            setShowEditModal(false); // Cerrar el modal después de actualizar
        } catch (error) {
            Swal.fire({
                title: "Error",
                text: error.message || "No se pudo actualizar la carga de materias.",
                icon: "error",
            });
        }
    };

    const handleDelete = () => {
        deleteCargaMaterias(selectedCargaMaterias.idGrupoMateria).then(() => {
            getCargaMaterias().then(data => {
                setCargaMaterias(data);
                setShowDeleteModal(false); // Cerrar el modal después de eliminar
            }).catch(error => {
                console.error("Error al obtener las cargas de materias:", error);
            });
        }).catch(error => {
            console.error("Error al eliminar la carga de materias:", error);
        });
    };

    // Filtrado de grupos por periodo y programa académico
    const gruposFiltrados = grupoList.filter(grupo => 
        idPeriodo && idProgramaAcademico && 
        grupo.idPeriodo === parseInt(idPeriodo) && 
        grupo.idProgramaAcademico === parseInt(idProgramaAcademico)
    );

    // Filtrado de cargaMateriasList según el grupo seleccionado
    const filteredData = cargaMateriasList.filter(cargaMateria => 
        cargaMateria.idGrupo === parseInt(idGrupo)
    );

    const formatDateString = (dateString) => dateString ? dateString.split("T")[0] : "";

    // Agrupar horarios por idGrupoMateria y combinar los días y bloques
    const groupedData = filteredData.reduce((acc, item) => {
        const existingItem = acc.find(i => i.idGrupoMateria === item.idGrupoMateria);
        if (existingItem) {
            existingItem.horarios.push({ dia: item.dia, bloque: item.bloque, horaInicio: item.horaInicio, horaFin: item.horaFin });
        } else {
            acc.push({ ...item, horarios: [{ dia: item.dia, bloque: item.bloque, horaInicio: item.horaInicio, horaFin: item.horaFin }] });
        }
        return acc;
    }, []);

    return (
        <div className="container">
            <h2>Carga de Materias</h2>
            <div className="card shadow">
                <div className="card-body">
                    <div className="row">
                        {/* Columna Izquierda */}
                        <div className="col-md-4">
                            <div className="card">
                                <div className="card-body">
                                        <h6 className="card-title">Periodo</h6>
                                        <select className="form-select" value={idPeriodo} onChange={(e) => setIdPeriodo(e.target.value)}>
                                            <option value="">Selecciona un Periodo</option>
                                            {periodoList && periodoList.map((periodo) => (
                                                <option key={periodo.idPeriodo} value={periodo.idPeriodo}>
                                                    {periodo.periodo}
                                                </option>
                                            ))}
                                        </select>
                                        <h6 className="card-title">Programa Académico</h6>
                                        <select className="form-select" value={idProgramaAcademico} onChange={(e) => setIdProgramaAcademico(e.target.value)}>
                                            <option value="">Selecciona un Programa Académico</option>
                                            {programaAcademicoList && programaAcademicoList.map((programa) => (
                                                <option key={programa.idProgramaAcademico} value={programa.idProgramaAcademico}>
                                                    {programa.nombre}
                                                </option>
                                            ))}
                                        </select>
                                        <h6 className="card-title">Grupo</h6>
                                        <select className="form-select" value={idGrupo} onChange={(e) => setIdGrupo(e.target.value)}>
                                            <option value="">Selecciona un Grupo</option>
                                            {gruposFiltrados && gruposFiltrados.map((grupo) => (
                                                <option key={grupo.idGrupo} value={grupo.idGrupo}>
                                                    {grupo.nombre}
                                                </option>
                                            ))}
                                        </select>
                                        {idGrupo && <ConsultarHorario idGrupo={idGrupo} />}
                                </div>
                            </div>
                        </div>
                        {/* Columna a la derecha */}
                        <div className="col-md-8">
                            <button className="btn btn-success mb-3" onClick={() => {
                                setIdGrupoMateria(""); setIdGrupo(""); setIdProfesor("");
                                setIdMapaCurricular(""); setIdAula(""); setTipo("");
                                setFecha(""); setHorarios([]); setShowModal(true);
                                }}>Agregar Materia
                            </button>
                            <h6>Materias asignadas</h6>
                            <table className="table table-bordered table-hover">
                                <thead>
                                    <tr>
                                        {/* <th>Grupo</th> */}
                                        <th>Materia</th>
                                        <th>Profesor</th>
                                        <th>Horarios</th>
                                        <th>Acciones</th>
                                        {/* <th>Editar</th>
                                        <th>Eliminar</th>
                                        <th>Ver Horario</th> */}
                                    </tr>
                                </thead>
                                <tbody>
                                    {groupedData.length > 0 ? (
                                        groupedData.map((cargaMateria, index) => (
                                            <tr key={index}>
                                                {/* <td>{cargaMateria.grupo}</td> */}
                                                <td>{cargaMateria.materia}</td>
                                                <td>{cargaMateria.profesor}</td>
                                                <td>
                                                    <table className="table table-borderless">
                                                        <tbody>
                                                            {cargaMateria.horarios.map((h, i) => (
                                                                <tr key={i}>
                                                                    <td>{h.dia}</td>
                                                                    <td>{h.bloque}</td>
                                                                </tr>
                                                            ))}
                                                        </tbody>
                                                    </table>
                                                </td>
                                                <td>
                                                    <button className='btn btn-warning' onClick={() => {
                                                        setIdGrupoMateria(cargaMateria.idGrupoMateria);
                                                        setIdGrupo(cargaMateria.idGrupo);
                                                        setIdProfesor(cargaMateria.idProfesor);
                                                        setIdMapaCurricular(cargaMateria.idMapaCurricular);
                                                        setIdAula(cargaMateria.idAula);
                                                        setTipo(cargaMateria.tipo);
                                                        setFecha(formatDateString(cargaMateria.fecha));
                                                        // setHorarios(cargaMateria.horarios);
                                                        // console.log("Estado de horarios antes de actualizar:", cargaMateria.horarios);
                                                        setSelectedCargaMaterias(cargaMateria);
                                                        setShowEditModal(true);
                                                    }}>
                                                        <FontAwesomeIcon icon={faEdit} />
                                                    </button>
                                                    <button className='btn btn-danger' onClick={() => {
                                                        setSelectedCargaMaterias(cargaMateria);
                                                        setShowDeleteModal(true);
                                                    }}>
                                                        <FontAwesomeIcon icon={faTrash} />
                                                    </button>
                                                    <button className='btn btn-info' onClick={() => {
                                                        setIdGrupoMateria(cargaMateria.idGrupoMateria);
                                                        const horariosFiltrados = horarios.filter(horario => horario.idGrupoMateria === cargaMateria.idGrupoMateria);
                                                        setHorarios(horariosFiltrados);
                                                        setShowHorarioModal(true);
                                                    }}>
                                                        <FontAwesomeIcon icon={faEye} />
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="7" className="text-center">No se encontraron resultados</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
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
            <VerHorarioModal
                showModal={showHorarioModal}
                setShowModal={setShowHorarioModal}
                horarios={horarios}
                setHorarios={setHorarios}
                idGrupoMateria={idGrupoMateria}
                setIdGrupoMateria={setIdGrupoMateria}
            />
            
        </div>
    );
}

export default CargaMaterias;