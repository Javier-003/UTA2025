import '../../../assets/css/App.css';
import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { getUsuario, addUsuario, updateUsuarioFunc, deleteUsuarioFunc } from '../../../assets/js/Nucleo/usuario.js';
import { addRolUsuarioFunc, deleteRolUsuarioFunc } from '../../../assets/js/Nucleo/rol.js';
import { UsuarioModales } from '../Nucleo/UsuarioModales.jsx';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

function Usuario() {
  const [usuarioList, setUsuarios] = useState([]);
  const [idPersona, setidPersona] = useState("");
  const [nombre, setnombre] = useState(""); 
  const [paterno, setpaterno] = useState(""); 
  const [materno, setmaterno] = useState("");
  const [usuario, setusuario] = useState("");
  const [estatus, setEstatus] = useState("");
  const [contrasena, setcontrasena] = useState("");
  const [roles, setRoles] = useState("");
  const [idRol, setIdRol] = useState(""); // Nuevo estado para rol
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [selectedUsuario, setSelectedUsuario] = useState(null);

  useEffect(() => { 
    getUsuario(setUsuarios); 
  }, []);

  useEffect(() => {
    if (selectedUsuario) {
      setidPersona(selectedUsuario.idPersona);
      setnombre(selectedUsuario.nombre);
      setpaterno(selectedUsuario.paterno);
      setmaterno(selectedUsuario.materno);
      setusuario(selectedUsuario.usuario);
      setEstatus(selectedUsuario.estatus);
      setRoles(selectedUsuario.roles);
      setIdRol(selectedUsuario.idRol);
    }
  }, [selectedUsuario]);

  const filteredData = usuarioList.filter(item =>
    item.usuario.toLowerCase().includes(searchText.toLowerCase())
  );

  const handleAdd = () => {
    addUsuario(idPersona, usuario, contrasena, estatus, idRol, setShowModal, () => getUsuario(setUsuarios));
  };

  const handleUpdate = () => {
    updateUsuarioFunc(selectedUsuario.idUsuario, idPersona, usuario, contrasena, estatus, setShowEditModal, () => getUsuario(setUsuarios));
  };

  const handleDelete = () => {
    deleteUsuarioFunc(selectedUsuario.idUsuario, setShowDeleteModal, () => getUsuario(setUsuarios));
  };

  const handleAddRol = () => {
    addRolUsuarioFunc(selectedUsuario.idUsuario, idRol, setShowModal, () => getUsuario(setUsuarios));
  };

  const handleDeleteRol = () => {
    deleteRolUsuarioFunc(selectedUsuario.idUsuario, idRol, setShowDeleteModal, () => getUsuario(setUsuarios));
  };

  return (
    <div className="container">
      <div className="">
        <h5>LISTADO DE USUARIOS</h5>
        <div className="card-body">
          <button className='btn btn-success' onClick={() => {
            setidPersona("");
            setnombre(""); 
            setpaterno(""); 
            setmaterno("");
            setcontrasena("");
            setusuario("");
            setEstatus("");
            setRoles("");
            setIdRol("");
            setSelectedUsuario(null);
            setShowModal(true);
          }}>Registrar</button>
          <div className="mt-4">
            <input type="text" className="form-control mb-4" value={searchText} onChange={(e) => setSearchText(e.target.value)} placeholder="Buscar por usuario" />
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th>Id Usuario</th>
                  <th>Usuario</th>
                  <th>Estatus</th>
                  <th>Id Persona</th>
                  <th>Nombre Completo</th>
                  <th>Id Rol</th>
                  <th>Roles</th>
                  <th>Opciones</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.length > 0 ? (
                  filteredData.map((usuario) => (
                    <tr key={usuario.idUsuario}>
                      <td>{usuario.idUsuario}</td>
                      <td>{usuario.usuario}</td>
                      <td>{usuario.idPersona}</td>
                      <td>{`${usuario.nombre} ${usuario.paterno} ${usuario.materno}`}</td>              
                      <td>{usuario.rolId}</td>
                      <td>{usuario.roles}</td>
                      <td>{usuario.estatus  ? 'Activo' : 'Inactivo' }</td>
                      <td>
                        <DropdownButton id="dropdown-basic-button" title="Opciones">
                          <Dropdown.Item onClick={() => {
                            setSelectedUsuario(usuario);
                            setShowEditModal(true);
                          }}>Editar</Dropdown.Item>
                          <Dropdown.Item onClick={() => {
                            setSelectedUsuario(usuario);
                            setShowDeleteModal(true);
                          }}>Eliminar</Dropdown.Item>
                          <Dropdown.Item onClick={() => {
                            setSelectedUsuario(usuario);
                            handleAddRol();
                          }}>Agregar Rol</Dropdown.Item>
                          <Dropdown.Item onClick={() => {
                            setSelectedUsuario(usuario);
                            handleDeleteRol();
                          }}>Eliminar Rol</Dropdown.Item>
                        </DropdownButton>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="12">No hay registros para mostrar</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <UsuarioModales
        idPersona={idPersona} setidPersona={setidPersona}
        nombre={nombre} setnombre={setnombre}
        paterno={paterno} setpaterno={setpaterno}
        materno={materno} setmaterno={setmaterno}
        usuario={usuario} setUsuario={setusuario}
        estatus={estatus} setEstatus={setEstatus}
        roles={roles} setRoles={setRoles}
        idRol={idRol} setIdRol={setIdRol} // Añadir esto
        showModal={showModal} setShowModal={setShowModal}
        showEditModal={showEditModal} setShowEditModal={setShowEditModal}
        showDeleteModal={showDeleteModal} setShowDeleteModal={setShowDeleteModal}
        handleAdd={handleAdd}
        handleUpdate={handleUpdate} 
        handleDelete={handleDelete}
        selectedUsuario={selectedUsuario}/>
    </div>
  );
}

export default Usuario;
