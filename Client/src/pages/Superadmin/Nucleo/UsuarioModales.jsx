/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import { getPersonas } from "../../../api/Nucleo/persona.api.js";

export const UsuarioModales = ({
  idPersona, setidPersona,
  usuario, setUsuario,
  estatus, setEstatus,
  roles, setRoles,
  showModal, setShowModal,
  showEditModal, setShowEditModal,
  showDeleteModal, setShowDeleteModal,
  handleAdd, handleUpdate, handleDelete,
  selectedUsuario
}) => {
  
  const [personaList, setPersonaList] = useState([]); 
  
  useEffect(() => {
    getPersonas().then(data => setPersonaList(data)).catch(error => console.error("Error al obtener las personas:", error));
  }, []);

  return (
    <>
      {/* Modal para registrar usuario */}
      <div className={`modal fade ${showModal ? 'show' : ''}`} style={{ display: showModal ? 'block' : 'none' }} tabIndex="-1" aria-labelledby="modalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-right ">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="modalLabel">Registrar Usuario</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={() => setShowModal(false)}></button>
            </div>
            <div className="modal-body">
              <div className="input-group mb-3">
                <span className="input-group-text">Persona:</span>
                <select className="form-select" value={idPersona} onChange={(event) => setidPersona(event.target.value)}>
                  <option value="">Selecciona una persona</option>
                  {personaList.map((persona) => (
                    <option key={persona.idPersona} value={persona.idPersona}>
                      {`${persona.nombre} ${persona.paterno} ${persona.materno}`}
                    </option>
                  ))}
                </select>
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text">Usuario:</span>
                <input type="text" className="form-control" value={usuario} onChange={(event) => setUsuario(event.target.value)} />
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text">Estatus:</span>
                <input type="text" className="form-control" value={estatus} onChange={(event) => setEstatus(event.target.value)} />
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text">Roles:</span>
                <input type="text" className="form-control" value={roles} onChange={(event) => setRoles(event.target.value)} />
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Cerrar</button>
              <button type="button" className="btn btn-primary" onClick={handleAdd}>Registrar</button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal para editar usuario */}
      <div className={`modal fade ${showEditModal ? 'show' : ''}`} style={{ display: showEditModal ? 'block' : 'none' }} tabIndex="-1" aria-labelledby="editModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-right ">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="editModalLabel">Editar Usuario</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={() => setShowEditModal(false)}></button>
            </div>
            <div className="modal-body">
              <div className="input-group mb-3">
                <span className="input-group-text">Persona:</span>
                <select className="form-select" value={idPersona} onChange={(event) => setidPersona(event.target.value)}>
                  <option value="">Selecciona una persona</option>
                  {personaList.map((persona) => (
                    <option key={persona.idPersona} value={persona.idPersona}>
                      {`${persona.nombre} ${persona.paterno} ${persona.materno}`}
                    </option>
                  ))}
                </select>
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text">Usuario:</span>
                <input type="text" className="form-control" value={usuario} onChange={(event) => setUsuario(event.target.value)} />
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text">Estatus:</span>
                <input type="text" className="form-control" value={estatus} onChange={(event) => setEstatus(event.target.value)} />
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text">Roles:</span>
                <input type="text" className="form-control" value={roles} onChange={(event) => setRoles(event.target.value)} />
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={() => setShowEditModal(false)}>Cerrar</button>
              <button type="button" className="btn btn-primary" onClick={handleUpdate}>Guardar Cambios</button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Modal para eliminar usuario */}
      <div className={`modal fade ${showDeleteModal ? 'show' : ''}`} style={{ display: showDeleteModal ? 'block' : 'none' }} tabIndex="-1" aria-labelledby="deleteModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-right">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="deleteModalLabel">Eliminar Usuario</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={() => setShowDeleteModal(false)}></button>
            </div>
            <div className="modal-body">
              <p>¿Estás seguro de que deseas eliminar al usuario <strong>{selectedUsuario?.usuario}</strong>?</p>
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
