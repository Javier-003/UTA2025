import '../../../assets/css/App.css';
import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import DataTable from 'react-data-table-component';
import { getMateriajs, addMateriajs, updateMateriajs, deleteMateriajs } 
from '../../../assets/js/Parametrizacion/materiaunidad.js';
import { MateriaUnidadModales } from '../Parametrizacion/MateriaUnidadModales.jsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
  
function MateriaUnidad() {
  const [materiaUList, setmateriaUList] = useState([]);
  const [programaEducativo, setProgramaEducativo] = useState("");
  const [materia, setMateria] = useState("");
  const [cuatrimestre, setCuatrimestre] = useState("");
  const [unidad, setUnidad] = useState("");
  const [nombre, setNombre] = useState("");
  const [idMateriaUnidad, setIdMateriaUnidad] = useState("");
  const [idMapaCurricular, setIdMapaCurricular] = useState("");

  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [searchText, setSearchText] = useState(""); 
  const [selectedMateriaU, setSelectedMateriaU] = useState(null);

  useEffect(() => { getMateriajs(setmateriaUList); }, []);

  const handleAdd = () => {
    addMateriajs(
      idMapaCurricular, unidad, nombre, setShowModal, () => getMateriajs(setmateriaUList)
    );
  };

  const handleUpdate = () => {
    updateMateriajs(selectedMateriaU.idMateriaUnidad, idMapaCurricular, unidad, nombre, setShowEditModal, () => getMateriajs(setmateriaUList));
  };

  const handleDelete = () => {
    deleteMateriajs(selectedMateriaU.idMateriaUnidad, setShowDeleteModal, () => getMateriajs(setmateriaUList));
  };

  const columns = [
    { name: 'Programa Educativo', selector: row => row.programaEducativo, sortable: true },
    { name: 'Materia', selector: row => row.materia, sortable: true },
    { name: 'Cuatrimestre', selector: row => row.cuatrimestre, sortable: true },
    { name: 'Unidad', selector: row => row.unidad, sortable: true },
    { name: 'Nombre', selector: row => row.nombre, sortable: true },
    { 
      name: 'Acciones', 
      cell: row => (
        <div className="d-flex justify-content-between">
          <button className="btn btn-primary me-2" onClick={() => {
              setShowEditModal(true); 
              setSelectedMateriaU(row);
              setProgramaEducativo(row.programaEducativo);
              setMateria(row.materia);
              setCuatrimestre(row.cuatrimestre);
              setUnidad(row.unidad);
              setNombre(row.nombre);
              setIdMapaCurricular(row.idMapaCurricular);
              setIdMateriaUnidad(row.idMateriaUnidad);
          }}>
            <FontAwesomeIcon icon={faEdit} />
          </button>
          <button className="btn btn-danger" onClick={() => {  
              setShowDeleteModal(true); 
              setSelectedMateriaU(row);
          }}>
            <FontAwesomeIcon icon={faTrash} />
          </button>
        </div>
      )
    }
  ];

  const filteredData = materiaUList.filter(item =>
    item.nombre.toLowerCase().includes(searchText.toLowerCase())
  );

  return(
    <div className="container mt-4">
      <DataTable
        title={
          <div className="d-flex justify-content-between align-items-center w-100">
            <button className='btn btn-success me-2' onClick={() => {
                setProgramaEducativo("");
                setMateria("");
                setCuatrimestre("");
                setUnidad("");
                setNombre("");
                setIdMateriaUnidad("");
                setIdMapaCurricular("");
                setSelectedMateriaU(null);
                setShowModal(true);
            }}>
              <FontAwesomeIcon icon={faPlus} /> Registrar
            </button>
            <h5 className="flex-grow-1 text-center">LISTADO DE MATERIA UNIDAD</h5>
            <input type="text" className="form-control ms-2 w-25" value={searchText}
              onChange={(e) => setSearchText(e.target.value)} placeholder="Buscar Materia Unidad"/>
          </div>
        }
        columns={columns}
        data={filteredData}
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
      <MateriaUnidadModales
        programaEducativo={programaEducativo} setProgramaEducativo={setProgramaEducativo}
        materia={materia} setMateria={setMateria}
        cuatrimestre={cuatrimestre} setCuatrimestre={setCuatrimestre}
        unidad={unidad} setUnidad={setUnidad}
        nombre={nombre} setNombre={setNombre}
        idMapaCurricular={idMapaCurricular} setIdMapaCurricular={setIdMapaCurricular}
        idMateriaUnidad={idMateriaUnidad} setIdMateriaUnidad={setIdMateriaUnidad}

        showModal={showModal} setShowModal={setShowModal}
        showEditModal={showEditModal} setShowEditModal={setShowEditModal}
        showDeleteModal={showDeleteModal} setShowDeleteModal={setShowDeleteModal}

        handleAdd={handleAdd} 
        handleUpdate={handleUpdate} 
        handleDelete={handleDelete}
      
        selectedMateriaU={selectedMateriaU}
      />
    </div>
  );
}

export default MateriaUnidad;
