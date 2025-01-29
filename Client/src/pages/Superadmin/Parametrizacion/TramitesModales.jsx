/* eslint-disable react/prop-types */
export const TramiteModales = ({
    nombre, setNombre, 
    desde, setDesde,
    hasta, setHasta,
    showModal, setShowModal, 
    showEditModal, setShowEditModal, 
    showDeleteModal, setShowDeleteModal, 
    handleAdd, handleUpdate, handleDelete, 
    selectedTramite
  }) => {
    return (
      <>
        {/* Modal para registrar tramite */}
        <div className={`modal fade ${showModal ? 'show' : ''}`} style={{ display: showModal ? 'block' : 'none' }} tabIndex="-1" aria-labelledby="modalLabel" aria-hidden="true">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="modalLabel">Registrar Trámite</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={() => {
                  setShowModal(false);
                  setNombre("");
                  setDesde("");
                  setHasta("");
                }}></button>
              </div>
              <div className="modal-body">
                <div className="input-group mb-3">
                  <span className="input-group-text">Nombre:</span>
                  <input type="text" className="form-control" value={nombre} onChange={(event) => setNombre(event.target.value)} />                         
                </div>
                <div className="input-group mb-3">
                  <span className="input-group-text">Desde:</span>
                  <input type="date" className="form-control" value={desde} onChange={(event) => setDesde(event.target.value)} />                         
                </div>
                <div className="input-group mb-3">
                  <span className="input-group-text">Hasta:</span>
                  <input type="date" className="form-control" value={hasta} onChange={(event) => setHasta(event.target.value)} />                         
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => {
                  setShowModal(false);
                  setNombre("");
                  setDesde("");
                  setHasta("");
                }}>Cerrar</button>
                <button type="button" className="btn btn-primary" onClick={handleAdd}>Registrar</button>
              </div>
            </div>
          </div>
        </div>
  
        {/* Modal para editar tramite */}
        <div className={`modal fade ${showEditModal ? 'show' : ''}`} style={{ display: showEditModal ? 'block' : 'none' }} tabIndex="-1" aria-labelledby="editModalLabel" aria-hidden="true">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="editModalLabel">Editar Trámite</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={() => setShowEditModal(false)}></button>
              </div>
              <div className="modal-body">
                <div className="input-group mb-3">
                  <span className="input-group-text">Nombre:</span>
                  <input type="text" className="form-control" value={nombre} onChange={(event) => setNombre(event.target.value)} />
                </div>        
                <div className="input-group mb-3">
                  <span className="input-group-text">Desde:</span>
                  <input type="date" className="form-control" value={desde} onChange={(event) => setDesde(event.target.value)} />
                </div>             
                <div className="input-group mb-3">
                  <span className="input-group-text">Hasta:</span>
                  <input type="date" className="form-control" value={hasta} onChange={(event) => setHasta(event.target.value)} />
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setShowEditModal(false)}>Cerrar</button>
                <button type="button" className="btn btn-primary" onClick={handleUpdate}>Actualizar</button>
              </div>
            </div>
          </div>
        </div>
  
        {/* Modal para eliminar tramite */}
        <div className={`modal fade ${showDeleteModal ? 'show' : ''}`} style={{ display: showDeleteModal ? 'block' : 'none' }} tabIndex="-1" aria-labelledby="deleteModalLabel" aria-hidden="true">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="deleteModalLabel">Eliminar Trámite</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={() => setShowDeleteModal(false)}></button>
              </div>
              <div className="modal-body">
                <p>¿Estás seguro de que deseas eliminar el trámite: <strong>{selectedTramite?.nombre}</strong>?</p>
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
  