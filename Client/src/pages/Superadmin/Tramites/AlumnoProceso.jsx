import '../../../assets/css/App.css';
import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { getAlumnoProceso, addAlumnoProceso, updateAlumnoProcesoFunc, deleteAlumnoProcesoFunc } 
from '../../../assets/js/Tramites/alumnoproceso.js';
import {AlumnoProcesoModales} from './AlumnoProcesoModales.jsx'


function AlumnoProceso() {
  const [alumnoprocesoList, setAlumnoProceso] = useState([]);
  const [idAlumnoTramite, setIdAlumnoTramite] = useState("");
  const [idTramiteProceso, setIdTramiteProceso] = useState("");
  const [idActividad, setIdActividad] = useState("");
  const [orden, setOrden] = useState("");
  const [estatus, setEstatus] = useState("");
  const [observacion, setObservacion] = useState("");
  const [NombreAlumno, setNombreAlumno] = useState(""); 
  const [NombreActividad, setNombreActividad] = useState(""); 
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [selectedAlumnoProceso, setSelectedAlumnoProceso] = useState(null);

  useEffect(() => { 
    getAlumnoProceso(setAlumnoProceso); 
  }, []);

  const filteredData = alumnoprocesoList.filter(item => {
    const observacion = item.observacion || ""; 
    const nombreAlumno = item.NombreAlumno || "";
    const nombreActividad = item.NombreActividad || ""; 
    return (
      observacion.toString().toLowerCase().includes(searchText.toLowerCase()) ||
      nombreAlumno.toString().toLowerCase().includes(searchText.toLowerCase()) ||
      nombreActividad.toString().toLowerCase().includes(searchText.toLowerCase())
    );
  });

  const handleAdd = () => {
    addAlumnoProceso(idAlumnoTramite, idTramiteProceso, idActividad, orden, estatus, observacion, setShowModal, () => getAlumnoProceso(setAlumnoProceso));
  };

  const handleUpdate = () => {
    updateAlumnoProcesoFunc(selectedAlumnoProceso.idAlumnoProceso, idAlumnoTramite, idTramiteProceso, idActividad, orden, estatus, observacion, setShowEditModal, () => getAlumnoProceso(setAlumnoProceso));
  };

  const handleDelete = () => {
    deleteAlumnoProcesoFunc(selectedAlumnoProceso.idAlumnoProceso, setShowDeleteModal, () => getAlumnoProceso(setAlumnoProceso));
  };

  return (
    <div className="container">
      <div className="">
        <h5>LISTADO DE ALUMNOS EN PROCESOS</h5>
        <div className="card-body">
          <button className='btn btn-success' onClick={() => {
            setIdAlumnoTramite("");
            setIdTramiteProceso("");
            setIdActividad("");
            setOrden("");
            setEstatus("");
            setObservacion("");
            setNombreAlumno(""); // Añadido Nombre Alumno
            setNombreActividad(""); // Añadido NombreActividad
            setSelectedAlumnoProceso(null);
            setShowModal(true);
          }}>Registrar</button>

          <div className="mt-4">
            <input type="text" className="form-control mb-1" value={searchText}
            onChange={(e) => setSearchText(e.target.value)} placeholder="Buscar por Observacion o Nombre de Alumno o Actividad" />
            <table className="table table-bordered">
              <thead> 
                <tr>
                  <th>ID</th>
                  <th>ID AT</th>
                  <th>NOMBRE ALUMNO</th> 
                  <th>ID TP</th>
                  <th>ID A</th>
                  <th>NOMBRE ACTIVIDAD</th>
                  <th>ORDEN</th>
                  <th>ESTATUS</th>
                  <th>OBSERVACION</th>
                  <th>Editar</th>
                  <th>Eliminar</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.length > 0 ? (
                  filteredData.map((alumnoproceso) => (
                    <tr key={alumnoproceso.idAlumnoProceso}>
                      <td>{alumnoproceso.idAlumnoProceso}</td>
                      <td>{alumnoproceso.idAlumnoTramite}</td>
                      <td>{alumnoproceso.NombreAlumno}</td> 
                      <td>{alumnoproceso.idTramiteProceso}</td>
                      <td>{alumnoproceso.idActividad}</td>
                      <td>{alumnoproceso.NombreActividad}</td>
                      <td>{alumnoproceso.orden}</td>
                      <td>{alumnoproceso.estatus}</td>
                      <td>{alumnoproceso.observacion}</td>
                      <td>
                        <button className="btn btn-warning" onClick={() => {
                          setIdAlumnoTramite(alumnoproceso.idAlumnoTramite);
                          setIdTramiteProceso(alumnoproceso.idTramiteProceso);
                          setIdActividad(alumnoproceso.idActividad);     
                          setOrden(alumnoproceso.orden);
                          setEstatus(alumnoproceso.estatus);
                          setObservacion(alumnoproceso.observacion);
                          setNombreAlumno(alumnoproceso.NombreAlumno); // Añadido Nombre Alumno
                          setNombreActividad(alumnoproceso.NombreActividad); // Añadido NombreActividad
                          setShowEditModal(true); 
                          setSelectedAlumnoProceso(alumnoproceso);
                        }}>Editar</button>
                      </td>
                      <td>
                        <button className="btn btn-danger" onClick={() => {
                          setShowDeleteModal(true); 
                          setSelectedAlumnoProceso(alumnoproceso);
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
      <AlumnoProcesoModales
      
      idAlumnoTramite={idAlumnoTramite} setIdAlumnoTramite={setIdAlumnoTramite}  
idTramiteProceso={idTramiteProceso} setIdTramiteProceso={setIdTramiteProceso}  
idActividad={idActividad} setIdActividad={setIdActividad}  
orden={orden} setOrden={setOrden}  
estatus={estatus} setEstatus={setEstatus}  
observacion={observacion} setObservacion={setObservacion}  
showModal={showModal} setShowModal={setShowModal}  
showEditModal={showEditModal} setShowEditModal={setShowEditModal}  
showDeleteModal={showDeleteModal} setShowDeleteModal={setShowDeleteModal}  
handleAdd={handleAdd} handleUpdate={handleUpdate}  
handleDelete={handleDelete} setSelectedAlumnoProceso={setSelectedAlumnoProceso}  
   />


    </div>
  );
}

export default AlumnoProceso;
