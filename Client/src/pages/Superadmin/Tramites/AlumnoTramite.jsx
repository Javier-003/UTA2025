import '../../../assets/css/App.css';
import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { getAlumnoTramite, addAlumnoTramite, updateAlumnoTramiteFunc, deleteAlumnoTramiteFunc } 
from '../../../assets/js/Tramites/alumnotramite.js';
import { AlumnoTramiteModales } from '../Tramites/AlumnoTramiteModales.jsx';

function AlumnoTramite() {
  const [alumnotramiteList, setAlumnoTramite] = useState([]);

  const [idTramite, setIdTramite] = useState("");
  const [idAlumnoPA, setIdAlumnoPA] = useState("");
  const [idPeriodo, setIdPeriodo] = useState("");
  const [fecha, setFecha] = useState("");
  const [estatus, setEstatus] = useState("");

  //FK
  const [tramite, setTramite] = useState("");
  const [alumno, setAlumno] = useState("");
  const [periodo, setPeriodo] = useState("");

  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [selectedAlumnoTramite, setSelectedAlumnoTramite] = useState(null);

  useEffect(() => { 
    getAlumnoTramite(setAlumnoTramite); 
  }, []);

  const filteredData = alumnotramiteList.filter(item => {
    const alumno = item.alumno || "";
    return (
      alumno.toLowerCase().includes(searchText.toLowerCase()) 
    );
  });

  const handleAdd = () => {
    addAlumnoTramite(idTramite, idAlumnoPA, idPeriodo, fecha, estatus, setShowModal, () => getAlumnoTramite(setAlumnoTramite));
  };

  const handleUpdate = () => {
    updateAlumnoTramiteFunc(selectedAlumnoTramite.idAlumnoTramite, idTramite, idAlumnoPA, idPeriodo, fecha, estatus, setShowEditModal, () => getAlumnoTramite(setAlumnoTramite));
  };

  const handleDelete = () => {
    deleteAlumnoTramiteFunc(selectedAlumnoTramite.idAlumnoTramite, setShowDeleteModal, () => getAlumnoTramite(setAlumnoTramite));
  };

  // Function to remove "T06:00:00.000Z" from dates
  const formatDateString = (dateString) => {
    if (dateString) {
      return dateString.split('T')[0];
    }
    return dateString;
  };

  return (
    <div className="container">
      <div className="">
        <h5>LISTADO DE ALUMNOS EN TRÁMITES</h5>
        <div className="card-body">
          <button className='btn btn-success' onClick={() => {
            setIdTramite("");
            setIdAlumnoPA("");
            setIdPeriodo("");
            setFecha("");
            setEstatus("");

            //FK
            setAlumno("");
            setTramite("");
            setPeriodo("");

            setSelectedAlumnoTramite(null);
            setShowModal(true);
          }}>Registrar</button>

          <div className="mt-4">
            <input type="text" className="form-control mb-1" value={searchText}
            onChange={(e) => setSearchText(e.target.value)} placeholder="Buscar por Alumno" />
            <table className="table table-bordered">
              <thead> 
                <tr>
                  {/* <th>ID</th> */}
                  {/* <th>ID TRÁMITE</th> */}
                  <th>TRÁMITE</th>
                  {/* <th>ID ALUMNO</th> */}
                  <th>MATRÍCULA</th>
                  <th>ALUMNO</th>
                  <th>PROGRAMA ACADÉMICO</th>
                  {/* <th>ID PERIODO</th> */}
                  <th>PERIODO</th>
                  <th>FECHA</th>
                  <th>ESTATUS</th>
                  <th>Editar</th>
                  <th>Eliminar</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.length > 0 ? (
                  filteredData.map((alumnotramite) => (
                    <tr key={alumnotramite.idAlumnoTramite}>
                      {/* <td>{alumnotramite.idAlumnoTramite}</td> */}
                      {/* <td>{alumnotramite.idTramite}</td> */}
                      {/*  <td>{alumnotramite.tramite}</td>*/}
                      <td><strong>{alumnotramite.tramite}</strong></td>
                      {/* <td>{alumnotramite.idAlumnoPA}</td> */}
                      <td>{alumnotramite.matricula}</td>
                      <td>{alumnotramite.alumno}</td>
                      <td>{alumnotramite.programa}</td>
                      {/* <td>{alumnotramite.idPeriodo}</td> */}
                      <td>{alumnotramite.periodo}</td>
                      <td>{formatDateString(alumnotramite.fecha)}</td>
                      <td>{alumnotramite.estatus}</td>
                      <td>
                        <button className="btn btn-warning" onClick={() => {
                          setIdTramite(alumnotramite.idTramite);
                          setIdAlumnoPA(alumnotramite.idAlumnoPA);
                          setIdPeriodo(alumnotramite.idPeriodo);
                          setFecha(alumnotramite.fecha);
                          setFecha(formatDateString(alumnotramite.fecha))
                          setEstatus(alumnotramite.estatus);
                          setShowEditModal(true);
                          setSelectedAlumnoTramite(alumnotramite);
                        }}>Editar</button>
                      </td>
                      <td>
                        <button className="btn btn-danger" onClick={() => {
                          setShowDeleteModal(true);
                          setSelectedAlumnoTramite(alumnotramite);
                        }}>Eliminar</button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="8">No hay registros para mostrar</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <AlumnoTramiteModales
        idTramite={idTramite} setIdTramite={setIdTramite}
        idAlumnoPA={idAlumnoPA} setIdAlumnoPA={setIdAlumnoPA}
        idPeriodo={idPeriodo} setIdPeriodo={setIdPeriodo}
        fecha={fecha} setFecha={setFecha}
        estatus={estatus} setEstatus={setEstatus}

        tramite={tramite} setTramite={setTramite}
        alumno={alumno} setAlumno={setAlumno}
        periodo={periodo} setPeriodo={setPeriodo}


        showModal={showModal} setShowModal={setShowModal}
        showEditModal={showEditModal} setShowEditModal={setShowEditModal}
        showDeleteModal={showDeleteModal} setShowDeleteModal={setShowDeleteModal}
        handleAdd={handleAdd}
        handleUpdate={handleUpdate}
        handleDelete={handleDelete}
        selectedAlumnoTramite={selectedAlumnoTramite}
      />
    </div>
  );
}

export default AlumnoTramite;
