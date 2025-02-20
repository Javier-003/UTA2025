/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import { getAllHorario, createHorarioForm, updateHorarioForm, deleteHorarioForm } from '../../../assets/js/PlanificacionAcademica/horario.js';
import { getBloquees } from '../../../api/PlanificacionAcademica/bloque.api.js';
import { getAllCargaMaterias } from '../../../assets/js/PlanificacionAcademica/cargamaterias.js';

export const HorarioModales = ({ 
    idGrupoMateria, setIdGrupoMateria, 
    idBloque, setIdBloque, 
    dia, setDia,
    horarios, setHorarios,
    showModalHorario, setShowModalHorario, showEditModalHorario, setShowEditModalHorario, showDeleteModalHorario, setShowDeleteModalHorario,
    handleAddHorario, handleEditHorario, handleDeleteHorario
}) => {

    const [bloques, setBloques] = useState([]);
    const [cargaMateriasList, setCargaMateriasList] = useState([]);

    useEffect(() => {
        getAllHorario().then(setHorarios);
        getBloquees().then(setBloques);
        getAllCargaMaterias().then(setCargaMateriasList);
    }, []);

    const diasSemana = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"];

    return (
        <>
            {/* Agregar horario */}
            <div className={`modal fade ${showModalHorario ? 'show' : ''}`} id="modalAgregarHorario" tabIndex="-1" aria-labelledby="modalAgregarHorario" aria-hidden="true" style={{ display: `${showModalHorario ? 'block' : 'none'}` }}>
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Agregar horario</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={() => setShowModalHorario(false)}></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="mb-3">
                                    <label htmlFor="idGrupoMateria" className="form-label">Grupo materia</label>
                                    <select className="form-select" id="idGrupoMateria" value={idGrupoMateria} onChange={(e) => setIdGrupoMateria(e.target.value)}>
                                        <option value="">Seleccione un grupo materia</option>
                                        {cargaMateriasList.map(cargaMateria => (
                                            <option key={cargaMateria.idGrupoMateria} value={cargaMateria.idGrupoMateria}>{cargaMateria.grupo}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="idBloque" className="form-label">Bloque</label>
                                    <select className="form-select" id="idBloque" value={idBloque} onChange={(e) => setIdBloque(e.target.value)}>
                                        <option value="">Seleccione un bloque</option>
                                        {bloques.map(bloque => (
                                            <option key={bloque.idBloque} value={bloque.idBloque}>{bloque.nombre} ({bloque.horaInicio} - {bloque.horaFin})</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="dia" className="form-label">Día</label>
                                    <select className="form-select" id="dia" value={dia} onChange={(e) => setDia(e.target.value)}>
                                        <option value="">Seleccione un día</option>
                                        {diasSemana.map((diaSemana, index) => (
                                            <option key={index} value={diaSemana}>{diaSemana}</option>
                                        ))}
                                    </select>
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={() => setShowModalHorario(false)}>Cerrar</button>
                            <button type="button" className="btn btn-primary" onClick={() => handleAddHorario()}>Guardar</button>
                        </div>
                    </div>
                </div>
            </div>
            
            {/* Editar horario */}
            <div className={`modal fade ${showEditModalHorario ? 'show' : ''}`} id="modalEditarHorario" tabIndex="-1" aria-labelledby="modalEditarHorario" aria-hidden="true" style={{ display: `${showEditModalHorario ? 'block' : 'none'}` }}>
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Editar horario</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={() => setShowEditModalHorario(false)}></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="mb-3">
                                    <label htmlFor="idGrupoMateria" className="form-label">Grupo materia</label>
                                    <select className="form-select" id="idGrupoMateria" value={idGrupoMateria} onChange={(e) => setIdGrupoMateria(e.target.value)}>
                                        <option value="">Seleccione un grupo materia</option>
                                        {cargaMateriasList.map(cargaMateria => (
                                            <option key={cargaMateria.idGrupoMateria} value={cargaMateria.idGrupoMateria}>{cargaMateria.grupo}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="idBloque" className="form-label">Bloque</label>
                                    <select className="form-select" id="idBloque" value={idBloque} onChange={(e) => setIdBloque(e.target.value)}>
                                        <option value="">Seleccione un bloque</option>
                                        {bloques.map(bloque => (
                                            <option key={bloque.idBloque} value={bloque.idBloque}>{bloque.nombre} ({bloque.horaInicio} - {bloque.horaFin})</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="dia" className="form-label">Día</label>
                                    <select className="form-select" id="dia" value={dia} onChange={(e) => setDia(e.target.value)}>
                                        <option value="">Seleccione un día</option>
                                        {diasSemana.map((diaSemana, index) => (
                                            <option key={index} value={diaSemana}>{diaSemana}</option>
                                        ))}
                                    </select>
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={() => setShowEditModalHorario(false)}>Cerrar</button>
                            <button type="button" className="btn btn-primary" onClick={() => handleEditHorario()}>Guardar</button>
                        </div>
                    </div>
                </div>
            </div>
            
            {/* Eliminar horario */}
            <div className={`modal fade ${showDeleteModalHorario ? 'show' : ''}`} id="modalEliminarHorario" tabIndex="-1" aria-labelledby="modalEliminarHorario" aria-hidden="true" style={{ display: `${showDeleteModalHorario ? 'block' : 'none'}` }}>
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Eliminar horario</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={() => setShowDeleteModalHorario(false)}></button>
                        </div>
                        <div className="modal-body">
                            <p>¿Está seguro que desea eliminar este horario?</p>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={() => setShowDeleteModalHorario(false)}>Cancelar</button>
                            <button type="button" className="btn btn-danger" onClick={() => handleDeleteHorario()}>Eliminar</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default HorarioModales;