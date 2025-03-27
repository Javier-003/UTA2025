import '../../../assets/css/App.css';
import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import DataTable from 'react-data-table-component';
import { getTramite, addTramite, updateTramiteFunc, deleteTramiteFunc } from '../../../assets/js/Parametrizacion/tramite.js';
import { TramiteModales } from './TramitesModales.jsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

function Tramite() {
  const [nombre, setnombre] = useState(""); 
  const [desde, setdesde] = useState('');
  const [hasta, sethasta] = useState(''); // Inicializamos hasta como cadena vacía
  const [tramiteList, setTramite] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedTramite, setSelectedTramite] = useState(null);
  const [searchText, setSearchText] = useState("");

  useEffect(() => { getTramite(setTramite); }, []);

  const handleAdd = () => {
    addTramite(nombre, desde, hasta || null, setShowModal, () => getTramite(setTramite)); // Pasamos null en lugar de hasta si está vacío
    setnombre("");
    setdesde("");
    sethasta("");
  };

  const handleUpdate = () => {
    updateTramiteFunc(selectedTramite.idTramite, nombre, desde, hasta || null, setShowEditModal, () => getTramite(setTramite)); // Pasamos null en lugar de hasta si está vacío
  };

  const handleDelete = () => {
    deleteTramiteFunc(selectedTramite.idTramite, setShowDeleteModal, () => getTramite(setTramite));
  };

  const formatDate = (date) => {
    return new Date(date).toISOString().split('T')[0];
  };

  const columns = [
    { name: 'Nombre de Trámite', selector: row => row.nombre, sortable: true },
    { name: 'Desde', selector: row => row.desde ? new Date(row.desde).toLocaleDateString() : '', sortable: true },
    { name: 'Hasta', selector: row => row.hasta ? new Date(row.hasta).toLocaleDateString() : '', sortable: true },
    {
      name: 'Acciones',
      cell: row => (
        <div className="d-flex justify-content-between">
          <button className="btn btn-primary me-2" onClick={() => {
            setSelectedTramite(row);
            setnombre(row.nombre);
            setdesde(row.desde ? formatDate(row.desde) : ''); // Manejamos el caso de fecha nula
            sethasta(row.hasta ? formatDate(row.hasta) : ''); // Manejamos el caso de fecha nula
            setShowEditModal(true);
          }}>
            <FontAwesomeIcon icon={faEdit} />
          </button>
          <button className="btn btn-danger" onClick={() => {
            setSelectedTramite(row);
            setShowDeleteModal(true);
          }}>
            <FontAwesomeIcon icon={faTrash} />
          </button>
        </div>
      )
    }
  ];

  const dataToDisplay = tramiteList.filter(item =>
    item.nombre.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <div className="container mt-4">
      <DataTable
        title={
          <div className="d-flex justify-content-between align-items-center w-100">
            <button className='btn btn-success me-2' onClick={() => {
              setnombre("");
              setdesde("");
              sethasta("");
              setSelectedTramite(null);
              setShowModal(true);
            }}>
              <FontAwesomeIcon icon={faPlus} /> Registrar
            </button>
            <h5 className="flex-grow-1 text-center">LISTADO DE TRÁMITES</h5>
            <input type="text" className="form-control ms-2 w-25" value={searchText}
              onChange={(e) => setSearchText(e.target.value)} placeholder="Buscar Trámite"/>
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
      <TramiteModales
        nombre={nombre} setnombre={setnombre}
        desde={desde} setdesde={setdesde}
        hasta={hasta} sethasta={sethasta}
        showModal={showModal} setShowModal={setShowModal}
        showEditModal={showEditModal} setShowEditModal={setShowEditModal}
        showDeleteModal={showDeleteModal} setShowDeleteModal={setShowDeleteModal}
        handleAdd={handleAdd}
        handleUpdate={handleUpdate}
        handleDelete={handleDelete}
        selectedTramite={selectedTramite}
      /><br></br><br></br>
    </div>
  );
}

export default Tramite;
