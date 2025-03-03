import React, { useState, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { getAlumnoProceso, updateAlumnoProcesoFunc } from '../../../assets/js/Tramites/alumnoproceso.js';
//import { AlumnoProcesoModales } from './AlumnoProcesoModales.jsx';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaEdit, FaClipboardList, FaArrowLeft } from 'react-icons/fa';
import * as TramiteObjetos from './tramiteObjetos.jsx'; // Importar todas las funciones de TramiteObjetos.jsx

//Alumno
import { getAlumno, addAlumno} 
from '../../../assets/js/Nucleo/alumno.js';

//AlumnoPA
import { getAlumnopatodos, addAlumnoPa} 
from '../../../assets/js/Parametrizacion/alumnopa.js';

function ProcedimientoTramite() {
  const [alumnoprocesoList, setAlumnoProceso] = useState([]);
  const [idAlumnoTramite, setIdAlumnoTramite] = useState("");
  const [idTramiteProceso, setIdTramiteProceso] = useState("");
  const [idActividad, setIdActividad] = useState("");
  const [orden, setOrden] = useState("");
  const [estatus, setEstatus] = useState("");
  const [observacion, setObservacion] = useState("");
  const [tramite, setTramite] = useState("");
  const [showRegistroModal, setShowRegistroModal] = useState(false); // Modal de registro
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedAlumnoProceso, setSelectedAlumnoProceso] = useState(null);

//ALUMNO
  const [alumnoList, setAlumno] = useState([]);
  const [idPersona, setidPersona] = useState("");
  const [nombre, setnombre] = useState("");
  const [paterno, setpaterno] = useState("");
  const [materno, setmaterno] = useState("");
  const [email, setemail] = useState("");
  const [nss, setnss] = useState("");
  const [fecha, setfecha] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedAlumno, setSelectedAlumno] = useState(null);

//ALUMNOPA
  const [alumnopaList, setAlumnopaList] = useState([]);
  const [idAlumno, setIdAlumno] = useState("");
  const [idProgramaAcademico, setIdProgramaAcademico] = useState("");
  const [carrera, setCarrera] = useState("");
  const [idPeriodo, setIdPeriodo] = useState("");
  const [matricula, setMatricula] = useState("");
  const [estatusAlumnoPA, setEstatusAlumnoPA] = useState("");
  const [desde, setDesde] = useState("");
  const [hasta, setHasta] = useState("");
  const [selectedAlumnopa, setSelectedAlumnopa] = useState(null);

  const [currentObjeto, setCurrentObjeto] = useState(null); // Estado para el objeto actual
  const [showObjetoModal, setShowObjetoModal] = useState(false); // Modal del objeto

  const location = useLocation();
  const navigate = useNavigate();
  const params = new URLSearchParams(location.search);
  const idAlumnoTramiteParam = params.get("idAlumnoTramite");

  useEffect(() => {
    getAlumnoProceso(setAlumnoProceso);
  }, []);

  useEffect(() => {
    getAlumnoProceso(setAlumnoProceso);
}, []);

