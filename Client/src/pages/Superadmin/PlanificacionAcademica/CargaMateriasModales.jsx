/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { getGrupos } from "../../../api/PlanificacionAcademica/grupo.api.js";
import { getProfesores } from "../../../api/Nucleo/profesor.api.js";
import { getMapaCurriculares } from "../../../api/PlanificacionAcademica/mapacurricular.api.js";
import { getAulas } from "../../../api/Nucleo/aula.api.js";
import { getBloquees } from "../../../api/PlanificacionAcademica/bloque.api.js";

export const CargaMateriaModales = ({
    idGrupoMateria, setIdGrupoMateria,
    idGrupo, setIdGrupo,
    idProfesor, setIdProfesor,
    idMapaCurricular, setIdMapaCurricular,
    idAula, setIdAula,
    tipo, setTipo,
    fecha, setFecha,
    horarios, setHorarios,
    showModal, setShowModal,
    showEditModal, setShowEditModal,
    showDeleteModal, setShowDeleteModal,
    handleAdd, handleUpdate, handleDelete,
    selectedCargaMateria
}) => {
    const [grupos, setGrupos] = useState([]);
    const [profesores, setProfesores] = useState([]);
    const [mapaCurriculares, setMapaCurriculares] = useState([]);
    const [aulas, setAulas] = useState([]);
    const [bloques, setBloques] = useState([]);
    const [nuevoHorario, setNuevoHorario] = useState({ dia: "", idBloque: "" });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [gruposData, profesoresData, mapaData, aulasData, bloquesData] = await Promise.all([
                    getGrupos(),
                    getProfesores(),
                    getMapaCurriculares(),
                    getAulas(),
                    getBloquees()
                ]);
                setGrupos(gruposData);
                setProfesores(profesoresData);
                setMapaCurriculares(mapaData);
                setAulas(aulasData);
                setBloques(bloquesData)
                // console.log("Bloques cargados:", bloquesData); // 👀 Verifica que los bloques están cargando correctamente
            } catch (error) {
                console.error("Error al cargar datos:", error);
            }
        };
        fetchData();
    }, []);
    
    useEffect(() => {
        if (selectedCargaMateria) {
            setIdGrupo(selectedCargaMateria.idGrupo || "");
            setIdProfesor(selectedCargaMateria.idProfesor || "");
            setIdMapaCurricular(selectedCargaMateria.idMapaCurricular || "");
            setIdAula(selectedCargaMateria.idAula || "");
            setTipo(selectedCargaMateria.tipo || "");
            setFecha(formatDateString(selectedCargaMateria.fecha));
    
            // Transformar los horarios para incluir información del bloque
            if (selectedCargaMateria.horarios && Array.isArray(selectedCargaMateria.horarios)) {
                const horariosConBloques = selectedCargaMateria.horarios.map(horario => {
                    const bloque = bloques.find(b => Number(b.idBloque) === Number(horario.idBloque));
                    return {
                        dia: horario.dia,
                        idBloque: Number(horario.idBloque),
                        nombreBloque: bloque ? bloque.nombre : "No disponible",
                        horaInicio: bloque ? bloque.horaInicio : "No disponible",
                        horaFin: bloque ? bloque.horaFin : "No disponible"
                    };
                });
                setHorarios(horariosConBloques);
            } else {
                setHorarios([]);
            }
        }
    }, [selectedCargaMateria, bloques]); // 👈 Asegura que se re-renderice cuando bloques cambie
    
    useEffect(() => {
        // console.log("Horarios cargados en modal:", horarios);
        // console.log("Bloques disponibles:", bloques);
    }, [horarios, bloques]);
    
    const formatDateString = (dateString) => dateString ? dateString.split("T")[0] : "";

    const agregarHorario = () => {
        if (!nuevoHorario.dia || !nuevoHorario.idBloque) {
            alert("Selecciona un día y un bloque válido.");
            return;
        }
    
        const bloqueSeleccionado = bloques.find(b => b.idBloque === Number(nuevoHorario.idBloque));
    
        if (bloqueSeleccionado) {
            setHorarios(prevHorarios => [
                ...prevHorarios,
                { 
                    dia: nuevoHorario.dia, 
                    idBloque: Number(nuevoHorario.idBloque),
                    nombreBloque: bloqueSeleccionado.nombre,  // Asigna el nombre del bloque
                    horaInicio: bloqueSeleccionado.horaInicio,  // Asigna hora de inicio
                    horaFin: bloqueSeleccionado.horaFin         // Asigna hora de fin
                }
            ]);
        }
    
        setNuevoHorario({ dia: "", idBloque: "" });
    };

    const eliminarHorario = (index) => {
        setHorarios(prevHorarios => prevHorarios.filter((_, i) => i !== index));
    };

    const cerrarModal = () => {
        setShowModal(false);
        setShowEditModal(false);
        setShowDeleteModal(false);
        setNuevoHorario({ dia: "", idBloque: "" });
        setHorarios([]); // Limpiar los horarios al cerrar el modal
    };

    return (
        <div>
            {/* Modal para agregar carga de materias */}
            <div className={`modal fade ${showModal ? "show" : ""}`} style={{ display: showModal ? "block" : "none" }}>
                <div className="modal-dialog modal-dialog-left">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Crear carga de materias</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" onClick={cerrarModal}></button>
                        </div>
                        <div className="modal-body">
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label>Grupo</label>
                                        <select className="form-control" value={idGrupo} onChange={(e) => setIdGrupo(e.target.value)}>
                                            <option value="">Selecciona un grupo</option>
                                            {grupos.map(grupo => (
                                                <option key={grupo.idGrupo} value={grupo.idGrupo}>{grupo.nombre}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label>Profesor</label>
                                        <select className="form-control" value={idProfesor} onChange={(e) => setIdProfesor(e.target.value)}>
                                            <option value="">Selecciona un profesor</option>
                                            {profesores.map(profesor => (
                                                <option key={profesor.idProfesor} value={profesor.idProfesor}>
                                                    {profesor.nombre} {profesor.paterno} {profesor.materno}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label>Mapa curricular</label>
                                        <select className="form-control" value={idMapaCurricular} onChange={(e) => setIdMapaCurricular(e.target.value)}>
                                            <option value="">Selecciona una materia</option>
                                            {mapaCurriculares.map(mapa => (
                                                <option key={mapa.idMapaCurricular} value={mapa.idMapaCurricular}>{mapa.materia}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label>Aula</label>
                                        <select className="form-control" value={idAula} onChange={(e) => setIdAula(e.target.value)}>
                                            <option value="">Selecciona un aula</option>
                                            {aulas.map(aula => (
                                                <option key={aula.idAula} value={aula.idAula}>{aula.nombre}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label>Tipo</label>
                                        <select className="form-control" value={tipo} onChange={(e) => setTipo(e.target.value)}>
                                            <option value="">Selecciona un tipo</option>
                                            <option value="Ordinaria">Ordinaria</option>
                                            <option value="Extraordinaria">Extraordinaria</option>
                                        </select>
                                    </div>
                                </div>  
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label>Fecha</label>
                                        <input type="date" className="form-control" value={fecha} onChange={(e) => setFecha(e.target.value)} />
                                    </div>
                                </div>
                                <div className="col-md-12">
                                    <div className="form-group">
                                        <label>Horarios</label>
                                        <div className="row">
                                            <div className="col-md-4">
                                                <select className="form-control" value={nuevoHorario.dia} onChange={(e) => setNuevoHorario({ ...nuevoHorario, dia: e.target.value })}>
                                                    <option value="">Selecciona un día</option>
                                                    <option value="Lunes">Lunes</option>
                                                    <option value="Martes">Martes</option>
                                                    <option value="Miércoles">Miércoles</option>
                                                    <option value="Jueves">Jueves</option>
                                                    <option value="Viernes">Viernes</option>
                                                    <option value="Sábado">Sábado</option>
                                                </select>
                                            </div>
                                            <div className="col-md-4">
                                                <select className="form-control" 
                                                    value={nuevoHorario.idBloque} 
                                                    onChange={(e) => setNuevoHorario({ ...nuevoHorario, idBloque: Number(e.target.value) })}>
                                                    <option value="">Selecciona un bloque</option>
                                                    {bloques.map(bloque => (
                                                        <option key={bloque.idBloque} value={bloque.idBloque}>
                                                            {bloque.nombre} ({bloque.horaInicio} - {bloque.horaFin})
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>
                                            <div className="col-md-4">
                                                <button className="btn btn-primary" onClick={agregarHorario}>Agregar</button>
                                            </div>
                                        </div>
                                        <div className="table-responsive" style={{ maxHeight: '200px', overflowY: 'auto' }}>
                                            <table className="table table-striped">
                                                <thead>
                                                    <tr>
                                                        <th>Día</th>
                                                        <th>Bloque</th>
                                                        <th>Modulo</th>
                                                        <th>Eliminar</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {horarios.map((horario, index) => {
                                                        const bloque = bloques.find(b => b.idBloque === Number(horario.idBloque));
                                                        return (
                                                            <tr key={index}>
                                                                <td>{horario.dia}</td>
                                                                <td>{bloque ? bloque.nombre : "No disponible"}</td>
                                                                <td>{bloque ? `${bloque.horaInicio} - ${bloque.horaFin}` : "No disponible"}</td>
                                                                <td>
                                                                    <button className="btn btn-danger" onClick={() => eliminarHorario(index)}>Eliminar</button>
                                                                </td>
                                                            </tr>
                                                        );
                                                    })}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" onClick={cerrarModal}>Cerrar</button>
                            <button type="button" className="btn btn-primary" onClick={() => { handleAdd(); cerrarModal(); }}>Guardar</button>
                        </div>
                    </div>
                </div>
            </div>
            
            {/* Modal para editar carga de materias */}
            {showEditModal && (
            <div className={`modal fade ${showEditModal ? "show" : ""}`} style={{ display: showEditModal ? "block" : "none" }}>
                <div className="modal-dialog modal-dialog-left">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Editar carga de materias</h5>
                            <button type="button" className="btn-close" onClick={cerrarModal}></button>
                        </div>
                        <div className="modal-body">
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label>Grupo</label>
                                        <select className="form-control" value={idGrupo} onChange={(e) => setIdGrupo(e.target.value)}>
                                            <option value="">Selecciona un grupo</option>
                                            {grupos.map(grupo => (
                                                <option key={grupo.idGrupo} value={grupo.idGrupo}>{grupo.nombre}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label>Profesor</label>
                                        <select className="form-control" value={idProfesor} onChange={(e) => setIdProfesor(e.target.value)}>
                                            <option value="">Selecciona un profesor</option>
                                            {profesores.map(profesor => (
                                                <option key={profesor.idProfesor} value={profesor.idProfesor}>
                                                    {profesor.nombre} {profesor.paterno} {profesor.materno}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label>Mapa curricular</label>
                                        <select className="form-control" value={idMapaCurricular} onChange={(e) => setIdMapaCurricular(e.target.value)}>
                                            <option value="">Selecciona una materia</option>
                                            {mapaCurriculares.map(mapa => (
                                                <option key={mapa.idMapaCurricular} value={mapa.idMapaCurricular}>{mapa.materia}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label>Aula</label>
                                        <select className="form-control" value={idAula} onChange={(e) => setIdAula(e.target.value)}>
                                            <option value="">Selecciona un aula</option>
                                            {aulas.map(aula => (
                                                <option key={aula.idAula} value={aula.idAula}>{aula.nombre}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label>Tipo</label>
                                        <select className="form-control" value={tipo} onChange={(e) => setTipo(e.target.value)}>
                                            <option value="">Selecciona un tipo</option>
                                            <option value="Ordinaria">Ordinaria</option>
                                            <option value="Extraordinaria">Extraordinaria</option>
                                        </select>
                                    </div>
                                </div>  
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label>Fecha</label>
                                        <input type="date" className="form-control" value={fecha} onChange={(e) => setFecha(e.target.value)} />
                                    </div>
                                </div>
                                <div className="col-md-12">
                                    <div className="form-group">
                                        <label>Horarios</label>
                                        <div className="row">
                                            <div className="col-md-4">
                                                <select className="form-control" value={nuevoHorario.dia} onChange={(e) => setNuevoHorario({ ...nuevoHorario, dia: e.target.value })}>
                                                    <option value="">Selecciona un día</option>
                                                    <option value="Lunes">Lunes</option>
                                                    <option value="Martes">Martes</option>
                                                    <option value="Miércoles">Miércoles</option>
                                                    <option value="Jueves">Jueves</option>
                                                    <option value="Viernes">Viernes</option>
                                                    <option value="Sábado">Sábado</option>
                                                </select>
                                            </div>
                                            <div className="col-md-4">
                                                <select className="form-control" 
                                                    value={nuevoHorario.idBloque} 
                                                    onChange={(e) => setNuevoHorario({ ...nuevoHorario, idBloque: Number(e.target.value) })}>
                                                    <option value="">Selecciona un bloque</option>
                                                    {bloques.map(bloque => (
                                                        <option key={bloque.idBloque} value={bloque.idBloque}>
                                                            {bloque.nombre} ({bloque.horaInicio} - {bloque.horaFin})
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>
                                            <div className="col-md-4">
                                                <button className="btn btn-primary" onClick={agregarHorario}>Agregar</button>
                                            </div>
                                        </div>
                                        <div className="table-responsive" style={{ maxHeight: '200px', overflowY: 'auto' }}>
                                            <table className="table table-striped">
                                                <thead>
                                                    <tr>
                                                        <th>Día</th>
                                                        <th>Bloque</th>
                                                        <th>Modulo</th>
                                                        <th>Eliminar</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {horarios.map((horario, index) => {
                                                        const bloque = bloques.find(b => b.idBloque === Number(horario.idBloque));
                                                        return (
                                                            <tr key={index}>
                                                                <td>{horario.dia}</td>
                                                                <td>{bloque ? bloque.nombre : "No disponible"}</td>
                                                                <td>{bloque ? `${bloque.horaInicio} - ${bloque.horaFin}` : "No disponible"}</td>
                                                                <td>
                                                                    <button className="btn btn-danger" onClick={() => eliminarHorario(index)}>Eliminar</button>
                                                                </td>
                                                            </tr>
                                                        );
                                                    })}
                                                </tbody>
                                            </table>
                                            <h6>Nota: Agregar Nuevos Horarios</h6>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" onClick={cerrarModal}>Cerrar</button>
                            <button type="button" className="btn btn-primary" onClick={() => { handleUpdate(); cerrarModal(); }}>Guardar</button>
                        </div>
                    </div>
                </div>
            </div>
            )}
            
            {/* Modal para eliminar carga de materias */}
            <div className={`modal fade ${showDeleteModal ? "show" : ""}`} style={{ display: showDeleteModal ? "block" : "none" }}>
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Eliminar carga de materias</h5>
                            <button type="button" className="btn-close" onClick={cerrarModal}></button>
                        </div>
                        <div className="modal-body">
                            <p>¿Estás seguro de que deseas eliminar esta carga de materias?</p>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" onClick={cerrarModal}>Cancelar</button>
                            <button type="button" className="btn btn-danger" onClick={() => { handleDelete(); cerrarModal(); }}>Eliminar</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CargaMateriaModales;