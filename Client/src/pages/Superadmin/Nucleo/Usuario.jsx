import '../../../assets/css/App.css';
import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { getUsuario, addUsuario, updateUsuarioFunc, deleteUsuarioFunc, addRolFunc, deleteRolFunc } from '../../../assets/js/Nucleo/usuario.js';
import { UsuarioModales } from '../Nucleo/UsuarioModales.jsx';

function Usuario() {
  const [usuarios, setUsuarios] = useState([]);
  const [roles] = useState([]);
  const [idRol, setidRol] = useState("");
  const [usuario, setusuario] = useState("");
  const [idPersona, setidPersona] = useState(null); 
  const [nombre, setnombre] = useState(""); 
  const [paterno, setpaterno] = useState(""); 
  const [materno, setmaterno] = useState("");
  const [contrasena, setcontrasena] = useState("");
  const [estatus, setestatus] = useState("");
  const [selectedUsuario, setSelectedUsuario] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showAddRolModal, setShowAddRolModal] = useState(false);
  const [showDeleteRolModal, setShowDeleteRolModal] = useState(false);

  useEffect(() => { getUsuario(setUsuarios); }, []);

  const handleAdd = () => {
    addUsuario(idPersona, usuario, contrasena, idRol, estatus, setShowModal, () => getUsuario(setUsuarios));
  };
  
  const handleUpdate = () => {
    updateUsuarioFunc(selectedUsuario.idUsuario, idPersona, usuario, contrasena, idRol, estatus, setShowEditModal, () => getUsuario(setUsuarios));
  };

  const handleDelete = () => {
    deleteUsuarioFunc(selectedUsuario.idUsuario, setShowDeleteModal, () => getUsuario(setUsuarios));
  };

  const handleAddRol = () => {
    addRolFunc(idRol, () => { setShowAddRolModal(false); getUsuario(setUsuarios); });
  };

  const handleDeleteRol = () => {
    deleteRolFunc(idRol, () => { setShowDeleteRolModal(false); getUsuario(setUsuarios); });
  };

  const handleOptionChange = (option, usuario) => {
    setSelectedUsuario(usuario);
    switch (option) {
      case "Editar Usuario":
        setShowEditModal(true);
        setusuario(usuario.nombreUsuario);
        setidPersona(usuario.idPersona);
        setnombre(usuario.nombre);
        setpaterno(usuario.paterno);
        setmaterno(usuario.materno);
        setcontrasena("");
        setidRol(usuario.idRol);
        setestatus(usuario.estatus);
        break;
      case "Eliminar Usuario":
        setShowDeleteModal(true);
        break;
      case "Crear Rol":
        setShowAddRolModal(true);
        break;
      case "Eliminar Rol":
        setShowDeleteRolModal(true);
        break;
      default:
        break;
    }
  };

  return (
    <div className="container">
      <h5>LISTADO DE USUARIOS</h5>
      <button className='btn btn-success' onClick={() => setShowModal(true)}>Agregar Usuario</button>
      <table className="table table-bordered mt-3">
        <thead>
          <tr>
            <th>ID</th>
            <th>ID P</th>
            <th>Nombre Completo</th>
            <th>idR</th>
            <th>Rol</th>
            <th>Usuario</th>
            <th>Estatus</th>
            <th>Opciones</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.length > 0 ? (
            usuarios.map((usuario) => (
              <tr key={usuario.idUsuario}>
                <td>{usuario.idUsuario}</td>
                <td>{usuario.idPersona}</td>
                <td>{`${usuario.nombre || ''} ${usuario.paterno || ''} ${usuario.materno || ''}`.trim()}</td>
                <td>{usuario.idRol}</td>
                <td>{usuario.nombreRol}</td>
                <td>{usuario.usuario}</td>
                <td>{usuario.estatus ? 'Activo' : 'Inactivo'}</td>
                <td>
                  <div className="dropdown">
                    <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton"
                      data-bs-toggle="dropdown" aria-expanded="false"><i className="bi bi-three-dots"></i></button>
                    <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                      <li><button className="dropdown-item" onClick={() => handleOptionChange("Editar Usuario", usuario)}>Editar Usuario</button></li>
                      <li><button className="dropdown-item" onClick={() => handleOptionChange("Eliminar Usuario", usuario)}>Eliminar Usuario</button></li>
                      <li><button className="dropdown-item" onClick={() => handleOptionChange("Crear Rol", usuario)}>Crear Rol</button></li>
                      <li><button className="dropdown-item" onClick={() => handleOptionChange("Eliminar Rol", usuario)}>Eliminar Rol</button></li>
                    </ul>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr><td colSpan="8">No hay registros disponibles</td></tr>
          )}
        </tbody>
      </table>
      <UsuarioModales
        idPersona={idPersona} setidPersona={setidPersona}
        nombre={nombre} setnombre={setnombre}
        paterno={paterno} setpaterno={setpaterno}
        materno={materno} setmaterno={setmaterno}
        contrasena={contrasena} setcontrasena={setcontrasena}
        idRol={idRol} setidRol={setidRol}
        estatus={estatus} setestatus={setestatus}
        roles={roles} 
        usuarios={usuarios}
        usuario={usuario} setusuario={setusuario}
        showModal={showModal} setShowModal={setShowModal}
        showEditModal={showEditModal} setShowEditModal={setShowEditModal}
        showDeleteModal={showDeleteModal} setShowDeleteModal={setShowDeleteModal}
        showAddRolModal={showAddRolModal} setShowAddRolModal={setShowAddRolModal}
        showDeleteRolModal={showDeleteRolModal} setShowDeleteRolModal={setShowDeleteRolModal}
        handleAdd={handleAdd} handleUpdate={handleUpdate} handleDelete={handleDelete}
        handleAddRol={handleAddRol} handleDeleteRol={handleDeleteRol}
        selectedUsuario={selectedUsuario} />
    </div>
  );
}

export default Usuario;
