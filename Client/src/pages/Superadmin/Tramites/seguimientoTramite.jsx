import '../../../assets/css/App.css';
import { useNavigate } from 'react-router-dom'; //Botón
import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { getAlumnoTramite, addAlumnoTramite, updateAlumnoTramiteFunc, deleteAlumnoTramiteFunc } 
from '../../../assets/js/Tramites/alumnotramite.js';
import { AlumnoTramiteModales } from './AlumnoTramiteModales.jsx';

import { getTramites } from '../../../api/Parametrizacion/tramite.api.js';

function Seguimientodetramite() {
  const [alumnotramiteList, setAlumnoTramite] = useState([]);

  const [idTramite, setIdTramite] = useState("");
  const [idAlumnoPA, setIdAlumnoPA] = useState("");
  const [idPeriodo, setIdPeriodo] = useState("");
  const [idPersona, setIdPersona] = useState("");
  const [fecha, setFecha] = useState("");
  const [estatus, setEstatus] = useState("");

  //FK
  const [tramite, setTramite] = useState("");
  const [alumno, setAlumno] = useState("");
  const [periodo, setPeriodo] = useState("");

  //Para filtro de trámite
  const [tramiteList, setTramiteList] = useState([]); // Nueva lista de trámites
  const [selectedTramite, setSelectedTramite] = useState('');//New

  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [selectedAlumnoTramite, setSelectedAlumnoTramite] = useState(null);

  const navigate = useNavigate();//BOTÓN


  useEffect(() => { 
    getAlumnoTramite(setAlumnoTramite); 
    getTramites().then(setTramiteList); // Obtiene todos los trámites para el filtro
  }, []);

  
  const filteredData = alumnotramiteList.filter(
    (item) =>
      (!selectedTramite || item.idTramite == selectedTramite) && // Usar == para comparar string con número
      item.alumno.toLowerCase().includes(searchText.toLowerCase())
  );


  const handleAdd = () => {
    addAlumnoTramite(idTramite, idPersona, idAlumnoPA, idPeriodo, fecha, estatus, setShowModal, () => getAlumnoTramite(setAlumnoTramite));
  };

  const handleUpdate = () => {
    updateAlumnoTramiteFunc(selectedAlumnoTramite.idAlumnoTramite, idTramite, idPersona, idAlumnoPA, idPeriodo, fecha, estatus, setShowEditModal, () => getAlumnoTramite(setAlumnoTramite));
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
        <h5>SEGUIMIENTO DE TRÁMITES</h5>
        <div className="card-body">



    {/* Botón mejorado */}
        <button 
          className="btn btn-success mb-3"
          onClick={() => navigate('/nuevoTramiteAlumno')}
        >
          <i className="bi bi-plus-circle me-2"></i> Ir a Nuevo Trámite
        </button>
    {/* ------------------- Filtros -------------------------------*/}
    <div className="d-flex mb-3">
        <select
        className="form-select me-2"
        value={selectedTramite}
        onChange={(e) => {
          const selectedId = e.target.value;
          setSelectedTramite(selectedId);

      
        }}
      >
            <option value="">Mostrar todos los trámites</option>
            {tramiteList.map((tramite) => (
              <option key={tramite.idTramite} value={tramite.idTramite}>
                {tramite.nombre}
              </option>
            ))}
          </select>
        </div>
 {/* ------------------- FIN Filtros -------------------------------*/}
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
                  <th>PROCESO</th>
                  <th>Editar</th>
                  {/* <th>Eliminar</th> */}
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

                        {/* Nueva columna de proceso con icono */}
                      <td className="text-center">
                        <i className="bi bi-hourglass-split text-primary fs-5"></i>
                      </td>

                      <td>
                        <button className="btn btn-warning" onClick={() => {
                          setIdTramite(alumnotramite.idTramite);
                          setIdAlumnoPA(alumnotramite.idAlumnoPA);
                          setIdPersona(alumnotramite.idPersona);
                          setIdPeriodo(alumnotramite.idPeriodo);
                          setFecha(alumnotramite.fecha);
                          setFecha(formatDateString(alumnotramite.fecha))
                          setEstatus(alumnotramite.estatus);
                          setShowEditModal(true);
                          setSelectedAlumnoTramite(alumnotramite);
                        }}>Editar</button>
                      </td>
                     {/*  <td>
                        <button className="btn btn-danger" onClick={() => {
                          setShowDeleteModal(true);
                          setSelectedAlumnoTramite(alumnotramite);
                        }}>Eliminar</button>
                      </td> */}
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

export default Seguimientodetramite;
