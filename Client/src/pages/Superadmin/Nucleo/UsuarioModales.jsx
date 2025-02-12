/* eslint-disable react/prop-types */
import { useState, useEffect, Fragment } from 'react';
import { getPersonas } from "../../../api/Nucleo/persona.api.js";

export const UsuarioModales = ({
  idPersona, setidPersona,
  usuario, setUsuario,
  estatus, setEstatus,
  contrasena, setcontrasena,
  rol, setrol,
  showModal, setShowModal,
  showEditModal, setShowEditModal,
  showDeleteModal, setShowDeleteModal,
  handleAdd, handleUpdate, handleDelete,
  showDeleteRoleModal, setShowDeleteRoleModal,
  showAddRoleModal, setShowAddRoleModal,
  handleDeleteRole, handleAddRole,
  selectedUsuario, selectedRole, setSelectedRole
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [personaList, setPersonaList] = useState([]);
  
  useEffect(() => {
    getPersonas().then(data => setPersonaList(data)).catch(error => console.error("Error al obtener las personas:", error));
  }, []);
  
  return (
    <Fragment>
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
                <span className="input-group-text">Contraseña:</span>
                <input type={showPassword ? 'text' : 'password'}className="form-control" value={contrasena}
                  onChange={(event) => setcontrasena(event.target.value)} />
                <button className="btn btn-outline-secondary" type="button"
                  onClick={() => setShowPassword(!showPassword)} > {showPassword ? '🙈' : '👁️'}
                </button>
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text">Roles:</span>
                <select className="form-control" value={rol} onChange={(event) => setrol(event.target.value)}>
                  <option value="">Selecciona un rol</option>
                  <option value="1">Admin</option>
                  <option value="2">Profesor</option>
                  <option value="3">Alumno</option>
                  <option value="4">DGA</option>
                  <option value="5">SE</option>
                </select>
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text">Estatus:</span>
                <select className="form-control" value={estatus} onChange={(event) => setEstatus(event.target.value)}>
                  <option value="1">Activo</option>
                  <option value="0">Inactivo</option>
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
    {/* Modal para editar usuario */}
    <div className={`modal fade ${showEditModal ? 'show' : ''}`} style={{ display: showEditModal ? 'block' : 'none' }} tabIndex="-1" aria-labelledby="editModalLabel" aria-hidden="true">
      <div className="modal-dialog modal-dialog-right ">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="editModalLabel">Editar Usuario</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"
             onClick={() => setShowEditModal(false)}>
            </button>
          </div>
          <div className="modal-body">
            <div className="input-group mb-3">
              <span className="input-group-text">Persona:</span>
                <select className="form-select" value={idPersona} onChange={(event) => setidPersona(event.target.value)} disabled>
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
              <select className="form-control" value={estatus} onChange={(event) => setEstatus(event.target.value)}>
                <option value="1">Activo</option>
                <option value="0">Inactivo</option>
              </select>
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
      {/* Modal para agregar rol de usuario */}
      <div className={`modal fade ${showAddRoleModal ? 'show d-block' : ''}`} tabIndex="-1" aria-labelledby="addRoleModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-right">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="addRoleModalLabel">Agregar Rol de Usuario ({selectedUsuario?.usuario})</h5>
              <button type="button" className="btn-close" onClick={() => setShowAddRoleModal(false)}></button>
            </div>
            <div className="modal-body">
              <select className="form-select" value={selectedRole} onChange={(event) => setSelectedRole(event.target.value)}>
                <option value="">Seleccionar Rol</option>
                <option value="Admin">Admin</option>
                <option value="Profesor">Profesor</option>
                <option value="Alumno">Alumno</option>
                <option value="DGA">DGA</option>
                <option value="SE">SE</option>
              </select>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={() => setShowAddRoleModal(false)}>Cerrar</button>
              <button type="button" className="btn btn-primary" onClick={handleAddRole}>Agregar Rol</button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal para eliminar rol de usuario */}
      <div className={`modal fade ${showDeleteRoleModal ? 'show d-block' : ''}`} tabIndex="-1" aria-labelledby="deleteRoleModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-right">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="deleteRoleModalLabel">Eliminar Rol de Usuario ({selectedUsuario?.usuario})</h5>
              <button type="button" className="btn-close" onClick={() => setShowDeleteRoleModal(false)}></button>
            </div>
            <div className="modal-body">
              <p>¿Estás seguro de eliminar un rol de <strong>{selectedUsuario?.usuario}</strong>?</p>
              <select className="form-select" value={selectedRole} onChange={(event) => setSelectedRole(event.target.value)}>
                <option value="">Seleccionar Rol a Eliminar</option>
                <option value="Admin">Admin</option>
                <option value="Profesor">Profesor</option>
                <option value="Alumno">Alumno</option>
                <option value="DGA">DGA</option>
                <option value="SE">SE</option>
              </select>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={() => setShowDeleteRoleModal(false)}>Cerrar</button>
              <button type="button" className="btn btn-danger" onClick={handleDeleteRole}>Eliminar Rol</button>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
    
  );
};
