/* eslint-disable react/prop-types */
import React from 'react';

export const OfertaAcademicaModales = ({
    nombre, setNombre,
    descripcion, setDescripcion,
    sigla, setSigla,
    desde, setDesde,
    hasta, setHasta,
    showModal, setShowModal,
    showEditModal, setShowEditModal,
    showDeleteModal, setShowDeleteModal,
    handleAdd, handleUpdate, handleDelete,
    selectedOfertaAcademica
}) => {
    // Function to remove "T06:00:00.000Z" from dates
    const formatDateString = (dateString) => {
        if (dateString) {
            return dateString.split('T')[0];
        }
        return dateString;
    };

    return (
        <>
            {/* Modal para registrar oferta academica */}
            <div className={`modal fade ${showModal ? 'show' : ''}`} style={{ display: showModal ? 'block' : 'none' }} tabIndex="-1" aria-labelledby="modalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="modalLabel">Registrar Oferta Academica</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={() => setShowModal(false)}></button>
                        </div>
                        <div className="modal-body">
                            <div className="input-group mb-3">
                                <span className="input-group-text">Nombre:</span>
                                <input type="text" className="form-control" value={nombre} onChange={(event) => setNombre(event.target.value)} />
                            </div>
                            <div className="input-group mb-3">
                                <span className="input-group-text">Descripción:</span>
                                <input type="text" className="form-control" value={descripcion} onChange={(event) => setDescripcion(event.target.value)} />
                            </div>
                            <div className="input-group mb-3">
                                <span className="input-group-text">Sigla:</span>
                                <input type="text" className="form-control" value={sigla} onChange={(event) => setSigla(event.target.value)} />
                            </div>
                            <div className="input-group mb-3">
                                <span className="input-group-text">Desde:</span>
                                <input type="date" className="form-control" value={formatDateString(desde)} onChange={(event) => setDesde(event.target.value)} />
                            </div>
                            <div className="input-group mb-3">
                                <span className="input-group-text">Hasta:</span>
                                <input type="date" className="form-control" value={formatDateString(hasta)} onChange={(event) => setHasta(event.target.value)} />
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Cerrar</button>
                            <button type="button" className="btn btn-primary" onClick={handleAdd}>Registrar</button>
                        </div>
                    </div>
                </div>
            </div>
            
            {/* Modal para editar oferta academica */}
            <div className={`modal fade ${showEditModal ? 'show' : ''}`} style={{ display: showEditModal ? 'block' : 'none' }} tabIndex="-1" aria-labelledby="editModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="editModalLabel">Editar Oferta Academica</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={() => setShowEditModal(false)}></button>
                        </div>
                        <div className="modal-body">
                            <div className="input-group mb-3">
                                <span className="input-group-text">Nombre:</span>
                                <input type="text" className="form-control" value={nombre} onChange={(event) => setNombre(event.target.value)} />
                            </div>
                            <div className="input-group mb-3">
                                <span className="input-group-text">Descripción:</span>
                                <input type="text" className="form-control" value={descripcion} onChange={(event) => setDescripcion(event.target.value)} />
                            </div>
                            <div className="input-group mb-3">
                                <span className="input-group-text">Sigla:</span>
                                <input type="text" className="form-control" value={sigla} onChange={(event) => setSigla(event.target.value)} />
                            </div>
                            <div className="input-group mb-3">
                                <span className="input-group-text">Desde:</span>
                                <input type="date" className="form-control" value={formatDateString(desde)} onChange={(event) => setDesde(event.target.value)} />
                            </div>
                            <div className="input-group mb-3">
                                <span className="input-group-text">Hasta:</span>
                                <input type="date" className="form-control" value={formatDateString(hasta)} onChange={(event) => setHasta(event.target.value)} />
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" onClick={() => setShowEditModal(false)}>Cerrar</button>
                            <button type="button" className="btn btn-primary" onClick={handleUpdate}>Guardar cambios</button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal para eliminar oferta academica */}
            <div className={`modal fade ${showDeleteModal ? 'show' : ''}`} style={{ display: showDeleteModal ? 'block' : 'none' }} tabIndex="-1" aria-labelledby="modalDeleteLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="modalDeleteLabel">Eliminar Oferta Academica</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={() => setShowDeleteModal(false)}></button>
                        </div>
                        <div className="modal-body">
                            <p>¿Estás seguro de que deseas eliminar la oferta academica <strong>{selectedOfertaAcademica?.nombre}</strong>?</p>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" onClick={() => setShowDeleteModal(false)}>Cancelar</button>
                            <button type="button" className="btn btn-danger" onClick={handleDelete}>Eliminar</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};