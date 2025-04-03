import '../../../assets/css/App.css'; //Act. 
import { useNavigate } from 'react-router-dom'; //Botón 
import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { getAlumnoTramite, addAlumnoTramite, updateAlumnoTramiteFunc, deleteAlumnoTramiteFunc } 
from '../../../assets/js/Tramites/alumnotramite.js';
import { AlumnoTramiteModales } from './AlumnoTramiteModales.jsx';

import { getTramites } from '../../../api/Parametrizacion/tramite.api.js';

//Import Porcentaje de Procedimiento Trámite
import { calcularPorcentajeConcluido } from './procedimientoTramite.jsx';
import { getAlumnoProceso } from '../../../assets/js/Tramites/alumnoproceso.js';

// Seguimientodetramite.js
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
  //Mas filtros	
  const [selectedEstatus, setSelectedEstatus] = useState("");
  const [selectedPrograma, setSelectedPrograma] = useState("");


  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showEditModal2, setShowEditModal2] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [selectedAlumnoTramite, setSelectedAlumnoTramite] = useState(null);

  const navigate = useNavigate();//BOTÓN

// --------- Porcentaje de procedimiento Trámite ---------------
const [alumnoprocesoList, setAlumnoProceso] = useState([]);

useEffect(() => {
  getAlumnoProceso(setAlumnoProceso);
}, []);

const getPorcentajeProgreso = (idAlumnoTramite) => {
  const filteredData = alumnoprocesoList.filter(item => item.idAlumnoTramite == idAlumnoTramite);
  return calcularPorcentajeConcluido(filteredData);
};
//------------------------------------------------------------

  useEffect(() => { 
    getAlumnoTramite(setAlumnoTramite); 
    getTramites().then(setTramiteList); // Obtiene todos los trámites para el filtro
  }, []);



// ---------------------------- CONCLUIDO AUTOMATICO SI ESTÁ AL 100% ---------------------------------
  useEffect(() => {
    // Itera a través de los trámites y actualiza el estatus si el progreso es 100%
    alumnotramiteList.forEach((alumnotramite) => {
      const porcentaje = getPorcentajeProgreso(alumnotramite.idAlumnoTramite);
      if (porcentaje === 100 && alumnotramite.estatus !== 'Concluido') {
        // Si el porcentaje es 100, actualiza el estatus
        updateAlumnoTramiteFunc(
          alumnotramite.idAlumnoTramite,
          alumnotramite.idTramite,
          alumnotramite.idPersona,
          alumnotramite.idAlumnoPA,
          alumnotramite.idPeriodo,
          formatDateString(alumnotramite.fecha),  
          'Concluido', // Establece el estatus como 'Concluido'
          () => {}, // Callback después de la actualización 
          () => getAlumnoTramite(setAlumnoTramite) // Vuelve a cargar los datos actualizados
        );        
      }
    });
  }, [alumnotramiteList, alumnoprocesoList]); // Ejecutar cuando cambian los datos de trámites o progreso
