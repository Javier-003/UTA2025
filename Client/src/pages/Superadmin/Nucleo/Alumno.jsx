import'../../../assets/css/App.css';
import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { getAlumno, addAlumno, updateAlumnoFunc, deleteAlumnoFunc } 
from '../../../assets/js/Nucleo/alumno.js';
import { AlumnoModales } from '../Nucleo/AlumnoModales.jsx';

function Alumno() {
  const [email, setEmail] = useState("");
  const [promedio, setPromedio] = useState("");
  const [cuatrimestre, setCuatrimestre] = useState("");
  const [fecha_registro, setFechaRegistro] = useState("");
  const [nss, setNss] = useState("");
  const [nombre, setNombre] = useState("");
  const [apellidoPaterno, setApellidoPaterno] = useState("");
  const [apellidoMaterno, setApellidoMaterno] = useState("");
  const [alumnoList, setAlumno] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedAlumno, setSelectedAlumno] = useState(null);
  const [searchText, setSearchText] = useState("");
  useEffect(() => { getAlumno(setAlumno); }, []);
  const handleAdd = () => {
    addAlumno(email, promedio, cuatrimestre, fecha_registro, nss, setShowModal, () => getAlumno(setAlumno));
  };
  const handleUpdate = () => {
    updateAlumnoFunc(selectedAlumno.id_alumno, email, promedio, cuatrimestre, fecha_registro, nss, setShowEditModal, () => getAlumno(setAlumno));
  };
  const handleDelete = () => {
    deleteAlumnoFunc(selectedAlumno.id_alumno, setShowDeleteModal, () => getAlumno(setAlumno));
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
            setEmail("");
            setPromedio("");
            setCuatrimestre("");
            setFechaRegistro("");
            setNss("");
            setNombre("");
            setApellidoPaterno("");
            setApellidoMaterno("");
            setSelectedAlumno(null);
            setShowModal(true);
          }}>Registrar</button>
          <div className="mt-4">
            <input 
              type="text" 
              className="form-control mb-1" 
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)} 
              placeholder="Buscar por email" 
            />
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th>Id A</th>
                  <th>NOMBRE DEL ALUMNO</th>
                  <th>EMAIL</th>
                  <th>PROMEDIO</th>
                  <th>CUATRIMESTRE</th>
                  <th>FECHA REGISTRO</th>
                  <th>NSS</th>
                  <th>Editar</th>
                  <th>Eliminar</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.length > 0 ? (
                  filteredData.map((alumno) => (
                    <tr key={alumno.id_alumno}>
                      <td>{alumno.id_alumno}</td>
                      <td>{`${alumno.nombre} ${alumno.apellido_paterno} ${alumno.apellido_materno}`}</td>
                      <td>{alumno.email}</td>
                      <td>{alumno.promedio}</td>
                      <td>{alumno.cuatrimestre}</td>
                      <td>{new Date(alumno.fecha_registro).toLocaleDateString()}</td>
                      <td>{alumno.nss}</td>
                      <td>
                        <button className="btn btn-warning" onClick={() => {
                          setShowEditModal(true);
                          setSelectedAlumno(alumno);
                          setEmail(alumno.email);
                          setPromedio(alumno.promedio);
                          setCuatrimestre(alumno.cuatrimestre);
                          
                          setFechaRegistro(formatDate(alumno.fecha_registro));
                          setNss(alumno.nss);
                          setNombre(alumno.nombre);
                          setApellidoPaterno(alumno.apellido_paterno);
                          setApellidoMaterno(alumno.apellido_materno);
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
        email={email} setEmail={setEmail}
        promedio={promedio} setPromedio={setPromedio}
        cuatrimestre={cuatrimestre} setCuatrimestre={setCuatrimestre}
        fecha_registro={fecha_registro} setFechaRegistro={setFechaRegistro}
        nss={nss} setNss={setNss}
        nombre={nombre} setNombre={setNombre}
        apellidoPaterno={apellidoPaterno} setApellidoPaterno={setApellidoPaterno}
        apellidoMaterno={apellidoMaterno} setApellidoMaterno={setApellidoMaterno}
        showModal={showModal} setShowModal={setShowModal}
        showEditModal={showEditModal} setShowEditModal={setShowEditModal}
        showDeleteModal={showDeleteModal} setShowDeleteModal={setShowDeleteModal}
        handleAdd={handleAdd}
        handleUpdate={handleUpdate}
        handleDelete={handleDelete}
        selectedAlumno={selectedAlumno}
      />
    </div>
  );
}
export default Alumno;