import'../../../assets/css/App.css';
import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { getAdministrativo, addAdministrativo, updateAdministrativoFunc, deleteAdministrativoFunc } 
from '../../../assets/js/Nucleo/administrativo.js';
import { AdministrativoModales } from '../../Superadmin/Nucleo/AdministrativoModales.jsx'

function Administrativo() {  
  const [administrativoList, setAdministrativo] = useState([]);
  const [idPersona, setidPersona] = useState("");

  const [idDepartamento, setidDepartamento] = useState("");
  const [nombreDepartamento, setnombreDepartamento] = useState("");
  const [idPuesto, setidPuesto] = useState("");
  const [nombrePuesto, setnombrePuesto] = useState("");
  const [clave, setclave] = useState("");
  const [horario, sethorario] = useState("");
  const [nss, setnss] = useState("");
  const [rfc, setrfc] = useState("");
  const [nombre, setnombre] = useState(""); 
  const [paterno, setpaterno] = useState(""); 
  const [materno, setmaterno] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [selectedAdministrativo, setSelectedAdministrativo] = useState(null);

  useEffect(() => { getAdministrativo(setAdministrativo); }, []);
  
  const filteredData = administrativoList.filter(item =>
    item.clave.toLowerCase().includes(searchText.toLowerCase())
  );
  
  const handleAdd = () => {
    addAdministrativo(idPersona, idDepartamento, idPuesto, clave, horario, nss, rfc, setShowModal, () => getAdministrativo(setAdministrativo));
  };

  const handleUpdate = () => {
    updateAdministrativoFunc(selectedAdministrativo.idAdministrativo,idPersona, idDepartamento, idPuesto, clave, horario, nss, rfc, setShowEditModal, () => getAdministrativo(setAdministrativo));
  };

  const handleDelete = () => {
    deleteAdministrativoFunc(selectedAdministrativo.idAdministrativo, setShowDeleteModal, () => getAdministrativo(setAdministrativo));
  };

  return (
    <div className="container">
      <div className="">
        <h5>LISTADO ADMINISTRATIVOS</h5>
        <div className="card-body">
          <button className='btn btn-success' onClick={() => {
            setidPersona("");
            setnombre(""); 
            setpaterno(""); 
            setmaterno("");
            setidDepartamento("");    
            setnombreDepartamento("");
            setidPuesto(""); 
            setnombrePuesto("");
            setclave("");
            sethorario("");
            setnss("");
            setrfc("");
            setSelectedAdministrativo(null);
            setShowModal(true);
          }}>Registrar</button>
          <div className="mt-4">
            <input type="text" className="form-control mb-1" value={searchText}
            onChange={(e) => setSearchText(e.target.value)} placeholder="Buscar por Clave" />
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th>ID A</th>
                  <th>ID P</th>
                  <th>Nombre Persona</th>
                  <th>ID D</th>
                  <th>DEPARTAMENTO</th>
                  <th>ID P</th>
                  <th>PUESTO</th>
                  <th>CLAVE</th>
                  <th>HORARIO</th>
                  <th>NSS</th>
                  <th>RFC</th>
                  <th>Editar</th>
                  <th>Eliminar</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.length > 0 ? (
                  filteredData.map((administrativo) => (
                    <tr key={administrativo.idAdministrativo}>
                      <td>{administrativo.idAdministrativo}</td>
                      <th>{administrativo.idPersona}</th>
                      <td>{`${administrativo.nombre} ${administrativo.paterno} ${administrativo.materno}`}</td>
                      <td>{administrativo.idDepartamento}</td> 
                      <td>{administrativo.nombreDepartamento}</td>
                      <td>{administrativo.idPuesto}</td>
                      <td>{administrativo.nombrePuesto}</td>
                      <td>{administrativo.clave}</td>
                      <td>{administrativo.horario}</td>
                      <td>{administrativo.nss}</td>
                      <td>{administrativo.rfc}</td>
                      <td>
                        <button className="btn btn-warning" onClick={() => {
                          setidPersona(addAdministrativo.idPersona); 
                          setnombre(administrativo.nombre);
                          setpaterno(administrativo.paterno);
                          setmaterno(administrativo.materno);
                          setidDepartamento(administrativo.idDepartamento);
                          setnombreDepartamento(administrativo.nombreDepartamento);
                          setidPuesto(administrativo.idPuesto);
                          setnombrePuesto(administrativo.nombrePuesto);
                          setclave(administrativo.clave);
                          sethorario(administrativo.horario);
                          setnss(administrativo.nss);
                          setrfc(administrativo.rfc);
                          setShowEditModal(true); 
                          setSelectedAdministrativo(administrativo);
                        }}>Editar</button>
                      </td>
                      <td>
                        <button className="btn btn-danger" onClick={() => {
                          setShowDeleteModal(true); 
                          setSelectedAdministrativo(administrativo);
                        }}>Eliminar</button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="11">No hay registros para mostrar</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <AdministrativoModales
      idPersona={idPersona} setidPersona={setidPersona}
      nombre={nombre} setnombre={setnombre}
      paterno={paterno} setpaterno={setpaterno}
      materno={materno} setmaterno={setmaterno}
      idDepartamento={idDepartamento} setidDepartamento={setidDepartamento}
      nombreDepartamento={nombreDepartamento} setnombreDepartamento={setnombreDepartamento}
      idPuesto={idPuesto} setidPuesto={setidPuesto}
      nombrePuesto={nombrePuesto} setnombrePuesto={setnombrePuesto}
      clave={clave} setclave={setclave}
      horario={horario} sethorario={sethorario}
      nss={nss} setnss={setnss}
      rfc={rfc} setrfc={setrfc}
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
