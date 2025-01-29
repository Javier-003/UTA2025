/* eslint-disable react/prop-types */
export const BloqueModales = ({
  Nombre, setNombre,
  Duracion, setDuracion,
  HoraInicio, setHoraInicio,
  HoraFin, setHoraFin,
  showModal, setShowModal,
  showEditModal, setShowEditModal,
  showDeleteModal, setShowDeleteModal,
  handleAdd, handleUpdate, handleDelete,
  selectedBloque
}) => {
  return (
    <>
      {/* Modal para registrar bloque */}
      <div className={`modal fade ${showModal ? 'show' : ''}`} style={{ display: showModal ? 'block' : 'none' }} tabIndex="-1" aria-labelledby="modalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="modalLabel">Registrar Bloque</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={() => setShowModal(false)}></button>
            </div>
            <div className="modal-body">
              <div className="input-group mb-3">
                <span className="input-group-text">Nombre:</span>
                <input type="text" className="form-control" value={Nombre} onChange={(event) => setNombre(event.target.value)} />
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text">Duracion:</span>
                <input type="number" className="form-control" value={Duracion} onChange={(event) => setDuracion(event.target.value)} />
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text">Hora Inicio:</span>
                <input type="time" className="form-control" value={HoraInicio} onChange={(event) => setHoraInicio(event.target.value)} />
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text">Hora Fin:</span>
                <input type="time" className="form-control" value={HoraFin} onChange={(event) => setHoraFin(event.target.value)} />
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Cerrar</button>
              <button type="button" className="btn btn-primary" onClick={handleAdd}>Registrar</button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal para editar bloque */}
      <div className={`modal fade ${showEditModal ? 'show' : ''}`} style={{ display: showEditModal ? 'block' : 'none' }} tabIndex="-1" aria-labelledby="editModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="editModalLabel">Editar Bloque</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={() => setShowEditModal(false)}></button>
            </div>
            <div className="modal-body">
              <div className="input-group mb-3">
                <span className="input-group-text">Nombre:</span>
                <input type="text" className="form-control" value={Nombre} onChange={(event) => setNombre(event.target.value)} />
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text">Duracion:</span>
                <input type="number" className="form-control" value={Duracion} onChange={(event) => setDuracion(event.target.value)} />
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text">Hora Inicio:</span>
                <input type="time" className="form-control" value={HoraInicio} onChange={(event) => setHoraInicio(event.target.value)} />
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text">Hora Fin:</span>
                <input type="time" className="form-control" value={HoraFin} onChange={(event) => setHoraFin(event.target.value)} />
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={() => setShowEditModal(false)}>Cerrar</button>
              <button type="button" className="btn btn-primary" onClick={handleUpdate}>Actualizar</button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal para eliminar bloque */}
      <div className={`modal fade ${showDeleteModal ? 'show' : ''}`} style={{ display: showDeleteModal ? 'block' : 'none' }} tabIndex="-1" aria-labelledby="deleteModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="deleteModalLabel">Eliminar Bloque</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={() => setShowDeleteModal(false)}></button>
            </div>
            <div className="modal-body">
              <p>¿Estás seguro de que deseas eliminar el bloque: <strong>{selectedBloque?.Nombre}</strong>?</p>
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
