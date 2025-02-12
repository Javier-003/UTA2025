/* eslint-disable react/prop-types */
export const PersonaModales = ({
  nombre, setnombre,
  paterno, setpaterno,
  materno, setmaterno,
  nacimiento, setnacimiento,
  curp, setcurp,
  genero, setgenero, 
  direccion, setdireccion, 
  telefono, settelefono,
  showModal, setShowModal, 
  showEditModal, setShowEditModal,
  showDeleteModal, setShowDeleteModal,
  handleAdd, handleUpdate, handleDelete,
  selectedPersona
}) => {
  return (
    <>
    
      {/* Modal para registrar persona */}
      <div className={`modal fade ${showModal ? 'show' : ''}`} style={{ display: showModal ? 'block' : 'none' }} tabIndex="-1" aria-labelledby="modalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-right">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="modalLabel">Registrar Persona</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={() => setShowModal(false)}></button>
            </div>
            <div className="modal-body">
              <div className="input-group mb-3">
                <span className="input-group-text">Nombre:</span>
                <input type="text"className="form-control"value={nombre} onChange={(e) => setnombre(e.target.value)}/>
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text">Apellido Paterno:</span>
                <input type="text"className="form-control" value={paterno} onChange={(e) => setpaterno(e.target.value)} />
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text">Apellido Materno:</span>
                <input type="text" className="form-control" value={materno} onChange={(e) => setmaterno(e.target.value)} />
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text">Género:</span>
                <select className="form-select" value={genero} onChange={(e) => setgenero(e.target.value)} >
                  <option value="">Selecciona</option>
                  <option value="Masculino">Masculino</option>
                  <option value="Femenino">Femenino</option>
                </select>
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text">Dirección:</span>
                <input type="text"className="form-control"value={direccion} onChange={(e) => setdireccion(e.target.value)}/>
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text">Teléfono:</span>
                <input type="text"  className="form-control" value={telefono} onChange={(e) => settelefono(e.target.value)} />
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text">CURP:</span>
                <input type="text"className="form-control" value={curp} onChange={(e) => setcurp(e.target.value)} />
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text">Fecha de Nacimiento:</span>
                <input type="date"className="form-control" value={nacimiento} onChange={(e) => setnacimiento(e.target.value)} />
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Cerrar</button>
              <button type="button" className="btn btn-primary" onClick={handleAdd}>Registrar</button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal para editar persona */}
      <div className={`modal fade ${showEditModal ? 'show' : ''}`} style={{ display: showEditModal ? 'block' : 'none' }} tabIndex="-1" aria-labelledby="editModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-right">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="editModalLabel">Editar Persona</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={() => setShowEditModal(false)}></button>
            </div>
            <div className="modal-body">
              <div className="input-group mb-3">
                <span className="input-group-text">Nombre:</span>
                <input type="text"className="form-control" value={nombre}onChange={(e) => setnombre(e.target.value)}/>
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text">Apellido Paterno:</span>
                <input type="text"className="form-control"value={paterno}onChange={(e) => setpaterno(e.target.value)}/>
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text">Apellido Materno:</span>
                <input type="text"className="form-control" value={materno}onChange={(e) => setmaterno(e.target.value)}/>
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text">Género:</span>
                <select className="form-select" value={genero} onChange={(e) => setgenero(e.target.value)} >
                  <option value="">Selecciona</option>
                  <option value="Masculino">Masculino</option>
                  <option value="Femenino">Femenino</option>
                </select>
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text">Dirección:</span>
                <input type="text"className="form-control"value={direccion}onChange={(e) => setdireccion(e.target.value)} />
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text">Teléfono:</span>
                <input type="text" className="form-control" value={telefono} onChange={(e) => settelefono(e.target.value)}/>
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text">CURP:</span>
                <input type="text"className="form-control" value={curp} onChange={(e) => setcurp(e.target.value)}/>
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text">Fecha de Nacimiento:</span>
                <input type="date"className="form-control" value={nacimiento} onChange={(e) => setnacimiento(e.target.value)} />
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={() => setShowEditModal(false)}>Cerrar</button>
              <button type="button" className="btn btn-primary" onClick={handleUpdate}>Actualizar</button>
            </div>
          </div>
        </div>
      </div>

        {/* Modal para eliminar persona */}
        <div className={`modal fade ${showDeleteModal ? 'show' : ''}`} style={{ display: showDeleteModal ? 'block' : 'none' }} tabIndex="-1" aria-labelledby="deleteModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-right">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="deleteModalLabel">Eliminar Persona</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={() => setShowDeleteModal(false)}></button>
              </div>
              <div className="modal-body">
                <p>¿Estás seguro de que deseas eliminar a la Persona: <strong>{selectedPersona?.nombre}</strong>?</p>
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
