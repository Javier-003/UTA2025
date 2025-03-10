import React, { useState, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { getAlumnoProceso, updateAlumnoProcesoFunc } from '../../../assets/js/Tramites/alumnoproceso.js';
//import { AlumnoProcesoModales } from './AlumnoProcesoModales.jsx';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaEdit, FaClipboardList, FaArrowLeft, FaUserGraduate } from 'react-icons/fa';
import * as TramiteObjetos from './tramiteObjetos.jsx'; // Importar todas las funciones de TramiteObjetos.jsx

//Alumno
import { getAlumno, addAlumno} 
from '../../../assets/js/Nucleo/alumno.js';

//AlumnoPA
import { getAlumnopatodos, addAlumnoPa, transaccionUpdateAlumnopaJS} 
from '../../../assets/js/Parametrizacion/alumnopa.js';

//Kardex/Grupo
import {getKardexTodos, addKardexFun, updateTransaccionKardexjs} 
from '../../../assets/js/Parametrizacion/kardex.js';

//------------ EXPORTAMOS DATOS DEL PORCENTAJE --------------------
export const calcularPorcentajeConcluido = (filteredData) => {
  if (filteredData.length === 0) return 0;
  const concluidas = filteredData.filter(item => item.estatus === "Concluido").length;
  return Math.round((concluidas / filteredData.length) * 100);
}; 
// ----------------------------------------------------------------

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
  const [showEdit2Modal, setShowEdit2Modal] = useState(false);
  const [selectedAlumnopa, setSelectedAlumnopa] = useState(null);

//KARDEX/GRUPO
  const [kardexList, setKardexList] = useState([]);
  const [idKardex, setIdKardex] = useState("");
  const [idAlumnoPA, setIdAlumnoPA] = useState("");
  const [idMapaCurricular, setIdMapaCurricular] = useState("");
  const [idGrupo, setIdGrupo] = useState("");
  const [idPeriodoKardex, setIdPeriodoKardex] = useState("");
  const [calificacionFinal, setCalificacionFinal] = useState("");
  const [tipo, setTipo] = useState("");
  const [estatusKardex, setEstatusKardex] = useState("");
  const [selectedKardex, setSelectedKardex] = useState(null);

  const [currentObjeto, setCurrentObjeto] = useState(null); // Estado para el objeto actual
  const [showObjetoModal, setShowObjetoModal] = useState(false); // Modal del objeto

  const location = useLocation();
  const navigate = useNavigate();
  const params = new URLSearchParams(location.search);
  const idAlumnoTramiteParam = params.get("idAlumnoTramite");


  //Porcentaje
  const calcularPorcentajeConcluido = () => {
    if (filteredData.length === 0) return 0;
    const concluidas = filteredData.filter(item => item.estatus === "Concluido").length;
    return Math.round((concluidas / filteredData.length) * 100);
  };
  
  
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

  // Filtrar los datos del alumno en proceso actual
  const filteredData = alumnoprocesoList
    .filter((item) => item.idAlumnoTramite == idAlumnoTramiteParam)
    .sort((a, b) => a.orden - b.orden);

    // Función para manejar la actualización de un alumno en proceso
    const handleUpdate = () => {
      updateAlumnoProcesoFunc(
        selectedAlumnoProceso.idAlumnoProceso,
        idAlumnoTramite, idTramiteProceso, idActividad, orden, estatus, observacion,
        setShowEditModal, () => getAlumnoProceso(setAlumnoProceso)
      );
    };

    //ALUMNO
    const handleAdd = () => {
      console.log("Datos enviados:", {idPersona, email, nss, fecha, });
      addAlumno(idPersona, email, nss, fecha, setShowModal, () => {
        getAlumno(setAlumno); // Actualiza los alumnos
        getAlumnoProceso(setAlumnoProceso); // También actualiza el proceso
      });
    };

      //ALUMNO PA
     const handleAddPA = () => {
      console.log("Datos enviados a PA:", {idAlumno, idProgramaAcademico, idPeriodo, matricula, estatusAlumnoPA, desde, hasta});
        addAlumnoPa(idAlumno, idProgramaAcademico, idPeriodo, matricula, estatusAlumnoPA, desde, hasta, setShowModal, () => {
        getAlumnopatodos(setAlumnopaList)
        getAlumnoProceso(setAlumnoProceso); // También actualiza el proceso
       });
     }; 

     const handleUpdatePA = () => {
      const estatusAlumnoPA = "Activo";
      console.log("Datos enviados actualización PA:", {idAlumnoPA, idAlumno, idProgramaAcademico, idPeriodo, matricula, estatusAlumnoPA, desde, hasta});
      transaccionUpdateAlumnopaJS(idAlumnoPA, idAlumno, idProgramaAcademico, idPeriodo, matricula, estatusAlumnoPA, desde, hasta, setShowEdit2Modal, () => {
        getAlumnopatodos(setAlumnopaList)
        getAlumnoProceso(setAlumnoProceso); // También actualiza el proceso
       });
     }; 


     /*
     const handleAddPA = () => {
      console.log("Datos enviados a PA:", { idAlumno, idProgramaAcademico, idPeriodo, matricula, estatusAlumnoPA, desde, hasta });
      addAlumnoPa(idAlumno, idProgramaAcademico, idPeriodo, matricula, estatusAlumnoPA, desde, hasta, setShowModal, async () => {
        await getAlumnopatodos(setAlumnopaList);
        await getAlumnoProceso(setAlumnoProceso); // También actualiza el proceso
    
        // Verificar y cambiar el estatus de "En proceso" a "Concluido" para todos los registros relacionados
        const updatedList = await Promise.all(
          alumnoprocesoList.map(item => {
            if (item.estatus === "En proceso") {
              item.estatus = "Concluido";
              return updateAlumnoProcesoFunc(
                item.idAlumnoProceso,
                idAlumnoTramite,
                idTramiteProceso,
                idActividad,
                orden,
                "Concluido",
                observacion,
                setShowEditModal,
                () => getAlumnoProceso(setAlumnoProceso)
              ).catch(error => {
                console.error("Error al actualizar el proceso de alumno:", error);
                return null; // Para evitar que la promesa se rechace y cause problemas
              });
            }
            return Promise.resolve(item); // Devolver el item si no se actualiza
          })
        );
        
        // Filtrar los valores nulos (errores) y actualizar el estado
        setAlumnoProceso(updatedList.filter(item => item !== null));
        
      });
    }; */ 
    

      //ASOCIAR GRUPO/KARDEX
      const handleKardex = () => {  
        const tipo = "Ordinaria";
        const estatusKardex = "Activo";
        console.log("Datos enviados a KARDEX:", {idAlumnoPA,  idMapaCurricular,  idGrupo,  idPeriodoKardex, calificacionFinal, tipo, estatusKardex});
     
        addKardexFun( idAlumnoPA,  idMapaCurricular,  idGrupo,  idPeriodoKardex, calificacionFinal,  tipo, estatusKardex, setShowModal,  () => {
        getKardexTodos(setKardexList) 
        getAlumnoProceso(setAlumnoProceso); // También actualiza el proceso
        });
      };

      const handleUpdateKardex = () => {  
       // const estatusKardex = "Baja temporal";
       const tipo = "Ordinaria";
       const estatusKardex = "Baja temporal";
      console.log("Datos enviados a UPDATE KARDEX:", {idKardex, idAlumnoPA,  idMapaCurricular,  idGrupo,  idPeriodoKardex, calificacionFinal, tipo, estatusKardex});
       
        updateTransaccionKardexjs(idKardex, idAlumnoPA,  idMapaCurricular,  idGrupo,  idPeriodoKardex, calificacionFinal,  tipo, estatusKardex, setShowEdit2Modal,  () => {
        getKardexTodos(setKardexList) 
        getAlumnoProceso(setAlumnoProceso); // También actualiza el proceso
        });
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

    // Function to remove "T06:00:00.000Z" from dates
    const formatDateString = (dateString) => {
      if (dateString) {
        return dateString.split('T')[0];
      }
      return dateString;
    };

  return (
    <div className="container mt-4">
      {/* Encabezado */}
      <div className="text-center py-3 mb-4 text-white rounded shadow" style={{ background: 'linear-gradient(90deg, #007bff, #6610f2)' }}>
        <h3 className="fw-bold">Proceso de {filteredData[0]?.tramite}</h3>
 
            {/* --------- BARRA DE PROGRESO ------------ */}
            <div className="progress mt-3" style={{
              height: '30px', 
              width: '60%', 
              margin: '0 auto', 
              backgroundColor: '#e9ecef', 
              borderRadius: '15px', 
              boxShadow: '0px 3px 10px rgba(0, 0, 0, 0.2)' // Sombra para efecto 3D
            }}>
              <div 
                className="progress-bar progress-bar-striped"  // Quitamos progress-bar-animated
                role="progressbar" 
                style={{ 
                  width: `${calcularPorcentajeConcluido()}%`, 
                  background: 'linear-gradient(90deg, #28a745, #85e085)', // Degradado verde
                  color: '#fff', // Texto blanco para mejor contraste
                  fontWeight: 'bold', 
                  borderRadius: '15px' // Bordes redondeados para un diseño más limpio
                }}
                aria-valuenow={calcularPorcentajeConcluido()} 
                aria-valuemin="0" 
                aria-valuemax="100"
              >
                {calcularPorcentajeConcluido()}%
              </div>
            </div>
          {/* ---------- TERMINA BARRA DE PROGRESO --------------- */}
  
     </div>

      {/* Botón de regresar */}
      <button className="btn btn-outline-dark mb-3" onClick={() => navigate(-1)}>
        <FaArrowLeft /> Regresar
      </button>

      {/* Tarjeta con información del alumno */}

<div className="card border-0 shadow-sm mb-4" style={{
  backgroundColor: '#f9f9f9',
  borderLeft: '6px solid #6c757d',
  borderRadius: '10px',
}}>
  <div className="card-body p-4">
    {/* Título de la tarjeta */}
    <h5 className="text-dark fw-bold border-bottom border-2 border-dark pb-2 d-flex align-items-center" style={{ letterSpacing: '1px' }}>
      <FaUserGraduate className="me-2" size={24} color="#6c757d" />
      {filteredData[0]?.tramite || "Trámite Desconocido"}
    </h5>

    {/* Información del alumno */}
    <div className="row mt-3">
      <div className="col-md-4 mb-3">
        <p className="text-muted mb-1" style={{ fontWeight: '500' }}><strong>👤 Alumno</strong></p>
        <div className="p-2 bg-white rounded shadow-sm">
          <p className="text-dark fw-bold mb-0">{filteredData[0]?.NombreAlumno}</p>
        </div>
      </div>

      <div className="col-md-4 mb-3">
        <p className="text-muted mb-1" style={{ fontWeight: '500' }}><strong>🎓 Matrícula</strong></p>
        <div className="p-2 bg-white rounded shadow-sm">
          <p className="text-dark fw-bold mb-0">{filteredData[0]?.matricula}</p>
        </div>
      </div>

      <div className="col-md-4 mb-3">
        <p className="text-muted mb-1" style={{ fontWeight: '500' }}><strong>🏫 Programa Académico</strong></p>
        <div className="p-2 bg-white rounded shadow-sm">
          <p className="text-dark fw-bold mb-0">{filteredData[0]?.programa}</p>
        </div>
      </div>
    </div>
  </div>
</div>

      {/* Lista de actividades en forma de tarjetas */}
      <div className="row">
  {filteredData.length > 0 ? (
    filteredData.map((alumnoproceso) => (
      <div key={alumnoproceso.idAlumnoProceso} className="col-md-6">
        <div className="card border-0 shadow-sm mb-4 bg-light position-relative rounded-3">
          <div className="card-body p-4">

            {/* Orden en la esquina superior derecha */}
            <div className="position-absolute top-0 end-0 m-3">
              <span className="badge bg-primary fs-6 px-3 py-2 shadow-sm">
                Orden: {alumnoproceso.orden}
              </span>
            </div>

            {/* Título con mejor diseño */}
            <h5 className="card-title text-dark fw-bold d-flex align-items-center mb-3">
              <FaClipboardList className="me-2 text-primary" size={24} /> 
              <span className="border-bottom border-2 border-primary pb-1">
                {alumnoproceso.NombreActividad}
              </span>
            </h5>

            {/* Observación destacada */}
            <div className="mt-3 p-3 bg-white rounded shadow-sm border-start border-4 border-primary">
              <strong>Observación:</strong> 
              <p className="mb-0 text-muted">{alumnoproceso.observacion || "Ninguna"}</p>
            </div>

            {/* Footer con estatus y botón de proceso */}
            <div className="d-flex justify-content-between align-items-center mt-4">
              {/* Estatus en la esquina inferior izquierda */}
              <span className={`badge px-3 py-2 ${
                alumnoproceso.estatus === "Concluido" ? "bg-success" : "bg-warning text-dark"
              }`}>
                {alumnoproceso.estatus === "Concluido" ? "Concluido" : "En proceso"}
              </span>

              {/* Botón de proceso */}
              <button className="btn btn-outline-primary btn-sm px-4 shadow-sm d-flex align-items-center" onClick={() => {
                handleObjetoClick(alumnoproceso.objeto);
                setIdAlumnoTramite(alumnoproceso.idAlumnoTramite);
                setIdTramiteProceso(alumnoproceso.idTramiteProceso);
                setIdActividad(alumnoproceso.idActividad);
                setOrden(alumnoproceso.orden);
                setEstatus(alumnoproceso.estatus);
                setObservacion(alumnoproceso.observacion);
                setTramite(alumnoproceso.tramite);
                setSelectedAlumnoProceso(alumnoproceso);
                setidPersona(alumnoproceso.idPersona);
                setIdAlumno(alumnoproceso.idAlumno);

                setIdAlumnoPA(alumnoproceso.idAlumnoPA);
                setIdAlumno(alumnoproceso.idAlumno);
                setIdProgramaAcademico(alumnoproceso.idProgramaAcademico);
                setCarrera(alumnoproceso.carrera);
                setIdPeriodo(alumnoproceso.idPeriodo);
                setMatricula(alumnoproceso.matricula);
                setEstatusAlumnoPA(alumnoproceso.estatusAlumnoPA);
                setDesde(formatDateString(alumnoproceso.desde));
                setHasta(formatDateString(alumnoproceso.hasta));

                console.log({
                  idAlumnoPA: alumnoproceso.idAlumnoPA,
                  idAlumno: alumnoproceso.idAlumno,
                  idProgramaAcademico: alumnoproceso.idProgramaAcademico,
                  carrera: alumnoproceso.carrera,
                  idPeriodo: alumnoproceso.idPeriodo,
                  matricula: alumnoproceso.matricula,
                  estatusAlumnoPA: alumnoproceso.estatusAlumnoPA,
                  desde: alumnoproceso.desde,
                  hasta: alumnoproceso.hasta
                });


                setIdKardex(alumnoproceso.idKardex);
                setIdAlumnoPA(alumnoproceso.idAlumnoPA);
                setIdMapaCurricular(alumnoproceso.idMapaCurricular);
                setIdGrupo(alumnoproceso.idGrupo);
                setIdPeriodoKardex(alumnoproceso.idPeriodoKardex);
                setCalificacionFinal(alumnoproceso.calificacionFinal);
                setTipo(alumnoproceso.tipo);
                setEstatusKardex(alumnoproceso.estatusKardex);

                console.log({
                  idKardex: alumnoproceso.idKardex,
                  idAlumnoPA: alumnoproceso.idAlumnoPA,
                  idMapaCurricular: alumnoproceso.idMapaCurricular,
                  idGrupo: alumnoproceso.idGrupo,
                  idPeriodoKardex: alumnoproceso.idPeriodoKardex,
                  calificacionFinal: alumnoproceso.calificacionFinal,
                  tipo: alumnoproceso.tipo,
                  estatusKardex: alumnoproceso.estatusKardex
                });

              
              }}>
                <i className="bi bi-card-checklist me-2"></i> Proceso
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
    handleUpdatePA={handleUpdatePA}
    setSelectedAlumnopa={setSelectedAlumnopa}

    //MODAL KARDEX
    idAlumnoPA={idAlumnoPA} setIdAlumnoPA={setIdAlumnoPA}
    idMapaCurricular={idMapaCurricular} setIdMapaCurricular={setIdMapaCurricular}
    idGrupo={idGrupo} setIdGrupo={setIdGrupo}
    idPeriodoKardex={idPeriodoKardex} setIdPeriodoKardex={setIdPeriodoKardex}
    calificacionFinal={calificacionFinal} setCalificacionFinal={setCalificacionFinal}
    tipo={tipo} setTipo={setTipo}
    estatusKardex={estatusKardex} setEstatusKardex={setEstatusKardex}
    handleKardex={handleKardex}
    handleUpdateKardex={handleUpdateKardex}
    setSelectedKardex={setSelectedKardex}

  />
)}
    </div>
  );
}

export default ProcedimientoTramite;