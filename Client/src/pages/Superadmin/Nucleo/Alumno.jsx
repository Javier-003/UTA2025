import '../../../assets/css/App.css';
import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import DataTable from 'react-data-table-component';
import { getAlumno, addAlumno, updateAlumnoFunc, deleteAlumnoFunc } 
from '../../../assets/js/Nucleo/alumno.js';
import { AlumnoModales } from '../Nucleo/AlumnoModales.jsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

function Alumno() {
  const [alumnoList, setAlumno] = useState([]);
  const [idPersona, setidPersona] = useState("");
  const [nombre, setnombre] = useState("");
  const [paterno, setpaterno] = useState("");
  const [materno, setmaterno] = useState("");
  const [email, setemail] = useState("");
  const [nss, setnss] = useState("");
  const [fecha, setfecha] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [selectedAlumno, setSelectedAlumno] = useState(null);
  
  useEffect(() => {
    getAlumno(setAlumno);
  }, []);
  
  const handleAdd = () => {
    addAlumno(idPersona, email, nss, fecha, setShowModal, () => getAlumno(setAlumno));
  };
  
  const handleUpdate = () => {
    // Format the date to 'yyyy-MM-dd'
    const formattedFecha = new Date(fecha).toISOString().split('T')[0];
  
    updateAlumnoFunc(selectedAlumno.idAlumno, email, formattedFecha, nss, setShowEditModal, () => getAlumno(setAlumno));
  };
  
  
  const handleDelete = () => {
    deleteAlumnoFunc(selectedAlumno.idAlumno, setShowDeleteModal, () => getAlumno(setAlumno));
  };

  const columns = [
    { name: 'Nombre del Alumno', selector: row => `${row.nombre} ${row.paterno} ${row.materno}`, sortable: true },
    { name: 'Email', selector: row => row.email, sortable: true },
    { name: 'NSS', selector: row => row.nss, sortable: true },
    { name: 'Fecha', selector: row => new Date(row.fecha).toLocaleDateString(), sortable: true },
    {
      name: 'Acciones',
      cell: row => (
        <div className="d-flex justify-content-between">
          <button className="btn btn-primary me-2" onClick={() => {
            setSelectedAlumno(row);
            setidPersona(row.idPersona);
            setnombre(row.nombre);
            setpaterno(row.paterno);
            setmaterno(row.materno);
            setemail(row.email);
            setnss(row.nss);
            
            // Convert the date to 'yyyy-MM-dd' format
            const formattedFecha = new Date(row.fecha).toISOString().split('T')[0];
            setfecha(formattedFecha);
            
            setShowEditModal(true);
          }}>
            <FontAwesomeIcon icon={faEdit} />
          </button>
          <button className="btn btn-danger" onClick={() => {
            setSelectedAlumno(row);
            setShowDeleteModal(true);
          }}>
            <FontAwesomeIcon icon={faTrash} />
          </button>
        </div>
      )
    }
  ];
  

  const dataToDisplay = alumnoList.filter(item =>
    item.email.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <div className="container mt-4">
      <DataTable
        title={
          <div className="d-flex justify-content-between align-items-center w-100">
            <button className='btn btn-success me-2' onClick={() => {
              setidPersona("");
              setnombre("");
              setpaterno("");
              setmaterno("");
              setemail("");
              setnss("");
              setfecha("");
              setSelectedAlumno(null);
              setShowModal(true);
            }}>
              <FontAwesomeIcon icon={faPlus} /> Registrar
            </button>
            <h5 className="flex-grow-1 text-center">LISTADO DE ALUMNOS</h5>
            <input type="text" className="form-control ms-2 w-25" value={searchText}
              onChange={(e) => setSearchText(e.target.value)} placeholder="Buscar por email"/>
          </div>
        }
        columns={columns}
        data={dataToDisplay}
        pagination={10}
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
      <AlumnoModales
      idPersona={idPersona} setidPersona={setidPersona}
      nombre={nombre} setnombre={setnombre}
      paterno={paterno} setpaterno={setpaterno}
      materno={materno} setmaterno={setmaterno}
      email={email} setemail={setemail}
      fecha={fecha} setfecha={setfecha}
      nss={nss} setnss={setnss}
      showModal={showModal} setShowModal={setShowModal}
      showEditModal={showEditModal} setShowEditModal={setShowEditModal}
      showDeleteModal={showDeleteModal} setShowDeleteModal={setShowDeleteModal}
      handleAdd={handleAdd}
      handleUpdate={handleUpdate}
      handleDelete={handleDelete}
      selectedAlumno={selectedAlumno}/>
      <br></br><br></br>
    </div>
  );
}

export default Alumno;
