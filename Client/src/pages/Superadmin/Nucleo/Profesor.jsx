import '../../../assets/css/App.css';
import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { getProfesor, addProfesor, updateProfesorFunc, deleteProfesorFunc } 
from '../../../assets/js/Nucleo/profesor.js';
import { ProfesorModales } from '../Nucleo/ProfesorModales.jsx';

function Profesor() {
  const [profesorList, setProfesor] = useState([]);
  const [idDepartamento, setIdDepartamento] = useState("");
  const [idPuesto, setIdPuesto] = useState("");
  const [nombre, setNombre] = useState(""); 
  const [apellidoPaterno, setApellidoPaterno] = useState(""); 
  const [apellidoMaterno, setApellidoMaterno] = useState("");
  const [clave, setClave] = useState("");
  const [perfil, setPerfil] = useState("");
  const [email, setEmail] = useState("");
  const [noCedula, setNoCedula] = useState("");
  const [programaAcademicos, setProgramaAcademicos] = useState("");
  const [nss, setNss] = useState("");
  const [rfc, setRfc] = useState("");
  const [nombreDepartamento, setNombreDepartamento] = useState("");
  const [nombrePuesto, setNombrePuesto] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [selectedProfesor, setSelectedProfesor] = useState(null);

  useEffect(() => { getProfesor(setProfesor); }, []);

  const filteredData = profesorList.filter(item =>
    item.email.toLowerCase().includes(searchText.toLowerCase())
  );

  const handleAdd = () => {
    addProfesor(idDepartamento, idPuesto, clave, perfil, email, noCedula, programaAcademicos, nss, rfc, setShowModal, () => getProfesor(setProfesor));
  };

  const handleUpdate = () => {
    updateProfesorFunc(selectedProfesor.id_profesor, idDepartamento, idPuesto, clave, perfil, email, noCedula, programaAcademicos, nss, setShowEditModal, () => getProfesor(setProfesor));
  };

  const handleDelete = () => {
    deleteProfesorFunc(selectedProfesor.id_profesor, setShowDeleteModal, () => getProfesor(setProfesor));
  };

  return (
    <div className="container">
      <div className="">
        <h5>LISTADO DE PROFESORES</h5>
        <div className="card-body">
          <button className='btn btn-success' onClick={() => {
            setIdDepartamento("");
            setIdPuesto("");
            setNombre(""); 
            setApellidoPaterno(""); 
            setApellidoMaterno("");
            setClave("");
            setPerfil("");
            setEmail("");
            setNoCedula("");
            setProgramaAcademicos("");
            setNss("");
            setRfc("");
            setNombreDepartamento("");
            setNombrePuesto("");
            setSelectedProfesor(null);
            setShowModal(true);
          }}>Registrar</button>

          <div className="mt-4">
            <input type="text" className="form-control mb-4" value={searchText} onChange={(e) => setSearchText(e.target.value)} placeholder="Buscar por email" />
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th>Id</th>
                  <th>Id D</th>
                  <th>Id P</th>
                  <th>NOMBRE PROFESOR</th>
                  <th>NOMBRE DEPARTAMENTO</th>
                  <th>NOMBRE PUESTO</th>
                  <th>CLAVE</th>
                  <th>PERFIL</th>
                  <th>EMAIL</th>
                  <th>NO CEDULA</th>
                  <th>PA</th>
                  <th>NSS</th>
                  <th>RFC</th>
                  <th>Editar</th>
                  <th>Eliminar</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.length > 0 ? (
                  filteredData.map((profesor) => (
                    <tr key={profesor.id_profesor}>
                      <td>{profesor.id_profesor}</td>
                      <td >{profesor.id_departamento}</td>
                      <td>{profesor.id_puesto}</td>
                      <td>{`${profesor.nombre} ${profesor.apellido_paterno} ${profesor.apellido_materno}`}</td>
                      <td>{profesor.NombreDepartamento}</td>
                      <td>{profesor.NombrePuesto}</td>
                      <td>{profesor.clave}</td>
                      <td>{profesor.perfil}</td>
                      <td>{profesor.email}</td>
                      <td>{profesor.no_cedula}</td>
                      <td>{profesor.programa_academicos}</td>
                      <td>{profesor.nss}</td>
                      <td>{profesor.rfc}</td>
                      <td>
                        <button className="btn btn-warning" onClick={() => {
                          setIdDepartamento(profesor.id_departamento);
                          setIdPuesto(profesor.id_puesto);
                          setNombre(profesor.nombre);
                          setApellidoPaterno(profesor.apellido_paterno);
                          setApellidoMaterno(profesor.apellido_materno);
                          setClave(profesor.clave);
                          setPerfil(profesor.perfil);
                          setEmail(profesor.email);
                          setNoCedula(profesor.no_cedula);
                          setProgramaAcademicos(profesor.programa_academicos);
                          setNss(profesor.nss);
                          setRfc(profesor.rfc);
                          setNombreDepartamento(profesor.NombreDepartamento);
                          setNombrePuesto(profesor.NombrePuesto);
                          setShowEditModal(true);
                          setSelectedProfesor(profesor);
                        }}>Editar</button>
                      </td>
                      <td>
                        <button className="btn btn-danger" onClick={() => {
                          setShowDeleteModal(true);
                          setSelectedProfesor(profesor);
                        }}>Eliminar</button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="14">No hay registros para mostrar</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <ProfesorModales
        
        idDepartamento={idDepartamento} setIdDepartamento={setIdDepartamento}
        idPuesto={idPuesto} setIdPuesto={setIdPuesto}
        nombre={nombre} setNombre={setNombre}
        apellidoPaterno={apellidoPaterno} setApellidoPaterno={setApellidoPaterno}
        apellidoMaterno={apellidoMaterno} setApellidoMaterno={setApellidoMaterno}
        clave={clave} setClave={setClave}
        perfil={perfil} setPerfil={setPerfil}
        email={email} setEmail={setEmail}
        noCedula={noCedula} setNoCedula={setNoCedula}
        programaAcademicos={programaAcademicos} setProgramaAcademicos={setProgramaAcademicos}
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
        
        selectedProfesor={selectedProfesor}/>
    </div>
  );
}

export default Profesor;
