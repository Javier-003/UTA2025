import'../../../assets/css/App.css';
import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { getAlumno, addAlumno, updateAlumnoFunc, deleteAlumnoFunc } 
from '../../../assets/js/Nucleo/alumno.js';
import { AlumnoModales } from '../Nucleo/AlumnoModales.jsx';

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
  
  useEffect(() => {
    if (selectedAlumno) {
      setidPersona(selectedAlumno.idPersona || "");
      setnombre(selectedAlumno.nombre || "");
      setpaterno(selectedAlumno.paterno || "");
      setmaterno(selectedAlumno.materno || "");
      setemail(selectedAlumno.email || "");
      setnss(selectedAlumno.nss || "");
      setfecha(formatDate(selectedAlumno.fecha));
    }
  }, [selectedAlumno]);
  
  const filteredData = alumnoList.filter(item =>
    item.email.toLowerCase().includes(searchText.toLowerCase())
  );
  
  const handleAdd = () => {
    addAlumno(idPersona, email, nss,fecha, setShowModal, () => getAlumno(setAlumno));
  };
  
  const handleUpdate = () => {
    updateAlumnoFunc(selectedAlumno.idAlumno, email, nss, fecha,  setShowEditModal, () => getAlumno(setAlumno));
  };
  
  const handleDelete = () => {
    deleteAlumnoFunc(selectedAlumno.idAlumno, setShowDeleteModal, () => getAlumno(setAlumno));
  };

  const formatDate = (date) => {
    return date ? new Date(date).toISOString().split('T')[0] : "";
  };

  return (
    <div className="container">
      <div className="">
        <h5>LISTADO DE ALUMNOS</h5>
        <div className="card-body">
          <button className='btn btn-success' onClick={() => {
            setidPersona("");
            setnombre("");
            setpaterno("");
            setmaterno("");
            setemail("");
            setnss("");
            setfecha("");
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
                  <th>Id P</th>
                  <th>NOMBRE DEL ALUMNO</th>
                  <th>EMAIL</th>
                  <th>NSS</th>
                  <th>FECHA</th>
                  <th>Editar</th>
                  <th>Eliminar</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.length > 0 ? (
                  filteredData.map((alumno) => (
                    <tr key={alumno.idAlumno}>
                      <td>{alumno.idAlumno}</td>
                      <td>{alumno.idPersona}</td>
                      <td>{`${alumno.nombre} ${alumno.paterno} ${alumno.materno}`}</td>
                      <td>{alumno.email}</td>   
                      <td>{alumno.nss}</td>
                      <td>{new Date(alumno.fecha).toLocaleDateString()}</td>
                      <td>
                        <button className="btn btn-warning" onClick={() => {
                          setSelectedAlumno(alumno);
                          setShowEditModal(true);
                        }}>Editar</button>
                      </td>
                      <td>
                        <button className="btn btn-danger" onClick={() => {
                          setSelectedAlumno(alumno);
                          setShowDeleteModal(true);
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
    </div>
  );
}

export default Alumno;
