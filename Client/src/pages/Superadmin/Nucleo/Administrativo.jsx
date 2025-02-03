import '../../../assets/css/App.css';
import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { getAdministrativo, addAdministrativo, updateAdministrativoFunc, deleteAdministrativoFunc } from '../../../assets/js/Nucleo/administrativo.js';
import { AdministrativoModales } from '../../Superadmin/Nucleo/AdministrativoModales.jsx';
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
  useEffect(() => {
    if (selectedAdministrativo) {
      setIdPersona(selectedAdministrativo.idPersona);
      setNombre(selectedAdministrativo.nombre);
      setPaterno(selectedAdministrativo.paterno);
      setMaterno(selectedAdministrativo.materno);
      setIdDepartamento(selectedAdministrativo.idDepartamento);
      setNombreDepartamento(selectedAdministrativo.nombreDepartamento);
      setIdPuesto(selectedAdministrativo.idPuesto);
      setNombrePuesto(selectedAdministrativo.nombrePuesto);
      setClave(selectedAdministrativo.clave);
      setHorario(selectedAdministrativo.horario);
      setNss(selectedAdministrativo.nss);
      setRfc(selectedAdministrativo.rfc);
    }
  }, [selectedAdministrativo]);
  const filteredData = administrativoList.filter(item =>
    item.clave.toLowerCase().includes(searchText.toLowerCase())
  );
  const handleAdd = () => {
    addAdministrativo(idPersona, idDepartamento, idPuesto, clave, horario, nss, rfc, setShowModal, () => getAdministrativo(setAdministrativo));
  };
  const handleUpdate = () => {
    updateAdministrativoFunc(selectedAdministrativo.idAdministrativo, idPersona, idDepartamento, idPuesto, clave, horario, nss, rfc, setShowEditModal, () => getAdministrativo(setAdministrativo));
  };
  const handleDelete = () => {
    deleteAdministrativoFunc(selectedAdministrativo.idAdministrativo, setShowDeleteModal, () => getAdministrativo(setAdministrativo));
  };
  return (
    <div className="container">
      <div>
        <h5>LISTADO ADMINISTRATIVOS</h5>
        <div className="card-body">
          <button className='btn btn-success' onClick={() => {
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
          }}>Registrar</button>
          <div className="mt-4">
            <input
              type="text"
              className="form-control mb-1"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              placeholder="Buscar por Clave"
            />
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th>ID A</th>
                  <th>ID P</th>
                  <th>Nombre</th>
                  <th>Paterno</th>
                  <th>Materno</th>
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
                      <td>{administrativo.idPersona}</td>
                      <td>{administrativo.nombre}</td> 
                      <td>{administrativo.paterno}</td> 
                      <td>{administrativo.materno}</td> 
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
                          setSelectedAdministrativo(administrativo);
                          setShowEditModal(true);
                        }}>Editar</button>
                      </td>
                      <td>
                        <button className="btn btn-danger" onClick={() => {
                          setSelectedAdministrativo(administrativo);
                          setShowDeleteModal(true);
                        }}>Eliminar</button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="13">No hay registros para mostrar</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
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
        selectedAdministrativo={selectedAdministrativo}
      />
    </div>
  );
}
export default Administrativo;