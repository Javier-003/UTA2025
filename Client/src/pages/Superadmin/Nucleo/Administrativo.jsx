import'../../../assets/css/App.css';
import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { getAdministrativo, addAdministrativo, updateAdministrativoFunc, deleteAdministrativoFunc } 
from '../../../assets/js/Nucleo/administrativo.js';
import { AdministrativoModales } from '../../Superadmin/Nucleo/AdministrativoModales.jsx'

function Administrativo() {
  const [administrativoList, setAdministrativo] = useState([]);
  
  const [id_departamento, setIdDepartamento] = useState("");
  const [id_puesto, setIdPuesto] = useState("");
  const [clave, setClave] = useState("");
  const [horario, setHorario] = useState("");
  const [nss, setNss] = useState("");
  const [rfc, setRfc] = useState("");

  const [nombre, setNombre] = useState(""); 
  const [apellidoPaterno, setApellidoPaterno] = useState(""); 
  const [apellidoMaterno, setApellidoMaterno] = useState("");

  const [nombreDepartamento, setNombreDepartamento] = useState("");
  const [nombrePuesto, setNombrePuesto] = useState("");
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
    addAdministrativo(id_departamento, id_puesto, clave, horario, nss, rfc, setShowModal, () => getAdministrativo(setAdministrativo));
  };

  const handleUpdate = () => {
    updateAdministrativoFunc(selectedAdministrativo.id_administrativo, id_departamento, id_puesto, clave, horario, nss, rfc, setShowEditModal, () => getAdministrativo(setAdministrativo));
  };

  const handleDelete = () => {
    deleteAdministrativoFunc(selectedAdministrativo.id_administrativo, setShowDeleteModal, () => getAdministrativo(setAdministrativo));
  };

  return (
    <div className="container">
      <div className="">
        <h5>LISTADO ADMINISTRATIVOS</h5>
        <div className="card-body">
          <button className='btn btn-success' onClick={() => {
            setIdDepartamento("");    
            setIdPuesto(""); 
            setClave("");
            setHorario("");
            setNss("");
            setRfc("");
            setNombre(""); 
            setApellidoPaterno(""); 
            setApellidoMaterno("");
            setNombreDepartamento("");
            setNombrePuesto("");
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
                  <th>ID D</th>
                  <th>ID P</th>
                  <th>NOMBRE ADMINISTRATIVO</th>
                  <th>NOMBRE DEPARTAMENTO</th>
                  <th>NOMBRE PUESTO</th>
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
                    <tr key={administrativo.id_administrativo}>
                      <td>{administrativo.id_administrativo}</td>
                      <td>{administrativo.id_departamento}</td>
                      <td>{administrativo.id_puesto}</td>
                      <td>{`${administrativo.nombre} ${administrativo.apellido_paterno} ${administrativo.apellido_materno}`}</td>
                      <td>{administrativo.NombreDepartamento}</td>
                      <td>{administrativo.NombrePuesto}</td>
                      <td>{administrativo.clave}</td>
                      <td>{administrativo.horario}</td>
                      <td>{administrativo.nss}</td>
                      <td>{administrativo.rfc}</td>
                      <td>
                        <button className="btn btn-warning" onClick={() => {
                          setIdDepartamento(administrativo.id_departamento);
                          setIdPuesto(administrativo.id_puesto);
                          setNombre(administrativo.nombre);
                          setApellidoPaterno(administrativo.apellido_paterno);
                          setApellidoMaterno(administrativo.apellido_materno);
                          setClave(administrativo.clave);
                          setHorario(administrativo.horario);
                          setNss(administrativo.nss);
                          setRfc(administrativo.rfc);
                          setNombreDepartamento(administrativo.NombreDepartamento);
                          setNombrePuesto(administrativo.NombrePuesto);
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
        id_departamento={id_departamento} setIdDepartamento={setIdDepartamento}
        id_puesto={id_puesto} setIdPuesto={setIdPuesto}
        
        nombre={nombre} setNombre={setNombre}
        apellidoPaterno={apellidoPaterno} setApellidoPaterno={setApellidoPaterno}
        apellidoMaterno={apellidoMaterno} setApellidoMaterno={setApellidoMaterno}
        clave={clave} setClave={setClave}
        horario={horario} setHorario={setHorario}
        nss={nss} setNss={setNss}
        rfc={rfc} setRfc={setRfc}
        nombreDepartamento={nombreDepartamento} setNombreDepartamento={setNombreDepartamento}
        nombrePuesto={nombrePuesto} setNombrePuesto={setNombrePuesto}
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
