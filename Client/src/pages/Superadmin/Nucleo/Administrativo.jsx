import '../../../assets/css/App.css';
import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import DataTable from 'react-data-table-component';
import { getAdministrativo, addAdministrativo, updateAdministrativoFunc, deleteAdministrativoFunc } from '../../../assets/js/Nucleo/administrativo.js';
import { AdministrativoModales } from '../../Superadmin/Nucleo/AdministrativoModales.jsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

function Administrativo() {  
  const [administrativoList, setAdministrativo] = useState([]);
  const [idPersona, setIdPersona] = useState("");
  const [nombre, setNombre] = useState(""); 
  const [paterno, setPaterno] = useState(""); 
  const [materno, setMaterno] = useState("");
  const [idDepartamento, setIdDepartamento] = useState("");
  const [nombreDepartamento, setNombreDepartamento] = useState("");
  const [idPuesto, setIdPuesto] = useState("");
  const [nombrePuesto, setNombrePuesto] = useState("");
  const [clave, setClave] = useState("");
  const [horario, setHorario] = useState("");
  const [nss, setNss] = useState("");
  const [rfc, setRfc] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [selectedAdministrativo, setSelectedAdministrativo] = useState(null);

  useEffect(() => { 
    getAdministrativo(setAdministrativo); 
  }, []);

  const handleAdd = () => {
    addAdministrativo(idPersona, idDepartamento, idPuesto, clave, horario, nss, rfc, setShowModal, () => getAdministrativo(setAdministrativo));
  };

  const handleUpdate = () => {
    updateAdministrativoFunc(selectedAdministrativo.idAdministrativo, idPersona, idDepartamento, idPuesto, clave, horario, nss, rfc, setShowEditModal, () => getAdministrativo(setAdministrativo));
  };

  const handleDelete = () => {
    deleteAdministrativoFunc(selectedAdministrativo.idAdministrativo, setShowDeleteModal, () => getAdministrativo(setAdministrativo));
  };

  const columns = [
    { name: 'ID A', selector: row => row.idAdministrativo, sortable: true },
    { name: 'ID P', selector: row => row.idPersona, sortable: true },
    { name: 'Nombre', selector: row => `${row.nombre} ${row.paterno} ${row.materno}`, sortable: true },
    { name: 'Departamento', selector: row => row.nombreDepartamento, sortable: true },
    { name: 'Puesto', selector: row => row.nombrePuesto, sortable: true },
    { name: 'Clave', selector: row => row.clave, sortable: true },
    { name: 'Horario', selector: row => row.horario, sortable: true },
    { name: 'NSS', selector: row => row.nss, sortable: true },
    { name: 'RFC', selector: row => row.rfc, sortable: true },
    {
      name: 'Acciones',
      cell: row => (
        <div className="d-flex justify-content-between">
          <button className="btn btn-primary me-2" onClick={() => {
            setSelectedAdministrativo(row);
            setIdPersona(row.idPersona);
            setNombre(row.nombre);
            setPaterno(row.paterno);
            setMaterno(row.materno);
            setIdDepartamento(row.idDepartamento);
            setNombreDepartamento(row.nombreDepartamento);
            setIdPuesto(row.idPuesto);
            setNombrePuesto(row.nombrePuesto);
            setClave(row.clave);
            setHorario(row.horario);
            setNss(row.nss);
            setRfc(row.rfc);
            setShowEditModal(true);
          }}>
            <FontAwesomeIcon icon={faEdit} />
          </button>
          <button className="btn btn-danger" onClick={() => {
            setSelectedAdministrativo(row);
            setShowDeleteModal(true);
          }}>
            <FontAwesomeIcon icon={faTrash} />
          </button>
        </div>
      )
    }
  ];

  const filteredData = administrativoList.filter(item =>
    item.clave.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <div className="container mt-4">
      <DataTable
        title={
          <div className="d-flex justify-content-between align-items-center w-100">
            <button className='btn btn-success me-2' onClick={() => {
              setIdPersona("");
              setNombre("");
              setPaterno("");
              setMaterno("");
              setIdDepartamento("");
              setNombreDepartamento("");
              setIdPuesto("");
              setNombrePuesto("");
              setClave("");
              setHorario("");
              setNss("");
              setRfc("");
              setSelectedAdministrativo(null);
              setShowModal(true);
            }}>
              <FontAwesomeIcon icon={faPlus} /> Registrar
            </button>
            <h5 className="flex-grow-1 text-center">LISTADO ADMINISTRATIVOS</h5>
            <input type="text" className="form-control ms-2 w-25" value={searchText} onChange={(e) => setSearchText(e.target.value)} placeholder="Buscar por Clave" />
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
      <AdministrativoModales
        idPersona={idPersona} setIdPersona={setIdPersona}
        nombre={nombre} setNombre={setNombre}
        paterno={paterno} setPaterno={setPaterno}
        materno={materno} setMaterno={setMaterno}
        idDepartamento={idDepartamento} setIdDepartamento={setIdDepartamento}
        nombreDepartamento={nombreDepartamento} setNombreDepartamento={setNombreDepartamento}
        idPuesto={idPuesto} setIdPuesto={setIdPuesto}
        nombrePuesto={nombrePuesto} setNombrePuesto={setNombrePuesto}
        clave={clave} setClave={setClave}
        horario={horario} setHorario={setHorario}
        nss={nss} setNss={setNss}
        rfc={rfc} setRfc={setRfc}
        showModal={showModal} setShowModal={setShowModal}
        showEditModal={showEditModal} setShowEditModal={setShowEditModal}
        showDeleteModal={showDeleteModal} setShowDeleteModal={setShowDeleteModal}
        handleAdd={handleAdd}
        handleUpdate={handleUpdate}
        handleDelete={handleDelete}
        selectedAdministrativo={selectedAdministrativo}/>
    </div>
  );
}

export default Administrativo;