// -----------------------------------------------------------------------------------------------------

  
  /* const filteredData = alumnotramiteList.filter(
    (item) =>
      (!selectedTramite || item.idTramite == selectedTramite) && // Usar == para comparar string con número
      item.alumno.toLowerCase().includes(searchText.toLowerCase())
  ); */

  const filteredData = alumnotramiteList.filter((item) => {
    return (
      // Filtro por Trámite
      (!selectedTramite || item.idTramite == selectedTramite) &&
      // Filtro por Alumno (búsqueda de texto)
      item.alumno.toLowerCase().includes(searchText.toLowerCase()) &&
      // Filtro por Estatus
      (!selectedEstatus || item.estatus === selectedEstatus) &&
      // Filtro por Programa Académico
      (!selectedPrograma || item.programa === selectedPrograma)
    );
  });
  

  const handleAdd = () => {
    addAlumnoTramite(idTramite, idPersona, idAlumnoPA, idPeriodo, fecha, estatus, setShowModal, () => getAlumnoTramite(setAlumnoTramite));
  };

  const handleUpdate = () => {
    updateAlumnoTramiteFunc(selectedAlumnoTramite.idAlumnoTramite, idTramite, idPersona, idAlumnoPA, idPeriodo, fecha, estatus, setShowEditModal, () => getAlumnoTramite(setAlumnoTramite));
    setShowEditModal2(false);
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
          onChange={(e) => setSelectedTramite(e.target.value)}
        >
          <option value="">Mostrar todos los trámites</option>
          {tramiteList.map((tramite) => (
            <option key={tramite.idTramite} value={tramite.idTramite}>
              {tramite.nombre}
            </option>
          ))}
        </select>

        {/* Filtro de Estatus */}
        <select
          className="form-select me-2"
          value={selectedEstatus}
          onChange={(e) => setSelectedEstatus(e.target.value)}
        >
          <option value="">Mostrar todos los estatus</option>
          <option value="En proceso">En proceso</option>
          <option value="Concluido">Concluido</option>
          <option value="Cancelado">Cancelado</option>
        </select>

        {/* Filtro de Programa Académico */}
        <select
          className="form-select"
          value={selectedPrograma}
          onChange={(e) => setSelectedPrograma(e.target.value)}
        >
          <option value="">Mostrar todos los programas</option>
          {alumnotramiteList
            .map((item) => item.programa)
            .filter((value, index, self) => self.indexOf(value) === index) // Eliminar duplicados
            .map((programa) => (
              <option key={programa} value={programa}>
                {programa}
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
                  <th>PROGRESO</th>
                  <th>PROCESO</th>
                  {/*<th>Editar</th> */}
                  <th>CANCELAR</th>
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
                      <td>
                            <span
                              className={`badge 
                                ${alumnotramite.estatus === 'En proceso' ? 'bg-warning' : ''}  // Amarillo
                                ${alumnotramite.estatus === 'Concluido' ? 'bg-success' : ''}  // Verde
                                ${alumnotramite.estatus === 'Cancelado' ? 'bg-danger' : ''}    // Rojo
                                text-light p-2 rounded-pill`}
                            >
                              {alumnotramite.estatus}
                            </span>
                      </td>


                      {/* ------------------------------------- BARRA DE PROCESO -----------------------------------*/}
                      <td>
                                  <div
                                    className="d-flex align-items-center justify-content-center position-relative"
                                    style={{
                                      width: '60px',
                                      height: '60px',
                                      borderRadius: '50%',
                                      background: `conic-gradient(
                                        #28a745 ${getPorcentajeProgreso(alumnotramite.idAlumnoTramite, alumnoprocesoList) * 3.6}deg,
                                        transparent ${getPorcentajeProgreso(alumnotramite.idAlumnoTramite, alumnoprocesoList) * 3.6}deg 360deg
                                      )`,
                                      boxShadow: '0 0 0 4px #e9ecef',
                                    }}
                                  >
                                    {/* Fondo del círculo */}
                                    <div
                                      style={{
                                        width: '45px',
                                        height: '45px',
                                        borderRadius: '50%',
                                        background: '#fff',
                                        position: 'absolute',
                                        zIndex: 1,
                                      }}
                                    ></div>

                                    {/* Texto del porcentaje */}
                                    <span
                                      className="fw-bold fs-8 text-dark"
                                      style={{
                                        position: 'absolute',
                                        zIndex: 2,
                                      }}
                                    >
                                      {getPorcentajeProgreso(alumnotramite.idAlumnoTramite, alumnoprocesoList)}%
                                    </span>
                                  </div>
                      </td>
                      <td>
                      <button
                        className={`btn btn-sm 
                          ${alumnotramite.estatus === 'En proceso' ? 'btn-secondary text-white' : ''} 
                          ${alumnotramite.estatus === 'Concluido' ? 'btn-success text-white' : ''} 
                          ${alumnotramite.estatus === 'Cancelado' ? 'btn-danger text-white' : ''} 
                          rounded-pill shadow-sm d-flex align-items-center justify-content-center px-3 py-2`}
                        onClick={() => {
                          if (alumnotramite.estatus === 'En proceso') {
                            navigate(`/procedimientoTramite?idAlumnoTramite=${alumnotramite.idAlumnoTramite}`);
                          } else if (alumnotramite.estatus === 'Concluido') {
                            navigate(`/TramiteConcluido?idAlumnoTramite=${alumnotramite.idAlumnoTramite}`);
                          } else if (alumnotramite.estatus === 'Cancelado') {
                            navigate(`/seguimientoTramite?idAlumnoTramite=${alumnotramite.idAlumnoTramite}`);
                          }
                        }}
                        style={{
                          transition: 'all 0.3s ease',
                          transform: 'scale(1)',
                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
                        onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                      >
                        {alumnotramite.estatus === 'En proceso' && (
                          <i className="bi bi-person-gear text-white fs-4"></i>
                        )}
                        {alumnotramite.estatus === 'Concluido' && (
                          <i className="bi bi-person-check text-white fs-4"></i>
                        )}
                        {alumnotramite.estatus === 'Cancelado' && (
                          <i className="bi bi-person-x text-white fs-4"></i>
                        )}
                      </button>
                      </td>

                       {/* ---------------------------------------------------------- */}

                     {/*  <td>
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
                      </td> */}

                      <td>
                        <button className="btn btn-danger" onClick={() => {
                          setIdTramite(alumnotramite.idTramite);
                          setIdAlumnoPA(alumnotramite.idAlumnoPA);
                          setIdPersona(alumnotramite.idPersona);
                          setIdPeriodo(alumnotramite.idPeriodo);
                          setFecha(alumnotramite.fecha);
                          setFecha(formatDateString(alumnotramite.fecha))
                          setEstatus("Cancelado");
                          setShowEditModal2(true);
                          setSelectedAlumnoTramite(alumnotramite);
                        }}> <i class="bi bi-file-earmark-excel"></i> </button>
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
        idPersona={idPersona} setIdPersona={setIdPersona}

        tramite={tramite} setTramite={setTramite}
        alumno={alumno} setAlumno={setAlumno}
        periodo={periodo} setPeriodo={setPeriodo}


        showModal={showModal} setShowModal={setShowModal}
        showEditModal={showEditModal} setShowEditModal={setShowEditModal}
        showEditModal2={showEditModal2} setShowEditModal2={setShowEditModal2}
       // showDeleteModal={showDeleteModal} setShowDeleteModal={setShowDeleteModal}
        handleAdd={handleAdd}
        handleUpdate={handleUpdate}
        handleDelete={handleDelete}
        selectedAlumnoTramite={selectedAlumnoTramite}
      />
    </div>
  );
}

export default Seguimientodetramite;
