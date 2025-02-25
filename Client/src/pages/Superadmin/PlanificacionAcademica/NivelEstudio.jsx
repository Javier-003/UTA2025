import '../../../assets/css/App.css';
import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import DataTable from 'react-data-table-component';
import { getnivelestudio, addNivelEstudio, updateNivelEstudioFunc, deleteNivelEstudioFunc } from '../../../assets/js/PlanificacionAcademica/nivelestudio.js';
import { NivelEstudioModales } from '../PlanificacionAcademica/NivelEstudioModales.jsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

function NivelEstudio() {
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState('');
  const [sigla, setSigla] = useState('');
  const [nivelEstudioList, setNivelEstudio] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedNivelEstudio, setSelectedNivelEstudio] = useState(null);
  const [searchText, setSearchText] = useState("");

  useEffect(() => { getnivelestudio(setNivelEstudio); }, []);

  const handleAdd = () => {
    addNivelEstudio(nombre, descripcion, sigla, setShowModal, () => getnivelestudio(setNivelEstudio));
  };

  const handleUpdate = () => {
    updateNivelEstudioFunc(selectedNivelEstudio.idnivelEstudio, nombre, descripcion, sigla, setShowEditModal, () => getnivelestudio(setNivelEstudio));
  };

  const handleDelete = () => {
    deleteNivelEstudioFunc(selectedNivelEstudio.idnivelEstudio, setShowDeleteModal, () => getnivelestudio(setNivelEstudio));
  };

  const columns = [
    { name: 'Nombre', selector: row => row.nombre, sortable: true },
    { name: 'Descripción', selector: row => row.descripcion, sortable: true },
    { name: 'Sigla', selector: row => row.sigla, sortable: true },
    {
      name: 'Acciones',
      cell: row => (
        <div className="d-flex justify-content-between">
          <button className="btn btn-primary me-2" onClick={() => {
            setSelectedNivelEstudio(row);
            setNombre(row.nombre);
            setDescripcion(row.descripcion);
            setSigla(row.sigla);
            setShowEditModal(true);
          }}>
            <FontAwesomeIcon icon={faEdit} />
          </button>
          <button className="btn btn-danger" onClick={() => {
            setSelectedNivelEstudio(row);
            setShowDeleteModal(true);
          }}>
            <FontAwesomeIcon icon={faTrash} />
          </button>
        </div>
      )
    }
  ];

  const filteredData = nivelEstudioList.filter(item =>
    item.nombre.toLowerCase().includes(searchText.toLowerCase()) ||
    item.descripcion.toLowerCase().includes(searchText.toLowerCase()) ||
    item.sigla.toLowerCase().includes(searchText.toLowerCase())
  );

  const dataToDisplay = searchText ? filteredData : nivelEstudioList.slice(-10);

  return (
    <div className="container mt-4">
      <DataTable
        title={
          <div className="d-flex justify-content-between align-items-center w-100">
            <button className='btn btn-success me-2' onClick={() => {
              setNombre("");
              setDescripcion("");
              setSigla("");
              setSelectedNivelEstudio(null);
              setShowModal(true);
            }}>
              <FontAwesomeIcon icon={faPlus} /> Registrar
            </button>
            <h5 className="flex-grow-1 text-center">LISTADO DE NIVELES DE ESTUDIO</h5>
            <input type="text" className="form-control ms-2 w-25" value={searchText}
              onChange={(e) => setSearchText(e.target.value)} placeholder="Buscar Nivel Estudio"/>
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
      <NivelEstudioModales
        nombre={nombre} setNombre={setNombre}
        descripcion={descripcion} setDescripcion={setDescripcion}
        sigla={sigla} setSigla={setSigla}
        showModal={showModal} setShowModal={setShowModal}
        showEditModal={showEditModal} setShowEditModal={setShowEditModal}
        showDeleteModal={showDeleteModal} setShowDeleteModal={setShowDeleteModal}
        handleAdd={handleAdd}
        handleUpdate={handleUpdate}
        handleDelete={handleDelete}
        selectedNivelEstudio={selectedNivelEstudio}
      />
    </div>
  );
}

export default NivelEstudio;
