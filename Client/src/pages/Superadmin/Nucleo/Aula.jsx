import '../../../assets/css/App.css';
import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import DataTable from 'react-data-table-component';
import { getAula, addAula, updateAulaFunc, deleteAulaFunc } from '../../../assets/js/Nucleo/aula.js';
import { AulaModales } from '../Nucleo/AulaModales.jsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

function Aula() {
  const [aulaList, setAula] = useState([]);
  const [tipo, settipo] = useState("");
  const [nombre, setnombre] = useState("");
  const [sigla, setsigla] = useState("");
  const [idEdificio, setidEdificio] = useState("");
  const [nombreEdificio, setnombreEdificio] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [selectedAula, setSelectedAula] = useState(null);

  useEffect(() => { getAula(setAula); }, []);
  
  const handleAdd = () => {
    addAula(idEdificio, tipo, nombre, sigla, setShowModal, () => getAula(setAula));
  };

  const handleUpdate = () => {
    updateAulaFunc(selectedAula.idAula, idEdificio, tipo, nombre, sigla, setShowEditModal, () => getAula(setAula));
  };

  const handleDelete = () => {
    deleteAulaFunc(selectedAula.idAula, setShowDeleteModal, () => getAula(setAula));
  };

  const columns = [
    { name: 'Nombre del Edificio', selector: row => row.nombreEdificio, sortable: true },
    { name: 'Tipo', selector: row => row.tipo, sortable: true },
    { name: 'Nombre', selector: row => row.nombre, sortable: true },
    { name: 'Sigla', selector: row => row.sigla, sortable: true },
    {
      name: 'Acciones',
      cell: row => (
        <div className="d-flex justify-content-between">
          <button className="btn btn-primary me-2" onClick={() => {
            setSelectedAula(row);
            setidEdificio(row.idEdificio);
            setnombreEdificio(row.nombreEdificio);
            settipo(row.tipo);
            setnombre(row.nombre);
            setsigla(row.sigla);
            setShowEditModal(true);
          }}>
            <FontAwesomeIcon icon={faEdit} />
          </button>
          <button className="btn btn-danger" onClick={() => {
            setSelectedAula(row);
            setShowDeleteModal(true);
          }}>
            <FontAwesomeIcon icon={faTrash} />
          </button>
        </div>
      )
    }
  ];

  const filteredData = aulaList.filter(item =>
    item.nombre.toLowerCase().includes(searchText.toLowerCase())
  );

  const dataToDisplay = searchText ? filteredData : aulaList.slice(-10);

  return (
    <div className="container mt-4">
      <DataTable
        title={
          <div className="d-flex justify-content-between align-items-center w-100">
            <button className='btn btn-success me-2' onClick={() => {
              settipo("");
              setnombre("");
              setsigla("");
              setidEdificio("");
              setnombreEdificio("");
              setSelectedAula(null);
              setShowModal(true);
            }}>
              <FontAwesomeIcon icon={faPlus} /> Registrar
            </button>
            <h5 className="flex-grow-1 text-center">LISTADO DE AULAS</h5>
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
      <AulaModales
        idEdificio={idEdificio} setidEdificio={setidEdificio}
        nombreEdificio={nombreEdificio} setnombreEdificio={setnombreEdificio}
        tipo={tipo} settipo={settipo}
        nombre={nombre} setnombre={setnombre}
        sigla={sigla} setsigla={setsigla}
        showModal={showModal} setShowModal={setShowModal}
        showEditModal={showEditModal} setShowEditModal={setShowEditModal}
        showDeleteModal={showDeleteModal} setShowDeleteModal={setShowDeleteModal}
        handleAdd={handleAdd}
        handleUpdate={handleUpdate} 
        handleDelete={handleDelete}
        selectedAula={selectedAula}
      />
    </div>
  );
}

export default Aula;
