import '../../../assets/css/App.css';
import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import DataTable from 'react-data-table-component';
import { getDepartamento, addDepartamento, updateDepartamentoFunc, deleteDepartamentoFunc } from '../../../assets/js/Nucleo/departamento.js';
import { DepartamentoModales } from '../Nucleo/DepartamentoModales.jsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

function Departamento() {
  const [nombre, setnombre] = useState("");
  const [sigla, setsigla] = useState('');
  const [departamentoList, setDepartamento] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedDepartamento, setSelectedDepartamento] = useState(null);
  const [searchText, setSearchText] = useState("");

  useEffect(() => { 
    getDepartamento(setDepartamento); 
  }, []);

  const handleAdd = () => {
    addDepartamento(nombre, sigla, setShowModal, () => getDepartamento(setDepartamento));
  };
  const handleUpdate = () => {
    updateDepartamentoFunc(selectedDepartamento.idDepartamento, nombre, sigla, setShowEditModal, () => getDepartamento(setDepartamento));
  };
  const handleDelete = () => {
    deleteDepartamentoFunc(selectedDepartamento.idDepartamento, setShowDeleteModal, () => getDepartamento(setDepartamento));
  };

  const columns = [
    { name: 'Nombre del Departamento', selector: row => row.nombre, sortable: true },
    { name: 'Sigla', selector: row => row.sigla, sortable: true },
    {
      name: 'Acciones',
      cell: row => (
        <div className="d-flex justify-content-between">
          <button className="btn btn-primary me-2" onClick={() => {
            setSelectedDepartamento(row);
            setnombre(row.nombre);
            setsigla(row.sigla);
            setShowEditModal(true);
          }}>
            <FontAwesomeIcon icon={faEdit} />
          </button>
          <button className="btn btn-danger" onClick={() => {
            setSelectedDepartamento(row);
            setShowDeleteModal(true);
          }}>
            <FontAwesomeIcon icon={faTrash} />
          </button>
        </div>
      )
    }
  ];

  const filteredData = departamentoList.filter(item =>
    item.nombre.toLowerCase().includes(searchText.toLowerCase())
  );

  const dataToDisplay = searchText ? filteredData : departamentoList.slice(-10);

  return (
    <div className="container mt-4">
      <DataTable
        title={
          <div className="d-flex justify-content-between align-items-center w-100">
            <button className='btn btn-success me-2' onClick={() => {
              setnombre("");
              setsigla("");
              setSelectedDepartamento(null);
              setShowModal(true);
            }}>
              <FontAwesomeIcon icon={faPlus} /> Registrar
            </button>
            <h5 className="flex-grow-1 text-center">LISTADO DE DEPARTAMENTOS</h5>
            <input type="text" className="form-control ms-2 w-25" value={searchText}
              onChange={(e) => setSearchText(e.target.value)} placeholder="Buscar por nombre"/>
          </div>
        }
        columns={columns}
        data={dataToDisplay}
        noDataComponent="No hay registros para mostrar"
        pagination
        paginationPerPage={10}
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
      <DepartamentoModales
        nombre={nombre} setnombre={setnombre}
        sigla={sigla} setsigla={setsigla}
        showModal={showModal} setShowModal={setShowModal}
        showEditModal={showEditModal} setShowEditModal={setShowEditModal}
        showDeleteModal={showDeleteModal} setShowDeleteModal={setShowDeleteModal}
        handleAdd={handleAdd}
        handleUpdate={handleUpdate}
        handleDelete={handleDelete}
        selectedDepartamento={selectedDepartamento}
      />
    </div>
  );
}

export default Departamento;
