/* eslint-disable react/prop-types */
export const PeriodoModales = ({
  periodo, setPeriodoName,
  fechaInicio, setFechaInicio,
  fechaFin, setFechaFin,
  estado, setEstado,
  showModal, setShowModal,
  showEditModal, setShowEditModal,
  showDeleteModal, setShowDeleteModal,
  handleAdd, handleUpdate, handleDelete,
  selectedPeriodo
}) => {
  return (
    <>
      {/* Modal para registrar periodo */}
      <div className={`modal fade ${showModal ? 'show' : ''}`} style={{ display: showModal ? 'block' : 'none' }} tabIndex="-1" aria-labelledby="modalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="modalLabel">Registrar Periodo</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={() => setShowModal(false)}></button>
            </div>
            <div className="modal-body">
              <div className="input-group mb-3">
                <span className="input-group-text">Periodo:</span>
                <input type="text" className="form-control" value={periodo} onChange={(event) => setPeriodoName(event.target.value)} />
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text">Fecha Inicio:</span>
                <input type="date" className="form-control" value={fechaInicio} onChange={(event) => setFechaInicio(event.target.value)} />
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text">Fecha Fin:</span>
                <input type="date" className="form-control" value={fechaFin} onChange={(event) => setFechaFin(event.target.value)} />
              </div>
            
              <div className="input-group mb-3">
                <span className="input-group-text">Estado:</span>
                <select className="form-select" value={estado} onChange={(event) => setEstado(event.target.value)}>
                  <option value="">Selecciona un estado</option>
                  <option value="Pendiente">Pendiente</option>
                  <option value="Iniciado">Iniciado</option>
                  <option value="Finalizado">Finalizado</option>
                </select>
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Cerrar</button>
              <button type="button" className="btn btn-primary" onClick={handleAdd}>Registrar</button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Modal para editar periodo */}
      <div className={`modal fade ${showEditModal ? 'show' : ''}`} style={{ display: showEditModal ? 'block' : 'none' }} tabIndex="-1" aria-labelledby="editModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="editModalLabel">Editar Periodo</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={() => setShowEditModal(false)}></button>
            </div>
            <div className="modal-body">
              <div className="input-group mb-3">
                <span className="input-group-text">Periodo:</span>
                <input type="text" className="form-control" value={periodo} onChange={(event) => setPeriodoName(event.target.value)} />
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text">Fecha Inicio:</span>
                <input type="date" className="form-control" value={fechaInicio} onChange={(event) => setFechaInicio(event.target.value)} />
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text">Fecha Fin:</span>
                <input type="date" className="form-control" value={fechaFin} onChange={(event) => setFechaFin(event.target.value)} />
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text">Estado:</span>
                <select className="form-select" value={estado} onChange={(event) => setEstado(event.target.value)}>
                  <option value="">Selecciona un estado</option>
                  <option value="Pendiente">Pendiente</option>
                  <option value="Iniciado">Iniciado</option>
                  <option value="Finalizado">Finalizado</option>
                </select>
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={() => setShowEditModal(false)}>Cerrar</button>
              <button type="button" className="btn btn-primary" onClick={handleUpdate}>Actualizar</button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal para eliminar periodo */}
      <div className={`modal fade ${showDeleteModal ? 'show' : ''}`} style={{ display: showDeleteModal ? 'block' : 'none' }} tabIndex="-1" aria-labelledby="deleteModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="deleteModalLabel">Eliminar Periodo</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={() => setShowDeleteModal(false)}></button>
            </div>
            <div className="modal-body">
              <p>¿Estás seguro de que deseas eliminar el periodo: <strong>{selectedPeriodo?.periodo}</strong>?</p>
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
