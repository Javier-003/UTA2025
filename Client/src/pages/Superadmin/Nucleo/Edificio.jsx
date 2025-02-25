import '../../../assets/css/App.css';
import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import DataTable from 'react-data-table-component';
import { getEdificio, addEdificio, updateEdificioFunc, deleteEdifcioFunc } from '../../../assets/js/Nucleo/edificio.js';
import { EdificioModales } from '../Nucleo/EdificioModales.jsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

function Edificio() {
  const [nombre, setnombre] = useState("");
  const [sigla, setsigla] = useState('');
  const [edificioList, setEdificio] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedEdificio, setSelectedEdificio] = useState(null);
  const [searchText, setSearchText] = useState("");

  useEffect(() => { getEdificio(setEdificio); }, []);

  const handleAdd = () => {
    addEdificio(nombre, sigla, setShowModal, () => getEdificio(setEdificio));
  };

  const handleUpdate = () => {
    updateEdificioFunc(selectedEdificio.idEdificio, nombre, sigla, setShowEditModal, () => getEdificio(setEdificio));
  };

  const handleDelete = () => {
    deleteEdifcioFunc(selectedEdificio.idEdificio, setShowDeleteModal, () => getEdificio(setEdificio));
  };

  const columns = [
    { name: 'Nombre del Edificio', selector: row => row.nombre, sortable: true },
    { name: 'Sigla', selector: row => row.sigla, sortable: true },
    {
      name: 'Acciones',
      cell: row => (
        <div className="d-flex justify-content-between">
          <button className="btn btn-primary me-2" onClick={() => {
            setSelectedEdificio(row);
            setnombre(row.nombre);
            setsigla(row.sigla);
            setShowEditModal(true);
          }}>
            <FontAwesomeIcon icon={faEdit} />
          </button>
          <button className="btn btn-danger" onClick={() => {
            setSelectedEdificio(row);
            setShowDeleteModal(true);
          }}>
            <FontAwesomeIcon icon={faTrash} />
          </button>
        </div>
      )
    }
  ];

  const filteredData = edificioList.filter(item =>
    item.nombre.toLowerCase().includes(searchText.toLowerCase())
  );

  const dataToDisplay = searchText ? filteredData : edificioList.slice(-10);

  return (
    <div className="container mt-4">
      <DataTable
        title={
          <div className="d-flex justify-content-between align-items-center w-100">
            <button className='btn btn-success me-2' onClick={() => {
              setnombre("");
              setsigla("");
              setSelectedEdificio(null);
              setShowModal(true);
            }}>
              <FontAwesomeIcon icon={faPlus} /> Registrar
            </button>
            <h5 className="flex-grow-1 text-center">LISTADO DE EDIFICIOS</h5>
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
      <EdificioModales
        nombre={nombre} setnombre={setnombre}
        sigla={sigla} setsigla={setsigla}
        showModal={showModal} setShowModal={setShowModal}
        showEditModal={showEditModal} setShowEditModal={setShowEditModal}
        showDeleteModal={showDeleteModal} setShowDeleteModal={setShowDeleteModal}
        handleAdd={handleAdd}
        handleUpdate={handleUpdate}
        handleDelete={handleDelete}
        selectedEdificio={selectedEdificio}
      />
    </div>
  );
}

export default Edificio;