useEffect(() => {
    if (alumnoprocesoList.length > 0) {
        console.log("Datos de alumnoproceso:", alumnoprocesoList[0]); // Ver el primer objeto
        console.log("Claves del objeto:", Object.keys(alumnoprocesoList[0])); // Verificar nombres de las claves
    }
}, [alumnoprocesoList]);


  if (!idAlumnoTramiteParam) {
    return <h5 className="text-danger text-center mt-4">⚠ Acceso denegado: Falta seleccionar un trámite.</h5>;
  }

  const filteredData = alumnoprocesoList
    .filter((item) => item.idAlumnoTramite == idAlumnoTramiteParam)
    .sort((a, b) => a.orden - b.orden);

    const handleUpdate = () => {
      updateAlumnoProcesoFunc(
        selectedAlumnoProceso.idAlumnoProceso,
        idAlumnoTramite, idTramiteProceso, idActividad, orden, estatus, observacion,
        setShowEditModal, () => getAlumnoProceso(setAlumnoProceso)
      );
    };

    //ALUMNO
      const handleAdd = () => {
        console.log("Datos enviados:", {
          idPersona, email, nss, fecha,
        });
        addAlumno(idPersona, email, nss, fecha, setShowModal, () => getAlumno(setAlumno));
      };
     
      //ALUMNO PA
      const handleAddPA = () => {
        console.log("Datos enviados a PA:", {idAlumno, idProgramaAcademico, idPeriodo, matricula, estatusAlumnoPA, desde, hasta});
          addAlumnoPa(idAlumno, idProgramaAcademico, idPeriodo, matricula, estatusAlumnoPA, desde, hasta, setShowModal, () => getAlumnopatodos(setAlumnopaList));
        };

      

  // Función para manejar el clic en el botón "objeto"
  const handleObjetoClick = (objeto) => {
    console.log("Objeto seleccionado:", objeto); // Depuración
    setCurrentObjeto(objeto);
    setShowObjetoModal(true);
  };

  
  // Función para cerrar el modal del objeto
  const handleCloseObjetoModal = () => {
    setShowObjetoModal(false);
    setCurrentObjeto(null);
  };

  // Obtener el componente del modal correspondiente al objeto actual
  const ModalComponent = currentObjeto ? TramiteObjetos[`${currentObjeto}`] : null;
  console.log("ModalComponent:", ModalComponent); // Depuración

  return (
    <div className="container mt-4">
      {/* Encabezado */}
      <div className="text-center py-3 mb-4 text-white rounded shadow" style={{ background: 'linear-gradient(90deg, #007bff, #6610f2)' }}>
        <h3 className="fw-bold">Proceso de {filteredData[0]?.tramite}</h3>
      </div>

      {/* Botón de regresar */}
      <button className="btn btn-outline-dark mb-3" onClick={() => navigate(-1)}>
        <FaArrowLeft /> Regresar
      </button>

      {/* Tarjeta con información del alumno */}
      <div className="card border-0 shadow-sm p-4 mb-4 bg-white rounded">
        <h5 className="text-primary fw-bold">{filteredData[0]?.tramite || "Trámite Desconocido"}</h5>
        <p className="card-text"><strong>👤 Alumno:</strong> {filteredData[0]?.NombreAlumno}</p>
        <p className="card-text"><strong>🎓 Matrícula:</strong> {filteredData[0]?.matricula}</p>
        <p className="card-text"><strong>🏫 Programa Académico:</strong> {filteredData[0]?.programa}</p>
      </div>

      {/* Lista de actividades en forma de tarjetas */}
      <div className="row">
        {filteredData.length > 0 ? (
          filteredData.map((alumnoproceso) => (
            <div key={alumnoproceso.idAlumnoProceso} className="col-md-6">
              <div className="card border-0 shadow-sm mb-4 bg-light">
                <div className="card-body">
                  <h5 className="card-title text-primary">
                    <FaClipboardList className="me-2" /> {alumnoproceso.NombreActividad}
                  </h5>
                  <p className="mb-1"><strong>Orden:</strong> {alumnoproceso.orden}</p>
                  <p className="mb-1"><strong>Orden:</strong> {alumnoproceso.idpersona}</p>
                  <p className="mb-1"><strong>Objeto:</strong> {alumnoproceso.objeto}</p>
                  <p className="mb-1"><strong>Trámite:</strong> {alumnoproceso.tramite}</p>
                  <p className="mb-1"><strong>Observación:</strong> {alumnoproceso.observacion || "Ninguna"}</p>
                  <p className="mb-1">
                    <strong>Estatus:</strong>
                    <span className={`badge ${alumnoproceso.estatus === "Concluido" ? "bg-success" : "bg-warning text-dark"} ms-2`}>
                      {alumnoproceso.estatus}
                    </span>
                  </p>
                  <div className="mt-3">
                   

               {/* <button className="btn btn-sm btn-outline-primary me-2" onClick={() => handleObjetoClick(alumnoproceso.objeto)
                    }>
                      <FaEdit /> objeto {alumnoproceso.objeto}
                    </button> */}

                  <button className="btn btn-sm btn-outline-primary me-2" onClick={() => {
                    handleObjetoClick(alumnoproceso.objeto);
                    setIdAlumnoTramite(alumnoproceso.idAlumnoTramite);
                    setIdTramiteProceso(alumnoproceso.idTramiteProceso);
                    setIdActividad(alumnoproceso.idActividad);
                    setOrden(alumnoproceso.orden);
                    setEstatus(alumnoproceso.estatus);
                    setObservacion(alumnoproceso.observacion);
                    setTramite(alumnoproceso.tramite);
                    setSelectedAlumnoProceso(alumnoproceso);
                    setidPersona(alumnoproceso.idPersona); // Asegúrate de que esto esté correctamente definido
                    console.log("idPersona al abrir el modal:", alumnoproceso.idPersona); // Depuración

                    setIdAlumno(alumnoproceso.idAlumno); 
                    console.log("idAlumno al abrir el modal:", alumnoproceso.idAlumno); // Depuración
                  }}>
                    <i className="bi bi-card-checklist"></i> Proceso
                  </button>

                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-muted text-center">No hay actividades registradas.</p>
        )}
      </div>

      {/* Modal del objeto */}
      {ModalComponent && (
   <ModalComponent 

   //MODALES GENERICOS
    show={showObjetoModal} 
    handleClose={handleCloseObjetoModal} 
    idAlumnoTramite={idAlumnoTramite} setIdAlumnoTramite={setIdAlumnoTramite}
    idTramiteProceso={idTramiteProceso} setIdTramiteProceso={setIdTramiteProceso}
    idActividad={idActividad} setIdActividad={setIdActividad}
    orden={orden} setOrden={setOrden}
    estatus={estatus} setEstatus={setEstatus}
    observacion={observacion} setObservacion={setObservacion}
    handleUpdate={handleUpdate}  

    //MODAL ALUMNO
    idPersona={idPersona} setidPersona={setidPersona}
    nombre={nombre} setnombre={setnombre}
    paterno={paterno} setpaterno={setpaterno}
    materno={materno} setmaterno={setmaterno}
    email={email} setemail={setemail}
    fecha={fecha} setfecha={setfecha}
    nss={nss} setnss={setnss}
    showModal={showModal} setShowModal={setShowModal}
    handleAdd={handleAdd}
    selectedAlumno={selectedAlumno}

    //MODAL ALUMNOPA
    idAlumno={idAlumno} setIdAlumno={setIdAlumno} 
    idProgramaAcademico={idProgramaAcademico} setIdProgramaAcademico={setIdProgramaAcademico}
    carrera={carrera} setCarrera={setCarrera}
    idPeriodo={idPeriodo} setIdPeriodo={setIdPeriodo}
    matricula={matricula} setMatricula={setMatricula}
    estatusAlumnoPA={estatusAlumnoPA} setEstatusAlumnoPA={setEstatusAlumnoPA}
    desde={desde} setDesde={setDesde}
    hasta={hasta} setHasta={setHasta}
    handleAddPA={handleAddPA}
    setSelectedAlumnopa={setSelectedAlumnopa}

  />
)}
    </div>
  );
}

export default ProcedimientoTramite;