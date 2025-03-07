import '../../../assets/css/App.css';
import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import DataTable from 'react-data-table-component';
import { getOfertaAcademicaFunc, addOfertaAcademica, updateOfertaAcademicaFunc, deleteOfertaAcademicaFunc } from '../../../assets/js/PlanificacionAcademica/ofertaacademica.js';
import { OfertaAcademicaModales } from './OfertaAcademicaModales.jsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

// Function to remove "T06:00:00.000Z" from dates
const formatDateString = (dateString) => {
  if (dateString) {
    return dateString.split('T')[0];
  }
  return dateString;
};


function OfertaAcademica() {
  const [ofertaAcademicaList, setOfertaAcademica] = useState([]);
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState(null); // Set to null by default
  const [sigla, setSigla] = useState("");
  const [desde, setDesde] = useState("");
  const [hasta, setHasta] = useState(null); // Set to null by default
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [selectedOfertaAcademica, setSelectedOfertaAcademica] = useState(null);
  
  useEffect(() => { getOfertaAcademicaFunc(setOfertaAcademica); }, []);

  const handleAdd = () => {
    addOfertaAcademica(nombre, descripcion, sigla, desde, hasta, setShowModal, () => getOfertaAcademicaFunc(setOfertaAcademica));
  };

  const handleUpdate = () => {
    if (selectedOfertaAcademica) {
      updateOfertaAcademicaFunc(selectedOfertaAcademica.idOfertaAcademica, nombre, descripcion, sigla, desde, hasta, setShowEditModal, () => getOfertaAcademicaFunc(setOfertaAcademica));
    }
  };

  const handleDelete = () => {
    if (selectedOfertaAcademica) {
      deleteOfertaAcademicaFunc(selectedOfertaAcademica.idOfertaAcademica, setShowDeleteModal, () => getOfertaAcademicaFunc(setOfertaAcademica));
    }
  };

  const columns = [
    { name: 'Nombre', selector: row => row.nombre, sortable: true },
    { name: 'Descripción', selector: row => row.descripcion || '', sortable: true },
    { name: 'Sigla', selector: row => row.sigla, sortable: true },
    { name: 'Desde', selector: row => formatDateString(row.desde), sortable: true },
    { name: 'Hasta', selector: row => row.hasta ? formatDateString(row.hasta) : '', sortable: true },
    {
      name: 'Acciones',
      cell: row => (
        <div className="d-flex justify-content-between">
          <button className="btn btn-primary me-2" onClick={() => {
            setSelectedOfertaAcademica(row);
            setNombre(row.nombre);
            setDescripcion(row.descripcion);
            setSigla(row.sigla);
            setDesde(formatDateString(row.desde));
            setHasta(row.hasta ? formatDateString(row.hasta) : '');
            setShowEditModal(true);
          }}>
            <FontAwesomeIcon icon={faEdit} />
          </button>
          <button className="btn btn-danger" onClick={() => {
            setSelectedOfertaAcademica(row);
            setShowDeleteModal(true);
          }}>
            <FontAwesomeIcon icon={faTrash} />
          </button>
        </div>
      )
    }
  ];

  const filteredData = ofertaAcademicaList.filter(item =>
    item.nombre.toLowerCase().includes(searchText.toLowerCase())
  );

  const dataToDisplay = searchText ? filteredData : ofertaAcademicaList.slice(-10);

  return (
    <div className="container mt-4">
      <DataTable
        title={
          <div className="d-flex justify-content-between align-items-center w-100">
            <button className='btn btn-success me-2' onClick={() => {
              setNombre("");
              setDescripcion(null); // Set to null when opening modal
              setSigla("");
              setDesde("");
              setHasta(null); // Set to null when opening modal
              setShowModal(true);
            }}>
              <FontAwesomeIcon icon={faPlus} /> Agregar Oferta Académica
            </button>
            <h5 className="flex-grow-1 text-center">LISTADO DE OFERTA ACADÉMICA</h5>
            <input type="text" className="form-control ms-2 w-25" placeholder="Buscar por nombre" onChange={(event) => setSearchText(event.target.value)} />
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
      <OfertaAcademicaModales
        nombre={nombre}
        setNombre={setNombre}
        descripcion={descripcion}
        setDescripcion={setDescripcion}
        sigla={sigla}
        setSigla={setSigla}
        desde={desde}
        setDesde={setDesde}
        hasta={hasta}
        setHasta={setHasta}
        showModal={showModal}
        setShowModal={setShowModal}
        showEditModal={showEditModal}
        setShowEditModal={setShowEditModal}
        showDeleteModal={showDeleteModal}
        setShowDeleteModal={setShowDeleteModal}
        handleAdd={handleAdd}
        handleUpdate={handleUpdate}
        handleDelete={handleDelete}
        selectedOfertaAcademica={selectedOfertaAcademica}
      />
    </div>
  );
}

export default OfertaAcademica;
