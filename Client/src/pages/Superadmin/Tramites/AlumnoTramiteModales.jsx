/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react' //Act. 
import { getTramites } from "../../../api/Parametrizacion/tramite.api.js";
import { getPeriodos } from "../../../api/PlanificacionAcademica/periodo.api.js";
import { getAlumnoPA } from "../../../api/Parametrizacion/alumnopa.api.js";
import { getPersonas } from "../../../api/Nucleo/persona.api.js";

export const AlumnoTramiteModales = ({
  idTramite, setIdTramite, 
  idAlumnoPA, setIdAlumnoPA, 
  idPersona, setIdPersona, 
  idPeriodo, setIdPeriodo, 
  fecha, setFecha, 
  estatus, setEstatus, 

  showModal,setShowModal,showEditModal,setShowEditModal,
  showDeleteModal,setShowDeleteModal,
  showEditModal2, setShowEditModal2, 
  handleAdd,handleUpdate,
  handleDelete,selectedAlumnoTramite,
}) => {

    const [tramiteList, setTramiteList] = useState([]);
    const [periodoList, setPeriodoList] = useState([]);
    const [alumnopaList, setAlumnopaList] = useState([]);
    const [personaList, setPersonaList] = useState([]);

    useEffect(() => {
      getTramites().then((data) => setTramiteList(data)).catch((error) => console.error("Error al obtener los trámites:", error));
      getPeriodos().then((data) => setPeriodoList(data)).catch((error) => console.error("Error al obtener los periodos:", error));
      getAlumnoPA().then((data) => setAlumnopaList(data)).catch((error) => console.error("Error al obtener los alumnos con programa:", error));
      getPersonas().then((data) => setPersonaList(data)).catch((error) => console.error("Error al obtener las personas:", error));
    }, []);
    
  return (
    <>
      {/* Modal para registrar AlumnoProceso */}
      <div className={`modal fade ${showModal ? 'show' : ''}`} style={{ display: showModal ? 'block' : 'none' }} tabIndex="-1" aria-labelledby="modalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="modalLabel">Registrar Alumnos en tramites</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={() => setShowModal(false)}></button>
            </div>
            
            <div className="modal-body">

                  {/* Campos del formulario */}

                  <div className="input-group mb-3">
                <span className="input-group-text">Alumno:</span>
                <select className="form-select" value={idPersona} onChange={(event) => setIdPersona(event.target.value)}>
                  <option value="">Selecciona una persona</option>
                  {personaList.map((persona) => (
                    <option key={persona.idPersona} value={persona.idPersona}>
                     {persona.nombre} {persona.paterno} {persona.materno}
                    </option> 
                  ))}
                </select>
              </div>

                  {/*
                  <div className="input-group mb-3">
                <span className="input-group-text">Alumno:</span>
                <select className="form-select" value={idAlumnoPA} onChange={(event) => setIdAlumnoPA(event.target.value)}>
                  <option value="">Selecciona un alumno</option>
                  {alumnopaList.map((alumnopa) => (
                    <option key={alumnopa.idAlumnoPA} value={alumnopa.idAlumnoPA}>
                     {alumnopa.matricula} {alumnopa.nombre}
                    </option> 
                  ))}
                </select>
              </div>
              */}

              <div className="input-group mb-3">
              <span className="input-group-text">Trámite:</span>
              <select className="form-select" value={idTramite} onChange={(event) => setIdTramite(event.target.value)}>
                <option value="">Selecciona un Tramite</option>
                {tramiteList.map((tramiteList) => (
                  <option key={tramiteList.idTramite} value={tramiteList.idTramite}>{tramiteList.nombre}</option>
                ))}
              </select>
            </div>

            <div className="input-group mb-3">
                <span className="input-group-text">Periodo:</span>
                <select className="form-select" value={idPeriodo} onChange={(event) => setIdPeriodo(event.target.value)}>
                  <option value="">Selecciona un periodo</option>
                  {periodoList.map((periodo) => (
                    <option key={periodo.idPeriodo} value={periodo.idPeriodo}>{periodo.periodo}</option>
                  ))}
                </select>
              </div>

              <div className="input-group mb-3">
                  <span className="input-group-text">Fecha:</span>
                  <input type="date" className="form-control" value={fecha} onChange={(event) => setFecha(event.target.value)} />                         
              </div>

              <div className="input-group mb-3">
                <span className="input-group-text">Estatus:</span>
                <select className="form-select" value={estatus} onChange={(event) => setEstatus(event.target.value)}>
                  <option value="">Selecciona un tipo</option>
                  <option value="En proceso">En proceso</option>
                  <option value="Cancelado">Cancelado</option>
                  <option value="Concluido">Concluido</option>
                </select>
              </div>

            </div>


            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Cerrar</button>
              <button type="button" className="btn btn-primary" onClick={handleAdd}>Registrar</button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal para editar AlumnoProceso */}
      <div className={`modal fade ${showEditModal ? 'show' : ''}`} style={{ display: showEditModal ? 'block' : 'none' }} tabIndex="-1" aria-labelledby="editModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="editModalLabel">Editar proceso de alumnos</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={() => setShowEditModal(false)}></button>
            </div>
            <div className="modal-body">
                {/* Campos del formulario */}

                <div className="input-group mb-3">
                  <span className="input-group-text">Alumno:</span>
                  <input 
                    type="text" 
                    className="form-control" 
                    value={personaList.find(p => p.idPersona === idPersona)?.nombre + " " +
                          personaList.find(p => p.idPersona === idPersona)?.paterno + " " +
                          (personaList.find(p => p.idPersona === idPersona)?.materno || "") || ""}
                    readOnly
                  />
                </div>

                {/* <div className="input-group mb-3">
                <span className="input-group-text">Alumno:</span>
                <select className="form-select" value={idAlumnoPA} onChange={(event) => setIdAlumnoPA(event.target.value)}>
                  <option value="">Selecciona un alumno</option>
                  {alumnopaList.map((alumnopa) => (
                    <option key={alumnopa.idAlumnoPA} value={alumnopa.idAlumnoPA}>
                     {alumnopa.matricula} {alumnopa.nombre}
                    </option> 
                  ))}
                </select>
              </div> */}

              <div className="input-group mb-3">
              <span className="input-group-text">Tramite:</span>
              <select className="form-select" value={idTramite} onChange={(event) => setIdTramite(event.target.value)} disabled>
                <option value="">Selecciona un Tramite</option>
                {tramiteList.map((tramiteList) => (
                  <option key={tramiteList.idTramite} value={tramiteList.idTramite}>{tramiteList.nombre} </option>
                ))}
              </select>
            </div>

            <div className="input-group mb-3">
                <span className="input-group-text">Periodo:</span>
                <select className="form-select" value={idPeriodo} onChange={(event) => setIdPeriodo(event.target.value)}>
                  <option value="">Selecciona un periodo</option>
                  {periodoList.map((periodo) => (
                    <option key={periodo.idPeriodo} value={periodo.idPeriodo}>{periodo.periodo}</option>
                  ))}
                </select>
              </div>

              <div className="input-group mb-3">
                  <span className="input-group-text">Fecha:</span>
                  <input type="date" className="form-control" value={fecha} onChange={(event) => setFecha(event.target.value)} disabled/>                         
              </div>

              <div className="input-group mb-3">
                <span className="input-group-text">Estatus:</span>
                <select className="form-select" value={estatus} onChange={(event) => setEstatus(event.target.value)}>
                  <option value="">Selecciona un tipo</option>
                  <option value="En proceso">En proceso</option>
                  <option value="Cancelado">Cancelado</option>
                  <option value="Concluido">Concluido</option>
                </select>
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={() => setShowEditModal(false)}>Cerrar</button>
              <button type="button" className="btn btn-primary" onClick={handleUpdate}>Actualizar</button>
            </div>
          </div>
        </div>
      </div>


    {/* ---------- BONTÓN DE CANCELAR ------------------*/}
          <div
              className={`modal fade ${showEditModal2 ? 'show' : ''}`}
              style={{
                display: showEditModal2 ? 'block' : 'none',
                backgroundColor: 'rgba(0,0,0,0.5)',
              }}
              tabIndex="-1"
              aria-labelledby="cancelModalLabel"
              aria-hidden="true"
            >
              <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content border-0 shadow-lg rounded-4">

                  {/* Header */}
                  <div className="modal-header border-0">
                    <h5 className="modal-title fw-semibold text-danger" id="cancelModalLabel">
                      Confirmar Cancelación
                    </h5>
                    <button
                      type="button"
                      className="btn-close"
                      aria-label="Cerrar"
                      onClick={() => setShowEditModal2(false)}
                    ></button>
                  </div>

                  {/* Body */}
                  <div className="modal-body text-center px-4 py-3">

                    <div className="mb-4">
                      <i className="bi bi-exclamation-triangle-fill text-danger fs-1"></i>
                    </div>

                    <p className="fw-semibold fs-5 text-dark mb-4">
                      ¿Estás seguro que deseas cancelar el trámite del siguiente alumno?
                    </p>

                    {/* Info Card */}
                    <div className="border rounded-4 p-3 text-start bg-light-subtle">
                      <div className="d-flex flex-column gap-3">

                        <div>
                          <span className="text-secondary small">Alumno</span>
                          <div className="fw-medium fs-6">
                            {personaList.find(p => p.idPersona === idPersona)?.nombre + " " +
                              personaList.find(p => p.idPersona === idPersona)?.paterno + " " +
                              (personaList.find(p => p.idPersona === idPersona)?.materno || "")
                              || ""}
                          </div>
                        </div>

                        <div>
                          <span className="text-secondary small">Trámite</span>
                          <div className="fw-medium fs-6">
                            {tramiteList.find(t => t.idTramite === idTramite)?.nombre || ""}
                          </div>
                        </div>

                        <div>
                          <span className="text-secondary small">Periodo</span>
                          <div className="fw-medium fs-6">
                            {periodoList.find(p => p.idPeriodo === idPeriodo)?.periodo || ""}
                          </div>
                        </div>

                        <div>
                          <span className="text-secondary small">Fecha</span>
                          <div className="fw-medium fs-6">{fecha}</div>
                        </div>

                        <div>
                          <span className="text-secondary small">Estatus</span>
                          <div className="fw-bold fs-6 text-danger">Cancelado</div>
                        </div>

                      </div>
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="modal-footer border-0 d-flex justify-content-center gap-3 pb-4">
                    <button
                      type="button"
                      className="btn btn-outline-secondary px-4 py-2 rounded-pill"
                      onClick={() => setShowEditModal2(false)}
                    >
                      Cerrar
                    </button>
                    <button
                      type="button"
                      className="btn btn-danger px-4 py-2 rounded-pill"
                      onClick={handleUpdate}
                    >
                      Cancelar trámite
                    </button>
                  </div>

                </div>
              </div>
            </div>


      {/* Modal para eliminar AlumnoProceso */}
      <div className={`modal fade ${showDeleteModal ? 'show' : ''}`} style={{ display: showDeleteModal ? 'block' : 'none' }} tabIndex="-1" aria-labelledby="deleteModalLabel" aria-hidden="true">
        <div className="modal-dialog">
            <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="deleteModalLabel">Eliminar Alumnos en Proceso</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={() => setShowDeleteModal(false)}></button>
            </div>
            <div className="modal-body">
              <p>¿Estás seguro de que deseas eliminar el trámite proceso: <strong>{selectedAlumnoTramite?.matricula}</strong>?</p>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={() => setShowDeleteModal(false)}>Cancelar</button>
              <button type="button" className="btn btn-danger" onClick={handleDelete}>Eliminar</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
