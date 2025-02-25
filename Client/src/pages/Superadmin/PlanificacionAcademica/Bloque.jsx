import '../../../assets/css/App.css';
import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import DataTable from 'react-data-table-component';
import { getBloque, addBloque, updateBloqueFunc, deleteBloqueFunc } from '../../../assets/js/PlanificacionAcademica/bloque.js';
import { BloqueModales } from '../PlanificacionAcademica/BloqueModales.jsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

function Bloque() {
  const [nombre, setNombre] = useState("");
  const [duracion, setDuracion] = useState("");
  const [horaInicio, setHoraInicio] = useState("");
  const [horaFin, setHoraFin] = useState("");
  const [bloqueList, setBloque] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedBloque, setSelectedBloque] = useState(null);
  const [searchText, setSearchText] = useState("");

  useEffect(() => { getBloque(setBloque); }, []);

  const handleAdd = () => {
    addBloque(nombre, duracion, horaInicio, horaFin, setShowModal, () => getBloque(setBloque));
  };

  const handleUpdate = () => {
    updateBloqueFunc(selectedBloque.idBloque, nombre, duracion, horaInicio, horaFin, setShowEditModal, () => getBloque(setBloque));
  };

  const handleDelete = () => {
    deleteBloqueFunc(selectedBloque.idBloque, setShowDeleteModal, () => getBloque(setBloque));
  };

  const columns = [
    { name: 'Nombre', selector: row => row.nombre, sortable: true },
    { name: 'Duración', selector: row => row.duracion, sortable: true },
    { name: 'Hora de Inicio', selector: row => row.horaInicio, sortable: true },
    { name: 'Hora de Fin', selector: row => row.horaFin, sortable: true },
    {
      name: 'Acciones',
      cell: row => (
        <div className="d-flex justify-content-between">
          <button className="btn btn-primary me-2" onClick={() => {
            setSelectedBloque(row);
            setNombre(row.nombre);
            setDuracion(row.duracion);
            setHoraInicio(row.horaInicio);
            setHoraFin(row.horaFin);
            setShowEditModal(true);
          }}>
            <FontAwesomeIcon icon={faEdit} />
          </button>
          <button className="btn btn-danger" onClick={() => {
            setSelectedBloque(row);
            setShowDeleteModal(true);
          }}>
            <FontAwesomeIcon icon={faTrash} />
          </button>
        </div>
      )
    }
  ];

  const filteredData = bloqueList.filter(item =>
    item.nombre.toLowerCase().includes(searchText.toLowerCase())
  );

  const dataToDisplay = searchText ? filteredData : bloqueList.slice(-20);

  return (
    <div className="container mt-4">
      <DataTable
        title={
          <div className="d-flex justify-content-between align-items-center w-100">
            <button className='btn btn-success me-2' onClick={() => {
              setNombre("");
              setDuracion("");
              setHoraInicio("");
              setHoraFin("");
              setSelectedBloque(null);
              setShowModal(true);
            }}>
              <FontAwesomeIcon icon={faPlus} /> Registrar
            </button>
            <h5 className="flex-grow-1 text-center">LISTADO DE BLOQUES</h5>
            <input type="text" className="form-control ms-2 w-25" value={searchText}
              onChange={(e) => setSearchText(e.target.value)} placeholder="Buscar bloque"/>
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
      <BloqueModales
        nombre={nombre} setNombre={setNombre}
        duracion={duracion} setDuracion={setDuracion}
        horaInicio={horaInicio} setHoraInicio={setHoraInicio}
        horaFin={horaFin} setHoraFin={setHoraFin}
        showModal={showModal} setShowModal={setShowModal}
        showEditModal={showEditModal} setShowEditModal={setShowEditModal}
        showDeleteModal={showDeleteModal} setShowDeleteModal={setShowDeleteModal}
        handleAdd={handleAdd}
        handleUpdate={handleUpdate}
        handleDelete={handleDelete}
        selectedBloque={selectedBloque}
      />
    </div>
  );
}

export default Bloque;
