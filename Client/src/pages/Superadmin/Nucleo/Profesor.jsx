import '../../../assets/css/App.css';
import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import DataTable from 'react-data-table-component';
import { getProfesor, addProfesor, updateProfesorFunc, deleteProfesorFunc } 
from '../../../assets/js/Nucleo/profesor.js';
import { ProfesorModales } from '../Nucleo/ProfesorModales.jsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

function Profesor() {
  const [profesorList, setProfesor] = useState([]);
  const [idPersona, setidPersona] = useState("");
  const [nombre, setnombre] = useState(""); 
  const [paterno, setpaterno] = useState(""); 
  const [materno, setmaterno] = useState("");
  const [idDepartamento, setidDepartamento] = useState("");
  const [nombreDepartamento, setnombreDepartamento] = useState("");
  const [idPuesto, setidPuesto] = useState("");
  const [nombrePuesto, setnombrePuesto] = useState("");
  const [clave, setclave] = useState("");
  const [perfil, setperfil] = useState("");
  const [email, setemail] = useState("");
  const [noCedula, setnoCedula] = useState("");
  const [programaAcademicos, setprogramaAcademicos] = useState("");
  const [nss, setnss] = useState("");
  const [rfc, setrfc] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [selectedProfesor, setSelectedProfesor] = useState(null);

  useEffect(() => { 
    getProfesor(setProfesor); 
  }, []);

  const handleAdd = () => {
    addProfesor(idPersona, idDepartamento, idPuesto, clave, perfil, email, noCedula, programaAcademicos, nss, rfc, setShowModal, () => getProfesor(setProfesor));
  };

  const handleUpdate = () => {
    updateProfesorFunc(selectedProfesor.idProfesor, idPersona, idDepartamento, idPuesto, clave, perfil, email, noCedula, programaAcademicos, nss, rfc, setShowEditModal, () => getProfesor(setProfesor));
  };

  const handleDelete = () => {
    deleteProfesorFunc(selectedProfesor.idProfesor, setShowDeleteModal, () => getProfesor(setProfesor));
  };

  const columns = [
    { name: 'Persona', selector: row => `${row.nombre} ${row.paterno} ${row.materno}`, sortable: true },
    { name: 'Departamento', selector: row => row.nombreDepartamento, sortable: true },
    { name: 'Puesto', selector: row => row.nombrePuesto, sortable: true },
    { name: 'Clave', selector: row => row.clave, sortable: true },
    { name: 'Perfil', selector: row => row.perfil, sortable: true },
    { name: 'Email', selector: row => row.email, sortable: true },
    { name: 'No Cédula', selector: row => row.noCedula, sortable: true },
    { name: 'PA', selector: row => row.programaAcademicos, sortable: true },
    { name: 'NSS', selector: row => row.nss, sortable: true },
    { name: 'RFC', selector: row => row.rfc, sortable: true },
    {
      name: 'Acciones',
      cell: row => (
        <div className="d-flex justify-content-between">
          <button className="btn btn-primary me-2" onClick={() => {
            setSelectedProfesor(row);
            setidPersona(row.idPersona);
            setnombre(row.nombre);
            setpaterno(row.paterno);
            setmaterno(row.materno);
            setidDepartamento(row.idDepartamento);
            setnombreDepartamento(row.nombreDepartamento);
            setidPuesto(row.idPuesto);
            setnombrePuesto(row.nombrePuesto);
            setclave(row.clave);
            setperfil(row.perfil);
            setemail(row.email);
            setnoCedula(row.noCedula);
            setprogramaAcademicos(row.programaAcademicos);
            setnss(row.nss);
            setrfc(row.rfc);
            setShowEditModal(true);
          }}>
            <FontAwesomeIcon icon={faEdit} />
          </button>
          <button className="btn btn-danger" onClick={() => {
            setSelectedProfesor(row);
            setShowDeleteModal(true);
          }}>
            <FontAwesomeIcon icon={faTrash} />
          </button>
        </div>
      )
    }
  ];

  const dataToDisplay = profesorList.filter(item =>
    item.clave.toLowerCase().includes(searchText.toLowerCase())
  );


  return (
    <div className="container mt-4">
      <DataTable
        title={
          <div className="d-flex justify-content-between align-items-center w-100">
            <button className='btn btn-success me-2' onClick={() => {
              setidPersona("");
              setidDepartamento("");
              setidPuesto("");
              setnombre(""); 
              setpaterno(""); 
              setmaterno("");
              setclave("");
              setperfil("");
              setemail("");
              setnoCedula("");
              setprogramaAcademicos("");
              setnss("");
              setrfc("");
              setnombreDepartamento("");
              setnombrePuesto("");
              setSelectedProfesor(null);
              setShowModal(true);
            }}>
              <FontAwesomeIcon icon={faPlus} /> Registrar
            </button>
            <h5 className="flex-grow-1 text-center">LISTADO DE PROFESORES</h5>
            <input type="text" className="form-control ms-2 w-25" value={searchText} onChange={(e) => setSearchText(e.target.value)} placeholder="Buscar por clave" />
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
      <ProfesorModales
      idPersona={idPersona} setidPersona={setidPersona}
      nombre={nombre} setnombre={setnombre}
      paterno={paterno} setpaterno={setpaterno}
      materno={materno} setmaterno={setmaterno}
      idDepartamento={idDepartamento} setidDepartamento={setidDepartamento}
      nombreDepartamento={nombreDepartamento} setnombreDepartamento={setnombreDepartamento}
      idPuesto={idPuesto} setidPuesto={setidPuesto}
      nombrePuesto={nombrePuesto} setnombrePuesto={setnombrePuesto}
      clave={clave} setclave={setclave}
      perfil={perfil} setperfil={setperfil}
      email={email} setemail={setemail}
      noCedula={noCedula} setnoCedula={setnoCedula}
      programaAcademicos={programaAcademicos} setprogramaAcademicos={setprogramaAcademicos}
      nss={nss} setnss={setnss}
      rfc={rfc} setrfc={setrfc}
      showModal={showModal} setShowModal={setShowModal}
      showEditModal={showEditModal} setShowEditModal={setShowEditModal}
      showDeleteModal={showDeleteModal} setShowDeleteModal={setShowDeleteModal}
      handleAdd={handleAdd}
      handleUpdate={handleUpdate} 
      handleDelete={handleDelete}
      selectedProfesor={selectedProfesor}/>
      <br></br><br></br>
    </div>
  );
}

export default Profesor;
