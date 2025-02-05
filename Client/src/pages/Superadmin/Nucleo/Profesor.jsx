import '../../../assets/css/App.css';
import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { getProfesor, addProfesor, updateProfesorFunc, deleteProfesorFunc } 
from '../../../assets/js/Nucleo/profesor.js';
import { ProfesorModales } from '../Nucleo/ProfesorModales.jsx';

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

useEffect(() => {
  if (selectedProfesor) {
    setidPersona(selectedProfesor.idPersona);
    setnombre(selectedProfesor.nombre);
    setpaterno(selectedProfesor.paterno);
    setmaterno(selectedProfesor.materno);
    setidDepartamento(selectedProfesor.idDepartamento);
    setnombreDepartamento(selectedProfesor.nombreDepartamento);
    setidPuesto(selectedProfesor.idPuesto);
    setnombrePuesto(selectedProfesor.nombrePuesto);
    setclave(selectedProfesor.clave);
    setperfil(selectedProfesor.perfil);
    setemail(selectedProfesor.email);
    setnoCedula(selectedProfesor.noCedula);
    setprogramaAcademicos(selectedProfesor.programaAcademicos);
    setnss(selectedProfesor.nss);
    setrfc(selectedProfesor.rfc);
  }
}, [selectedProfesor]);

const filteredData = profesorList.filter(item =>
  item.clave.toLowerCase().includes(searchText.toLowerCase())
);

const handleAdd = () => {
  addProfesor(idPersona, idDepartamento, idPuesto, clave, perfil, email, noCedula, programaAcademicos, nss, rfc, setShowModal, () => getProfesor(setProfesor));
};

const handleUpdate = () => {
  updateProfesorFunc(selectedProfesor.idProfesor, idPersona, idDepartamento, idPuesto, clave, perfil, email, noCedula, programaAcademicos, nss, rfc, setShowEditModal, () => getProfesor(setProfesor));
};

const handleDelete = () => {
  deleteProfesorFunc(selectedProfesor.idProfesor, setShowDeleteModal, () => getProfesor(setProfesor));
};

  return (
    <div className="container">
      <div className="">
        <h5>LISTADO DE PROFESORES</h5>
        <div className="card-body">
          <button className='btn btn-success' onClick={() => {
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
          }}>Registrar</button>
          <div className="mt-4">
            <input type="text" className="form-control mb-4" value={searchText} onChange={(e) => setSearchText(e.target.value)} placeholder="Buscar por email" />
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th>Id</th>
                  <th>Id P</th>
                  <th>PERSONA</th>
                  <th>Id D</th>
                  <th>DEPARTAMENTO</th>
                  <th>Id P</th>
                  <th>PUESTO</th>
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
                    <tr key={profesor.idProfesor}>
                      <td>{profesor.idProfesor}</td>
                      <td>{profesor.idPersona}</td>
                      <td>{`${profesor.nombre} ${profesor.paterno} ${profesor.materno}`}</td>
                      <td >{profesor.idDepartamento}</td>
                      <td>{profesor.nombreDepartamento}</td>
                      <td>{profesor.idPuesto}</td>
                      <td>{profesor.nombrePuesto}</td>
                      <td>{profesor.clave}</td>
                      <td>{profesor.perfil}</td>
                      <td>{profesor.email}</td>
                      <td>{profesor.noCedula}</td>
                      <td>{profesor.programaAcademicos}</td>
                      <td>{profesor.nss}</td>
                      <td>{profesor.rfc}</td>
                      <td>
                        <button className="btn btn-warning" onClick={() => {
                          setSelectedProfesor(profesor);
                          setShowEditModal(true);
                        }}>Editar</button>
                      </td>
                      <td>
                        <button className="btn btn-danger" onClick={() => {
                          setSelectedProfesor(profesor);
                          setShowDeleteModal(true);
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

    </div>
  );
}

export default Profesor;
