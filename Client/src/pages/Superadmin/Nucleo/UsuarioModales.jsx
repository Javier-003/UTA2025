/* eslint-disable react/prop-types */
import { useState, useEffect, Fragment } from 'react';
import { getPersonas } from "../../../api/Nucleo/persona.api.js";

export const UsuarioModales = ({
  idPersona, setidPersona,
  usuario, setUsuario,
  estatus, setEstatus,
  contrasena, setcontrasena,
  rolId, setRolId,
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
  const [usuarioList, setUsuarios] = useState([]);
  const [rolesUsuario, setRolesUsuario] = useState([]); // Nuevo estado para almacenar los roles del usuario

  useEffect(() => {
    getPersonas().then(data => setUsuarios(data)).catch(error => console.error("Error al obtener las personas:", error));
  }, []);

  useEffect(() => {
    if (selectedUsuario) {
      if(selectedUsuario.rolId && selectedUsuario.rol){
        const rolesArray = selectedUsuario.rol.includes(',')
        ? selectedUsuario.rol.split(',').map(role => role.trim())
        : [selectedUsuario.rol];

        const rolesIdArray = selectedUsuario.rolId.includes(',')
          ? selectedUsuario.rolId.split(',').map(id => id.trim())
          : [selectedUsuario.rolId];

        const rolesConIds = rolesArray.map((role, index) => ({
          id: rolesIdArray[index],
          nombre: role
        }));

        setRolesUsuario(rolesConIds); // Establecer el array actualizado de roles
      } else {
        setRolesUsuario([]);
      }
    } else {
      console.log('selectedUsuario.rolId o selectedUsuario.rol no están disponibles');
    }
  }, [selectedUsuario]); // Ejecutar cuando selectedUsuario cambie

  return (
    <Fragment>
      {/* Modal para registrar usuario */}
      <div className={`modal fade ${showModal ? 'show' : ''}`}
        style={{ display: showModal ? 'block' : 'none' }}
        tabIndex="-1"
        aria-labelledby="modalLabel"
        // Elimina aria-hidden cuando showModal es true para no afectar el acceso a los elementos dentro del modal
        aria-hidden={showModal ? "false" : "true"}>
        <div className="modal-dialog modal-dialog-right ">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="modalLabel">Registrar Usuario</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={() => setShowModal(false)}></button>
            </div>
            <div className="modal-body">
              {/* Campo para seleccionar persona */}
              <div className="input-group mb-3">
                <span className="input-group-text">Persona:</span>
                <select className="form-select" value={idPersona || ''} onChange={(event) => setidPersona(event.target.value)}>
                  <option value="">Selecciona una persona</option>
                  {usuarioList.map((persona) => (
                    <option key={persona.idPersona} value={persona.idPersona}>
                      {`${persona.nombre} ${persona.paterno} ${persona.materno}`}
                    </option>
                  ))}
                </select>
              </div>

              {/* Campo para ingresar el nombre de usuario */}
              <div className="input-group mb-3">
                <span className="input-group-text">Usuario:</span>
                <input type="text" className="form-control" value={usuario} onChange={(event) => setUsuario(event.target.value)} />
              </div>

              {/* Campo para ingresar la contraseña */}
              <div className="input-group mb-3">
                <span className="input-group-text">Contraseña:</span>
                <input type={showPassword ? 'text' : 'password'} className="form-control" value={contrasena}
                  onChange={(event) => setcontrasena(event.target.value)} />
                <button className="btn btn-outline-secondary" type="button"
                  onClick={() => setShowPassword(!showPassword)}>{showPassword ? '🙈' : '👁️'}
                </button>
              </div>

              {/* Campo para seleccionar el rol */}
              <div className="input-group mb-3">
                <span className="input-group-text">Roles:</span>
                <select className="form-control" value={rolId} onChange={(event) => setRolId(event.target.value)}>
                  <option value="">Selecciona un rol</option>
                  <option value="1">Administrador</option>
                  <option value="2">Profesor</option>
                  <option value="3">Alumno</option>
                  <option value="4">Dirección Academica</option>
                  <option value="5">Servicios Escolares</option>
                  <option value="6">Cordinador Licienciatura</option>
                  <option value="7">Tesoreria</option>
                </select>
              </div>

              {/* Campo para seleccionar el estatus */}
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
                <select className="form-select" value={idPersona || ''} onChange={(event) => setidPersona(event.target.value)} disabled>
                  <option value="">Selecciona una persona</option>
                  {usuarioList.map((persona) => (
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
            {/* Filtrar roles que el usuario no tiene */}
            {rolesUsuario.length === 7 ? (<p>Este usuario ya tiene todos los roles asignados.</p>) : (
              <select className="form-select" onChange={(event) => setSelectedRole(event.target.value)}>
                <option value="">Seleccionar Rol</option>
                {[{id:'1',name:'Administrador'},{id:'2',name:'Profesor'}, {id:'3',name:'Alumno'}, {id:'4',name:'Dirección Académica'}, 
                {id:'5',name:'Servicios Escolares'},{id:'6',name:'Coordinador Licenciatura'}, {id:'7',name:'Tesorería'}]
                .filter(role => !rolesUsuario.some(r => r.nombre === role.name)) 
                .map((role) => ( <option key={role.id} value={role.id}>{role.name}</option>))}</select>)}
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
            {/* Filtrar roles que el usuario tiene */}
            <select className="form-select" value={selectedRole} onChange={(event) => setSelectedRole(event.target.value)}>
              <option value="">Seleccionar Rol a Eliminar</option>
              {rolesUsuario.map((role, index) => (
                <option key={index} value={role.id}>
                  {role.nombre}
                </option>
              ))}
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
