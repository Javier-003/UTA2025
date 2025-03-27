import '../../../assets/css/App.css';
import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import DataTable from 'react-data-table-component';
import { getActividad, addActividad, updateActividadFunc, deleteActividadFunc } from '../../../assets/js/Parametrizacion/actividad.js';
import { ActividadModales } from './ActividadModales.jsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

function Actividad() {
  const [nombre, setnombre] = useState("");
  const [actividadList, setActividad] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedActividad, setSelectedActividad] = useState(null);
  const [searchText, setSearchText] = useState("");

  useEffect(() => { getActividad(setActividad); }, []);

  const handleAdd = () => {
    addActividad(nombre, setShowModal, () => getActividad(setActividad));
  };
  const handleUpdate = () => {
    updateActividadFunc(selectedActividad.idActividad, nombre, setShowEditModal, () => getActividad(setActividad));
  };
  const handleDelete = () => {
    deleteActividadFunc(selectedActividad.idActividad, setShowDeleteModal, () => getActividad(setActividad));
  };

  const columns = [
    { name: 'Nombre de Actividad', selector: row => row.nombre, sortable: true },
    {
      name: 'Acciones',
      cell: row => (
        <div className="d-flex justify-content-between">
          <button className="btn btn-primary me-2" onClick={() => {
            setSelectedActividad(row);
            setnombre(row.nombre);
            setShowEditModal(true);
          }}>
            <FontAwesomeIcon icon={faEdit} />
          </button>
          <button className="btn btn-danger" onClick={() => {
            setSelectedActividad(row);
            setShowDeleteModal(true);
          }}>
            <FontAwesomeIcon icon={faTrash} />
          </button>
        </div>
      )
    }
  ];

  const dataToDisplay = actividadList.filter(item =>
    item.nombre.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <div className="container mt-4">
      <DataTable
        title={
          <div className="d-flex justify-content-between align-items-center w-100">
            <button className='btn btn-success me-2' onClick={() => {
              setnombre("");
              setSelectedActividad(null);
              setShowModal(true);
            }}>
              <FontAwesomeIcon icon={faPlus} /> Registrar
            </button>
            <h5 className="flex-grow-1 text-center">LISTADO DE ACTIVIDADES</h5>
            <input type="text" className="form-control ms-2 w-25" value={searchText}
              onChange={(e) => setSearchText(e.target.value)} placeholder="Buscar actividad"/>
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
      <ActividadModales
        nombre={nombre} setnombre={setnombre}
        showModal={showModal} setShowModal={setShowModal}
        showEditModal={showEditModal} setShowEditModal={setShowEditModal}
        showDeleteModal={showDeleteModal} setShowDeleteModal={setShowDeleteModal}
        handleAdd={handleAdd} 
        handleUpdate={handleUpdate} 
        handleDelete={handleDelete}
        selectedActividad={selectedActividad}
      /><br></br><br></br>
    </div>
  );
}

export default Actividad;
