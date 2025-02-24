import '../../../assets/css/App.css';
import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import DataTable from 'react-data-table-component';
import { getMateriajs, addMateriajs, updateMateriajs, deleteMateriajs } from '../../../assets/js/Parametrizacion/materiaunidad.js';
import { MateriaUnidadModales } from '../Parametrizacion/MateriaUnidadModales.jsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

function MateriaUnidad() {
  const [materiaUList, setmateriaUList] = useState([]);
  const [programaEducativo, setProgramaEducativo] = useState("");
  const [materia, setMateria] = useState("");
  const [cuatrimestre, setCuatrimestre] = useState("");
  const [unidad, setUnidad] = useState("");
  const [nombre, setNombre] = useState("");
  const [nombreOficial, setNombreOficial] = useState("");
  const [idMateriaUnidad, setIdMateriaUnidad] = useState("");
  const [idMapaCurricular, setIdMapaCurricular] = useState("");

  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [selectedMateriaU, setSelectedMateriaU] = useState(null);

  useEffect(() => { getMateriajs(setmateriaUList); }, []);

  const handleAdd = () => {
    addMateriajs(idMapaCurricular, unidad, nombre, nombreOficial, () => {
      setShowModal(false);
      getMateriajs(setmateriaUList);
    });
  };

  const handleUpdate = () => {
    updateMateriajs(selectedMateriaU.idMateriaUnidad, idMapaCurricular, unidad, nombre, nombreOficial, () => {
      setShowEditModal(false);
      getMateriajs(setmateriaUList);
    });
  };

  const handleDelete = () => {
    deleteMateriajs(selectedMateriaU.idMateriaUnidad, () => {
      setShowDeleteModal(false);
      getMateriajs(setmateriaUList);
    });
  };

  const columns = [
    { name: 'Materia', selector: row => row.materia, sortable: true , width: '250px'},
    { name: 'Cuatrimestre', selector: row => row.cuatrimestre, sortable: true, width: '100px' },
    { name: 'Unidades', selector: row => row.unidad, sortable: true ,width: '100px' },
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
              setNombreOficial(row.nombreOficial);
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
      ),
      width: '100px'
    }
  ];

  const filteredData = materiaUList.filter((item) =>
    (!programaEducativo || item.nombreOficial === programaEducativo) &&
    (!cuatrimestre || item.cuatrimestre.toString() === cuatrimestre.toString()) &&
    (item.nombreOficial.toLowerCase().includes(searchText.toLowerCase()) ||
    item.unidad.toString().includes(searchText.toString()))
  );

  return (
    <div className="container mt-4">
      <h5 className="text-center">MATERIA</h5>
        <DataTable
            title={
                <div className="d-flex justify-content-between align-items-center w-100">
                    <button className='btn btn-success me-2' onClick={() => {
                        setProgramaEducativo("");
                        setMateria("");
                        setCuatrimestre("");
                        setUnidad("");
                        setNombre("");
                        setNombreOficial("");
                        setIdMateriaUnidad("");
                        setIdMapaCurricular("");
                        setSelectedMateriaU(null);
                        setShowModal(true);
                    }}>
                       Registrar
                    </button>
                    
                    <h5 className="mb-0">Programa Académico</h5>
                    <div className="d-flex align-items-center ms-2">
                        <select className="form-select" value={programaEducativo} onChange={(e) => setProgramaEducativo(e.target.value)}>
                            <option value="">Selecciona un Programa Académico</option>
                            {Array.from(new Set(materiaUList.map(item => item.nombreOficial))).map(nombreOficial => (
                                <option key={nombreOficial} value={nombreOficial}>{nombreOficial}</option>
                            ))}
                        </select>
                    </div>
                    <h5 className="mb-0">Cuatrimestre</h5>
                    <div className="d-flex align-items-center ms-2">
                        <select className="form-select" value={cuatrimestre} onChange={(e) => setCuatrimestre(e.target.value)}>
                            <option value="">Selecciona un Cuatrimestre</option>
                            {Array.from(new Set(materiaUList.map(item => item.cuatrimestre))).map(cuatrimestre => (
                                <option key={cuatrimestre} value={cuatrimestre}>{cuatrimestre}</option>
                            ))}
                        </select>
                    </div>                    
                    <input type="text" className="form-control ms-2 w-25" value={searchText} onChange={(e) => setSearchText(e.target.value)} placeholder="Buscar Materia"/>
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
            nombreOficial={nombreOficial} setNombreOficial={setNombreOficial}
            idMapaCurricular={idMapaCurricular} setIdMapaCurricular={setIdMapaCurricular}
            idMateriaUnidad={idMateriaUnidad} setIdMateriaUnidad={setIdMateriaUnidad}
            showModal={showModal} setShowModal={setShowModal}
            showEditModal={showEditModal} setShowEditModal={setShowEditModal}
            showDeleteModal={showDeleteModal} setShowDeleteModal={setShowDeleteModal}
            handleAdd={handleAdd} 
            handleUpdate={handleUpdate} 
            handleDelete={handleDelete}
            selectedMateriaU={selectedMateriaU}/>
    </div>
  );
}

export default MateriaUnidad;
