import '../../../assets/css/App.css';
import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import DataTable from 'react-data-table-component';
import { getUsuario, addUsuario, updateUsuarioFunc, deleteUsuarioFunc } from '../../../assets/js/Nucleo/usuario.js';
import { addRolUsuarioFunc, deleteRolUsuarioFunc } from '../../../assets/js/Nucleo/rol.js';
import { UsuarioModales } from '../Nucleo/UsuarioModales.jsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faEdit, faTrash, faUserPlus, faUserMinus } from '@fortawesome/free-solid-svg-icons';

function Usuario() {
  const [usuarioList, setUsuarios] = useState([]);
  const [idPersona, setidPersona] = useState("");
  const [nombre, setnombre] = useState("");
  const [paterno, setpaterno] = useState("");
  const [materno, setmaterno] = useState("");
  const [usuario, setusuario] = useState("");
  const [estatus, setEstatus] = useState("");
  const [contrasena, setcontrasena] = useState("");
  const [rol, setRol] = useState("");
  const [rolId, setRolId] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showAddRoleModal, setShowAddRoleModal] = useState(false);
  const [showDeleteRoleModal, setShowDeleteRoleModal] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [selectedUsuario, setSelectedUsuario] = useState(null);
  const [selectedRole, setSelectedRole] = useState("");

  useEffect(() => {
    getUsuario(setUsuarios);
  }, []);

  const handleAdd = () => {
    addUsuario(idPersona, usuario, contrasena, estatus, rolId, setShowModal, () => getUsuario(setUsuarios));
  };

  const handleUpdate = () => {
    updateUsuarioFunc(selectedUsuario.idUsuario, idPersona, usuario, contrasena, estatus, setShowEditModal, () => getUsuario(setUsuarios));
  };

  const handleDelete = () => {
    deleteUsuarioFunc(selectedUsuario.idUsuario, setShowDeleteModal, () => getUsuario(setUsuarios));
  };

  const handleAddRole = () => {
    addRolUsuarioFunc(selectedUsuario.idUsuario, selectedRole, setShowAddRoleModal, () => getUsuario(setUsuarios));
  };

  const handleDeleteRole = () => {
    deleteRolUsuarioFunc(selectedUsuario.idUsuario, selectedRole, setShowDeleteRoleModal, () => getUsuario(setUsuarios));
  };

  const columns = [
    { name: 'Usuario', selector: row => row.usuario, sortable: true },
    { name: 'Nombre Completo', selector: row => `${row.nombre} ${row.paterno} ${row.materno}`, sortable: true },
    { name: 'Roles', selector: row => row.rol, sortable: true },
    { name: 'Estatus', selector: row => row.estatus ? 'Activo' : 'Inactivo', sortable: true },
    {
      name: 'Acciones',
      cell: row => (
        <div className="d-flex justify-content-between">
          <button className="btn btn-primary me-2" onClick={() => {
            setSelectedUsuario(row);
            setidPersona(row.idPersona);
            setnombre(row.nombre);
            setpaterno(row.paterno);
            setmaterno(row.materno);
            setusuario(row.usuario);
            setEstatus(row.estatus);
            setRolId(row.rolId);
            setRol(row.rol);
            setShowEditModal(true);
          }}>
            <FontAwesomeIcon icon={faEdit} />
          </button>
          <button className="btn btn-danger me-2" onClick={() => {
            setSelectedUsuario(row);
            setShowDeleteModal(true);
          }}>
            <FontAwesomeIcon icon={faTrash} />
          </button>
        </div>
      )
    },    
    {
      name: 'Agregar Rol y Eliminar',
      cell: row => (
        <div className="d-flex justify-content-between">

          <button className="btn btn-success me-2" onClick={() => {
            setSelectedUsuario(row);
            setShowAddRoleModal(true);
          }}>
            <FontAwesomeIcon icon={faUserPlus} /> 
          </button>
          <button className="btn btn-warning" onClick={() => {
            setSelectedUsuario(row);
            setShowDeleteRoleModal(true);
          }}>
            <FontAwesomeIcon icon={faUserMinus} /> 
          </button>
        </div>
      )
    }
  ];

  const dataToDisplay = usuarioList.filter(item =>
    item.usuario.toLowerCase().includes(searchText.toLowerCase())
  );
  
  return (
    <div className="container mt-4">
      <DataTable
        title={
          <div className="d-flex justify-content-between align-items-center w-100">
            <button className='btn btn-success me-2' onClick={() => {
              setidPersona("");
              setnombre("");
              setpaterno("");
              setmaterno("");
              setcontrasena("");
              setusuario("");
              setEstatus("1");
              setRol("");
              setRolId("");
              setSelectedUsuario(null);
              setShowModal(true);
            }}>
              <FontAwesomeIcon icon={faPlus} /> Registrar
            </button>
            <h5 className="flex-grow-1 text-center">LISTADO DE USUARIOS</h5>
            <input type="text" className="form-control ms-2 w-25" value={searchText} onChange={(e) => setSearchText(e.target.value)} placeholder="Buscar por usuario" />
          </div>
        }
        columns={columns}
        data={dataToDisplay}
        pagination={10}
        noDataComponent="No hay registros para mostrar"
        paginationComponentOptions={{
          rowsPerPageText: 'Filas por página',
          rangeSeparatorText: 'de',
          noRowsPerPage: true
        }}
        highlightOnHover
        customStyles={{
          headCells: {
            style: { backgroundColor: '#f8f9fa' }
          },
          cells: {
            style: { border: '1px solid #ddd' }
          }
        }}
      />
      <UsuarioModales
        idPersona={idPersona} setidPersona={setidPersona}
        nombre={nombre} setnombre={setnombre}
        paterno={paterno} setpaterno={setpaterno}
        materno={materno} setmaterno={setmaterno}
        usuario={usuario} setUsuario={setusuario}
        contrasena={contrasena} setcontrasena={setcontrasena}
        estatus={estatus} setEstatus={setEstatus}
        rol={rol} setRol={setRol}
        rolId={rolId} setRolId={setRolId}
        showModal={showModal} setShowModal={setShowModal}
        showEditModal={showEditModal} setShowEditModal={setShowEditModal}
        showDeleteModal={showDeleteModal} setShowDeleteModal={setShowDeleteModal}
        showAddRoleModal={showAddRoleModal} setShowAddRoleModal={setShowAddRoleModal}
        showDeleteRoleModal={showDeleteRoleModal} setShowDeleteRoleModal={setShowDeleteRoleModal}
        handleAdd={handleAdd}
        handleUpdate={handleUpdate}
        handleDelete={handleDelete}
        handleAddRole={handleAddRole}
        handleDeleteRole={handleDeleteRole}
        selectedUsuario={selectedUsuario}
        selectedRole={selectedRole} setSelectedRole={setSelectedRole}
      /><br></br><br></br>
    </div>
  );
}

export default Usuario;
