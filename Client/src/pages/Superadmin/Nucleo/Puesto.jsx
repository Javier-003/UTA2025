import '../../../assets/css/App.css';
import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import DataTable from 'react-data-table-component';
import { getPuesto, addPuesto, updatePuestoFunc, deletePuestoFunc } from '../../../assets/js/Nucleo/puesto.js';
import { PuestoModales } from '../Nucleo/PuestoModales.jsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

function Puesto() {
  const [puestoList, setPuesto] = useState([]);
  const [idDepartamento, setidDepartamento] = useState("");
  const [nombre, setnombre] = useState("");
  const [nombreDepartamento, setnombreDepartamento] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [selectedPuesto, setSelectedPuesto] = useState(null);

  useEffect(() => {
    getPuesto(setPuesto);
  }, []);

  const handleAdd = () => {
    addPuesto(idDepartamento, nombre, setShowModal, () => getPuesto(setPuesto));
  };

  const handleUpdate = () => {
    updatePuestoFunc(selectedPuesto.idPuesto, idDepartamento, nombre, setShowEditModal, () => getPuesto(setPuesto));
  };

  const handleDelete = () => {
    deletePuestoFunc(selectedPuesto.idPuesto, setShowDeleteModal, () => getPuesto(setPuesto));
  };

  const columns = [
    { name: 'Puesto', selector: row => row.nombre, sortable: true },
    { name: 'Departamento', selector: row => row.nombreDepartamento, sortable: true },
    {
      name: 'Acciones',
      cell: row => (
        <div className="d-flex justify-content-between">
          <button className="btn btn-primary me-2" onClick={() => {
            setSelectedPuesto(row);
            setidDepartamento(row.idDepartamento);
            setnombre(row.nombre);
            setnombreDepartamento(row.nombreDepartamento);
            setShowEditModal(true);
          }}>
            <FontAwesomeIcon icon={faEdit} />
          </button>
          <button className="btn btn-danger" onClick={() => {
            setSelectedPuesto(row);
            setShowDeleteModal(true);
          }}>
            <FontAwesomeIcon icon={faTrash} />
          </button>
        </div>
      )
    }
  ];

  const dataToDisplay = puestoList.filter(item =>
    item.nombre.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <div className="container mt-4">
      <DataTable
        title={
          <div className="d-flex justify-content-between align-items-center w-100">
            <button className='btn btn-success me-2' onClick={() => {
              setidDepartamento("");
              setnombre("");
              setnombreDepartamento("");
              setSelectedPuesto(null);
              setShowModal(true);
            }}>
              <FontAwesomeIcon icon={faPlus} /> Registrar
            </button>
            <h5 className="flex-grow-1 text-center">LISTADO DE PUESTOS</h5>
            <input type="text" className="form-control ms-2 w-25" value={searchText}
              onChange={(e) => setSearchText(e.target.value)} placeholder="Buscar por nombre"/>
          </div>
        }
        columns={columns}
        data={dataToDisplay}
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
      <PuestoModales
        idDepartamento={idDepartamento} setidDepartamento={setidDepartamento}
        nombre={nombre} setnombre={setnombre}
        nombreDepartamento={nombreDepartamento} setnombreDepartamento={setnombreDepartamento}
        showModal={showModal} setShowModal={setShowModal}
        showEditModal={showEditModal} setShowEditModal={setShowEditModal}
        showDeleteModal={showDeleteModal} setShowDeleteModal={setShowDeleteModal}
        handleAdd={handleAdd}
        handleUpdate={handleUpdate}
        handleDelete={handleDelete}
        selectedPuesto={selectedPuesto}
      /><br></br><br></br>
    </div>
  );
}

export default Puesto;
