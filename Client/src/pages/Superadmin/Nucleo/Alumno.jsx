import'../../../assets/css/App.css';
import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { getAlumno, addAlumno, updateAlumnoFunc, deleteAlumnoFunc } 
from '../../../assets/js/Nucleo/alumno.js';
import { AlumnoModales } from '../Nucleo/AlumnoModales.jsx';

function Alumno() {
  const [idPersona, setidPersona] = useState("");
  const [email, setemail] = useState("");
  const [fecha, setfecha] = useState("");
  const [nss, setnss] = useState("");
  const [nombre, setnombre] = useState("");
  const [paterno, setpaterno] = useState("");
  const [materno, setmaterno] = useState("");
  const [alumnoList, setAlumno] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedAlumno, setSelectedAlumno] = useState(null);
  const [searchText, setSearchText] = useState("");

  useEffect(() => { getAlumno(setAlumno); }, []);
  const handleAdd = () => {
    addAlumno(idPersona,email, fecha, nss, setShowModal, () => getAlumno(setAlumno));
  };
  const handleUpdate = () => {
    updateAlumnoFunc(selectedAlumno.idAlumno, idPersona,email, fecha, nss, setShowEditModal, () => getAlumno(setAlumno));
  };
  const handleDelete = () => {
    deleteAlumnoFunc(selectedAlumno.idAlumno, setShowDeleteModal, () => getAlumno(setAlumno));
  };
  const filteredData = alumnoList.filter(item =>
    item.email.toLowerCase().includes(searchText.toLowerCase())
  );
  const formatDate = (date) => {
    return new Date(date).toISOString().split('T')[0];
  };
  
  return (
    <div className="container">
      <div className="">
        <h5>LISTADO DE ALUMNOS</h5>
        <div className="card-body">
          <button className='btn btn-success' onClick={() => {
            setemail("");
            setfecha("");
            setnss("");
            setnombre("");
            setpaterno("");
            setmaterno("");
            setSelectedAlumno(null);
            setShowModal(true);
          }}>Registrar</button>
          <div className="mt-4">
            <input type="text" className="form-control mb-1" value={searchText}
              onChange={(e) => setSearchText(e.target.value)} placeholder="Buscar por email"/>
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th>Id A</th>
                  <th>NOMBRE DEL ALUMNO</th>
                  <th>EMAIL</th>
                  <th>PROMEDIO</th>
                  <th>CUATRIMESTRE</th>
                  <th>FECHA</th>
                  <th>NSS</th>
                  <th>Editar</th>
                  <th>Eliminar</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.length > 0 ? (
                  filteredData.map((alumno) => (
                    <tr key={alumno.idAlumno}>
                      <td>{alumno.idAlumno}</td>
                      <td>{`${alumno.nombre} ${alumno.paterno} ${alumno.materno}`}</td>
                      <td>{alumno.email}</td>
                      <td>{alumno.promedio}</td>
                      <td>{alumno.cuatrimestre}</td>
                      <td>{new Date(alumno.fecha).toLocaleDateString()}</td>
                      <td>{alumno.nss}</td>
                      <td>
                        <button className="btn btn-warning" onClick={() => {
                          setShowEditModal(true);
                          setSelectedAlumno(alumno);
                          setemail(alumno.email);
                          setfecha(formatDate(alumno.fecha));
                          setnss(alumno.nss);
                          setnombre(alumno.nombre);
                          setpaterno(alumno.paterno);
                          setmaterno(alumno.materno);
                        }}>Editar</button>
                      </td>
                      <td>
                        <button className="btn btn-danger" onClick={() => {
                          setShowDeleteModal(true);
                          setSelectedAlumno(alumno);
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
      
      <AlumnoModales
      idPersona={idPersona} setidPersona={setidPersona}
      email={email} setemail={setemail}
      fecha={fecha} setfecha={setfecha}
      nss={nss} setnss={setnss}
      nombre={nombre} setnombre={setnombre}
      paterno={paterno} setpaterno={setpaterno}
      materno={materno} setmaterno={setmaterno}
      showModal={showModal} setShowModal={setShowModal}
      showEditModal={showEditModal} setShowEditModal={setShowEditModal}
      showDeleteModal={showDeleteModal} setShowDeleteModal={setShowDeleteModal}
      handleAdd={handleAdd}
      handleUpdate={handleUpdate}
      handleDelete={handleDelete}
      selectedAlumno={selectedAlumno}/>
    </div>
  );
}

export default Alumno;
