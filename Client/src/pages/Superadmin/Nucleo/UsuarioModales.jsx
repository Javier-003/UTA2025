/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import { getPersonas } from "../../../api/Nucleo/persona.api.js";

export const UsuarioModales = ({
  usuario, setusuario,
  idPersona, setidPersona,
  contrasena, setcontrasena,
  idRol, setidRol,
  estatus, setestatus,
  showModal, setShowModal,
  showEditModal, setShowEditModal,
  showDeleteModal, setShowDeleteModal,
  showAddRolModal, setShowAddRolModal,
  showDeleteRolModal, setShowDeleteRolModal,
  handleAdd, handleUpdate, handleDelete,
  handleAddRol, handleDeleteRol,
  selectedUsuario,
  selectedRol
}) => {
  const [personaList, setPersonaList] = useState([]); 
  
  useEffect(() => {
    getPersonas().then((data) => setPersonaList(data)).catch((error) => console.error("Error al obtener las personas:", error));
  }, []);

  return (
    <>
      {/* Modal para agregar usuario */}
      <div className={`modal fade ${showModal ? 'show' : ''}`} style={{ display: showModal ? 'block' : 'none' }}>
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Agregar Usuario</h5>
              <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
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
              <input type="text" className="form-control mb-2" placeholder="Nombre de Usuario" value={usuario} onChange={(e) => setusuario(e.target.value)} />
              <input type="password" className="form-control mb-2" placeholder="Contraseña" value={contrasena} onChange={(e) => setcontrasena(e.target.value)} />
              <select className="form-select mb-2" value={idRol} onChange={(e) => setidRol(e.target.value)}>
                <option value="">Seleccionar Rol</option>
                <option value="Admin">Admin</option>
                <option value="Profesor">Profesor</option>
                <option value="Alumno">Alumno</option>
                <option value="DGA">DGA</option>
                <option value="SE">SE</option>
              </select>
              <select className="form-select" value={estatus} onChange={(e) => setestatus(e.target.value)}>
                <option value="">Seleccionar Estatus</option>
                <option value="Activo">Activo</option>
                <option value="Baja">Baja</option>
              </select>
            </div>
            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={() => setShowModal(false)}>Cerrar</button>
              <button className="btn btn-primary" onClick={handleAdd}>Agregar</button>
            </div>
          </div>
        </div>
      </div>
  
      {/* Modal para editar usuario */}
      <div className={`modal fade ${showEditModal ? 'show' : ''}`} style={{ display: showEditModal ? 'block' : 'none' }}>
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Editar Usuario</h5>
              <button type="button" className="btn-close" onClick={() => setShowEditModal(false)}></button>
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
              <input type="text" className="form-control mb-2" placeholder="Nombre de Usuario" value={usuario} onChange={(e) => setusuario(e.target.value)} />
              <input type="password" className="form-control mb-2" placeholder="Contraseña" value={contrasena} onChange={(e) => setcontrasena(e.target.value)} />
              <select className="form-select mb-2" value={idRol} onChange={(e) => setidRol(e.target.value)}>
                <option value="">Seleccionar Rol</option>
                <option value="Admin">Admin</option>
                <option value="Profesor">Profesor</option>
                <option value="Alumno">Alumno</option>
                <option value="DGA">DGA</option>
                <option value="SE">SE</option>
              </select>
              <select className="form-select" value={estatus} onChange={(e) => setestatus(e.target.value)}>
                <option value="">Seleccionar Estatus</option>
                <option value="Activo">Activo</option>
                <option value="Baja">Baja</option>
              </select>
            </div>
            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={() => setShowEditModal(false)}>Cerrar</button>
              <button className="btn btn-primary" onClick={handleUpdate}>Actualizar</button>
            </div>
          </div>
        </div>
      </div>
  
      {/* Modal para eliminar usuario */}
      <div className={`modal fade ${showDeleteModal ? 'show' : ''}`} style={{ display: showDeleteModal ? 'block' : 'none' }}>
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Eliminar Usuario</h5>
              <button type="button" className="btn-close" onClick={() => setShowDeleteModal(false)}></button>
            </div>
            <div className="modal-body">
              <p>¿Estás seguro de que deseas eliminar al usuario: <strong>{selectedUsuario?.nombreUsuario} ({selectedUsuario?.nombre})</strong>?</p>
            </div>
            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={() => setShowDeleteModal(false)}>Cancelar</button>
              <button className="btn btn-danger" onClick={handleDelete}>Eliminar</button>
            </div>
          </div>
        </div>
      </div>
  
      {/* Modal para agregar rol */}
      <div className={`modal fade ${showAddRolModal ? 'show' : ''}`} style={{ display: showAddRolModal ? 'block' : 'none' }}>
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Agregar Rol</h5>
              <button type="button" className="btn-close" onClick={() => setShowAddRolModal(false)}></button>
            </div>
            <div className="modal-body">
              <select className="form-select" value={idRol} onChange={(e) => setidRol(e.target.value)}>
                <option value="">Seleccionar Rol</option>
                <option value="Admin">Admin</option>
                <option value="Profesor">Profesor</option>
                <option value="Alumno">Alumno</option>
                <option value="DGA">DGA</option>
                <option value="SE">SE</option>
              </select>
            </div>
            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={() => setShowAddRolModal(false)}>Cerrar</button>
              <button className="btn btn-primary" onClick={handleAddRol}>Agregar</button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Modal para eliminar rol */}
      <div className={`modal fade ${showDeleteRolModal ? 'show' : ''}`} style={{ display: showDeleteRolModal ? 'block' : 'none' }}>
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Eliminar Rol</h5>
              <button type="button" className="btn-close" onClick={() => setShowDeleteRolModal(false)}></button>
            </div>
            <div className="modal-body">
              <p>¿Estás seguro de que deseas eliminar al usuario: <strong>{selectedRol?.nombreUsuario}</strong>?</p>
            </div>
            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={() => setShowDeleteRolModal(false)}>Cancelar</button>
              <button className="btn btn-danger" onClick={handleDeleteRol}>Eliminar</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
  